/* 113 學年度 學科能力測驗 數學B — handwritten solutions
 * Methods follow the 翰林《113學測精彩解析》(大園高中 葉子榕老師), trimmed down.
 * Answers checked against the CEEC official key (選擇(填)題參考答案).
 * Pages 2–7 of the PDF (page 1 = cover, page 8 = formula sheet).
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈86, options at x≈110.
 */

/* ---------------- 第 1 頁 : Q1 – Q4 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 22, 212, '(4)');
  T(pg, 110, 314, [
    '由小排到大，210 \\times 90\\% = 189 是整數 ⇒ P_{90} = 第 189、190 位的平均',
    '第 172 \\sim 190 位都是 19 顆 (第 191 \\sim 210 位才是 20 顆) ⇒ P_{90} = \\red{\\box{19}}',
  ], { s: 12.5, lh: 1.28 });

  // Q2
  ANS(pg, 22, 352, '(1)');
  T(pg, 110, 432, '1 < a < 10 ⇒ 0 < b = \\log a < 1 ⇒ c = \\log b < 0 ⇒ \\red{\\box{c < 0 < b < 1}}', { s: 14 });

  // Q3
  ANS(pg, 22, 466, '(2)');
  {
    const P = [642, 511], D = [614, 547], A = [627, 569];
    const ext = (p, q, y) => [p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1]), y];
    const d2 = ext(P, D, 648), a2 = ext(P, A, 648);
    sk.poly([D, A, a2, d2], { closed: true, fill: 'hl', w: 0 });
    sk.line(P[0], P[1], d2[0], d2[1], { c: 'green', w: 1.2, dash: '3 3' });
    sk.line(P[0], P[1], a2[0], a2[1], { c: 'green', w: 1.2, dash: '3 3' });
    sk.label(d2[0] + 2, 632, '\\green{PD}', { s: 10 }); sk.label(a2[0] + 3, 632, '\\green{PA}', { s: 10 });
  }
  T(pg, 110, 705, [
    'Q 要從 D、A 中間射過去 ⇒ m_{PD} < m_{PQ} < m_{PA} \\small{\\orange{(圖中黃色區域)}}',
    'm_{PD} = \\frac{10 − 6}{12 − 9} = \\frac{4}{3}，m_{PA} = \\frac{10 − 5}{12 − 10} = \\frac{5}{2}',
    'm_{PQ}：(1) \\frac{7}{6} < \\frac{4}{3} \\ng  (2) \\frac{7}{5} \\ok  (3) \\frac{5}{4} < \\frac{4}{3} \\ng  (4) 3 > \\frac{5}{2} \\ng  (5) \\frac{8}{3} > \\frac{5}{2} \\ng',
  ], { s: 13.5, lh: 1.25, gap: 3 });

  // Q4
  ANS(pg, 22, 827, '(4)');
  T(pg, 110, 922, [
    '令 \\vec{v} + \\vec{AB} = (x, y)，\\vec{AB} 的兩個分量都在 [−1, 1] 內',
    '⇒ −3 \\le x \\le −1，2 \\le y \\le 4',
    '|\\vec{v} + \\vec{AB}| = \\sqrt{x^2 + y^2} \\le \\sqrt{9 + 16} = \\red{\\box{5}}',
  ], { s: 13.5, lh: 1.42 });
  {
    const M = (x, y) => [652 + 22 * x, 1036 - 22 * y];
    sk.arrow(566, 1036, 690, 1036, { c: 'gray', w: 1, head: 4 }); sk.arrow(652, 1046, 652, 924, { c: 'gray', w: 1, head: 4 });
    sk.label(655, 1037, 'O', { s: 10, c: 'gray' });
    const a = M(-3, 4), b = M(-1, 2);
    sk.poly([a, [b[0], a[1]], b, [a[0], b[1]]], { closed: true, fill: 'hl', c: 'orange', w: 1.1 });
    const v = M(-2, 3); sk.dot(v[0], v[1], { r: 1.8 }); sk.label(v[0] + 3, v[1] - 6, '\\vec{v}', { s: 10 });
    sk.line(652, 1036, a[0], a[1], { c: 'red', w: 1.4 }); sk.dot(a[0], a[1], { r: 2, c: 'red' });
    sk.label(a[0] - 44, a[1] - 14, '\\red{(−3, 4)}', { s: 10.5 }); sk.label(606, 1000, '\\red{5}', { s: 11 });
    sk.label(682, 960, '\\orange{(x, y) 的範圍}', { s: 10 });
  }
});

/* ---------------- 第 2 頁 : Q5 – Q7 ---------------- */
page(3, (pg, sk) => {
  // Q5
  ANS(pg, 22, 117, '(3)');
  T(pg, 110, 238, [
    '對稱軸 x = \\frac{(x−2) + (−x−2)}{2} = −2 ⇒ 令 f(x) = (x+2)^2 + k',
    '−3 \\le x \\le 1：最大 f(1) = 9 + k，最小 f(−2) = k',
    '9 + k = 4k ⇒ k = 3 ⇒ 最小值 \\red{\\box{3}}',
  ], { s: 14, lh: 1.42 });
  {
    const M = (x, y) => [655 + 26 * (x + 1), 330 - 7.2 * y];
    sk.fn(x => (x + 2) ** 2 + 3, -3.6, 1.15, M, { c: 'blue', w: 1.4 });
    const v = M(-2, 3), l = M(-3, 4), r = M(1, 12);
    sk.line(v[0], 334, v[0], 232, { c: 'gray', w: 1, dash: '3 3' }); sk.label(v[0] - 33, 315, 'x=−2', { s: 10, c: 'gray' });
    sk.line(l[0], 334, l[0], 325, { c: 'green', w: 1 }); sk.line(r[0], 334, r[0], 325, { c: 'green', w: 1 });
    sk.line(l[0], 334, r[0], 334, { c: 'green', w: 1 });
    sk.label(l[0] - 18, 327, '−3', { s: 9.5, c: 'green' }); sk.label(r[0] + 3, 327, '1', { s: 9.5, c: 'green' });
    sk.dot(v[0], v[1], { r: 2, c: 'red' }); sk.dot(r[0], r[1], { r: 2, c: 'red' });
    sk.label(v[0] + 4, v[1] + 1, '\\red{k}', { s: 10.5 }); sk.label(r[0] - 40, r[1] - 3, '\\red{9 + k}', { s: 10.5 });
  }

  // Q6 — perpendicular from P meets the floors at Q (5F), R (4F), S (3F), T (2F)
  ANS(pg, 22, 352, '(1)');
  {
    sk.line(612, 371, 612, 499, { c: 'green', w: 1.1, dash: '3 2.5' });
    [[391, 'Q'], [427, 'R'], [463.5, 'S'], [499, 'T']].forEach(([y, t]) => {
      sk.dot(612, y, { r: 1.6, c: 'green' }); sk.label(615, y - 13, `\\green{${t}}`, { s: 9.5 });
    });
    sk.line(593, 389, 633, 389, { c: 'red', w: 2.4 });               // cut by △PAB (1/3 of floor)
    sk.line(603.5, 393.5, 621.3, 393.5, { c: 'orange', w: 2.6 });     // cut by △PEF
  }
  T(pg, 110, 612, [
    '過 P 作鉛垂線，交五、四、三、二樓地板於 Q、R、S、T (如圖)',
    '\\frac{PQ}{PR} = \\frac{1}{3} ⇒ PQ : QR = 1 : 2，每層樓等高 ⇒ PQ : QR : RS : ST = 1 : 2 : 2 : 2',
    '所求 = \\frac{PQ}{PT} = \\frac{1}{1 + 2 + 2 + 2} = \\red{\\box{\\frac{1}{7}}}',
  ], { s: 14, lh: 1.25, gap: 3 });

  // Q7
  ANS(pg, 22, 727, '(3)');
  T(pg, 496, 875, '\\orange{每天取兩區中較高的溫度}', { s: 12.5 });
  T(pg, 620, 900, ['A = 0', 'D = 5', 'C ≥ 14'], { s: 11.5, c: 'red', lh: 1.15 });
  T(pg, 110, 1002, [
    '東區沒有 < 24 ⇒ A = 0；西區沒有 ≥ 36 ⇒ D = 5；東區 30 \\sim 36 的 14 天，西區沒有更高的 ⇒ C ≥ 14',
    '(1) D ≠ 5、(2)(4) A ≠ 0、(5) C = 13 < 14 都不行 ⇒ 只有 (3) (0, 9, 16, 5) \\ok',
  ], { s: 12, lh: 1.3 });
});

