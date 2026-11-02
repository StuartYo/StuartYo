/* 北北基 114 學年度學科能力測驗聯合模擬考試 數學A（翰林 第四次／114-E4） — handwritten solutions
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet); the booklet's own 詳解 is PDF p.10–14 (p.9 its cover).
 * Methods follow that 詳解, trimmed. Q6 uses (w+u)·(w+v) = |w|² + u·v; Q12 gets t from the E2–E3 angle
 * (t = ±1) plus the E1–E3 angle, instead of the 詳解's integer-point check; Q20 notes (PA − QB)·d = 0.
 * Pages are 618 x 867 pt; backgrounds are rendered straight to 1588 x 2246 so lines.py gives engine coords.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈82, options at x≈104.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 28, 256, '(1)');
  T(pg, 140, 414, [
    '對第三列展開：x(4 − 1) − y(2 − 2) + z(1 − 4) = 10 ⇒ E：3x − 3z = 10',
    'F ∥ E 且過原點 ⇒ F：3x − 3z = 0',
    'd(E, F) = \\frac{|10 − 0|}{\\sqrt{3^2 + 3^2}} = \\frac{10}{3\\sqrt2} = \\red{\\box{\\frac{5\\sqrt2}{3}}}',
  ], { s: 13.5, lh: 1.5, gap: 2 });

  // Q2
  ANS(pg, 28, 531, '(4)');
  T(pg, 110, 690, [
    '設實際快樂的比例為 p',
    'P(識別為快樂) = 0.7p + 0.2(1 − p) = 0.5',
    '⇒ 0.5p = 0.3 ⇒ p = 0.6',
    'P(快樂 | 識別為快樂) = \\frac{0.6 \\times 0.7}{0.5} = 0.84 ≈ \\red{\\box{0.85}}',
  ], { s: 13.5, lh: 1.5, gap: 1 });
  {   // probability tree
    const R0 = [575, 718], H = [625, 676], N = [625, 760];
    sk.line(R0[0], R0[1], H[0] - 4, H[1] + 6, { c: 'green', w: 1.1 });
    sk.line(R0[0], R0[1], N[0] - 4, N[1] - 6, { c: 'green', w: 1.1 });
    sk.label(H[0], H[1] - 8, '快樂', { s: 11 });
    sk.label(N[0], N[1] - 8, '不快樂', { s: 11 });
    sk.label(581, 680, '\\orange{p}', { s: 11 });
    sk.label(568, 744, '\\orange{1 − p}', { s: 10 });
    sk.line(H[0] + 28, H[1], 697, 662, { c: 'green', w: 1 });
    sk.line(H[0] + 28, H[1] + 4, 697, 692, { c: 'green', w: 1 });
    sk.line(N[0] + 40, N[1], 709, 746, { c: 'green', w: 1 });
    sk.line(N[0] + 40, N[1] + 4, 709, 776, { c: 'green', w: 1 });
    sk.label(701, 652, '\\red{0.7 識快}', { s: 10 });
    sk.label(701, 683, '\\gray{0.3}', { s: 10 });
    sk.label(713, 736, '\\gray{0.8}', { s: 10 });
    sk.label(713, 767, '\\red{0.2 識快}', { s: 10 });
  }

  // Q3
  ANS(pg, 28, 801, '(2)');
  T(pg, 110, 980, [
    'P \\to Q：A = \\mat{1&1\\\\3&4}；Q \\to R (對 x = 0 鏡射)：B = \\mat{−1&0\\\\0&1}',
    'R = BAP ⇒ M = (BA)^{−1} = \\mat{−1&−1\\\\3&4}\\up{−1} = \\frac{1}{−1}\\mat{4&1\\\\−3&−1} = \\red{\\box{\\mat{−4&−1\\\\3&1}}}',
  ], { s: 13.5, lh: 1.6, gap: 8 });
});

/* ---------------- 第 2 頁 : Q4 – Q6 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 28, 107, '(4)');
  T(pg, 200, 140, [
    '2025^{2025} = (2000 + 25)^{2025}，二項展開',
    '除了 25^{2025}，其餘各項都含 2000 \\times 25 = 50000 的因數',
    '⇒ 都是 10000 的倍數 ⇒ 末四位與 25^{2025} 相同',
    '25^2 = 625，25^3 = 15625，0625 \\times 25 = 15625 → 5625',
    '5625 \\times 25 = 140625 → 0625 ⇒ 奇次方 (\\ge 3) 末四位 5625',
    '⇒ 末四位 5625，和 = 5 + 6 + 2 + 5 = \\red{\\box{18}}',
  ], { s: 13.5, lh: 1.55, gap: 3 });

  // Q5
  ANS(pg, 28, 404, '(4)');
  T(pg, 220, 486, [
    '三個點數相異，「越來越大」的順序只有一種',
    '最大點數 c：另兩數從 1 ～ c − 1 選 2 個 ⇒ C\\stk{c−1}{2} 種',
    'c = 3, 4, 5, 6 依序 1, 3, 6, 10 種',
  ], { s: 13, lh: 1.6, gap: 2 });
  T(pg, 140, 604, [
    'E = \\frac{720}{6^3}(3 \\times 1 + 4 \\times 3 + 5 \\times 6 + 6 \\times 10) = \\frac{10}{3} \\times 105 = \\red{\\box{350}} 元',
  ], { s: 14 });

  // Q6
  ANS(pg, 28, 753, '(3)');
  T(pg, 190, 842, [
    '\\vec{w} \\perp \\vec{u} ⇒ \\vec{w} + \\vec{u} 在 \\vec{w} 上的正射影就是 \\vec{w} ⇒ |\\vec{w}| = 2\\sqrt6',
    '|\\vec{u}|^2 = |\\vec{w} + \\vec{u}|^2 − |\\vec{w}|^2 = 29 − 24 = 5，|\\vec{v}|^2 = 38 − 24 = 14',
    '(\\vec{w} + \\vec{u}) \\cdot (\\vec{w} + \\vec{v}) = |\\vec{w}|^2 + \\vec{u} \\cdot \\vec{v} = 12 + 6 + 10 ⇒ \\vec{u} \\cdot \\vec{v} = 28 − 24 = 4',
    '\\vec{u}、\\vec{v} 張出的面積 = \\sqrt{5 \\cdot 14 − 4^2} = \\sqrt{54} = 3\\sqrt6',
    '\\vec{w} 垂直底面 ⇒ 體積 = 3\\sqrt6 \\times 2\\sqrt6 = \\red{\\box{36}}',
  ], { s: 13, lh: 1.55, gap: 3 });
});

/* ---------------- 第 3 頁 : Q7 – Q8 ---------------- */
page(4, (pg, sk) => {
  // Q7
  MANS(pg, 24, 186, [2, 4, 5]);
  T(pg, 362, 210, '\\orange{f = (x + 3)[(x + 3) + 4][(x + 3) − 4] = (x + 3)^3 − 16(x + 3)}', { s: 12 });
  MK(pg, 164, 237, false);
  T(pg, 184, 238, 'a = 1，p = −16 ⇒ ap < 0', { s: 12 });
  MK(pg, 344, 262, true);
  T(pg, 364, 263, '對稱中心 (h, k) = (−3, 0)', { s: 12 });
  MK(pg, 367, 287, false);
  T(pg, 387, 288, '三次函數圖形是點對稱，沒有對稱軸', { s: 12 });
  MK(pg, 367, 311, true);
  T(pg, 387, 311, 'f = (x + 3)^2 \\cdot (x + 3) − 16(x + 3) ⇒ 餘式 −16x − 48', { s: 11.5 });
  MK(pg, 406, 336, true);
  T(pg, 426, 337, 'x^3 + 9x^2 + 11x = 0 ⇒ x(x^2 + 9x + 11) = 0', { s: 12 });
  T(pg, 110, 368, '(5) 判別式 81 − 44 = 37 > 0，且 x = 0 不是 x^2 + 9x + 11 的根 ⇒ 3 個相異實根 ⇒ 3 個交點', { s: 12 });

  // Q8
  MANS(pg, 24, 432, [1, 3, 5]);
  MK(pg, 228, 828, true);
  T(pg, 248, 829, '10000 \\div 795573 ≈ 1.26\\% < 1.5\\%', { s: 12 });
  MK(pg, 521, 856, false);
  T(pg, 541, 857, '−1 \\le r \\le 1；1.1051 是斜率', { s: 12 });
  MK(pg, 687, 880, true);
  MK(pg, 526, 905, false);
  T(pg, 546, 906, '迴歸直線只看相關，不能推因果', { s: 11.5 });
  MK(pg, 188, 954, true);
  T(pg, 208, 955, 'y = 1.1051 \\times 20 − 0.5049 = 22.102 − 0.5049 = 21.5971', { s: 12 });
  T(pg, 110, 990, '(3) 斜率 1.1051：x 每增加 1 (％)，y 約增加 1.1051 (％)', { s: 12.5 });
});

