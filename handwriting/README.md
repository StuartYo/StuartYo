# 手寫詳解產生器

把詳解用「模仿手寫」的方式直接寫在題本的空白處：原本的掃描頁不動，手寫層以向量疊在上面，輸出一份 PDF。

## 字跡風格設定（依 3 份手寫筆記整理）

| 項目 | 觀察到的寫法 | 引擎裡的對應設定 |
| :-- | :-- | :-- |
| 筆色 | iPad 藍筆，取樣約 `#007AFF` | `--blue`，用於主要算式 |
| 筆畫 | 單線、粗細均勻、圓頭 | 字型描邊 0.32px，線條 round cap |
| 數字 / 英文 | 窄、直立、偏圓（`a` 單層） | 清松手寫體1（`JasonHandwriting1`） |
| 中文 | 寫得快、筆畫簡化 | 悠哉字體（`Yozai`），數學符號也齊全 |
| 不規則感 | 字的大小、傾斜、基線都會晃 | 每個字隨機旋轉 ±3°、上下 ±0.05em、縮放 ±5%，每行微傾斜 |
| 答案位置 | 寫在題號左邊的空白；複選題直排 `1 3 4 5` | `ANS()` / `MANS()`，改用紅筆 |
| 解題習慣 | `⇒` 一路推、「故」、「代入」、「不合」，分數直式、根號拉長蓋線 | `\frac`、`\sqrt`、`⇒` |
| 標註 | 直接在題目附圖上畫輔助線、在條件底下畫線 | `Sketch` 畫在頁面座標上 |

這份是「整齊版」：字型負責工整，隨機抖動和筆色負責保留手寫感。

### 顏色分工
- 藍：計算過程（你原本的筆）
- 紅：最後答案、○ / ✗ 判斷、框起來的結論
- 綠：附圖上的輔助線、坐標標示
- 橘：解題關鍵（例如「Γ₁ 是 Γ₂ 往上平移 4」）

## 使用方式

```bash
./fetch_fonts.sh                                   # 下載字型（OFL 授權，不放進 repo）
pdftoppm -r 192 -png -f 2 -l 7 題本.pdf bg/h       # 預覽用的背景（192 dpi）
node build.js preview exams/112-4-mathB/exam.js    # 輸出 prev/pN.png，對著題本檢查版面
node build.js pdf exams/112-4-mathB/exam.js overlay.pdf
python3 merge.py 題本.pdf overlay.pdf 輸出.pdf 2    # 2 = 手寫第一頁對到題本的第幾頁
```

需要 Node + Playwright（Chromium）、Python 的 `pymupdf`。

`lines.py` 會列出每頁每一行字的 y 範圍和 x 範圍，用來找空白區。`grid.py` 會把附圖切出來並加上座標格線，方便對準。

## 寫一份新的詳解

在 `exams/<名稱>/exam.js` 裡，每頁寫一個 `page(n, (pg, sk) => { ... })`。座標是 96 dpi 的 A4 像素（794 × 1123）。

```js
ANS(pg, 10, 220, '(2)');                       // 左邊空白寫答案
MANS(pg, 8, 163, [1, 4, 5]);                    // 複選直排
MK(pg, 339, 192, true);                         // 選項後面打 ○（false 就打 ✗）
T(pg, 82, 314, [                                // 一行一個字串
  '時針每分鐘轉 \\frac{30\\deg}{60} = 0.5\\deg',
  '⇒ 逆時針調回 \\red{\\box{\\frac{\\pi}{36}}}',
], { s: 15 });
sk.circle(690, 364, 44, { c: 'green' });        // 手繪圖形：line / arrow / poly / curve / fn / arc / dot / label
```

可用的標記語法：`\frac{}{}`、`\sqrt{}`、`^{}`、`_{}`、`\vec{AB}`、`\ov{AB}`、`\mat{a&b\\c&d}`、`\cases{..\\..}`、`\stk{上}{下}`（例如 `C\stk{9}{4}`）、`\box{}`、`\circ{}`、`\ul{}`、`\wavy{}`、`\hl{}`、`\ok`、`\ng`、`\ck`，顏色用 `\red{}` `\green{}` `\orange{}` `\gray{}`，符號用 `\pi \theta \le \ge \ne \Ra(⇒) \LR(⇔) \times \cdot \deg \perp \approx \equiv \lb \rb`。

題本掃描檔和輸出的 PDF 都不放進這個 repo（題本有版權）。
