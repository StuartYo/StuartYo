/* 113 學年度 南一 學測第四次聯合模擬考 數學A (113nanyi4A) — handwritten solutions
 * Based on the booklet's own 解析 (PDF p.11–15), trimmed. Q12(3) uses |D| = √5 instead of multiplying the matrices,
 * Q17 uses a·2^a = 64 from cos∠AOB directly, Q20 keeps the prism-minus-pyramid split.
 * Question pages are PDF p.2–9 (p.1 cover, p.10 formula sheet, p.11–15 解析). A4 scan, no /Rotate.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈62, options at x≈82.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 18, 193, '(3)');
  MK(pg, 204, 222, false); MK(pg, 313, 249, false); MK(pg, 218, 276, true); MK(pg, 346, 301, false); MK(pg, 520, 328, false);
  T(pg, 226, 221, '0 < \\log_{\\pi}2 < 1 ⇒ (\\log_{\\pi}2)^{\\pi} < 1', { s: 12.5 });
  T(pg, 335, 248, '\\log_2\\pi > 1、\\log_3\\pi > 1，但 \\log_6\\pi < 1', { s: 12.5 });
  T(pg, 240, 275, '= \\pi^{\\pi} > \\pi^3 > 3^3 = 27', { s: 12.5 });
  T(pg, 368, 300, 'x < 0 也有圖形', { s: 12.5 });
  T(pg, 100, 366, [
    '(5) y = \\pi^x 與 y = \\log_{\\pi}x 互為反函數，圖形對稱於 y = x',
    '\\pi^x > x 恆成立 \\gray{(x \\le 0 顯然；x > 0 時 \\pi^x > 2^x > x)}',
    '⇒ \\pi^x 在 y = x 上方，\\log_{\\pi}x 在 y = x 下方 ⇒ 沒有交點',
    '故選 \\red{\\box{(3)}}',
  ], { s: 13, lh: 1.45 });
  {   // y = π^x, y = x, y = log_π x
    const u = 19, O = [684, 280], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 66, O[1], O[0] + 78, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 56, O[0], O[1] - 78, { c: 'gray', w: 0.8, head: 3.5 });
    let a = M(-2.6, -2.6), b = M(3.6, 3.6); sk.line(a[0], a[1], b[0], b[1], { c: 'gray', w: 0.9, dash: '3 3' });
    sk.fn(x => Math.pow(Math.PI, x), -3.4, 1.08, M, { c: 'blue', w: 1.4 });
    sk.fn(x => Math.log(x) / Math.log(Math.PI), 0.06, 3.9, M, { c: 'green', w: 1.4, n: 60 });
    sk.label(M(-3.4, 0)[0], M(0, 1.9)[1], 'y = \\pi^x', { s: 10 });
    sk.label(M(1.2, 0)[0], M(0, -1.3)[1], '\\green{\\log_{\\pi}x}', { s: 10 });
    sk.label(b[0] - 4, b[1] - 16, '\\gray{y = x}', { s: 9 });
  }

  // Q2
  ANS(pg, 18, 487, '(5)');
  T(pg, 100, 600, [
    '公比 r = a_2 是正整數，a_n = r^{n − 1} = 2^{20} ⇒ r = 2^k',
    '⇒ k(n − 1) = 20 ⇒ n − 1 是 20 的因數：1, 2, 4, 5, 10, 20',
    '⇒ n = 2, 3, 5, 6, 11, 21，選項中只有 n = 5 \\gray{(r = 2^5 = 32)} ⇒ \\red{\\box{(5)}}',
  ], { s: 13.5, lh: 1.55 });

  // Q3
  ANS(pg, 18, 728, '(2)');
  T(pg, 100, 872, [
    'E 與 F 沒有交點 ⇒ E ∥ F，設 E：2x + 2y − z = k',
    'd(A, E) = d(B, E)：\\frac{|2 + 4 + 3 − k|}{3} = \\frac{|6 − 12 − 5 − k|}{3} ⇒ |9 − k| = |11 + k|',
    '⇒ 9 − k = −(11 + k) 無解，9 − k = 11 + k ⇒ k = −1',
    'd((4, 0, 2), E) = \\frac{|8 + 0 − 2 + 1|}{\\sqrt{4 + 4 + 1}} = \\red{\\box{\\frac{7}{3}}}',
  ], { s: 13.5, lh: 1.5, gap: 3 });
});

/* ---------------- 第 2 頁 : Q4 – Q6 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 18, 106, '(1)');
  T(pg, 100, 215, [
    '令 t = x + \\frac{4}{x} \\ge 2\\sqrt{x \\cdot \\frac{4}{x}} = 4 \\gray{(算幾，x = 2 時等號)}',
    'f = −t^2 − 2t + 16 = −(t + 1)^2 + 17，t \\ge 4 時遞減',
    '⇒ 最大值 = f|_{t = 4} = −25 + 17 = \\red{\\box{−8}}',
  ], { s: 13.5, lh: 1.6, gap: 2 });

  // Q5
  ANS(pg, 18, 357, '(4)');
  T(pg, 100, 548, [
    '每次成功機率 \\frac{1}{6}。第三次後未結束 ⇔ 前 3 次至多成功 1 次',
    'P(前 3 次 \\le 1 次成功) = (\\frac{5}{6})^3 + C\\stk{3}{1}\\frac{1}{6}(\\frac{5}{6})^2 = \\frac{125 + 75}{216} = \\frac{200}{216}',
    'P(前 3 次恰 1 次，第 4 次成功) = \\frac{75}{216} \\cdot \\frac{1}{6}',
    '所求 = \\frac{75}{216 \\cdot 6} ÷ \\frac{200}{216} = \\frac{75}{1200} = \\red{\\box{\\frac{1}{16}}}',
  ], { s: 14, lh: 1.6, gap: 2 });

  // Q6
  ANS(pg, 18, 702, '(2)');
  T(pg, 100, 855, [
    '在 x = 1 展開：f(x) = 2(x − 1)^3 + a(x − 1)^2 − 2(x − 1) + 11',
    'x = 2 的近似直線過 (2, 0) ⇒ f(2) = 2 + a − 2 + 11 = 0 ⇒ a = −11',
    '⇒ f(x) = 2x^3 − 17x^2 + 26x = x(x − 2)(2x − 13) \\gray{(驗算 f\'(2) = 24 − 68 + 26 = −18 \\ok)}',
    'f(x − 1) = (x − 1)(x − 3)(2x − 15) \\le 0 ⇒ x \\le 1 或 3 \\le x \\le \\frac{15}{2}',
    '正整數 1, 3, 4, 5, 6, 7，和 = \\red{\\box{26}}',
  ], { s: 13, lh: 1.55, gap: 2 });
});

/* ---------------- 第 3 頁 : Q7 – Q9 ---------------- */
page(4, (pg, sk) => {
  // Q7
  MANS(pg, 16, 168, [4, 5]);
  MK(pg, 208, 308, false); MK(pg, 408, 308, false); MK(pg, 650, 308, false); MK(pg, 222, 335, true); MK(pg, 436, 335, true);
  T(pg, 100, 358, [
    '\\orange{飛鏢 (10, 2, 1) + t\\vec{v} 打到 yz 平面 (x = 0) 的點 Q，要 \\ov{PQ}^2 \\le 5}',
    '(1) t = 5，Q(0, −3, 1)：\\ov{PQ}^2 = 16 + 9 = 25　　(2) Q(0, 2, 1)：\\ov{PQ}^2 = 1 + 9 = 10',
    '(3) t = \\frac{10}{3}，Q(0, −\\frac{4}{3}, −\\frac{7}{3})：\\ov{PQ}^2 = \\frac{49}{9} + \\frac{1}{9} = \\frac{50}{9} > 5',
    '(4) t = \\frac{5}{3}，Q(0, \\frac{1}{3}, −\\frac{7}{3})：\\ov{PQ}^2 = \\frac{4}{9} + \\frac{1}{9} = \\frac{5}{9} \\le 5　(5) t = 2，Q(0, 0, −1)：\\ov{PQ}^2 = 2',
  ], { s: 12.5, lh: 1.45, gap: 1 });

  // Q8
  MANS(pg, 16, 464, [3, 5]);
  MK(pg, 146, 522, false); MK(pg, 290, 548, false); MK(pg, 384, 575, true); MK(pg, 212, 602, false); MK(pg, 518, 629, true);
  T(pg, 166, 521, 'x 很大時 f(x) < 0 ⇒ a < 0', { s: 12 });
  T(pg, 310, 547, 'f(0) = 5a，a 不確定', { s: 12 });
  T(pg, 404, 570, '中心 x = −\\frac{b}{3a} = −1', { s: 12 });
  T(pg, 232, 601, 'x > 1 時遞減 ⇒ f(40) > f(50)', { s: 12 });
  T(pg, 100, 662, [
    '\\orange{f < 0 ⇔ −5 < x < 1 或 x > 1 ⇒ f(x) = a(x + 5)(x − 1)^2，a < 0}',
    '= a(x^3 + 3x^2 − 9x + 5) ⇒ b = 3a；f\'(x) = 3a(x^2 + 2x − 3) = 3a(x + 3)(x − 1)',
    '(4) x > 1：f\'(x) < 0　(5) m = f\'(−5) = 3a(−2)(−6) = 36a < 0',
  ], { s: 12.5, lh: 1.45 });
  {   // f = -(x+5)(x-1)^2, scaled
    const ux = 17, uy = 1.25, O = [700, 600], M = (x, y) => [O[0] + ux * x, O[1] - uy * y];
    const f = x => -(x + 5) * (x - 1) * (x - 1);
    sk.arrow(O[0] - 112, O[1], O[0] + 62, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.fn(f, -6.15, 2.45, M, { c: 'blue', w: 1.4, n: 60 });
    const p = M(-5, 0), q = M(-5.7, -36 * -0.7), r = M(-4.3, -36 * 0.7);
    sk.line(q[0], q[1], r[0], r[1], { c: 'orange', w: 1.1 });
    sk.dot(p[0], p[1], { r: 1.6, c: 'red' }); sk.dot(M(1, 0)[0], O[1], { r: 1.6, c: 'red' });
    sk.label(p[0] - 14, O[1] + 1, '\\small{−5}', { s: 9 }); sk.label(M(1, 0)[0] - 3, O[1] - 15, '\\small{1}', { s: 9 });
    sk.label(p[0] - 52, p[1] + 14, '\\orange{\\small{斜率 m}}', { s: 9 });
    sk.label(612, 514, '\\small{y = f(x)，a < 0}', { s: 10 });
  }

  // Q9
  MANS(pg, 16, 757, [1, 2, 5]);
  MK(pg, 412, 806, true); MK(pg, 497, 847, true); MK(pg, 316, 882, false); MK(pg, 455, 912, false); MK(pg, 590, 948, true);
  T(pg, 432, 806, 'sin 最大為 1', { s: 12 });
  T(pg, 517, 842, 'x − \\frac{\\pi}{4} = \\frac{3\\pi}{2} 時最小', { s: 12 });
  T(pg, 336, 881, '週期 2\\pi', { s: 12 });
  T(pg, 475, 906, 'α、β 對稱於 x = \\frac{3\\pi}{4} ⇒ α + β = \\frac{3\\pi}{2}', { s: 12 });
  T(pg, 100, 975, [
    '\\orange{化簡}：f = (\\frac{\\sqrt3}{2}\\sin x + \\frac{1}{2}\\cos x) − (\\frac{\\sqrt3}{2}\\cos x + \\frac{1}{2}\\sin x) = \\frac{\\sqrt3 − 1}{2}(\\sin x − \\cos x)',
    '= \\frac{\\sqrt3 − 1}{2} \\cdot \\sqrt2\\sin(x − \\frac{\\pi}{4}) = \\frac{\\sqrt6 − \\sqrt2}{2}\\sin(x − \\frac{\\pi}{4}) \\gray{(\\frac{\\sqrt6 − \\sqrt2}{2} ≈ 0.52 > \\frac{1}{2})}',
    '(5) x − \\frac{\\pi}{4} = n\\pi ⇒ x = \\frac{\\pi}{4} + n\\pi，n = 0 \\sim 7：和 = 8 \\cdot \\frac{\\pi}{4} + 28\\pi = 30\\pi',
  ], { s: 12.5, lh: 1.6, gap: 2 });
});

/* ---------------- 第 4 頁 : Q10 – Q11 ---------------- */
page(5, (pg, sk) => {
  // Q10
  MANS(pg, 16, 103, [1, 4]);
  MK(pg, 638, 408, true); MK(pg, 286, 462, false); MK(pg, 412, 489, false); MK(pg, 330, 516, true); MK(pg, 662, 542, false);
  T(pg, 306, 461, '胸圍 > 140 有 17 隻，其中體重 > 200 有 8 隻', { s: 12 });
  T(pg, 432, 488, '第 15、16 小的體重約 170', { s: 12 });
  T(pg, 350, 515, 'm = r \\cdot \\frac{43.83}{11.26} ≈ 3.89r < 4', { s: 12 });
  T(pg, 100, 572, [
    '(1) 體重 < 150 的有 6 隻：\\frac{6}{30} = 20\\% > 18\\%　(2) \\frac{8}{17} ≈ 47\\% < 55\\%',
    '(4) 0 < r < 1 ⇒ m < 3.9　(5) 預估 y = 171.27 + m(160 − 139.27) < 171.27 + 4 \\times 20.73 = 254.19 < 255',
  ], { s: 12.5, lh: 1.7, gap: 2 });

  // Q11
  MANS(pg, 16, 694, [1, 3, 5]);
  MK(pg, 616, 739, true); MK(pg, 616, 768, false); MK(pg, 680, 795, true); MK(pg, 693, 824, false); MK(pg, 432, 861, true);
  T(pg, 100, 898, [
    '\\orange{\\vec{a} ∦ \\vec{b} ⇔ (k + 1)(k − 2) − 4 = (k − 3)(k + 2) \\ne 0 ⇒ (x, y) 唯一}',
    'k = 3：\\vec{a} = (4, 4)、\\vec{b} = (1, 1)；k = −2：\\vec{a} = (−1, 4)、\\vec{b} = (1, −4) 都平行',
    '(1) k = 0 唯一解　(2) \\vec{c} = (1, 1) 就有解　(3) (3, 2) 不平行 (1, 1)、(1, −4) ⇒ 無解',
    '(4) k = −2 時 (1, −4) ∥ \\vec{a}、\\vec{b} ⇒ 無限多組',
    '(5) 行列式 = |\\vec{a}||\\vec{b}|\\sin\\theta = −|\\vec{a}||\\vec{b}| ⇔ \\vec{a} 順時針轉 90\\deg 到 \\vec{b}',
    '\\vec{a} \\cdot \\vec{b} = 5k − 7 = 0 ⇒ k = \\frac{7}{5}：行列式 = \\frac{12}{5} \\cdot (−\\frac{3}{5}) − 4 = −\\frac{136}{25} = −|\\vec{a}||\\vec{b}| \\ok',
  ], { s: 12.5, lh: 1.5, gap: 1 });
});

/* ---------------- 第 5 頁 : Q12 – Q13 ---------------- */
page(6, (pg, sk) => {
  // Q12
  MANS(pg, 16, 104, [4, 5]);
  MK(pg, 464, 250, false); MK(pg, 648, 336, false); MK(pg, 450, 501, false); MK(pg, 497, 580, true); MK(pg, 494, 652, true);
  T(pg, 470, 489, [
    'M、N 是旋轉/鏡射 (長度不變)，T = \\sqrt5 \\times 旋轉',
    '⇒ |\\vec{OD}| = \\sqrt5 \\ne |(−\\frac{3}{5}, \\frac{4}{5})| = 1',
  ], { s: 11.5, lh: 1.25 });
  T(pg, 517, 567, [
    'JT：單位圓 → 半徑 5 的圓',
    'S：(20\\cos\\theta, 15\\sin\\theta) ⇒ 20 + 15 = 35',
  ], { s: 10.5, lh: 1.25 });
  T(pg, 514, 650, '距離 5 \\sim 20 ⇒ 5 + 20 = 25 \\gray{(見下)}', { s: 11.5 });
  T(pg, 82, 676, [
    '(1) 每反射一次轉 180\\deg − 2 \\cdot 15\\deg = 150\\deg：P_{114} 在 −90\\deg + 115 \\times 150\\deg ≡ 240\\deg ⇒ (−\\frac{1}{2}, −\\frac{\\sqrt3}{2})',
    '(2) J = \\sqrt5 \\times 鏡射 ⇒ \\ov{Q_nQ_{n+1}} 公比 \\sqrt5，\\ov{Q_1Q_2} = |(−2, 1) − (0, −5)| = 2\\sqrt{10}；2\\sqrt{10}(\\sqrt5)^7 ≈ 1768 < 2025 ⇒ n = 9',
    '(5) |U(5\\cos\\theta, 5\\sin\\theta)|^2 = 25(13\\cos^2\\theta + 12\\sin\\theta\\cos\\theta + 4\\sin^2\\theta) = 25(\\frac{17}{2} + \\frac{9}{2}\\cos 2\\theta + 6\\sin 2\\theta) \\in [25, 400]',
  ], { s: 12, lh: 1.5, gap: 0 });

  // Q13
  ANS(pg, 4, 838, '−6', { s: 17 });
  T(pg, 100, 912, [
    '\\cases{x − y + 3z = 4 \\\\ 2x + y + 5z = −5 \\\\ 3x + 2y + 6z = −11}　①+②：3x + 8z = −1',
    '②×2 − ③：x + 4z = 1 ⇒ x = −3，z = 1，y = −4',
    'x + y + z = \\red{\\box{−6}}',
  ], { s: 13.5, lh: 1.5, gap: 4 });
});

/* ---------------- 第 6 頁 : Q14 – Q17 ---------------- */
page(7, (pg, sk) => {
  // Q14
  ANS(pg, 4, 101, '\\frac{−\\sqrt{15}}{8}', { s: 15 });
  T(pg, 450, 152, [
    'B、C、D 相鄰，',
    'E 在 D 隔一點的',
    '頂點正上方',
  ], { s: 11.5, lh: 1.3 });
  T(pg, 300, 205, [
    '\\ov{AE} = \\ov{BD} = \\sqrt3 \\gray{(短對角線)}',
    '\\ov{AD} = \\ov{DE} = \\sqrt{9 + 3} = 2\\sqrt3',
  ], { s: 12, lh: 1.4 });
  T(pg, 82, 256, [
    '\\cos\\ang ADE = \\frac{12 + 12 − 3}{2 \\cdot 12} = \\frac{7}{8}；DC ⊥ 鉛直、DC ⊥ 底面的 DE\' ⇒ \\ang CDE = 90\\deg',
    '\\cos(\\ang ADE + 90\\deg) = −\\sin\\ang ADE = \\red{\\box{−\\frac{\\sqrt{15}}{8}}}',
  ], { s: 12.5, lh: 1.6, gap: 2 });
  {
    const A = [671, 143.5], D = [625, 244], E = [624.5, 117];
    sk.poly([A, D, E], { closed: true, c: 'orange', w: 1.3 });
  }

  // Q15
  ANS(pg, 4, 345, '8400', { s: 17 });
  T(pg, 100, 438, [
    '天數分配 (每項 \\ge 1，共 7 天)：',
    '4,1,1,1：4 \\cdot \\frac{7!}{4!} = 840　3,2,1,1：4 \\cdot 3 \\cdot \\frac{7!}{3!2!} = 5040　2,2,2,1：4 \\cdot \\frac{7!}{2!2!2!} = 2520',
    '共 840 + 5040 + 2520 = \\red{\\box{8400}} \\gray{(驗算：4^7 − 4 \\cdot 3^7 + 6 \\cdot 2^7 − 4 = 8400)}',
  ], { s: 12.5, lh: 1.6, gap: 2 });

  // Q16
  ANS(pg, 4, 542, '\\frac{16}{81}', { s: 17 });
  T(pg, 100, 680, [
    '\\vec{c} = \\vec{b} − x\\vec{a} ⊥ \\vec{a} \\times \\vec{b}，又 \\vec{c} ⊥ \\vec{a} ⇒ \\vec{c} ∥ \\vec{a} \\times (0, 1, −1) = (4, 1, 1)',
    '設 \\vec{c} = t(4, 1, 1)：\\vec{a} \\times \\vec{b} = \\vec{a} \\times \\vec{c} = t(0, −9, 9) = (0, 1, −1) ⇒ t = −\\frac{1}{9}',
    'p^2 − q^2 + r^2 = t^2(16 − 1 + 1) = \\red{\\box{\\frac{16}{81}}}',
  ], { s: 12.5, lh: 1.6, gap: 2 });

  // Q17
  ANS(pg, 4, 786, '\\frac{3}{2}', { s: 17 });
  T(pg, 82, 930, [
    'y = 2^x 與 y = \\log_2 x 對稱於 y = x，圓也是',
    '⇒ 設 A(a, 2^a)，則 B(2^a, a)',
    '\\cos\\ang AOB = \\frac{\\vec{OA} \\cdot \\vec{OB}}{|\\vec{OA}|^2} = \\frac{2a \\cdot 2^a}{272} = \\frac{8}{17}',
    '⇒ a \\cdot 2^a = 64 ⇒ a = 4 \\gray{(遞增，唯一)}',
    '\\gray{驗算 4^2 + 16^2 = 272 \\ok}　A(4, 16)、B(16, 4)',
    '\\frac{x_1 + 2x_2}{y_1 + 2y_2} = \\frac{4 + 32}{16 + 8} = \\red{\\box{\\frac{3}{2}}}',
  ], { s: 12.5, lh: 1.5, gap: 1 });
  {
    const u = 5.6, O = [612, 1070], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 8, O[1], O[0] + 128, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 8, O[0], O[1] - 128, { c: 'gray', w: 0.8, head: 3.5 });
    let a = M(0, 0), b = M(20, 20); sk.line(a[0], a[1], b[0], b[1], { c: 'gray', w: 0.9, dash: '3 3' });
    sk.arc(O[0], O[1], u * Math.sqrt(272), 2, 88, { c: 'green', w: 1, dash: '4 3' });
    sk.fn(x => Math.pow(2, x), -1, 4.3, M, { c: 'blue', w: 1.3 });
    sk.fn(x => Math.log2(x), 0.5, 21, M, { c: 'blue', w: 1.3, n: 60 });
    const A = M(4, 16), B = M(16, 4);
    sk.line(O[0], O[1], A[0], A[1], { c: 'orange', w: 1 }); sk.line(O[0], O[1], B[0], B[1], { c: 'orange', w: 1 });
    sk.dot(A[0], A[1], { r: 1.8, c: 'red' }); sk.dot(B[0], B[1], { r: 1.8, c: 'red' });
    sk.label(A[0] + 4, A[1] - 12, 'A(4, 16)', { s: 10 });
    sk.label(B[0] - 26, B[1] + 9, 'B(16, 4)', { s: 10 });
    sk.label(b[0] - 6, b[1] - 14, '\\gray{y = x}', { s: 9 });
  }
});