/* ---------------- 第 3 頁 : Q8 – Q10 ---------------- */
page(4, (pg, sk) => {
  // Q8
  MANS(pg, 20, 183, [1, 2, 5]);
  MK(pg, 219, 213, true); MK(pg, 200, 240, true); MK(pg, 303, 265, false); MK(pg, 228, 292, false); MK(pg, 219, 320, true);
  T(pg, 240, 212, '公比 −r', { s: 12.5 });
  T(pg, 222, 237, '公比 \\frac{1}{r}', { s: 12 });
  T(pg, 325, 264, '\\log a + k\\log r：公差 \\log r 的等差，不是等比', { s: 12.5 });
  T(pg, 250, 290, '3^b = 3^{ar} = (3^a)^r：後項是前項的 r 次方，不是等比', { s: 12.5 });
  T(pg, 240, 317, 'a^3r^3、a^3r^6、a^3r^9，公比 r^3', { s: 12.5 });
  T(pg, 110, 345, '\\gray{令公比 r > 1：a, b, c, d, e = a, ar, ar^2, ar^3, ar^4}', { s: 12.5 });

  // Q9
  MANS(pg, 20, 430, [2, 5]);
  T(pg, 212, 458, '令 g = x^2+5x+1，q = x^3+7x^2+x+3：f = qg + r(x)，\\deg r(x) \\le 1', { s: 12.5 });
  MK(pg, 323, 487, false); MK(pg, 335, 514, true); MK(pg, 341, 540, false); MK(pg, 337, 567, false); MK(pg, 342, 594, true);
  T(pg, 345, 484, '商式變成 2q', { s: 12.5 });
  T(pg, 357, 511, 'r(x) = −x', { s: 12.5 });
  T(pg, 363, 537, 'r(x) = x^2，次數太高', { s: 12.5 });
  T(pg, 359, 564, '= qg + g − x = qg + (x^2 + 4x + 1)，次數太高', { s: 12.5 });
  T(pg, 364, 591, '= qg + g − x^2 = qg + (5x + 1)', { s: 12.5 });

  // Q10
  MANS(pg, 20, 707, [1, 3, 4]);
  MK(pg, 578, 790, true); MK(pg, 422, 817, false); MK(pg, 518, 844, true); MK(pg, 410, 870, true); MK(pg, 442, 897, false);
  T(pg, 597, 783, '速率比 1 : 2 ⇒ 120 \\times \\frac{1}{3} = 40', { s: 11.5 });
  T(pg, 441, 816, 'A 的週期 = 240 ÷ 5 = 48 秒', { s: 12.5 });
  T(pg, 537, 843, 'B 的週期 = 240 ÷ 10 = 24，48 是 24 的倍數', { s: 12 });
  T(pg, 429, 869, '第 2 次相遇在 B 的出發點 (見右圖)', { s: 12.5 });
  T(pg, 461, 896, '只有 40、120 兩個位置', { s: 12.5 });
  T(pg, 110, 922, [
    '相遇：t = 8 在 40 → t = 24 在 120 (B 的出發點)',
    '→ t = 40 又在 40 → t = 48 都回到出發點，周而復始',
  ], { s: 12.5, lh: 1.42 });
  {
    const M = (t, x) => [560 + 2.95 * t, 1036 - 0.9 * x];
    sk.arrow(556, 1036, 710, 1036, { c: 'gray', w: 1, head: 4 }); sk.arrow(560, 1042, 560, 914, { c: 'gray', w: 1, head: 4 });
    sk.label(712, 1027, 't', { s: 10, c: 'gray' }); sk.label(526, 912, '位置', { s: 9.5, c: 'gray' });
    sk.poly([M(0, 0), M(24, 120), M(48, 0)], { c: 'blue', w: 1.4 });
    sk.poly([M(0, 120), M(12, 0), M(24, 120), M(36, 0), M(48, 120)], { c: 'green', w: 1.3 });
    sk.line(557, M(0, 120)[1], 563, M(0, 120)[1], { c: 'gray', w: 1 }); sk.label(538, M(0, 120)[1] - 7, '120', { s: 9, c: 'gray' });
    sk.line(557, M(0, 40)[1], 563, M(0, 40)[1], { c: 'gray', w: 1 }); sk.label(544, M(0, 40)[1] - 7, '40', { s: 9, c: 'gray' });
    [[8, 40], [24, 120], [40, 40]].forEach(([t, x]) => { const p = M(t, x); sk.dot(p[0], p[1], { r: 2.2, c: 'red' }); });
    [[8, '8'], [24, '24'], [40, '40'], [48, '48']].forEach(([t, s]) => sk.label(M(t, 0)[0] - 5, 1038, s, { s: 9, c: 'gray' }));
    sk.label(M(4, 20)[0] - 14, M(4, 20)[1] - 6, '\\blue{A}', { s: 10 }); sk.label(M(2, 100)[0] + 2, M(2, 100)[1] - 8, '\\green{B}', { s: 10 });
  }
});

