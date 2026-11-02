/* 北北基 113 學年度學科能力測驗聯合模擬考試（翰林 E4）數學B — handwritten solutions
 * Based on the booklet's own 參考答案暨詳解 (PDF p.10–14), trimmed; every answer re-checked by hand / python.
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet, p.9 answer cover). Pages are 618×867pt (not A4),
 * the engine stretches them to 794 x 1123, so coordinates below are already in that space.
 * Question numbers sit at x≈80, options at x≈105.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 22, 236, '(3)');
  T(pg, 250, 296, [
    'f(x) = (x − 1)Q(x) + a ⇒ f(1) = a',
    'Q(2) = 3 ⇒ f(2) = (2 − 1)Q(2) + a = 3 + a',
    'f(1) = 5f(2) ⇒ a = 5(3 + a) = 15 + 5a',
    '⇒ −4a = 15 ⇒ a = \\red{\\box{−\\frac{15}{4}}}',
  ], { s: 14, lh: 1.6, gap: 2 });

  // Q2
  ANS(pg, 22, 488, '(4)');
  T(pg, 280, 534, [
    'L：y = mx + 1 不論 m 為何，\\orange{恆過定點 (0, 1)}',
    '(0, 1) 就在圓 x^2 + y^2 = 1 上 ⇒ 一定相交',
    '\\gray{(1) m = 0 時 y = 1 ∥ x 軸 \\ng}',
    '\\gray{(3) m = 1 時 y = x + 1 ∥ y = x \\ng}',
    '\\gray{(2)(5) (0, 1) 在圓外，L 可以避開 \\ng}',
  ], { s: 13, lh: 1.5 });
  {
    const u = 22, O = [668, 640], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 40, O[1], O[0] + 100, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 30, O[0], O[1] - 85, { c: 'gray', w: 0.8, head: 3.5 });
    sk.circle(O[0], O[1], u, { c: 'blue', w: 1.3 });
    sk.circle(M(3, 1)[0], M(3, 1)[1], u, { c: 'gray', w: 0.9 });
    const P = M(0, 1);
    [[-0.4, -1.5, 3.8], [1.2, -1.5, 1.6], [-1.5, -1, 1.2]].forEach(([m, x0, x1]) => {
      const a = M(x0, m * x0 + 1), b = M(x1, m * x1 + 1); sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 1, dash: '3 3' });
    });
    sk.dot(P[0], P[1], { r: 2.2, c: 'red' });
    sk.label(P[0] - 52, P[1] - 22, '\\red{(0, 1)}', { s: 11.5 });
    sk.label(M(3, 1)[0] - 8, M(3, 1)[1] + 22, '\\gray{(2)}', { s: 11.5 });
    sk.label(O[0] + 5, O[1] + 2, 'O', { s: 11.5 });
  }

  // Q3
  ANS(pg, 22, 718, '(2)');
  T(pg, 245, 786, [
    '\\vec{a} = (\\cos60\\deg, \\sin60\\deg) 是單位向量',
    '|\\vec{b}| = 1，夾角 120\\deg',
    '⇒ \\vec{b} 的方向角 = 60\\deg ± 120\\deg = 180\\deg 或 −60\\deg',
    '⇒ \\vec{b} = (−1, 0) 或 \\red{\\box{(\\frac{1}{2}, −\\frac{\\sqrt3}{2})}}',
    '\\gray{驗算：\\vec{a} \\cdot \\vec{b} = \\frac{1}{4} − \\frac{3}{4} = −\\frac{1}{2} = \\cos120\\deg \\ck}',
  ], { s: 13.5, lh: 1.75, gap: 2 });
  {
    const r = 52, O = [672, 1000], P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
    sk.arrow(O[0] - 70, O[1], O[0] + 75, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 66, O[0], O[1] - 70, { c: 'gray', w: 0.8, head: 3.5 });
    sk.circle(O[0], O[1], r, { c: 'gray', w: 0.9 });
    const A = P(60), B = P(-60), C = P(180);
    sk.arrow(O[0], O[1], A[0], A[1], { c: 'blue', w: 1.4, head: 4 });
    sk.arrow(O[0], O[1], B[0], B[1], { c: 'red', w: 1.6, head: 4 });
    sk.arrow(O[0], O[1], C[0], C[1], { c: 'orange', w: 1.3, head: 4 });
    sk.arc(O[0], O[1], 14, -60, 60, { c: 'green', w: 1 }); sk.label(O[0] + 16, O[1] + 2, '\\green{120\\deg}', { s: 11.5 });
    sk.arc(O[0], O[1], 20, 60, 180, { c: 'green', w: 1 }); sk.label(O[0] - 30, O[1] - 32, '\\green{120\\deg}', { s: 11.5 });
    sk.label(A[0] + 2, A[1] - 14, '\\vec{a}', { s: 11.5 }); sk.label(B[0] + 3, B[1] - 4, '\\red{\\vec{b}}', { s: 11.5 });
    sk.label(C[0] - 16, C[1] - 18, '\\orange{\\vec{b}}', { s: 11.5 });
  }
});

/* ---------------- 第 2 頁 : Q4 – Q6 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 22, 110, '(5)');
  T(pg, 225, 164, [
    'X = 取到的白球數，C\\stk{12}{3} = 220',
    'P(X = k) = \\frac{C\\stk{3}{k} C\\stk{9}{3−k}}{220}：k = 0, 1, 2, 3 的分子為 84, 108, 27, 1',
    'E(X) = \\frac{0 \\times 84 + 1 \\times 108 + 2 \\times 27 + 3 \\times 1}{220} = \\frac{165}{220} = \\red{\\box{0.75}}',
    '\\gray{快速法：每顆白球被取到的機率 \\frac{3}{12}，3 顆白球 ⇒ 3 \\times \\frac{3}{12} = 0.75}',
  ], { s: 13.5, lh: 1.75, gap: 3 });

  // Q5
  ANS(pg, 22, 429, '(2)');
  T(pg, 215, 506, [
    '弧長 = r\\theta：\\frac{10\\pi}{3} = 10\\theta ⇒ ∠AOB = \\frac{\\pi}{3}',
    '⇒ △OAB 正三角形，\\ov{AB} = 10',
    '北緯 45\\deg 小圓：圓心 H，半徑 \\ov{HA} = \\ov{HB} = 10\\cos45\\deg = 5\\sqrt2',
  ], { s: 13.5, lh: 1.7, gap: 2 });
  T(pg, 110, 632, [
    '\\ov{HA}^2 + \\ov{HB}^2 = 50 + 50 = 100 = \\ov{AB}^2 ⇒ ∠AHB = 90\\deg \\gray{(經度差 90\\deg)}',
    '⇒ B 在東經 20\\deg ± 90\\deg：東經 110\\deg 或 \\red{\\box{西經 70\\deg}}',
  ], { s: 13.5, lh: 1.7 });
  {   // top view of the 45°N circle
    const H = [700, 540], r = 42, A = [H[0] + r, H[1]], B = [H[0], H[1] - r];
    sk.circle(H[0], H[1], r, { c: 'blue', w: 1.2 });
    sk.line(H[0], H[1], A[0], A[1], { c: 'green', w: 1.1 }); sk.line(H[0], H[1], B[0], B[1], { c: 'green', w: 1.1 });
    sk.line(A[0], A[1], B[0], B[1], { c: 'red', w: 1.4 });
    sk.rightAngle(H[0], H[1], 1, 0, 0, -1, 6, { c: 'green' });
    [H, A, B].forEach(p => sk.dot(p[0], p[1], { r: 1.8 }));
    sk.label(H[0] - 14, H[1] + 1, 'H', { s: 11.5 }); sk.label(A[0] + 3, A[1] - 6, 'A', { s: 11.5 }); sk.label(B[0] - 4, B[1] - 16, 'B', { s: 11.5 });
    sk.label(H[0] + 8, H[1] + 2, '\\green{5\\sqrt2}', { s: 11.5 }); sk.label(H[0] + 26, H[1] - 34, '\\red{10}', { s: 11.5 });
    sk.label(H[0] - 40, H[1] + 46, '\\gray{北緯 45\\deg (俯視)}', { s: 11.5 });
  }

  // Q6
  ANS(pg, 22, 772, '(2)');
  T(pg, 215, 812, [
    '先排 4 位先生：4! = 24，例如 A、B、C、D',
    '❶ 男女男女：A \\_ B \\_ C \\_ D \\_',
    '太太 a、b、c、d 填空格，不能緊鄰自己先生：',
    '只有 cdba、dabc、cdab 共 3 種',
    '❷ 女男女男：\\_ A \\_ B \\_ C \\_ D，同理 3 種',
    '⇒ 24 \\times (3 + 3) = \\red{\\box{144}} 種',
  ], { s: 13.5, lh: 1.6 });
  T(pg, 565, 838, [
    '\\gray{❶ 的 3 種：}',
    '\\gray{A c B d C b D a}',
    '\\gray{A d B a C b D c}',
    '\\gray{A c B d C a D b}',
  ], { s: 12, lh: 1.45 });
});

/* ---------------- 第 3 頁 : Q7 – Q9 ---------------- */
page(4, (pg, sk) => {
  // Q7
  ANS(pg, 22, 109, '(3)');
  T(pg, 210, 262, [
    '設花蓮 PGV = x，臺北 PGV = y',
    '6 = 2.14\\log x + 1.89，5 = 2.14\\log y + 1.89',
    '相減：1 = 2.14(\\log x − \\log y) ⇒ \\log\\frac{x}{y} = \\frac{1}{2.14} ≈ 0.467',
    '\\log 3 ≈ 0.4771 最接近 ⇒ \\frac{x}{y} ≈ \\red{\\box{3}} 倍',
  ], { s: 13.5, lh: 1.6 });

  // Q8
  MANS(pg, 20, 500, [2]);
  MK(pg, 463, 598, false); MK(pg, 603, 623, true); MK(pg, 463, 648, false); MK(pg, 230, 697, false); MK(pg, 199, 746, false);
  T(pg, 483, 599, '原始 100 分 ⇒ 調整後也是 100', { s: 12.5 });
  T(pg, 623, 624, '42.9 < 46.7', { s: 12.5 });
  T(pg, 483, 649, 'σ_{x} 都是 20，一樣大', { s: 12.5 });
  T(pg, 250, 698, '斜率為正的線性變換，r 不變 (仍是 0.42)', { s: 12.5 });
  T(pg, 219, 747, '反例：x_1 = 60、x_2 = 62 ⇒ y_1 = 72 > y_2 = 71.5', { s: 12.5 });
  T(pg, 105, 770, '\\gray{原始 μ：\\frac{60 − 30}{0.7} ≈ 42.9，\\frac{60 − 25}{0.75} ≈ 46.7；原始 σ：\\frac{14}{0.7} = \\frac{15}{0.75} = 20}', { s: 11.5 });

  // Q9
  MANS(pg, 20, 795, [2, 3, 5]);
  MK(pg, 166, 902, false); MK(pg, 167, 942, true); MK(pg, 167, 975, true); MK(pg, 219, 1000, false); MK(pg, 226, 1031, true);
  T(pg, 186, 902, '從 B 一定跳到 A 或 C ⇒ b_1 = 0', { s: 12.5 });
  T(pg, 187, 942, 'a_1 = c_1 = \\frac{1}{2} ⇒ b_2 = \\frac{1}{2} \\cdot \\frac{1}{2} + \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{2}', { s: 12.5 });
  T(pg, 187, 975, 'A、C 左右對稱 ⇒ a_n = c_n', { s: 12.5 });
  T(pg, 239, 1000, '應是 b_n = \\frac{1}{2}a_{n−1} + \\frac{1}{2}c_{n−1}', { s: 12.5 });
  T(pg, 246, 1031, '= \\frac{1}{2}(a_n + c_n) = \\frac{1}{2}(1 − b_n)', { s: 12.5 });
  T(pg, 520, 902, [
    '\\orange{在 A：\\frac{1}{2} 留在 A，\\frac{1}{2} 跳到 B}',
    '\\orange{在 B：\\frac{1}{2} 到 A，\\frac{1}{2} 到 C}',
    '\\orange{在 C：\\frac{1}{2} 留在 C，\\frac{1}{2} 跳到 B}',
  ], { s: 12, lh: 1.65 });
});

