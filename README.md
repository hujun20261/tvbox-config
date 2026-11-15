# 自托管 TVBox 配置（GitHub 自动部署版）

> 这是一个**你自己掌控**的 TVBox / 影视仓单仓配置。当前线上地址：
> `https://tvbox-config-az6.pages.dev/config.json`
> 本仓库的目的：让你**以后换源 / 改配置不再依赖任何人**——改完代码推到 GitHub，Cloudflare 自动重新部署。

---

## 文件说明
| 文件 | 作用 |
|---|---|
| `worker_simple.js` | **可编辑的源配置**（内置 53 源 + 直播 + 解析器，以及 7 个上游仓库 `REPOS`）。**换源主要改这里。** |
| `build_static.js` | 构建脚本：把 `worker_simple.js` 合并成静态配置，生成 `tvbox-pages/`。 |
| `tvbox-pages/_worker.js` | 部署到 Cloudflare Pages 的 Worker（运行时零外部请求，秒回）。 |
| `tvbox-pages/config.json` | 预构建好的完整配置（379 片源 + 13 直播 + 90 解析），TVBox 实际拉取的文件。 |

---

## 以后换源 / 改配置（不靠 WorkBuddy，3 步）
1. **改源**：编辑 `worker_simple.js`
   - 加片源：在 `BASE.sites` 里加一条；
   - 加直播：在 `BASE.lives` 里加一条（`url` 指向一个 m3u/txt 播放列表）；
   - 换上游仓库：改 `REPOS` 数组。
2. **重新构建**（需要本机装 Node.js）：
   ```bash
   node build_static.js
   ```
   它会更新 `tvbox-pages/config.json` 和 `tvbox-pages/_worker.js`。
3. **推送 → 自动部署**：
   ```bash
   git add -A
   git commit -m "更新源"
   git push
   ```
   Cloudflare Pages 监听到推送会**自动重新部署**，TVBox 重新拉取配置即可，无需令牌、无需 WorkBuddy。

> 懒得装 Node 也能改：直接改 `tvbox-pages/config.json` / `_worker.js` 里的内容，提交推送也一样生效（只是不会自动合并上游仓库的新源）。

---

## 首次把仓库接到 Cloudflare（一次性，5 分钟）
> 前置：你有一个 **GitHub** 账号（Cloudflare Pages 的 Git 自动部署只支持 GitHub / GitLab，不支持 Gitee）。

1. **建 GitHub 仓库**：登录 github.com → New repository → 起名（如 `tvbox-config`）→ 建空仓库。
2. **推代码**：把本仓库内容推到那个 GitHub 仓库（见上方 `git push`）。
3. **Cloudflare 连 Git**：
   - 登录 dash.cloudflare.com → 左侧 **Workers 和 Pages** → **创建** → 选 **连接到 Git** → 授权 GitHub → 选你的 `tvbox-config` 仓库。
   - 构建设置：**构建命令** 留空（无需构建，直接用 `tvbox-pages/`）；**输出目录** 填 `tvbox-pages`；**根目录** 留 `/`。
   - 点 **保存并部署**，几分钟后得到新地址 `https://xxx.pages.dev`。
4. **TVBox 填新地址**：`https://xxx.pages.dev/config.json`。

### ⚠️ 注意：连 Git 会生成「新」的 pages.dev 地址
- 直接上传（wrangler）建的旧项目 `tvbox-config-az6.pages.dev` 和 Git 新建的项目是**两个独立项目**，地址不同。
- 想保持原地址：给新项目**绑一个自定义域名**（Cloudflare 内免费），把 TVBox 改成自定义域名即可；或直接在 TVBox 里把配置地址更新成新链接。
- 旧项目可随时在 Cloudflare 控制台删掉。

---

## 验证部署成功
浏览器打开 `https://你的地址/status`，看到 `ok:true`、`sites` 是数字、`lives` 是数字即成功。
TVBox 填 `https://你的地址/config.json` → 设置 → 配置地址 → 保存重启。

---

## 关于"永久"的实话
本仓库解决的是「配置永远是你自己的、源更多、不依赖别人施舍」。但片源本质仍是第三方分享站，没有绝对永久——某个源挂了，改 `worker_simple.js` 换一个重推即可。内容合法性请在你当地法律允许范围内自行评估。
