# 高中數學公式總表

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