/* ---------------- 第 7 頁 : Q18 – Q19 ---------------- */
page(8, (pg, sk) => {
  // Q18
  ANS(pg, 18, 415, '(1)');
  T(pg, 100, 590, [
    'B(6, 4) 是頂點 ⇒ 拋物線：y = a(x − 6)^2 + 4，A(0, 2) 代入：36a + 4 = 2 ⇒ a = −\\frac{1}{18}',
    '即 y = −\\frac{1}{18}x^2 + \\frac{2}{3}x + 2，在 x = 0 的一次近似取一次以下的項',
    '⇒ L：y = \\frac{2}{3}x + 2，斜率 \\red{\\box{\\frac{2}{3}}}',
  ], { s: 13, lh: 1.6, gap: 2 });

  // Q19
  ANS(pg, 4, 690, ['(\\frac{12}{5},', '\\frac{8}{5},', '\\frac{16}{5})'], { s: 13, lh: 1.35 });
  T(pg, 100, 935, [
    '\\vec{OQ} 方向 (1, 0, 0)，\\vec{PR} = (12, 8, −4) ∥ (3, 2, −1)',
    '設 D(t, 0, 0)，F = P + s(3, 2, −1) = (3s, 2s, 4 − s) ⇒ \\vec{DF} = (3s − t, 2s, 4 − s)',
    '\\vec{DF} ⊥ (1, 0, 0)：3s − t = 0',
    '\\vec{DF} ⊥ (3, 2, −1)：3(3s − t) + 4s − (4 − s) = 0 ⇒ 5s = 4 ⇒ s = \\frac{4}{5}，t = \\frac{12}{5}',
    '⇒ F = \\red{\\box{(\\frac{12}{5}, \\frac{8}{5}, \\frac{16}{5})}}',
  ], { s: 13, lh: 1.5, gap: 2 });
});