/* ---------------- 第 4 頁 : Q9 – Q11 ---------------- */
page(5, (pg, sk) => {
  // Q9
  MANS(pg, 24, 108, [1, 5]);
  MK(pg, 164, 136, true);
  T(pg, 184, 137, '\\frac{3^a}{2^a} = (\\frac{3}{2})^a > 1', { s: 11.5 });
  MK(pg, 211, 162, false);
  T(pg, 231, 162, 'a = \\frac{1}{2}：\\log_2 \\frac{1}{2} = −1 < \\log_3 \\frac{1}{2} = −\\frac{\\log2}{\\log3} ≈ −0.63', { s: 11.5 });
  MK(pg, 276, 192, false);
  T(pg, 296, 193, 'y = \\log x 凹口向下 ⇒ 應為「\\le」', { s: 11.5 });
  MK(pg, 313, 232, false);
  T(pg, 333, 233, 'a = \\frac{1}{10}，b = \\frac{1}{1000}：左 = −2 < 0 < 右 = \\sqrt3', { s: 11.5 });
  MK(pg, 238, 265, true);
  T(pg, 258, 266, '算幾：\\ge 2\\sqrt{3^{\\log2} \\cdot 3^{\\log5}} = 2\\sqrt{3^{\\log10}} = 2\\sqrt3', { s: 11.5 });
  T(pg, 110, 312, [
    '(2) 0 < a < 1：\\log a < 0 ⇒ \\log_2 a = \\frac{\\log a}{\\log2} < \\frac{\\log a}{\\log3} = \\log_3 a',
    '(3) 弦的中點在圖形下方：\\frac{\\log a + \\log b}{2} \\le \\log\\frac{a + b}{2} \\gray{(例 a = 1，b = 100：1 < \\log 50.5)}',
  ], { s: 12, lh: 1.6, gap: 4 });
  {   // y = log x is concave: chord below the curve
    const O = [598, 410], u = 26, M = (x, y) => [O[0] + u * x, O[1] - 52 * y];
    sk.arrow(O[0] - 8, O[1], O[0] + 160, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 30, O[0], O[1] - 92, { c: 'gray', w: 0.8, head: 3.5 });
    sk.fn(x => Math.log10(x), 0.35, 6, M, { c: 'blue', w: 1.3 });
    const A = M(0.8, Math.log10(0.8)), B = M(5.5, Math.log10(5.5)), mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const T2 = M(3.15, Math.log10(3.15));
    sk.line(A[0], A[1], B[0], B[1], { c: 'green', w: 1.1 });
    sk.line(mid[0], mid[1], T2[0], T2[1], { c: 'orange', w: 1, dash: '2 2' });
    sk.dot(mid[0], mid[1], { r: 1.7, c: 'green' }); sk.dot(T2[0], T2[1], { r: 1.7, c: 'red' });
    sk.label(B[0] - 30, B[1] - 24, 'y = \\log x', { s: 11 });
  }

  // Q10
  MANS(pg, 24, 434, [1, 2, 4]);
  T(pg, 330, 461, '\\orange{M(1, 0)，r = 4，d(M, L) = \\frac{|4 + 1|}{5} = 1}', { s: 12 });
  MK(pg, 198, 486, true);
  T(pg, 218, 487, '\\ov{AB} = 2\\sqrt{4^2 − 1^2} = 2\\sqrt{15}', { s: 12 });
  MK(pg, 235, 524, true);
  T(pg, 255, 525, '\\frac{4^2 + 4^2 − (2\\sqrt{15})^2}{2 \\cdot 4 \\cdot 4} = \\frac{−28}{32} = −\\frac{7}{8}', { s: 11.5 });
  MK(pg, 402, 560, false);
  T(pg, 422, 561, 'M 這側 2 個、另一側 1 個 (相切) ⇒ 3 個', { s: 11.5 });
  MK(pg, 425, 585, true);
  MK(pg, 520, 608, false);
  T(pg, 540, 609, 'Q(−2, 4)，\\ov{QM} = 5 ⇒ 最大 (5 + 4)^2 = 81', { s: 11.5 });
  T(pg, 110, 642, [
    '(4) 圓上點到 L 的距離：M 那一側 0 ～ 1 + 4 = 5，另一側 0 ～ 4 − 1 = 3',
    'd = 0：2 點；M 側 d = 1, 2, 3, 4 各 2 點、d = 5：1 點',
    '另一側 d = 1, 2 各 2 點、d = 3：1 點',
    '⇒ 2 + 9 + 5 = \\red{16} 個',
  ], { s: 12, lh: 1.5, gap: 1 });
  {   // circle, chord L, and the two lines at distance 3 from L
    const u = 13, O = [668, 705], r = 4 * u, n = [0.8, 0.6];   // unit normal of L (M side is +n since 4+0+1 > 0)
    const P = (dist, t) => [O[0] + u * ((dist) * n[0] + t * n[1]), O[1] - u * ((dist) * n[1] - t * n[0])];
    sk.circle(O[0], O[1], r, { c: 'blue', w: 1.2 });
    sk.dot(O[0], O[1], { r: 1.6 }); sk.label(O[0] + 3, O[1] - 2, '\\small{M}', { s: 9 });
    let a = P(-1, -5), b = P(-1, 5); sk.line(a[0], a[1], b[0], b[1], { c: 'blue', w: 1.3 });
    sk.label(b[0] - 14, b[1] - 6, '\\small{L}', { s: 10 });
    a = P(2, -Math.sqrt(12)); b = P(2, Math.sqrt(12)); sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 1, dash: '3 3' });
    sk.dot(a[0], a[1], { r: 1.8, c: 'red' }); sk.dot(b[0], b[1], { r: 1.8, c: 'red' });
    a = P(-4, -2.2); b = P(-4, 2.2); sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 1, dash: '3 3' });
    const t = P(-4, 0); sk.dot(t[0], t[1], { r: 1.8, c: 'red' });
    sk.label(O[0] + 50, O[1] - 30, '\\green{d = 3}', { s: 10.5 });
    sk.label(t[0] - 46, t[1] - 4, '\\green{d = 3}', { s: 10.5 });
  }

  // Q11
  MANS(pg, 24, 780, [1, 5]);
  T(pg, 250, 801, '\\orange{f(x) = \\sqrt2\\sin(\\pi x + \\frac{\\pi}{4})}', { s: 12 });
  MK(pg, 257, 831, true);
  T(pg, 277, 831, '週期 \\frac{2\\pi}{\\pi} = 2', { s: 11.5 });
  MK(pg, 348, 855, false);
  T(pg, 368, 856, '最大值 \\sqrt2 (x = \\frac{1}{4})', { s: 11.5 });
  MK(pg, 356, 880, false);
  T(pg, 376, 881, 'f(0) = f(2) = 1，k = 1 才恰有三個交點', { s: 11.5 });
  MK(pg, 687, 904, false);
  MK(pg, 546, 937, true);
  T(pg, 566, 937, '\\frac{3}{4} < x < \\frac{7}{4} 時 f < 0', { s: 11.5 });
  T(pg, 110, 972, [
    '(3) k = −1 時只交 2 點',
    '(4) k = 1：\\sin(\\pi x + \\frac{\\pi}{4}) = \\frac{1}{\\sqrt2}',
    '⇒ x = 0、\\frac{1}{2}、2',
    '⇒ 和 = \\frac{5}{2} < 3',
    '(5) b 最大 = \\frac{7}{4}',
  ], { s: 12, lh: 1.4, gap: 0 });
  {   // graph of f on [0, 2]
    const O = [430, 1040], ux = 120, uy = 34, M = (x, y) => [O[0] + ux * x, O[1] - uy * y];
    sk.arrow(O[0] - 10, O[1], O[0] + 2.25 * ux, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 56, O[0], O[1] - 60, { c: 'gray', w: 0.8, head: 3.5 });
    sk.fn(x => Math.SQRT2 * Math.sin(Math.PI * x + Math.PI / 4), 0, 2, M, { c: 'blue', w: 1.4 });
    let a = M(-0.05, 1), b = M(2.15, 1); sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 0.9, dash: '3 3' });
    a = M(-0.05, -1); b = M(2.15, -1); sk.line(a[0], a[1], b[0], b[1], { c: 'gray', w: 0.8, dash: '2 3' });
    [0, 0.5, 2].forEach(x => { const p = M(x, 1); sk.dot(p[0], p[1], { r: 1.8, c: 'red' }); });
    sk.line(M(0.75, 0)[0], O[1], M(1.75, 0)[0], O[1], { c: 'orange', w: 2.2 });
    sk.label(b[0] - 26, M(0, 1)[1] - 16, '\\green{y = 1}', { s: 11 });
    sk.label(b[0] - 26, M(0, -1)[1] + 1, '\\gray{y = −1}', { s: 11 });
    sk.label(M(0.75, 0)[0] - 10, O[1] - 30, '\\orange{\\frac{3}{4}}', { s: 11 });
    sk.label(M(1.75, 0)[0] - 4, O[1] - 30, '\\orange{\\frac{7}{4}}', { s: 11 });
    sk.label(M(2, 0)[0] - 3, O[1] + 2, '\\gray{2}', { s: 10.5 });
    sk.label(M(1, 0)[0] - 3, O[1] + 2, '\\gray{1}', { s: 10.5 });
    sk.label(O[0] - 12, O[1] + 1, '\\gray{\\small{O}}', { s: 9 });
  }
});

