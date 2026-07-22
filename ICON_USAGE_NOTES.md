# Icon Usage Notes

`assets/icons/` 来自 `nobuylab_icon.zip` 与 `nobuylab_icon_update`，当前已同步到 HTML 原型和微信小程序 MVP。Logo 系列来自 `不买研究所Logo.zip`，已单独放入 `assets/brand/` 与 `miniprogram/assets/brand/`。

## 已接入位置

- HTML 顶部品牌区、浏览器 favicon、启动引导页、首页品牌视觉、个人页品牌横幅。
- HTML 底部导航：简洁模式为今日、记录、广场；完整模式为今日、冷静车、暂停、记录、我的。
- HTML 搜索框、实验提醒、省钱广场头图、广场发动态按钮、个人页菜单。
- HTML 首页“今天差点买什么”选项。
- 小程序 MVP 今日暂停品牌视觉与选项。
- 小程序 MVP 省钱广场头图、动态封面和帖子详情封面。

## 品牌资产

- `assets/app-icon-1024.png`：浏览器 Apple Touch Icon、未来应用商店/小程序头像的高分辨率源。
- `assets/brand/logo-app.png`：HTML 顶部标识、启动页、首页视觉、头像和水印；小程序同步为 `/assets/brand/logo-app.png`。
- `assets/brand/logo-wordmark-black.png`：HTML 顶部文字 Logo，适合浅色背景。
- `assets/brand/logo-lockup-white.png`：个人页绿色品牌横幅，适合深色或品牌色背景。
- `assets/brand/logo-lockup-black.png` / `logo-wordmark-white.png` / `logo-presentation.png`：保留用于后续分享图、海报和深色模式。

## 当前映射

- `application.png`：HTML 底部导航「今日」、个人页「进入省钱广场」。
- `3d-paper-bag.png`：HTML 底部导航「冷静车」，以及「穿搭」消费类型。
- `hourglass.png`：HTML 完整模式底部导航「暂停」。
- `3d-alarm.png`：夜间冲动与提醒类广场封面，不再表示主操作。
- `3d-folder.png`：HTML 底部导航「记录」、清单类/自动续费类广场封面、数据导出入口。
- `assets/brand/logo-app.png`：HTML 完整模式底部导航「我的」，替代语义不准确的皇冠。
- `3d-bell.png`：HTML 顶部提醒按钮。
- `3d-speaker.png`：省钱广场入口与完整模式头图。
- `3d-photo.png`：HTML 发动态按钮、小程序本地动态默认封面。
- `3d-headphone.png`：数码冲动、耳机/新品类广场封面。
- `3d-favourite.png`：仅保留给收藏或喜欢语义，不再表示穿搭。
- `face-powder.png` / `eyeshadow.png`：护肤美妆冲动与护肤类广场封面。
- `house.png`：家居冲动。
- `3d-map.png`：旅行、地图路线、提问类广场封面。
- `3d-wallet.png`：隐私与数据入口。
- `fast-food.png`：HTML 与小程序“吃喝”快速选项，以及奶茶/日常吃喝封面。
- `french-fries.png`：仅在内容明确为薯条或零食时使用。
- `menu.png`：HTML 个人页体验模式切换入口。
- `search.png`：搜索框保留使用。

## 后续建议

- 正式微信小程序 tabBar 图标建议单独导出 81x81 PNG，并控制体积；当前 512x512 3D 图更适合内容区和功能卡片。
- 带空格或括号的文件名暂时不在代码中引用，后续可统一改为无空格命名。
- Logo 与 App Icon 建议单独确认一张主视觉，不建议直接从功能 icon 中随意替换。
