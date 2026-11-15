// TVBox 单仓配置托管 Worker（精简可贴版）
// 作用: 内嵌你的 4k.json 作底(53源+直播, 永远有得播) + 运行时合并维护型仓库加源
// 使用: 影视仓/TVBox「设置 -> 配置地址」填  https://你的域名/config.json
// 维护: 想加仓库改 REPOS; 想换底配置把 BASE 里的 sites 替换即可

const BASE = {
  "sites": [
    {"key": "drpy_js_豆瓣", "name": "🔥聚玩盒子4K", "type": 3, "api": "https://jihulab.com/yydfys/yydf/-/raw/main/yydf/lib/drpy2.min.js", "ext": "https://jihulab.com/yydfys/yydf/-/raw/main/yydf/lib/douban.js"} ,
    {"key": "豆瓣", "name": "🔥公众号：聚玩盒", "type": 3, "api": "csp_DouDou", "searchable": 0, "quickSearch": 0, "filterable": 0} ,
    {"key": "小胡", "name": "🔥┃小胡┃4K", "type": 1, "playerType": 1, "api": "http://xh1.xn--yetu07f.icu/api.php/provide/vod/", "jar": "http://xiaohu.xzam.cn/jar/1.jar"} ,
    {"key": "csp_Mp4Mov", "name": "🧲┃Mp4┃4k", "type": 3, "api": "csp_Mp4Mov", "searchable": 1, "quickSearch": 1, "filterable": 1, "jar": "https://agit.ai/guot54/ygbh/raw/branch/master/JAR/83.jar"} ,
    {"key": "csp_SeedHub", "name": "🧲┃SeedHub┃4k", "type": 3, "api": "csp_SeedHub", "playerType": 1, "searchable": 1, "quickSearch": 1, "filterable": 1, "jar": "https://agit.ai/guot54/ygbh/raw/branch/master/JAR/83.jar"} ,
    {"key": "csp_SixV", "name": "💕┃磁力┃4K", "type": 3, "api": "csp_SixV", "searchable": 1, "ext": "https://www.6vdy.org/", "jar": "https://github.moeyy.xyz/raw.githubusercontent.com/CandyMuj/ResourceInterface/main/TVBox/candymuj.jar;md5;64690215b0987464819e01f94be0251c"} ,
    {"key": "七新", "name": "👼┃七新┃2K", "type": 3, "api": "csp_XBPQ", "searchable": 1, "quickSearch": 1, "filterable": 1, "ext": "http://rihou.vip:88/hccx/七新影视.json", "jar": "http://rihou.vip:88/hccx/HeChengChaXiu.jar"} ,
    {"key": "一起看 ", "name": "❤┃一起┃2K", "type": 3, "api": "csp_YQKan", "searchable": 1, "quickSearch": 1, "changeable": 1} ,
    {"key": " 在线┃直播1", "name": "📺┃竞技┃直播", "type": 3, "api": "csp_Yj1211", "searchable": 1, "quickSearch": 1, "filterable": 1} ,
    {"key": " 在线┃直播2", "name": "📺┃网红┃直播", "type": 3, "api": "http://alist.xn--z7x900a.live/ddrpy2.m.js", "ext": "http://alist.xn--z7x900a.live/JustLive.js", "gridview": "0-0-H", "style": {"type": "rect", "ratio": 1.68}} ,
    {"key": "cctv", "name": "📺┃央视┃大全", "type": 3, "api": "csp_CCTV", "searchable": 0, "filterable": 0, "ext": "http://rihou.vip:88/hccx/央视大全.json", "jar": "http://rihou.vip:88/hccx/HeChengChaXiu.jar"} ,
    {"key": "py_cctv_少儿", "name": "📺┃央视┃少儿", "type": 3, "api": "py_cctv_full", "searchable": 0, "quickSearch": 0, "filterable": 1, "ext": "http://rihou.vip:88/hccx/py_央视少儿.py", "jar": "http://rihou.vip:88/hccx/HeChengChaXiu.jar"} ,
    {"key": "央视经典", "name": "📺┃央视┃经典", "type": 3, "api": "csp_Bili", "searchable": 0, "quickSearch": 1, "filterable": 1, "ext": "http://rihou.vip:88/hccx/哔哩经典.json", "jar": "http://rihou.vip:88/hccx/HeChengChaXiu.jar"} ,
    {"key": "drpy_js_360影视", "name": "🧡┃360┃官源", "type": 3, "api": "https://jihulab.com/yw88075/tvbox/-/raw/main/dr/lib/drpy2.min.js", "ext": "https://jihulab.com/yw88075/tvbox/-/raw/main/dr/js/360%E5%BD%B1%E8%A7%86.js"} ,
    {"key": "初恋资源", "name": "🧡┃初恋┃官源", "type": 1, "api": "https://video.adminqt.cn/api.php/provide/vod/", "searchable": 1, "quickSearch": 1} ,
    {"key": "小柚", "name": "🍊┃小柚┃App", "type": 3, "api": "csp_AppSK", "searchable": 1, "quickSearch": 1, "changeable": 1, "ext": "FbjPcVZY48PN/RIZ5QqOrsp7JoZYCZdLEy9R9ri6ykNdUNSIsT3IgxCP9qyzByO7ZG6Z030vgWoyXGNlCJx9KFpYXtyZ3B/cLTtO0SAclaw3AOm0fS9oLx2taGF6hg=="} ,
    {"key": "南坊", "name": "🎃┃南坊┃App", "type": 3, "api": "csp_AppMao", "searchable": 1, "quickSearch": 1, "changeable": 1, "ext": "FbjDcUxPqpfNr0QF4QvE6sExbd4UXJxJXzdL462ywU1XScGa5G6Hj0/c+Ou1GW6rdX6N2XIhnD46QzIsRoZ8bk4fG4OYi0iCaWwRj2ddkaI+FqHtLjQhalHqIy0+kpiTv2eOfJYxTshgoxEZvRX9BA0UIrOurFxHa4dPZw=="} ,
    {"key": "fok", "name": "🌙┃夸克┃影视", "type": 3, "api": "csp_XBPQ", "jar": "https://jihulab.com/xiaohutx/meisha/-/raw/main/1.jar;md5;bb155c3f0133bbce4756ad52003f5968", "ext": {"分类url": "https://www.freeok.vip/vod-show/{cateId}-{area}-------{catePg}---{year}.html", "分类": "FREE电影&FREE剧集&FREE动漫&FREE综艺&FREE短剧&FREE少儿", "分类值": "1&2&3&4&12&5", "播放请求头": "User-Agent$Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36", "副标题": "<div class=\"module-item-note\">&&</div>", "嗅探词": "m3u8#.m3u8#.mp4#freeok.mp4#/obj/", "线路数组": "data-dropdown-value=&&</div>[不包含:夸克]", "线路标题": "<span>&&</small>", "导演": "导演：&&</div>", "主演": "主演：&&</div>", "简介": "<p>&&</p>"}} ,
    {"key": "耐看", "name": "🕶┃耐看┃影视", "type": 3, "api": "csp_XBPQ", "jar": "https://jihulab.com/xiaohutx/meisha/-/raw/main/1.jar", "ext": "http://xiaohu.xzam.cn/XBPQ/nk.json"} ,
    {"key": "南瓜", "name": "🎃┃南瓜┃App", "type": 3, "api": "csp_NanGua", "playerType": 2, "searchable": 1, "quickSearch": 1, "changeable": 1} ,
    {"key": "萌米", "name": "👀┃萌米┃App", "type": 3, "api": "csp_AppMao", "searchable": 1, "quickSearch": 1, "changeable": 1, "ext": "FbjKZ1gO+9u81wMIxzHg+7x1Oep4CIFuZAlCy8a4qCgjGLacnxDo6wiBr66jP3X8J2mRx31u1XgkTTVrENVjfhQKUN2Yi12XNWQSlmVZxLtiSaSiZG0xf1Hw"} ,
    {"key": "繁星", "name": "💥┃繁星┃App", "type": 3, "api": "csp_AppMao", "playerType": 2, "searchable": 1, "quickSearch": 1, "changeable": 1, "ext": "FbjDcUxPqpfNr0QF4QvE6sExbd4UXJxJXzdL462ywU1XScGa5G6Hj0/c+Ou1GW6rdX6N2XIhnD46QzIsRoZ8bk4fG4OYi0iCaWwRj2ddkacwFqHtLjQhalHqIy0+kpiTv2eOfJYxTshgrxcJ+g3lEHx7ZLC9kB1TCfZUSHwqHB3tt6V/1OhRENIOZNRFfXVBEFd7jQg+J06kjCAF7z1Bt8hRvMjC2VcbQXsEz8MCZDgu06C9/wirWcTa/wWJsfT+Z7fXaDs+dIWMYiwf6td5CWTx6LfL6eTuiMhs2KU5Byw9F+4Y/AHBg4r+LEe+Hm4EM2d8X3ca5zHSj+kjmpXOiGDo4TalFqgTq67eggmthCbV2d131SKc03V+5gruudQQk/Tb9e4lg6SQhA9/5kWOOM/LRmkqIxSt6d0wpu7yKKh65enwKbgasc93/HnGr6W4LuZjf6eYnS2GgRzWRE0fT5lYNmxnWeRnYuLhoZbDqslAfJzg"} ,
    {"key": "csp_Nmys", "name": "🌾┃农民┃直连", "type": 3, "api": "csp_Nmys", "searchable": 1, "quickSearch": 1, "changeable": 1, "ext": "https://agit.ai/fantaiying/fty/raw/branch/master/ext/nmys.json"} ,
    {"key": "荐片", "name": "🧲┃荐片┃磁力", "type": 3, "api": "http://rihou.vip:55/lib/drpy2.min.js", "ext": "http://rihou.vip:55/lib/jianpian.js"} ,
    {"key": "77", "name": "👒┃七七┃App", "type": 3, "api": "csp_Kunyu77", "searchable": 1, "quickSearch": 1, "changeable": 1} ,
    {"key": "奈飞中文", "name": "🎗┃奈飞┃秒播", "type": 3, "api": "csp_XYQHiker", "searchable": 1, "quickSearch": 1, "filterable": 1, "ext": "http://qrh.yimkj.cn/ym/lib/nfzw.json", "jar": "http://qrh.yimkj.cn/ym/lib/ttkx.jar;md5;c253e1930a210fa5141e5418f1f90949"} ,
    {"key": "九六", "name": "🎀┃九六┃直连", "type": 3, "api": "csp_Cs1369", "playerType": 2, "searchable": 1, "quickSearch": 1, "changeable": 1} ,
    {"key": "熊掌", "name": "🐻┃熊掌┃高清", "type": 1, "api": "https://xzcjz.com/api.php/provide/vod", "jar": "https://tvbox.cainisi.cf/jar/fty0101.jar;md5;fd784008ab71d81a178564841059756d"} ,
    {"key": "ikunzy", "name": "🐓┃爱坤┃资源", "type": 1, "api": "https://ikunzyapi.com/api.php/provide/vod ", "searchable": 1, "filterable": 0, "categories": ["欧美剧", "韩剧", "日剧", "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "剧情片", "战争片"]} ,
    {"key": "天天", "name": "💡┃天天┃影视", "type": 3, "api": "csp_TTian", "playerType": 1, "ext": "http://op.ysdqjs.cn", "jar": "http://tv.nxog.top/m/jar.php?id=ou;md5;59a98ed1869e26027a3ff8d6070003f8"} ,
    {"key": "Bili", "name": "🅱┃哔哔┃合集", "type": 3, "api": "csp_Bili", "searchable": 0, "quickSearch": 0, "ext": "http://www.lyyytv.cn/yt/bili/bili.json"} ,
    {"key": "赛文", "name": "🍩┃赛文┃资源", "type": 3, "api": "csp_AppYsV2", "ext": "http://xiutan.shiyifacai.com/zuoan/api.php/app/", "jar": "http://xiaohu.xzam.cn/jar/1.jar;md5;6120d08f4eb1edce507bfcd1b339c482"} ,
    {"key": "豪华资源", "name": "🎥┃豪华┃资源", "type": 1, "api": "https://hhzyapi.com/api.php/provide/vod/?ac=list", "searchable": 1, "quickSearch": 1, "categories": ["内地剧", "香港剧", "欧美剧", "韩剧", "日剧", "马泰剧", "台湾剧", "动画片", "中国动漫", "日本动漫", "欧美动漫", "剧情片", "战争片", "动作片", "科幻片", "记录片", "爱情片", "喜剧片", "灾难片", "悬疑片", "犯罪片", "大陆综艺", "日韩综艺", "港台综艺", "欧美综艺"]} ,
    {"key": "hnzy", "name": "🎥┃红牛┃资源", "type": 1, "api": "https://www.hongniuzy2.com/api.php/provide/vod/", "searchable": 1, "filterable": 0, "categories": ["欧美剧", "韩剧", "日剧", "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "剧情片", "战争片"]} ,
    {"key": "gszy", "name": "🎥┃光速┃资源", "type": 1, "api": "https://api.guangsuapi.com/api.php/provide/vod/", "searchable": 1, "filterable": 0, "categories": ["欧美剧", "韩剧", "日剧", "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "剧情片", "战争片"]} ,
    {"key": "lzzy", "name": "🎥┃量子┃资源", "type": 1, "api": "https://cj.lziapi.com/api.php/provide/vod/", "searchable": 1, "filterable": 0, "categories": ["国产动漫", "日韩动漫", "大陆剧", "欧美剧", "韩剧", "日剧", "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "剧情片", "战争片"]} ,
    {"key": "snzy", "name": "🎥┃索尼┃资源", "type": 1, "api": "https://suoniapi.com/api.php/provide/vod/", "searchable": 1, "filterable": 0, "categories": ["欧美剧", "韩剧", "日剧", "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "剧情片", "战争片"]} ,
    {"key": "drpy_js_310直播", "name": "⚽310直播", "type": 3, "api": "https://github.moeyy.xyz/raw.githubusercontent.com/gaotianliuyun/gao/master/lib/drpy2.min.js", "changeable": 0, "style": {"type": "rect", "ratio": 1}, "ext": "https://github.moeyy.xyz/raw.githubusercontent.com/gaotianliuyun/gao/master/js/310直播.js"} ,
    {"key": "MV_vod", "name": "⚡┃明星┃MV", "type": 3, "api": "csp_Bili", "style": {"type": "rect", "ratio": 1.597}, "searchable": 0, "quickSearch": 0, "changeable": 0, "ext": "https://agit.ai/fantaiying/fty/raw/branch/master/ext/MTV.json"} ,
    {"key": "相声小品", "name": "😍┃相声┃小品", "type": 3, "api": "csp_Bili", "searchable": 0, "quickSearch": 0, "ext": "http://tt.iitvba.com/js/相声小品.json"} ,
    {"key": "戏 曲", "name": "👵┃老年┃戏曲", "type": 3, "api": "csp_Bili", "searchable": 0, "quickSearch": 0, "ext": "http://tt.iitvba.com/js/戏曲.json"} ,
    {"key": "短剧one", "name": "🥰┃短剧┃视频", "type": 3, "api": "csp_Panda", "ext": "https://d.kstore.space/download/6296/json/短剧.json", "jar": "http://like.xn--z7x900a.live:66/jar/PandaQ231205.jar;md5;9cc29f6286b2fe7910628852929c4bdb"} ,
    {"key": "种子短剧", "name": "💮┃短剧┃视频", "type": 3, "api": "csp_Panda", "ext": "分类url:http://web.zzdj.cc/index.php/vod/show/by/{by}/id/{cateId}/page/{catePg}.html,分类:快手$2#抖音$3#都市$4#古装$5#重生$6#逆袭$7#虐恋$8#萌宝$9#言情$10#穿越$11#战神$12#神医$13#赘婿$14#甜宠$15#其它$16#短剧$1", "jar": "http://like.xn--z7x900a.live:66/jar/PandaQ231205.jar;md5;9cc29f6286b2fe7910628852929c4bdb"} ,
    {"key": "csp_WoGG", "name": "👽┃玩偶┃4K①", "type": 3, "api": "csp_WoGG", "searchable": 1, "quickSearch": 1, "changeable": 0, "ext": "http://127.0.0.1:9978/file/tvfan/token.txt+4k|auto|fhd$$$https://api.wogg.xyz/$$$弹"} ,
    {"key": "玩我哥哥", "name": "测┃玩我┃哥哥", "type": 3, "api": "csp_XYQHikerAL", "searchable": 1, "quickSearch": 1, "filterable": 1, "ext": "http://rihou.vip:55/lib/玩我哥哥.json", "jar": "http://rihou.vip:55/lib/ttkx.jar;md5;c253e1930a210fa5141e5418f1f90949"} ,
    {"key": "玩偶哥哥", "name": "测┃玩偶┃哥哥", "type": 3, "api": "csp_XYQHikerAL", "searchable": 1, "quickSearch": 1, "filterable": 1, "ext": "http://rihou.vip:55/lib/玩偶哥哥.json", "jar": "http://rihou.vip:55/lib/ttkx.jar;md5;c253e1930a210fa5141e5418f1f90949"} ,
    {"key": "玩偶运输车", "name": "测┃玩偶┃运输", "type": 3, "api": "csp_XYQHikerAL", "searchable": 1, "quickSearch": 1, "filterable": 1, "ext": "http://rihou.vip:55/lib/玩偶运输车.json", "jar": "http://rihou.vip:55/lib/ttkx.jar;md5;c253e1930a210fa5141e5418f1f90949"} ,
    {"key": "PanSou", "name": "🦊┃盘搜┃搜索", "type": 3, "api": "csp_PanSou", "searchable": 1, "quickSearch": 1, "changeable": 0, "ext": "http://127.0.0.1:9978/file/tvfan/token.txt+4k|auto|fhd"} ,
    {"key": "UpYun", "name": "😻┃Up搜┃搜索", "type": 3, "api": "csp_UpYun", "searchable": 1, "quickSearch": 1, "changeable": 0, "ext": "http://127.0.0.1:9978/file/tvfan/token.txt+4k|auto|fhd"} ,
    {"key": "PanSearch", "name": "🙀┃盘Se┃搜索", "type": 3, "api": "csp_PanSearch", "searchable": 1, "quickSearch": 1, "changeable": 0, "ext": "http://127.0.0.1:9978/file/tvfan/token.txt+4k|auto|fhd"} ,
    {"key": "七夜", "name": "😾┃七夜┃搜索", "type": 3, "api": "csp_Dovx", "searchable": 1, "quickSearch": 1, "changeable": 0, "ext": "http://127.0.0.1:9978/file/tvfan/token.txt+4k|auto|fhd"} ,
    {"key": "阿里云盘登录", "name": "🐲阿里┃云盘登录", "type": 3, "api": "csp_AliYunPan", "searchable": 0, "quickSearch": 0, "filterable": 0, "ext": "http://127.0.0.1:9978/file/TVBox/tok.txt", "jar": "http://tv.nxog.top/m/jar.php?id=ou;md5;34c50af4380beab4dbfeae6c9b41939b"} ,
    {"key": "push_agent", "name": "📽推送", "type": 3, "api": "csp_PushAgent", "playerType": 1, "searchable": 1, "quickSearch": 1, "filterable": 0, "jar": "http://tv.nxog.top/m/jar.php?id=ou;md5;d437c6e042174f181efd9649a1a33f48", "ext": "http://127.0.0.1:9978/file/tvbox/tok.txt"}
  ],
  "lives": [
    {"name":"📺┃央视┃内置直连(CCTV1-15)","type":0,"playerType":1,"channels":[{"name":"CCTV1","urls":["http://101.35.240.114:88/live.php?id=CCTV1"]},{"name":"CCTV2","urls":["http://148.135.93.213/live.php?id=CCTV2"]},{"name":"CCTV3","urls":["http://101.35.240.114:88/live.php?id=CCTV3"]},{"name":"CCTV4","urls":["http://148.135.93.213/live.php?id=CCTV4"]},{"name":"CCTV5","urls":["http://101.35.240.114:88/live.php?id=CCTV5"]},{"name":"CCTV6","urls":["http://101.35.240.114:88/live.php?id=CCTV6"]},{"name":"CCTV7","urls":["http://148.135.93.213/live.php?id=CCTV7"]},{"name":"CCTV8","urls":["http://101.35.240.114:88/live.php?id=CCTV8"]},{"name":"CCTV9","urls":["http://148.135.93.213/live.php?id=CCTV9"]},{"name":"CCTV10","urls":["http://101.35.240.114:88/live.php?id=CCTV10"]},{"name":"CCTV11","urls":["http://148.135.93.213/live.php?id=CCTV11"]},{"name":"CCTV12","urls":["http://101.35.240.114:88/live.php?id=CCTV12"]},{"name":"CCTV13","urls":["http://148.135.93.213/live.php?id=CCTV13"]},{"name":"CCTV14","urls":["http://101.35.240.114:88/live.php?id=CCTV14"]},{"name":"CCTV15","urls":["http://148.135.93.213/live.php?id=CCTV15"]}]} , {"name":"📺┃咪咕┃视频(移动)","type":0,"playerType":1,"channels":[{"name":"咪咕体育","urls":["https://raw.githubusercontent.com/YanG-1989/m3u/refs/heads/main/hosts.txt"]},{"name":"睛彩广场舞","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011523&livemode=1&stbId=YanG-1989"]},{"name":"睛彩青少","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011525&livemode=1&stbId=YanG-1989"]},{"name":"睛彩竞技","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011528&livemode=1&stbId=YanG-1989"]},{"name":"睛彩篮球","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011529&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000005180&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000015686&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000005308&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000005969&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000007218&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn//index.m3u8?channel-id=FifastbLive&Contentid=3000000001000008001&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000008176&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000008379&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000010129&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000010948&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000028638&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000001000031494&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000000097&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000002019&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000002809&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000003915&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000004193&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000005837&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000006077&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000006658&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000009788&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000010833&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000011297&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000011518&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000012558&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000012616&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000015470&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000015560&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000019839&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000021904&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000023434&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000025380&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000010000027691&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011518&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011519&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011520&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011521&livemode=1&stbId=YanG-1989"]},{"name":"咪咕体育","urls":["http://gslbserv.itv.cmvideo.cn/index.m3u8?channel-id=FifastbLive&Contentid=3000000020000011522&livemode=1&stbId=YanG-1989"]}]} , 
    {"name": "📺┃zbds┃直播", "type": 0, "playerType": 1, "url": "https://live.zbds.top/tv/iptv4.txt", "epg": "https://epg.112114.xyz/?ch={name}&date={date}", "logo": "https://epg.112114.xyz/logo/{name}.png"} ,
    {"name": "📺┃有魂┃直播", "type": 0, "playerType": 1, "url": "https://www.iyouhun.com/tv/zb", "epg": "https://epg.112114.xyz/?ch={name}&date={date}", "logo": "https://epg.112114.xyz/logo/{name}.png"} ,
    {"name": "📺┃高清4K精选┃内置", "type": 0, "playerType": 1, "channels": [{"name":"东方卫视4K","urls":["https://bp-resource-dfl.bestv.cn/148/3/video.m3u8"]},{"name":"苏州4K","urls":["https://tylive.kan0512.com/norecord/csztv4k_4k.m3u8"]},{"name":"CCTV5","urls":["http://gmxw.7766.org:808/hls/93/index.m3u8"]},{"name":"CCTV8","urls":["http://gmxw.7766.org:808/hls/96/index.m3u8"]},{"name":"CCTV13","urls":["http://ali-m-l.cztv.com/channels/lantian/channel21/1080p.m3u8"]},{"name":"CCTV15","urls":["http://gmxw.7766.org:808/hls/102/index.m3u8"]},{"name":"CCTV16","urls":["http://gmxw.7766.org:808/hls/169/index.m3u8"]},{"name":"CGTN","urls":["http://english-livetx.cgtv.com/hls/yypdyyctzb_hd.m3u8"]},{"name":"浙江卫视","urls":["http://ali-m-l.cztv.com/channels/lantian/channel001/1080p.m3u8"]},{"name":"湖南卫视","urls":["http://hlsal-ldvt.qing.mgtv.com/nn_live/nn_x64/Y2RuZXhfaWQ9YWxfaGxzX2xkdnQmZT02OTE0NjA0JnY9MSZpZD1ITldTWkdTVCZzPTcwN2RiYTc2YzJjNmJmMTQ4MmUyZGYzOWU2NWM3YWFi/HNWSZGST.m3u8"]},{"name":"东方卫视","urls":["http://bp-resource-dfl.bestv.cn/155/3/video.m3u8"]},{"name":"江苏卫视","urls":["http://125.43.249.76:9901/tsfile/live/1030_1.m3u8?key=txiptv&playlive=1&authid=0"]},{"name":"山东卫视","urls":["http://125.43.249.76:9901/tsfile/live/1023_1.m3u8?key=txiptv&playlive=1&authid=0"]}]} ,
    {"name": "📺┃广西移动4K┃gitee", "type": 0, "playerType": 1, "url": "https://gitee.com/lee9108/tv/raw/master/gx.m3u", "epg": "https://epg.112114.xyz/?ch={name}&date={date}", "logo": "https://epg.112114.xyz/logo/{name}.png"} ,
    {"name": "📺┃niubihu高清┃2000+", "type": 0, "playerType": 1, "url": "https://gh-proxy.com/https://raw.githubusercontent.com/niubihu1/tvbox/main/live.txt", "epg": "https://epg.112114.xyz/?ch={name}&date={date}", "logo": "https://epg.112114.xyz/logo/{name}.png"} ,
    {"name": "📺┃直播┃全网(精简)", "type": 0, "playerType": 1, "url": "https://gh-proxy.com/https://raw.githubusercontent.com/BurningC4/Chinese-IPTV/master/TV-IPV4.m3u", "epg": "https://epg.112114.xyz/?ch={name}&date={date}", "logo": "https://epg.112114.xyz/logo/{name}.png"} ,
    {"name": "📺┃直播┃全网(全量)", "type": 0, "playerType": 1, "url": "https://gh-proxy.com/https://raw.githubusercontent.com/suxuang/myIPTV/main/ipv4.m3u", "epg": "https://epg.112114.xyz/?ch={name}&date={date}", "logo": "https://epg.112114.xyz/logo/{name}.png"}
  ],
  "parses": [
    {"name": "Json聚合", "type": 3, "url": "Demo"} ,
    {"name": "Web聚合", "type": 3, "url": "Web"} ,
    {"name": "json一", "type": 1, "url": "http://119.91.123.253:2345/Api/yun.php?url=", "ext": {"flag": ["YuMi", "FYNB", "qq", "腾讯", "qiyi", "爱奇艺", "奇艺", "youku", "优酷", "mgtv", "芒果", "letv", "乐视", "pptv", "PPTV", "sohu", "bilibili", "哔哩哔哩", "哔哩"], "header": {"User-Agent": "okhttp/3.12.11"}}} ,
    {"name": "赛文", "type": 1, "url": "http://xiutan.shiyifacai.com/json/qingfeng.php?url=", "ext": {"flag": ["seven"], "header": {"User-Agent": "Lavf/58.12.100"}}} ,
    {"name": "json三", "type": 1, "url": "http://xiutan.shiyifacai.com/json/qingfeng.php?url=", "ext": {"flag": ["YuMi", "SMD", "FYNB", "qq", "腾讯", "qiyi", "爱奇艺", "奇艺", "youku", "优酷", "mgtv", "芒果", "letv", "乐视", "pptv", "PPTV", "sohu", "bilibili", "哔哩哔哩", "哔哩"], "header": {"User-Agent": "okhttp/3.12.11"}}} ,
    {"name": "json四", "type": 1, "url": "https://vip.mosangkeji.com:443/api/?key=q7mSY5L8ssbm1J3Eai&url=", "ext": {"flag": ["YuMi", "SMD", "FYNB", "qq", "腾讯", "qiyi", "爱奇艺", "奇艺", "youku", "优酷", "mgtv", "芒果", "letv", "乐视", "pptv", "PPTV", "sohu", "bilibili", "哔哩哔哩", "哔哩"], "header": {"User-Agent": "okhttp/3.12.11"}}} ,
    {"name": "json五", "type": 1, "url": "http://110.42.2.247:880/analysis/json/?uid=2148&my=ehmqrtuCEJNQTVX047&format=json&url=", "ext": {"flag": ["YuMi", "SMD", "FYNB", "qq", "腾讯", "qiyi", "爱奇艺", "奇艺", "youku", "优酷", "mgtv", "芒果", "letv", "乐视", "pptv", "PPTV", "sohu", "bilibili", "哔哩哔哩", "哔哩"], "header": {"User-Agent": "okhttp/3.12.11"}}} ,
    {"name": "解析一", "type": 1, "url": "http://119.91.123.253:2345/Api/yun.php?url=", "ext": {"flag": ["qq", "腾讯", "企鹅", "IQiYi", "qiyi", "爱奇艺", "奇艺", "youku", "YouKu", "优酷", "sohu", "SoHu", "搜狐", "letv", "LeShi", "乐视", "imgo", "mgtv", "MangGuo", "芒果", "SLYS4k", "BYGA", "luanzi", "AliS", "dxzy", "bilibili", "QEYSS", "xigua", "西瓜视频", "腾讯视频", "奇艺视频", "优酷视频", "芒果视频", "乐视视频"], "header": {"User-Agent": "Dart/2.18 (dart:io)"}}} ,
    {"name": "绣探", "type": 0, "url": "https://www.pangujiexi.com/pangu/?url="} ,
    {"name": "虾米", "type": 0, "url": "https://jx.xmflv.com/?url=", "ext": {"flag": ["qq", "腾讯", "qiyi", "爱奇艺", "奇艺", "youku", "优酷", "sohu", "搜狐", "letv", "乐视", "mgtv", "芒果", "imgo", "rx", "ltnb", "bilibili", "1905", "xigua"]}} ,
    {"name": "天下嗅探", "type": 0, "url": "https://jx.jsonplayer.com/player/?=&url=", "ext": {"flag": ["qq", "腾讯", "qiyi", "iqiyi", "爱奇艺", "奇艺", "youku", "yk", "优\n酷", "mgtv", "imgo", "芒果"]}} ,
    {"name": "7777嗅探", "type": 0, "url": "https://jx.777jiexi.com/player/?url="} ,
    {"name": "杰森嗅探", "type": 0, "url": "https://jx.jsonplayer.com/player/?url="} ,
    {"name": "vip嗅探", "type": 0, "url": "https://vip.lianfaka.com/vip/?url=", "ext": {"flag": ["qq", "腾讯", "qiyi", "爱奇艺", "奇艺", "youku", "优酷", "mgtv", "芒\n果", "imgo", "letv", "乐视", "pptv", "PPTV", "sohu", "bilibili", "哔哩哔哩", "哔哩"], "header": {"User-Agent": "okhttp/4.1.0"}}} ,
    {"name": "8090嗅探", "type": 0, "url": "https://www.8090g.cn/jiexi/?url="} ,
    {"name": "m3u8嗅探", "type": 0, "url": "https://jx.m3u8.tv/jiexi/?url=", "ext": {"flag": ["qq", "腾讯", "qiyi", "iqiyi", "爱奇艺", "奇艺", "youku", "yk", "优\n酷", "mgtv", "imgo", "芒果"]}} ,
    {"name": "夜幕嗅探", "type": 0, "url": "https://www.yemu.xyz/?url="}
  ]
};

const REPOS = [
  {
    "name": "老刘备(每日维护)",
    "url": "https://raw.liucn.cc/box/m.json"
  },
  {
    "name": "小马",
    "url": "https://szyyds.cn/tv/x.json"
  },
  {
    "name": "小盒子单仓",
    "url": "http://xhztv.top/xhz"
  },
  {
    "name": "挺好分享多仓",
    "url": "http://ztha.top/TVBox/GYCK.json"
  },
  {
    "name": "自动更新多仓(Lightconer)",
    "url": "https://raw.githubusercontent.com/Lightconer/tvbox-ysc-config/main/output/%E5%A4%9A%E4%BB%93%E8%AE%A2%E9%98%85.json"
  },
  {
    "name": "肥猫(备用)",
    "url": "http://xn--g2s1c.com"
  },
  {
    "name": "真心(FongMi)(备用)",
    "url": "https://tvbox.catvod.com/FongMi.json"
  }
];

const TIMEOUT = 8000;

function cleanText(t){
  t = t.replace(/\/\*[\s\S]*?\*\//g, '');
  t = t.replace(/(?<!:)(\/\/)[^\n\r]*/g, '');
  t = t.replace(/[\x00-\x09\x0b\x0c\x0e-\x1f]/g, '');
  return t;
}
function enc(u){
  try{
    const p = new URL(u);
    p.pathname = p.pathname.split('/').map(s => encodeURIComponent(s)).join('/');
    return p.toString();
  }catch(e){ return u; }
}
async function fetchRepo(url, seen, depth){
  if(!url || seen.has(url) || depth > 4) return null;
  seen.add(url);
  try{
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
    const r = await fetch(enc(url), { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': url }, signal: ctrl.signal });
    clearTimeout(timer);
    if(!r.ok) return null;
    const txt = await r.text();
    try { return JSON.parse(cleanText(txt)); }
    catch(e){ return null; }
  }catch(e){ return null; }
}
function addSites(map, arr){
  if(!Array.isArray(arr)) return;
  for(const s of arr){
    const k = s && (s.key || s.name);
    if(k && !map.has(k)) map.set(k, s);
  }
}
function addArr(base, arr){
  if(!Array.isArray(arr)) return base;
  for(const x of arr){
    if(!base.find(y => (y.name===x.name) && (('url'in x)?(y.url===x.url):true))) base.push(x);
  }
  return base;
}
async function build(){
  const seen = new Set();
  const sites = new Map();
  addSites(sites, BASE.sites);
  let lives = Array.isArray(BASE.lives) ? BASE.lives.slice() : [];
  let parses = Array.isArray(BASE.parses) ? BASE.parses.slice() : [];
  let merged = 0;
  for(const rp of REPOS){
    const d = await fetchRepo(rp.url, seen, 0);
    if(!d) continue;
    merged++;
    addSites(sites, d.sites);
    lives = addArr(lives, d.lives);
    parses = addArr(parses, d.parses);
    if(Array.isArray(d.urls)){
      for(const u of d.urls){
        const dd = await fetchRepo(u.url, seen, 1);
        if(!dd) continue;
        addSites(sites, dd.sites);
        lives = addArr(lives, dd.lives);
        parses = addArr(parses, dd.parses);
      }
    }
  }
  const out = Object.assign({}, BASE);
  out.sites = Array.from(sites.values());
  if(lives.length) out.lives = lives;
  if(parses.length) out.parses = parses;
  return { out, merged, total: REPOS.length };
}
export default {
  async fetch(request){
    const url = new URL(request.url);
    const p = url.pathname;
    if(p === '/' || p === '/config.json' || p === '/tvbox.json'){
      try{
        const { out } = await build();
        return new Response(JSON.stringify(out), {
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' }
        });
      }catch(e){
        return new Response(JSON.stringify(BASE), {
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' }
        });
      }
    }
    if(p === '/status'){
      try{
        const { out, merged, total } = await build();
        return new Response(JSON.stringify({ ok: true, reposTotal: total, reposMerged: merged, sites: out.sites.length, lives: (out.lives||[]).length }, null, 2), {
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
        });
      }catch(e){
        return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }
    return new Response('TVBox 单仓托管。请用 /config.json 作为配置地址。', { status: 200 });
  }
};