/* ---------------- 第 5 頁 : Q12 – Q16 ---------------- */
page(6, (pg, sk) => {
  // Q12
  MANS(pg, 24, 108, [2, 4]);
  MK(pg, 364, 216, false);
  T(pg, 384, 217, '\\cos = \\frac{|(1, −1, −1) \\cdot (1, 1, −1)|}{\\sqrt3 \\cdot \\sqrt3} = \\frac{1}{3}', { s: 11.5 });
  MK(pg, 396, 254, true);
  T(pg, 416, 255, '(1, −1, −1) \\times (1, 1, −1) = (2, 0, 2) ∥ (1, 0, 1)', { s: 11.5 });
  MK(pg, 152, 279, false);
  MK(pg, 160, 303, true);
  MK(pg, 280, 328, false);
  T(pg, 300, 276, [
    'E_2、E_3：\\frac{|t|}{\\sqrt{3(t^2 + 2)}} = \\frac{1}{3} ⇒ t^2 = 1 ⇒ t = ±1',
    'E_1、E_3：\\frac{|2 − t|}{\\sqrt{3(t^2 + 2)}} = \\frac{1}{3} ⇒ t = 1 ⇒ P(3, 1, −1)',
  ], { s: 11.5, lh: 1.55, gap: 2 });
  T(pg, 110, 356, '(5) L_2：(1, 1, −1) \\times (1, −1, 1) = (0, −2, −2) ∥ (0, 1, 1)，\\cos = \\frac{(1, 0, 1) \\cdot (0, 1, 1)}{\\sqrt2 \\cdot \\sqrt2} = \\frac{1}{2} ⇒ 60\\deg', { s: 11.5 });

  // Q13
  ANS(pg, 22, 476, '60', { s: 19 });
  T(pg, 110, 548, 'a_{k + 1} = 2a_k ⇒ b_k = a_k + 4a_k = 5a_k ⇒ 前 114 項和 = 5 \\times 12 = \\red{\\box{60}}', { s: 13.5 });

  // Q14
  ANS(pg, 22, 600, '\\frac{13}{6}', { s: 17 });
  T(pg, 345, 620, [
    '|x − 1| \\le |x − 6|：x 離 1 不比離 6 遠 ⇒ x \\le \\frac{7}{2}',
    '平方：(x − 6)^2 \\le 4(x + 1)^2 ⇒ 3x^2 + 20x − 32 \\ge 0',
    '⇒ (3x − 4)(x + 8) \\ge 0，x > 0 ⇒ x \\ge \\frac{4}{3}',
  ], { s: 12, lh: 1.45, gap: 0 });
  T(pg, 110, 696, '\\frac{4}{3} \\le x \\le \\frac{7}{2} ⇒ 長度 = \\frac{7}{2} − \\frac{4}{3} = \\red{\\box{\\frac{13}{6}}}', { s: 13 });

  // Q15
  ANS(pg, 6, 744, ['(−\\frac{9}{13},', '~\\frac{46}{13})'], { s: 13, lh: 1.25 });
  T(pg, 594, 806, [
    '\\orange{等速 ⇒ A_0、A_2}',
    '\\orange{對稱於 x 軸}',
    '⇒ A_2(3, 2)',
  ], { s: 12, lh: 1.35 });
  T(pg, 110, 887, [
    '\\ang A_2OA_4 = \\ang A_0OA_2 = 2\\theta：\\cos2\\theta = \\frac{3 \\cdot 3 + (−2) \\cdot 2}{13} = \\frac{9 − 4}{13} = \\frac{5}{13}，\\sin2\\theta = \\frac{12}{13}',
    'A_4 = A_2 轉 2\\theta = (\\frac{5 \\cdot 3 − 12 \\cdot 2}{13}, \\frac{12 \\cdot 3 + 5 \\cdot 2}{13}) = \\red{\\box{(−\\frac{9}{13}, \\frac{46}{13})}}',
  ], { s: 12, lh: 1.45, gap: 0 });

  // Q16
  ANS(pg, 22, 945, '\\frac{8}{5}', { s: 17 });
  T(pg, 474, 990, [
    '\\vec{AE} = t\\vec{AC} = \\frac{3t}{2}\\vec{AB} + \\frac{5t}{2}\\vec{AD}',
    'B、E、D 共線 ⇒ \\frac{3t}{2} + \\frac{5t}{2} = 1 ⇒ t = \\frac{1}{4}',
    '\\vec{AE} = \\frac{3}{8}\\vec{AB} + \\frac{5}{8}\\vec{AD} ⇒ \\ov{BE} : \\ov{ED} = 5 : 3',
  ], { s: 12, lh: 1.4, gap: 0 });
  T(pg, 474, 1068, '⇒ \\vec{BD} = \\frac{8}{5}\\vec{BE}，k = \\red{\\box{\\frac{8}{5}}}', { s: 12.5 });
});