/* ---------------- 第 4 頁 : Q11 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q11
  MANS(pg, 20, 121, [1, 4, 5]);
  MK(pg, 205, 376, true); MK(pg, 198, 407, false); MK(pg, 293, 437, false); MK(pg, 235, 477, true); MK(pg, 333, 514, true);
  T(pg, 226, 367, '\\frac{A − X}{X} = −0.07 ⇒ A = 0.93X', { s: 12.5 });
  T(pg, 219, 402, '(1 − 0.05)^4 ≈ 1 − 4(0.05) + 6(0.05)^2 = 0.815 ⇒ Y ≈ 0.815X > 0.8X', { s: 12.5 });
  T(pg, 314, 434, '這是「算術平均」，但平均成長率要用「幾何平均」', { s: 12.5 });
  T(pg, 256, 474, '(Y/X)^{1/4} = (0.95^4)^{1/4} = 0.95 ⇒ 0.95 − 1 = −0.05', { s: 12.5 });
  T(pg, 354, 511, 'Y = 0.93(1+p)(1+q)(1+r)X = 0.95^4 X', { s: 12.5 });

  // Q12
  MANS(pg, 20, 629, [1, 4]);
  T(pg, 180, 758, '每一格：停在原地 \\frac{1}{2}，往 2 個鄰格各 \\frac{1}{4}', { s: 12.5 });
  {
    sk.arrow(630, 800, 672, 800, { c: 'red', w: 1.2, head: 4 }); sk.label(646, 801, '\\red{¼}', { s: 9.5 });
    sk.arrow(602, 826, 602, 864, { c: 'red', w: 1.2, head: 4 }); sk.label(605, 850, '\\red{¼}', { s: 9.5 });
    sk.arc(634, 834, 7, 200, 520, { c: 'red', w: 1.1, arrow: true, head: 3.5 }); sk.label(642, 828, '\\red{½}', { s: 9 });
  }
  MK(pg, 180, 793, true); MK(pg, 181, 832, false); MK(pg, 212, 872, false); MK(pg, 192, 906, true); MK(pg, 228, 937, false);
  T(pg, 200, 788, 'A → B：\\frac{1}{4}', { s: 12.5 });
  T(pg, 201, 826, 'AAB + ABB = \\frac{1}{2} \\cdot \\frac{1}{4} + \\frac{1}{4} \\cdot \\frac{1}{2} = \\frac{1}{4}', { s: 12.5 });
  T(pg, 232, 865, 'a_2 = \\frac{1}{4} + \\frac{1}{16} + \\frac{1}{16} = \\frac{3}{8}，d_2 = \\frac{1}{16} + \\frac{1}{16} = \\frac{1}{8} ⇒ 和 = \\frac{1}{2}', { s: 12.5 });
  T(pg, 211, 902, 'b_n − c_n = \\frac{1}{2}(b_{n−1} − c_{n−1})，b_1 = c_1 ⇒ b_n = c_n', { s: 12 });
  T(pg, 248, 934, 'a_n + d_n = \\frac{1}{2}，不會 > \\frac{1}{2} (見下)', { s: 12.5 });
  T(pg, 110, 966, [
    '\\orange{看前一步：b_n = \\frac14 a_{n−1} + \\frac12 b_{n−1} + \\frac14 d_{n−1}，c_n = \\frac14 a_{n−1} + \\frac12 c_{n−1} + \\frac14 d_{n−1}}',
    'a_n + d_n = (\\frac12 a + \\frac14 b + \\frac14 c) + (\\frac14 b + \\frac14 c + \\frac12 d) = \\frac{1}{2}(a + b + c + d) = \\frac{1}{2}',
  ], { s: 12, lh: 1.3 });
});

/* ---------------- 第 5 頁 : Q13 – Q16 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 22, 174, '−1');
  T(pg, 228, 228, [
    '\\mat{a \\\\ b} = \\mat{1 & −1 \\\\ 3 & −2}\\up{−1}\\mat{1 \\\\ 0} = \\mat{−2 & 1 \\\\ −3 & 1}\\mat{1 \\\\ 0} = \\mat{−2 \\\\ −3}',
    '\\mat{c \\\\ d} = \\mat{1 & −1 \\\\ 3 & −2}\\mat{−3 \\\\ −5} = \\mat{2 \\\\ 1} ⇒ c − 3d = 2 − 3 = \\red{\\box{−1}}',
  ], { s: 13, lh: 1.25, gap: 4 });

  // Q14
  ANS(pg, 22, 340, '\\frac{2}{7}', { s: 18 });
  T(pg, 110, 410, '只報 A (\\frac{3}{10}) 占報 A 的 1 − \\frac{5}{8} = \\frac{3}{8} ⇒ 報 A = \\frac{3}{10} ÷ \\frac{3}{8} = \\frac{8}{10}', { s: 13 });
  T(pg, 110, 502, [
    '兩科都報 = \\frac{8}{10} − \\frac{3}{10} = \\frac{5}{10}，只報 B = 1 − \\frac{3}{10} − \\frac{5}{10} = \\frac{2}{10}',
    '所求 = \\frac{2}{2 + 5} = \\red{\\box{\\frac{2}{7}}}',
  ], { s: 13, lh: 1.2 });
  {
    sk.circle(626, 536, 30, { c: 'blue', w: 1.3 }); sk.circle(670, 536, 30, { c: 'green', w: 1.3 });
    sk.label(590, 500, 'A', { s: 11 }); sk.label(697, 500, '\\green{B}', { s: 11 });
    sk.label(602, 526, '\\frac{3}{10}', { s: 10 }); sk.label(638, 526, '\\frac{5}{10}', { s: 10 }); sk.label(672, 526, '\\red{\\frac{2}{10}}', { s: 10 });
  }

  // Q15
  ANS(pg, 14, 570, '3, −6', { s: 17 });
  T(pg, 110, 647, [
    '\\vec{P_1R} = 4\\vec{P_1Q_1} ⇒ P_1Q_1 : Q_1R = 1 : 3',
    '\\vec{P_2R} = 7\\vec{P_2Q_2} ⇒ P_2Q_2 : Q_2R = 1 : 6',
    '\\vec{Q_1Q_2} = \\vec{Q_1R} + \\vec{RQ_2} = \\red{\\box{3}}\\vec{P_1Q_1} \\red{\\box{−6}}\\vec{P_2Q_2}',
  ], { s: 14, lh: 1.45 });
  {
    const P1 = [552, 765], P2 = [704, 765], Rr = [640, 662];
    const Q1 = [P1[0] + (Rr[0] - P1[0]) / 4, P1[1] + (Rr[1] - P1[1]) / 4], Q2 = [P2[0] + (Rr[0] - P2[0]) / 7, P2[1] + (Rr[1] - P2[1]) / 7];
    sk.poly([P1, Rr, P2], { c: 'blue', w: 1.2 });
    sk.line(P1[0], P1[1], P2[0], P2[1], { c: 'gray', w: 1, dash: '3 3' });
    sk.arrow(Q1[0], Q1[1], Q2[0], Q2[1], { c: 'red', w: 1.4, head: 5 });
    [P1, P2, Rr, Q1, Q2].forEach(p => sk.dot(p[0], p[1], { r: 1.8 }));
    sk.label(P1[0] - 18, P1[1] - 4, 'P_1', { s: 10.5 }); sk.label(P2[0] + 3, P2[1] - 4, 'P_2', { s: 10.5 });
    sk.label(Rr[0] - 4, Rr[1] - 16, 'R', { s: 10.5 }); sk.label(Q1[0] - 20, Q1[1] - 10, 'Q_1', { s: 10.5 }); sk.label(Q2[0] + 4, Q2[1] - 12, 'Q_2', { s: 10.5 });
    sk.label(Q1[0] - 18, Q1[1] + 6, '\\green{1}', { s: 9.5 }); sk.label(596, 694, '\\green{3}', { s: 9.5 });
    sk.label(704, 745, '\\green{1}', { s: 9.5 }); sk.label(679, 700, '\\green{6}', { s: 9.5 });
  }

  // Q16
  ANS(pg, 14, 785, '\\frac{4\\pi}{3}', { s: 17 });
  {
    const cx = 592, cy = 912, r = 44, Pt = a => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)];
    sk.circle(cx, cy, r, { c: 'blue', w: 1.3 });
    sk.line(cx - r - 6, cy, cx + r + 6, cy, { c: 'gray', w: 1, dash: '3 3' }); sk.label(cx + r + 8, cy - 8, '\\gray{赤道}', { s: 9.5 });
    sk.arc(cx, cy, r, 60, 180, { c: 'red', w: 2.4 });
    const A = Pt(60), N = Pt(90), P = Pt(180);
    [A, N, P].forEach(p => sk.dot(p[0], p[1], { r: 2, c: 'red' })); sk.dot(cx, cy, { r: 1.6 });
    sk.line(cx, cy, A[0], A[1], { c: 'green', w: 1 }); sk.line(cx, cy, N[0], N[1], { c: 'green', w: 1 });
    sk.arc(cx, cy, 12, 0, 60, { c: 'green', w: 1 }); sk.label(cx + 13, cy - 16, '\\green{60\\deg}', { s: 9 });
    sk.label(A[0] + 3, A[1] - 12, 'A', { s: 10.5 }); sk.label(N[0] - 4, N[1] - 15, 'N', { s: 10.5 }); sk.label(P[0] - 13, P[1] - 6, 'P', { s: 10.5 });
    sk.label(cx - 2, cy + 2, 'O', { s: 9.5 }); sk.label(cx - 52, cy - 52, '\\red{120\\deg}', { s: 10 });
    sk.label(452, 930, '\\gray{過 A、N、P 的大圓}', { s: 10.5 });
  }
  T(pg, 110, 965, [
    'OA = ON = 2，A 的 z 坐標 \\sqrt3 = 2\\sin60\\deg ⇒ A 在北緯 60\\deg',
    '赤道上離 A 最遠的 P 在 A 的經線對面 ⇒ ∠AOP = 30\\deg + 90\\deg = 120\\deg = \\frac{2\\pi}{3}',
    '劣弧 ANP = 2 \\times \\frac{2\\pi}{3} = \\red{\\box{\\frac{4\\pi}{3}}}',
  ], { s: 12.5, lh: 1.25 });
});

/* ---------------- 第 6 頁 : Q17 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q17
  ANS(pg, 22, 117, '76');
  T(pg, 240, 166, [
    '三內角由小到大成等差 ⇒ 中間的角 = 60\\deg',
    '相鄰兩等分點的弧 → 圓周角 15\\deg，分成 4 類：',
  ], { s: 13, lh: 1.32 });
  T(pg, 110, 221, [
    '60\\deg−60\\deg−60\\deg：4 個；45\\deg−60\\deg−75\\deg、30\\deg−60\\deg−90\\deg、15\\deg−60\\deg−105\\deg：',
    '各有左右對稱兩種，各 12 \\times 2 = 24 個 ⇒ 共 4 + 24 \\times 3 = \\red{\\box{76}} 個',
  ], { s: 12.5, lh: 1.4 });

  // Q18
  ANS(pg, 22, 700, '(4)');
  T(pg, 110, 752, [
    '長方體原本 6 個面 (變成菱形，仍保留) + 截出 8 個三角形面',
    '= 14 個面 ⇒ \\red{\\box{十四面體}}',
  ], { s: 13.5, lh: 1.35 });

  // Q19
  T(pg, 110, 845, [
    'BD = DC = 9 等腰 ⇒ BC 邊上的高 = \\sqrt{9^2 − 4^2} = \\sqrt{65}',
    '△BCD = \\frac{1}{2} \\times 8 \\times \\sqrt{65} = \\red{\\box{4\\sqrt{65}}}',
  ], { s: 14, lh: 1.4 });
  {
    const B = [592, 910], C = [702, 910], D = [647, 846], Mm = [647, 910];
    sk.poly([B, C, D], { closed: true, c: 'blue', w: 1.3 });
    sk.line(D[0], D[1], Mm[0], Mm[1], { c: 'green', w: 1.1, dash: '3 3' }); sk.rightAngle(Mm[0], Mm[1], 1, 0, 0, -1, 5, { c: 'green' });
    sk.label(B[0] - 12, B[1] - 6, 'B', { s: 10.5 }); sk.label(C[0] + 3, C[1] - 6, 'C', { s: 10.5 }); sk.label(D[0] - 4, D[1] - 15, 'D', { s: 10.5 });
    sk.label(606, 866, '9', { s: 10 }); sk.label(680, 866, '9', { s: 10 }); sk.label(614, 911, '4', { s: 10 }); sk.label(672, 911, '4', { s: 10 });
    sk.label(650, 876, '\\green{\\sqrt{65}}', { s: 9.5 });
  }

  // Q20 (AD beside the figure)
  T(pg, 500, 572, [
    '\\red{20.} AB、AC、AD 兩兩垂直',
    'AB^2 = 9^2 − AD^2 = AC^2 ⇒ AB = AC',
    '△ABC 等腰直角 ⇒ AB = AC = \\frac{8}{\\sqrt2} = 4\\sqrt2',
    'AD = \\sqrt{9^2 − (4\\sqrt2)^2} = \\sqrt{49} = \\red{\\box{7}}',
  ], { s: 12, lh: 1.35 });
  {   // right-angle corner sketch
    const A = [190, 616], B = [190, 682], C = [282, 616], D = [140, 588];
    [[A, B], [A, C], [A, D]].forEach(([p, q]) => sk.line(p[0], p[1], q[0], q[1], { c: 'blue', w: 1.4 }));
    sk.poly([B, C, D], { closed: true, c: 'gray', w: 1, dash: '3 3' });
    sk.rightAngle(A[0], A[1], 0, 1, 1, 0, 6, { c: 'green' });
    sk.label(A[0] - 2, A[1] - 16, 'A', { s: 11 }); sk.label(B[0] - 4, B[1] + 1, 'B', { s: 11 }); sk.label(C[0] + 3, C[1] - 7, 'C', { s: 11 }); sk.label(D[0] - 14, D[1] - 8, 'D', { s: 11 });
    sk.label(240, 648, '\\gray{8}', { s: 9.5 }); sk.label(150, 640, '\\gray{9}', { s: 9.5 }); sk.label(214, 586, '\\gray{9}', { s: 9.5 });
  }
  T(pg, 500, 945, '\\gray{(AD 的計算寫在上面圖的右邊 ↑)}', { s: 11 });
  T(pg, 110, 979, [
    'V = \\frac{1}{3} \\times △ABC \\times AD = \\frac{1}{3} \\times \\frac{1}{2}(4\\sqrt2)^2 \\times 7 = \\red{\\box{\\frac{112}{3}}}',
    '\\frac{1}{3} \\times 4\\sqrt{65} \\times h = \\frac{112}{3} ⇒ h = \\frac{28}{\\sqrt{65}} = \\red{\\box{\\frac{28\\sqrt{65}}{65}}}',
  ], { s: 13.5, lh: 1.15, gap: 2 });
});
