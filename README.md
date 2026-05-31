# 環球失禮手勢圖鑑 · Rude Gestures Field Guide

用復古博物誌（標本誌）的方式，收錄全世界最容易踩雷的不禮貌手勢。每個手勢都用**純 CSS 動畫**呈現，附由來考據、慘案現場與安全替代。出國前先翻一翻。

- 純前端 SPA/SSG，沿用 `Sides/VueProjects/ARCHITECTURE.md` 模板（Vue 3 + Vite 7 + vite-ssg + Tailwind 3）。
- 內容：6 個偽分類學「科」× 4 = 24 件手勢標本。
- 主題：文青復古 sepia 色系（做舊米紙 + 墨褐 + 褪色磚紅 + 芥末赭金 + 灰綠）。

## 開發

```bash
nvm use            # Node 22
npm install
npm run serve      # http://localhost:8083
npm run production  # vite-ssg 輸出到 public/
npm run lint
npm run images     # 改了 favicon.svg / og-image.svg 後跑，從 SVG 產各尺寸 PNG（用 sharp）
```

## 手勢動畫怎麼運作

`resources/js/components/common/GestureHand.vue` 是一個參數化 SVG 手：手掌 + 5 根可組態手指，
由 `pose` 決定手指伸/收與拇指型態，由 `anim` 掛上對應的 CSS `@keyframes`（戳、甩、推、彈、擺…）。
少數特殊手勢（OK 圈、無花果、義式併指、豎拇指、手肘禮）與顏面科（吐舌、拉眼皮、彈下巴、咬拇指）為客製分支。

新增手勢：在 `resources/js/data/gestures/<family>.js` 加一筆，指定既有的 `pose` / `anim` 即可。

## 圖示 / OG image

master SVG 放在 `resources/template/`（`favicon.svg`、`og-image.svg`），PNG 產物由 `npm run images`
從 SVG 渲染（favicon 各尺寸 + `og-image.png` 1200×630），改 SVG 後重跑一次並把 PNG commit 進 repo。
