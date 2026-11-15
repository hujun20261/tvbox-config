// 预构建脚本：把 worker_simple.js 里的 BASE + 可连通仓库合并成静态配置，
// 生成 tvbox-pages/_worker.js（运行时零外部请求，秒回，杜绝 TVBox 拉取超时）。
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = fs.readFileSync(path.join(ROOT, 'worker_simple.js'), 'utf8');

function extract(name) {
  const re = new RegExp('const ' + name + '\\s*=\\s*([\\s\\S]*?);\\r?\\n');
  const m = SRC.match(re);
  if (!m) throw new Error('找不到 ' + name);
  return m[1];
}
const BASE = eval('(' + extract('BASE') + ')');
const REPOS = eval('(' + extract('REPOS') + ')');

const TIMEOUT = 6000;

function cleanText(t) {
  t = t.replace(/\/\*[\s\S]*?\*\//g, '');
  t = t.replace(/(?<!:)(\/\/)[^\n\r]*/g, '');
  t = t.replace(/[\x00-\x09\x0b\x0c\x0e-\x1f]/g, '');
  return t;
}
function enc(u) {
  try {
    const p = new URL(u);
    p.pathname = p.pathname.split('/').map(s => encodeURIComponent(s)).join('/');
    return p.toString();
  } catch (e) { return u; }
}
async function fetchRepo(url, seen, depth) {
  if (!url || seen.has(url) || depth > 4) return null;
  seen.add(url);
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
    const r = await fetch(enc(url), {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': url },
      signal: ctrl.signal
    });
    clearTimeout(timer);
    if (!r.ok) return null;
    const txt = await r.text();
    try { return JSON.parse(cleanText(txt)); } catch (e) { return null; }
  } catch (e) { return null; }
}
function addSites(map, arr) {
  if (!Array.isArray(arr)) return;
  for (const s of arr) {
    const k = s && (s.key || s.name);
    if (k && !map.has(k)) map.set(k, s);
  }
}
function addArr(base, arr) {
  if (!Array.isArray(arr)) return base;
  for (const x of arr) {
    if (!base.find(y => (y.name === x.name) && (('url' in x) ? (y.url === x.url) : true))) base.push(x);
  }
  return base;
}
// 过滤掉必然打不开/无效的直播源：无名、非 http(s) 的 url、./ 相对路径、127.0.0.1 本地代理、空内置频道
function cleanLives(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.filter(x => {
    if (!x || typeof x.name !== 'string' || !x.name.trim()) return false;
    if (typeof x.url === 'string') {
      if (!/^https?:\/\//i.test(x.url)) return false;
      if (x.url.startsWith('./') || x.url.includes('127.0.0.1') || x.url.includes('localhost')) return false;
    }
    if (!x.url && Array.isArray(x.channels)) {
      const ok = x.channels.some(c => Array.isArray(c.urls) && c.urls.some(u => typeof u === 'string' && /^https?:\/\//i.test(u)));
      if (!ok) return false;
    }
    return true;
  });
}

async function build() {
  const seen = new Set();
  const sites = new Map();
  addSites(sites, BASE.sites);
  let lives = Array.isArray(BASE.lives) ? BASE.lives.slice() : [];
  let parses = Array.isArray(BASE.parses) ? BASE.parses.slice() : [];
  let merged = 0;
  const tried = [];
  for (const rp of REPOS) {
    const d = await fetchRepo(rp.url, seen, 0);
    tried.push({ name: rp.name, ok: !!d });
    if (!d) continue;
    merged++;
    addSites(sites, d.sites);
    lives = addArr(lives, d.lives);
    parses = addArr(parses, d.parses);
    if (Array.isArray(d.urls)) {
      for (const u of d.urls) {
        const dd = await fetchRepo(u.url, seen, 1);
        if (!dd) continue;
        addSites(sites, dd.sites);
        lives = addArr(lives, dd.lives);
        parses = addArr(parses, dd.parses);
      }
    }
  }
  const out = Object.assign({}, BASE);
  out.sites = Array.from(sites.values());
  if (lives.length) out.lives = cleanLives(lives);
  if (parses.length) out.parses = parses;
  return { out, merged, total: REPOS.length, tried };
}

(async () => {
  const { out, merged, total, tried } = await build();
  console.log('仓库尝试:', JSON.stringify(tried));
  console.log('成功合并仓库:', merged, '/', total);
  console.log('片源数:', out.sites.length, ' 直播:', (out.lives || []).length, ' 解析:', (out.parses || []).length);

  const CONFIG_JSON = JSON.stringify(out);
  console.log('配置体积:', CONFIG_JSON.length, 'bytes');

  const worker = `// TVBox 单仓配置（静态预构建版 · 运行时零外部请求，秒回）
// 由 build_static.js 生成，请勿手改。BASE+可达仓库已于部署时合并。
// 影视仓/TVBox「设置 -> 配置地址」填  https://你的域名/config.json

const CONFIG = ${CONFIG_JSON};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const p = url.pathname;
    const H = { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' };
    if (p === '/' || p === '/config.json' || p === '/tvbox.json') {
      return new Response(JSON.stringify(CONFIG), { headers: H });
    }
    if (p === '/status') {
      return new Response(JSON.stringify({
        ok: true,
        mode: 'static-prebuilt',
        sites: CONFIG.sites.length,
        lives: (CONFIG.lives || []).length,
        parses: (CONFIG.parses || []).length,
        builtAt: '${new Date().toISOString()}'
      }, null, 2), { headers: H });
    }
    return new Response('TVBox 单仓托管。请用 /config.json 作为配置地址。', { status: 200 });
  }
};
`;

  fs.writeFileSync(path.join(ROOT, 'tvbox-pages', '_worker.js'), worker, 'utf8');
  // 同时存一份纯静态 config.json 备用
  fs.writeFileSync(path.join(ROOT, 'tvbox-pages', 'config.json'), CONFIG_JSON, 'utf8');
  console.log('已写入 tvbox-pages/_worker.js 和 config.json');
})();
