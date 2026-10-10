# 高中數學公式總表

有兩種版本：

- **講義版（`build-hs.js`，主要用這個）**：照自編講義網站 [hs-math](https://hs-math.vercel.app) 的 17 章架構與「公式速查」的 367 條公式產生，數學式用網站自己的 `mathlite.js` 排版，長相和網站一致。講義內容不放在這個 repo，產生時從 hs-math 的資料夾讀。
- **108 課綱通用版（`build.js` + `data.js`）**：不依任何講義，照課綱整理的 215 條公式。

兩種版本都會輸出師用版和學生默寫版，最後都附常見數值（√1～√10、log 1～log 10、特殊角三角函數值、π、e）。

## 講義版

```bash
npm install                                   # KaTeX、STIX Two Math 字型
mkdir -p fonts && curl -L -o fonts/NotoSansTC.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf"
node build-hs.js ../hs-math out                # hs-math 資料夾 → out/高中數學公式總表（講義版）-師用版.pdf、-學生默寫版.pdf
```

第三個參數可以給一份公式 JSON（`{ "ch01": [...], ... }`），用來改用線上版的資料。少數備註把數學式寫在 `$…$` 外面（例如 `x_0 pm r`、`sqrt(2)`），列印時會自動整理成 x₀ ± r、√2，網站本身不受影響。

---

以下是 108 課綱通用版的說明。

一份資料（`data.js`）產生兩個 PDF：

- **師用版**：每個名稱對應一個標準公式。
- **學生默寫版**：同一份版面，右邊公式欄留白給學生寫。兩份的行高和分頁完全一樣，對答案時可以一頁一頁對照。

範圍是 108 課綱高一到高三：第一～四冊（標 `數A`、`數B` 的只有那一科學），加上高三選修（數甲／數乙，分科測驗範圍）。最後附常見數值：√1～√10、log 1～log 10、特殊角三角函數值、π 和 e。

## 產生 PDF

```bash
npm install                                   # KaTeX
mkdir -p fonts && curl -L -o fonts/NotoSansTC.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf"
node build.js out                             # 輸出 out/高中數學公式總表-師用版.pdf、-學生默寫版.pdf
```

需要 Node 與 Playwright（Chromium）。頁尾的中文用系統字型，所以也要把 `fonts/NotoSansTC.ttf` 裝到系統字型（例如 `~/.local/share/fonts` 再 `fc-cache -f`）。

## 修改內容

在 `data.js` 加減項目即可，編號會自動重排。每一項：

```js
{ n: '名稱', h: '名稱下的提示（可省略）', f: '公式（或多行陣列）', c: '條件（可省略）', t: 'A' | 'B' }
```

字串裡 `$...$` 是數學式（KaTeX 語法），其他是一般文字。