/* ---------------- 第 8 頁 : Q20 ---------------- */
page(9, (pg, sk) => {
  ANS(pg, 8, 107, '\\frac{32}{5}', { s: 17 });
  T(pg, 82, 318, [
    'D(\\frac{12}{5}, 0, 0)、F(\\frac{12}{5}, \\frac{8}{5}, \\frac{16}{5}) 的 x 坐標相同，E 也是',
    '⇒ 平面 Ω：x = \\frac{12}{5}，平行 yz 平面',
    'E 在 \\ov{PQ} 上：(8u, 0, 4 − 4u)，8u = \\frac{12}{5} ⇒ E(\\frac{12}{5}, 0, \\frac{14}{5})',
    'G 在 \\ov{OR} 上：(12v, 8v, 0) ⇒ G(\\frac{12}{5}, \\frac{8}{5}, 0)',
    '\\orange{補成三角柱 ODG − PD_1G_1 (高 \\ov{OP} = 4)，再扣掉上面的四角錐 P − D_1G_1FE}',
    'D_1(\\frac{12}{5}, 0, 4)、G_1(\\frac{12}{5}, \\frac{8}{5}, 4)',
    '三角柱 = \\frac{1}{2} \\cdot \\frac{12}{5} \\cdot \\frac{8}{5} \\cdot 4 = \\frac{192}{25}',
    '梯形 D_1G_1FE：上下底 \\ov{D_1E} = \\frac{6}{5}、\\ov{G_1F} = \\frac{4}{5}，高 \\ov{D_1G_1} = \\frac{8}{5} ⇒ 面積 = \\frac{1}{2}(\\frac{6}{5} + \\frac{4}{5}) \\cdot \\frac{8}{5} = \\frac{8}{5}',
    '四角錐 = \\frac{1}{3} \\cdot \\frac{8}{5} \\cdot \\frac{12}{5} = \\frac{32}{25} \\gray{(高 = P 到 Ω 的距離 \\frac{12}{5})}',
    '體積 = \\frac{192}{25} − \\frac{32}{25} = \\frac{160}{25} = \\red{\\box{\\frac{32}{5}}}',
  ], { s: 13, lh: 1.55, gap: 2 });
  {   // oblique sketch: x → right-down, y → right-up, z → up
    const S = 40, X0 = [604, 566], P3 = ([x, y, z]) => [X0[0] + S * (0.6 * x + 0.75 * y), X0[1] + S * (0.6 * x - 0.25 * y - 0.95 * z)];
    const O = P3([0, 0, 0]), P = P3([0, 0, 4]), D = P3([2.4, 0, 0]), G = P3([2.4, 1.6, 0]);
    const E = P3([2.4, 0, 2.8]), F = P3([2.4, 1.6, 3.2]), D1 = P3([2.4, 0, 4]), G1 = P3([2.4, 1.6, 4]);
    sk.poly([D1, G1, F, E], { fill: 'hl', op: 0.5, c: 'none' });
    const L = (a, b, o) => sk.line(a[0], a[1], b[0], b[1], o);
    const solid = { c: 'blue', w: 1.3 }, dsh = { c: 'gray', w: 1, dash: '3 3' };
    L(O, D, solid); L(D, G, solid); L(O, G, dsh); L(O, P, solid); L(D, E, solid); L(G, F, solid);
    L(P, E, solid); L(E, F, solid); L(P, F, solid);
    L(E, D1, dsh); L(F, G1, dsh); L(P, D1, dsh); L(P, G1, dsh); L(D1, G1, dsh);
    [[O, 'O', -14, -4], [P, 'P', -14, -10], [D, 'D', -4, 4], [G, 'G', 5, -4], [E, 'E', -15, -4], [F, 'F', 6, -6],
     [D1, 'D_1', -6, -20], [G1, 'G_1', 4, -16]].forEach(([p, s, dx, dy]) => { sk.dot(p[0], p[1], { r: 1.5 }); sk.label(p[0] + dx, p[1] + dy, s, { s: 11 }); });
    sk.label((O[0] + D[0]) / 2 - 26, (O[1] + D[1]) / 2 + 2, '\\green{\\small{12/5}}', { s: 9 });
    sk.label((D[0] + G[0]) / 2 + 4, (D[1] + G[1]) / 2 + 2, '\\green{\\small{8/5}}', { s: 9 });
    sk.label(O[0] - 14, (O[1] + P[1]) / 2 - 6, '\\green{4}', { s: 10 });
  }
});