/* ---------------- 第 6 頁 : Q17 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q17
  ANS(pg, 4, 108, '\\frac{7\\sqrt3}{3}', { s: 15 });
  T(pg, 225, 222, '\\tri ABD：\\cos B = \\frac{8^2 + 3^2 − 7^2}{2 \\cdot 8 \\cdot 3} = \\frac{1}{2} ⇒ \\ang B = 60\\deg', { s: 12 });
  T(pg, 110, 252, [
    '\\tri ABC：\\ov{AC}^2 = 8^2 + 5^2 − 2 \\cdot 8 \\cdot 5 \\cdot \\frac{1}{2} = 49 ⇒ \\ov{AC} = 7',
    '正弦定理：2R = \\frac{7}{\\sin60\\deg} ⇒ R = \\frac{7}{\\sqrt3} = \\red{\\box{\\frac{7\\sqrt3}{3}}}',
  ], { s: 12, lh: 1.32, gap: 0 });
  {
    const A = [676, 112.5], B = [609, 229], C = [688, 229];
    sk.line(A[0], A[1], C[0], C[1], { c: 'green', w: 1.3 });
    sk.label(684, 160, '\\green{7}', { s: 11 });
    sk.arc(B[0], B[1], 13, 0, 60, { c: 'orange', w: 1 });
    sk.label(B[0] + 15, B[1] - 24, '\\orange{60\\deg}', { s: 10 });
  }

  // Q18
  ANS(pg, 22, 538, '30', { s: 19 });
  T(pg, 572, 543, '\\gray{g = −2(x − 2)^2 + 35}', { s: 11.5 });
  T(pg, 110, 576, [
    'Q(2, 35)；x^2 + 8x = −2x^2 + 8x + 27 ⇒ x^2 = 9 ⇒ A(−3, −15)、B(3, 33)',
    '\\vec{QA} = (−5, −50)、\\vec{QB} = (1, −2) ⇒ 面積 = \\frac{1}{2}|(−5)(−2) − (−50)(1)| = \\red{\\box{30}}',
  ], { s: 12.5, lh: 1.45, gap: 0 });

  // Q19
  ANS(pg, 4, 646, '−\\frac{\\sqrt{10}}{10}', { s: 13 });
  T(pg, 110, 678, [
    'f = (x + 4)^2 − 16 ⇒ P(−4, −16) ⇒ \\vec{PA} = (1, 1)，\\vec{QB} = (1, −2)',
    '\\cos\\theta = \\frac{1 − 2}{\\sqrt2 \\cdot \\sqrt5} = −\\frac{1}{\\sqrt{10}} = \\red{\\box{−\\frac{\\sqrt{10}}{10}}}',
  ], { s: 12.5, lh: 1.45, gap: 0 });

  // Q20
  ANS(pg, 4, 748, 'm = 0', { s: 15 });
  T(pg, 110, 812, [
    'L 的方向向量 \\vec{d} = (1, m)',
    '\\vec{a} 在 L 上的正射影 = \\frac{\\vec{a} \\cdot \\vec{d}}{|\\vec{d}|^2}\\vec{d}',
    '正射影相等 ⇔ \\vec{PA} \\cdot \\vec{d} = \\vec{QB} \\cdot \\vec{d}',
    '⇒ 1 + m = 1 − 2m ⇒ m = \\red{\\box{0}}',
    '\\gray{另看：(\\vec{PA} − \\vec{QB}) \\cdot \\vec{d} = (0, 3) \\cdot (1, m) = 0}',
    '\\gray{⇒ L \\perp (0, 3)，L 是水平線 (x 軸)}',
  ], { s: 13, lh: 1.6, gap: 3 });
  {   // the two parabolas with P, Q, A, B
    const O = [610, 960], sx = 22, sy = 2.6, M = (x, y) => [O[0] + sx * x, O[1] - sy * y];
    sk.arrow(M(-7, 0)[0], O[1], M(6.2, 0)[0], O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], M(0, -19)[1], O[0], M(0, 41)[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.fn(x => x * x + 8 * x, -7.6, 3.4, M, { c: 'blue', w: 1.2 });
    sk.fn(x => -2 * x * x + 8 * x + 27, -3.4, 5.6, M, { c: 'green', w: 1.2 });
    const P = M(-4, -16), Q = M(2, 35), A = M(-3, -15), B = M(3, 33);
    sk.arrow(P[0], P[1], A[0], A[1], { c: 'red', w: 1.4, head: 4 });
    sk.arrow(Q[0], Q[1], B[0], B[1], { c: 'red', w: 1.4, head: 4 });
    [P, Q, A, B].forEach(p => sk.dot(p[0], p[1], { r: 1.8 }));
    sk.label(P[0] - 8, P[1] + 2, 'P', { s: 11 });
    sk.label(A[0] + 5, A[1] - 2, 'A', { s: 11 });
    sk.label(Q[0] - 6, Q[1] - 18, 'Q', { s: 11 });
    sk.label(B[0] + 6, B[1] - 6, 'B', { s: 11 });
    sk.label(O[0] - 12, O[1] + 1, '\\gray{O}', { s: 10 });
    sk.label(M(-7.4, 6)[0], M(-7.4, 6)[1] - 18, '\\blue{y = f(x)}', { s: 10.5 });
    sk.label(M(-3.8, 30)[0], M(-3.8, 30)[1], '\\green{y = g(x)}', { s: 10.5 });
  }
});