/* ---------------- 第 4 頁 : Q10 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q10
  MANS(pg, 20, 110, [1, 3, 5]);
  MK(pg, 203, 159, true); MK(pg, 366, 196, false); MK(pg, 387, 239, true); MK(pg, 550, 273, false); MK(pg, 492, 298, true);
  T(pg, 223, 158, '由右圖 \\frac{1}{2} < a < 1，0 < b < 1 ⇒ \\frac{1}{2} < a + b < 2', { s: 12.5 });
  T(pg, 386, 197, 'a\\pi = 10^{b}：在 y = 10^{x} 上', { s: 12.5 });
  T(pg, 407, 240, '\\log\\frac{1}{a\\pi} = −\\log a\\pi = −b', { s: 12.5 });
  T(pg, 110, 326, [
    '(4) y = \\sin\\frac{x}{a}，x = \\pi 代入得 \\sin\\frac{\\pi}{a}，但 b = \\sin a\\pi ≠ \\sin\\frac{\\pi}{a} \\gray{(a ≈ 0.86)}',
    '(5) y = \\sin(x + \\pi)，x = a\\pi 代入得 \\sin(a\\pi + \\pi) = −\\sin a\\pi = −b',
  ], { s: 12.5, lh: 1.75 });
  {
    const O = [590, 222], ux = 27, uy = 38, M = (x, y) => [O[0] + ux * x, O[1] - uy * y];
    sk.arrow(O[0] - 6, O[1], O[0] + 180, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 46, O[0], O[1] - 52, { c: 'gray', w: 0.8, head: 3.5 });
    sk.fn(x => Math.sin(x), 0, 2 * Math.PI, M, { c: 'blue', w: 1.3 });
    sk.fn(x => Math.log10(x), 0.14, 2 * Math.PI, M, { c: 'green', w: 1.3 });
    const P = M(2.6963, 0.4308);
    sk.dot(P[0], P[1], { r: 2.2, c: 'red' }); sk.label(P[0] + 1, P[1] - 18, '\\red{P}', { s: 11.5 });
    sk.line(P[0], P[1], P[0], O[1], { c: 'red', w: 0.9, dash: '2 2' });
    [[Math.PI / 2, '\\frac{\\pi}{2}'], [Math.PI, '\\pi'], [2 * Math.PI, '2\\pi']].forEach(([x, t]) => {
      const p = M(x, 0); sk.line(p[0], p[1] - 3, p[0], p[1] + 3, { c: 'gray', w: 0.9 }); sk.label(p[0] - (t === '2\\pi' ? 14 : 5), p[1] + 4, `\\gray{${t}}`, { s: 11.5 });
    });
    sk.label(M(0.6, 1)[0] - 10, M(0.6, 1)[1] - 16, '\\blue{sin x}', { s: 11.5 });
    sk.label(M(5.4, 0.73)[0] - 14, M(5.4, 0.73)[1] - 18, '\\green{log x}', { s: 11.5 });
  }

  // Q11
  MANS(pg, 20, 396, [2, 5]);
  MK(pg, 180, 571, false); MK(pg, 366, 610, true); MK(pg, 351, 650, false); MK(pg, 627, 689, false); MK(pg, 277, 773, true);
  T(pg, 200, 572, '三種不是等可能：聖 = 2 \\times \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{2}，笑 = 無 = \\frac{1}{4}', { s: 12.5 });
  T(pg, 386, 611, '笑笑笑笑聖：(\\frac{1}{4})^{4} \\times \\frac{1}{2} = \\frac{1}{512}', { s: 12.5 });
  T(pg, 371, 651, '\\frac{1}{2} + \\frac{1}{4} \\cdot \\frac{1}{2} + (\\frac{1}{4})^{2} \\cdot \\frac{1}{2} = \\frac{21}{32}', { s: 12.5 });
  T(pg, 297, 774, '一個正 0.8，另一個正 0.2', { s: 12.5 });
  T(pg, 110, 800, [
    '(4) 五次內 = \\frac{1}{2}(1 + \\frac{1}{4} + \\frac{1}{16} + \\frac{1}{64} + \\frac{1}{256}) = \\frac{341}{512} ⇒ 所求 = \\frac{21}{32} ÷ \\frac{341}{512} = \\frac{336}{341}',
    '(5) 聖杯 = 正反 + 反正 = 0.8 \\times 0.8 + 0.2 \\times 0.2 = 0.68 > 0.6',
  ], { s: 12.5, lh: 1.75 });

  // Q12
  MANS(pg, 20, 870, [1, 3, 4, 5]);
  MK(pg, 353, 896, true); MK(pg, 289, 921, false); MK(pg, 387, 945, true); MK(pg, 362, 970, true); MK(pg, 592, 1003, true);
  T(pg, 373, 897, 'y、z 歸 0', { s: 12.5 });
  T(pg, 309, 922, '\\sqrt{(−1)^{2} + 2^{2}} = \\sqrt5 > 2 \\gray{(用 x、z)}', { s: 12.5 });
  T(pg, 407, 946, '只有 z 變號', { s: 12.5 });
  T(pg, 382, 971, '三個坐標都變號', { s: 12.5 });
  T(pg, 110, 1038, [
    '(5) A、B 到 x 軸距離：\\sqrt{1^{2} + 2^{2}} = \\sqrt5、\\sqrt{2^{2} + 4^{2}} = 2\\sqrt5；繞 x 軸把 A 轉到 B 的對面 (右上圖)',
    '直線 A′B′ 交 x 軸於 P，比例 1 : 2 ⇒ P 的 x = −1 + \\frac{1}{3} \\times 4 = \\frac{1}{3}，PA + PB 最小',
  ], { s: 12, lh: 1.6 });
  {
    const O = [672, 950], u = 14, M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(615, O[1], 768, O[1], { c: 'gray', w: 0.8, head: 3.5 }); sk.label(760, O[1] + 2, '\\gray{x}', { s: 11.5 });
    const A = M(-1, Math.sqrt(5)), B = M(3, -2 * Math.sqrt(5)), P = M(1 / 3, 0), H1 = M(-1, 0), H2 = M(3, 0);
    sk.line(A[0], A[1], H1[0], H1[1], { c: 'green', w: 1, dash: '3 2' }); sk.line(B[0], B[1], H2[0], H2[1], { c: 'green', w: 1, dash: '3 2' });
    sk.line(A[0], A[1], B[0], B[1], { c: 'red', w: 1.3 });
    [A, B, P].forEach(p => sk.dot(p[0], p[1], { r: 1.9, c: 'red' }));
    sk.label(A[0] - 18, A[1] - 12, 'A′', { s: 11.5 }); sk.label(B[0] + 6, B[1] - 2, 'B′', { s: 11.5 }); sk.label(P[0] + 3, P[1] - 16, '\\red{P}', { s: 11.5 });
    sk.label(H1[0] - 24, H1[1] - 20, '\\green{\\sqrt5}', { s: 11.5 }); sk.label(H2[0] + 3, H2[1] + 10, '\\green{2\\sqrt5}', { s: 11.5 });
  }
});

/* ---------------- 第 5 頁 : Q13 – Q17 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 6, 190, '(2,4,3,−2)', { s: 12 });
  T(pg, 390, 245, '大域特徵像 y = 2x^{3} ⇒ a = 2', { s: 13 });
  T(pg, 110, 280, [
    '\\orange{在 x = −1 附近的一次近似 y = x − 2} ⇒ 設 f(x) = 2(x + 1)^{3} + k(x + 1)^{2} + (x − 2)',
    'f(1) = 16 + 4k − 1 = 7 ⇒ k = −2',
    'f(x) = 2(x^{3} + 3x^{2} + 3x + 1) − 2(x^{2} + 2x + 1) + x − 2 = 2x^{3} + 4x^{2} + 3x − 2 ⇒ \\red{\\box{(2, 4, 3, −2)}}',
  ], { s: 12.5, lh: 1.6 });

  // Q14
  ANS(pg, 22, 360, '1');
  T(pg, 110, 452, [
    '底面 △ABC 是邊長 2 的正三角形，面積 \\frac{\\sqrt3}{4} \\times 2^{2} = \\sqrt3',
    '△PAC 也是正三角形，P 到 \\ov{AC} 的距離 = \\sqrt3 ⇒ 高 \\le \\sqrt3',
    '平面 PAC ⊥ 平面 ABC 時最大：V = \\frac{1}{3} \\times \\sqrt3 \\times \\sqrt3 = \\red{\\box{1}}',
  ], { s: 13, lh: 1.75 });

  // Q15
  ANS(pg, 4, 545, '(−6,10)', { s: 15 });
  T(pg, 110, 612, [
    '切 x 軸於 (3, 0)、切 L 處 y \\le 0 ⇒ 圓心 Q(3, k)，k < 0，半徑 = −k',
    'd(Q, L) = \\frac{|9 − 4k − 4|}{5} = −k ⇒ 5 − 4k = −5k ⇒ k = −5',
    '(x − 3)^{2} + (y + 5)^{2} = 25 ⇒ x^{2} + y^{2} − 6x + 10y + 9 = 0 ⇒ (d, e) = \\red{\\box{(−6, 10)}}',
  ], { s: 13, lh: 1.65 });

  // Q16
  ANS(pg, 16, 704, '157', { s: 19 });
  T(pg, 110, 846, [
    '\\log 2^{521} = 521 \\times 0.3010 = 156.821 \\gray{(\\log 2 ≈ 0.3010)}',
    '⇒ 2^{521} = 10^{0.821} \\times 10^{156}，1 < 10^{0.821} < 10 ⇒ 2^{521} 是 157 位數',
    '2^{521} 不是 10 的次方，減 1 位數不變 ⇒ 2^{521} − 1 是 \\red{\\box{157}} 位數',
  ], { s: 13, lh: 1.6 });

  // Q17
  ANS(pg, 22, 943, '−1');
  T(pg, 110, 994, [
    'A^{−1} = A ⇒ A^{2} = I：\\mat{1 & 2 \\\\ c & d}\\mat{1 & 2 \\\\ c & d} = \\mat{1 + 2c & 2 + 2d \\\\ c + cd & 2c + d^{2}} = \\mat{1 & 0 \\\\ 0 & 1}',
    '⇒ 1 + 2c = 1，2 + 2d = 0 ⇒ c = 0，d = −1 ⇒ c + d = \\red{\\box{−1}}',
  ], { s: 13, lh: 1.35, gap: 6 });
});

/* ---------------- 第 6 頁 : Q18 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q18
  ANS(pg, 22, 434, '(4)');
  T(pg, 370, 515, [
    '訊號範圍是以耳機為圓心的圓',
    'A、B 恰在圓周上 ⇒ \\ov{AB} 是一條弦',
    '\\orange{圓心必在弦的中垂線上} ⇒ \\red{\\box{(4)}}',
  ], { s: 13, lh: 1.65 });
  {
    const O = [700, 560], r = 42, a1 = 215, a2 = 325, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
    const A = P(a1), B = P(a2), d = [B[0] - A[0], B[1] - A[1]];
    sk.circle(O[0], O[1], r, { c: 'gray', w: 0.9, dash: '3 3' });
    sk.line(A[0] - d[0] * 0.35, A[1] - d[1] * 0.35, B[0] + d[0] * 0.35, B[1] + d[1] * 0.35, { c: 'blue', w: 1.1 });
    sk.line(A[0], A[1], B[0], B[1], { c: 'red', w: 1.8 });
    sk.line(O[0], O[1] - 48, O[0], A[1] + 14, { c: 'green', w: 1.1, dash: '3 3' });
    [A, B].forEach(p => sk.dot(p[0], p[1], { r: 1.9 })); sk.dot(O[0], O[1], { r: 2, c: 'red' });
    sk.label(A[0] - 14, A[1] + 3, 'A', { s: 11.5 }); sk.label(B[0] + 4, B[1] + 3, 'B', { s: 11.5 });
    sk.label(O[0] + 4, O[1] - 14, '\\red{耳機}', { s: 11.5 });
  }

  // Q19
  MANS(pg, 20, 680, [2, 4]);
  MK(pg, 330, 755, false); MK(pg, 330, 780, true); MK(pg, 330, 804, false); MK(pg, 429, 829, true); MK(pg, 429, 853, false);
  T(pg, 452, 738, [
    'A、B、C 都在訊號圓上',
    '⇒ 耳機 O = △ABC 外心',
    '\\cos A < 0 ⇒ ∠A 鈍角',
    '⇒ O 在三角形外部，',
    '且在最長邊 BC 外側',
    '(與 A 異側)',
  ], { s: 12.5, lh: 1.55 });
  {
    const O = [705, 800], r = 46, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
    const A = P(250), B = P(195), C = P(305);
    sk.circle(O[0], O[1], r, { c: 'gray', w: 0.9, dash: '3 3' });
    sk.poly([A, B, C], { closed: true, c: 'blue', w: 1.3 });
    [A, B, C].forEach(p => sk.dot(p[0], p[1], { r: 1.6 })); sk.dot(O[0], O[1], { r: 2, c: 'red' });
    sk.label(A[0] - 4, A[1] + 1, 'A', { s: 11.5 }); sk.label(B[0] - 13, B[1] - 6, 'B', { s: 11.5 }); sk.label(C[0] + 3, C[1] - 8, 'C', { s: 11.5 });
    sk.label(O[0] - 4, O[1] - 16, '\\red{O}', { s: 11.5 });
  }

  // Q20
  ANS(pg, 8, 926, '7\\sqrt3', { s: 19 });
  T(pg, 110, 1000, [
    'O 是外心 ⇒ \\ov{OA} = \\ov{OB} = \\ov{OC} = R；最長邊 7 對最大角 A',
    '\\cos A = \\frac{3^{2} + 5^{2} − 7^{2}}{2 \\cdot 3 \\cdot 5} = −\\frac{1}{2} ⇒ A = 120\\deg，\\sin A = \\frac{\\sqrt3}{2}',
    '正弦定理：\\frac{7}{\\sin A} = 2R ⇒ R = \\frac{7}{\\sqrt3} = \\frac{7\\sqrt3}{3} ⇒ \\ov{OA} + \\ov{OB} + \\ov{OC} = 3R = \\red{\\box{7\\sqrt3}} 公尺',
  ], { s: 13, lh: 1.75 });
});
