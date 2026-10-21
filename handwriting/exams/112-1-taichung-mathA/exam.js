/* 臺中市立高中 112 學年度學測第一次聯合複習考 數學A — handwritten solutions
 * Based on the booklet's own 詳解 (PDF p.10–15), trimmed; Q15 uses its coordinate 另解, Q14/Q16 are shortened.
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet). The scan pages carry /Rotate 270.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈68, options at x≈92.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 18, 222, '(2)');
  T(pg, 420, 300, [
    '\\mu = \\frac{35 \\times 60 − 95 − 30}{33} = \\frac{1975}{33} ≈ 59.8 < 60',
    '刪掉的是最高、最低兩個極端值',
    '⇒ 資料更集中 ⇒ \\sig \\le 12.3',
  ], { s: 13, lh: 1.5 });
  T(pg, 100, 432, [
    '\\gray{驗算：\\Sig(x_i − 60)^2 = 35 \\times 12.3^2 ≈ 5295，刪掉兩筆剩 5295 − 35^2 − 30^2 ≈ 3170}',
    '\\gray{\\sig^2 \\le \\frac{3170}{33} ≈ 96 < 12.3^2 \\small{(\\Sig(x_i − c)^2 在 c = \\mu 時最小)}}',
  ], { s: 12, lh: 1.45 });

  // Q2
  ANS(pg, 18, 508, '(1)');
  T(pg, 170, 560, [
    '10^{\\log 2} = 2，令 \\frac{a}{b} = t \\small{\\gray{(a \\ne b ⇒ t \\ne 1)}}',
    '第二項上下同除以 b：t + \\frac{t + 10}{1 + 10t} = 2',
    '⇒ t(1 + 10t) + (t + 10) = 2(1 + 10t)',
    '⇒ 10t^2 − 18t + 8 = 0 ⇒ (t − 1)(5t − 4) = 0',
    '⇒ t = \\frac{4}{5} ⇒ \\frac{b}{a} = \\frac{1}{t} = \\red{\\box{\\frac{5}{4}}}',
  ], { s: 14, lh: 1.45, gap: 2 });

  // Q3
  ANS(pg, 18, 806, '(4)');
  T(pg, 180, 866, [
    '設 \\vec{AE} = t\\vec{AC} = 3t\\vec{AB} + 2t\\vec{AD}',
    'B、E、D 共線 ⇒ 3t + 2t = 1 ⇒ t = \\frac{1}{5}',
    '\\vec{AE} = \\frac{3}{5}\\vec{AB} + \\frac{2}{5}\\vec{AD} ⇒ \\ov{BE} : \\ov{ED} = 2 : 3',
    '兩三角形同底 \\ov{AC}，高的比 = \\ov{BE} : \\ov{ED}',
    '⇒ \\tri ABC : \\tri ACD = \\red{\\box{2 : 3}}',
  ], { s: 13.5, lh: 1.5, gap: 2 });
  {   // a cyclic ABCD with AC = 3AB + 2AD (unit circle, rotated so AC is horizontal)
    const O = [670, 975], r = 70, M = ([x, y]) => [O[0] + r * x, O[1] - r * y];
    const A = M([-0.996, 0.092]), B = M([-0.866, -0.500]), C = M([0.997, 0.092]), D = M([-0.194, 0.981]);
    const E = [B[0] + (D[0] - B[0]) * 0.4, B[1] + (D[1] - B[1]) * 0.4];
    sk.circle(O[0], O[1], r, { c: 'gray', w: 0.9 });
    sk.poly([A, B, C, D], { closed: true, c: 'blue', w: 1.3 });
    sk.line(A[0], A[1], C[0], C[1], { c: 'blue', w: 1.1 });
    sk.line(B[0], B[1], D[0], D[1], { c: 'blue', w: 1.1 });
    sk.line(B[0], B[1], B[0], A[1], { c: 'green', w: 1, dash: '3 3' });
    sk.line(D[0], D[1], D[0], A[1], { c: 'green', w: 1, dash: '3 3' });
    sk.dot(E[0], E[1], { r: 1.7 });
    sk.label(A[0] - 15, A[1] - 9, 'A', { s: 11 }); sk.label(B[0] - 12, B[1] - 2, 'B', { s: 11 });
    sk.label(C[0] + 4, C[1] - 9, 'C', { s: 11 }); sk.label(D[0] - 4, D[1] - 19, 'D', { s: 11 });
    sk.label(E[0] + 3, E[1] - 1, 'E', { s: 10 });
    sk.label((B[0] + E[0]) / 2 + 3, (B[1] + E[1]) / 2 - 11, '\\green{2}', { s: 10 });
    sk.label((D[0] + E[0]) / 2 + 3, (D[1] + E[1]) / 2 - 8, '\\green{3}', { s: 10 });
  }
});

/* ---------------- 第 2 頁 : Q4 – Q6 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 18, 90, '(3)');
  T(pg, 160, 146, [
    'C：圓心 (1, 2)，r = 1',
    '直線 x = 2 和圓 C 相切 ⇒ 鉛直線 PA 是一條切線',
    '⇒ A(2, 0)，中點是原點 ⇒ B(−2, 0)',
    'PB：y = m(x + 2) 也和 C 相切',
    '\\frac{|3m − 2|}{\\sqrt{m^2 + 1}} = 1 ⇒ 8m^2 − 12m + 3 = 0',
    'm = \\frac{3 ± \\sqrt3}{4}，P 在圓的上方 (k > 3) 取大的',
    'k = 4m = 3 + \\sqrt3 ≈ \\red{\\box{4.73}}',
  ], { s: 13, lh: 1.45, gap: 1 });
  {
    const u = 27, O = [585, 368], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    const k = 3 + Math.sqrt(3), P = M(2, k), A = M(2, 0), B = M(-2, 0), Q = M(1, 2);
    sk.arrow(O[0] - 80, O[1], O[0] + 115, O[1], { c: 'gray', w: 0.9, head: 4 });
    sk.arrow(O[0], O[1] + 14, O[0], O[1] - 160, { c: 'gray', w: 0.9, head: 4 });
    sk.label(O[0] + 108, O[1] - 2, '\\gray{x}', { s: 10 }); sk.label(O[0] + 5, O[1] - 172, '\\gray{y}', { s: 10 });
    sk.circle(Q[0], Q[1], u, { c: 'blue', w: 1.3 });
    sk.dot(Q[0], Q[1], { r: 1.4 });
    sk.line(P[0], P[1], A[0], A[1], { c: 'orange', w: 1.2 });
    sk.line(P[0], P[1], B[0], B[1], { c: 'orange', w: 1.2 });
    sk.line(B[0], B[1], A[0], A[1], { c: 'red', w: 2.6 });
    [P, A, B].forEach(p => sk.dot(p[0], p[1], { r: 1.8, c: 'red' }));
    sk.label(P[0] + 5, P[1] - 12, 'P(2, k)', { s: 11 });
    sk.label(A[0] + 3, A[1] + 1, 'A', { s: 11 }); sk.label(B[0] - 6, B[1] + 1, 'B', { s: 11 });
    sk.label(O[0] - 12, O[1] + 1, 'O', { s: 10 });
    sk.label(Q[0] - 14, Q[1] + 1, '\\small{(1, 2)}', { s: 9 });
  }

  // Q5
  ANS(pg, 18, 395, '(4)');
  T(pg, 278, 476, [
    '每兩日變成 1.1 \\times 0.9 = 0.99 倍，設經過 n 個「兩日」',
    '0.99^n < \\frac{1}{2} ⇒ n\\log 0.99 < −\\log 2',
    '\\log 0.99 = \\log 9 + \\log 1.1 − 1 ≈ 0.9542 + 0.0414 − 1 = −0.0044',
    '⇒ n > \\frac{0.3010}{0.0044} ≈ 68.4 ⇒ n = 69',
    '第 136 日還高於一半，第 137 日又是漲 ⇒ 第 2 \\times 69 = \\red{\\box{138}} 日',
  ], { s: 13.5, lh: 1.5, gap: 2 });

  // Q6
  ANS(pg, 18, 725, '(5)');
  T(pg, 172, 786, [
    '三邊 x、x + 2、x + 4；最小角 \\theta 對 x，最大角 2\\theta 對 x + 4',
    '正弦：\\frac{x + 4}{\\sin 2\\theta} = \\frac{x}{\\sin\\theta} ⇒ \\cos\\theta = \\frac{x + 4}{2x}',
    '餘弦：\\cos\\theta = \\frac{(x + 2)^2 + (x + 4)^2 − x^2}{2(x + 2)(x + 4)} = \\frac{x + 10}{2(x + 4)}',
    '⇒ (x + 4)^2 = x(x + 10) ⇒ x = 8，三邊 8、10、12',
    '\\cos\\theta = \\frac{3}{4}，\\sin\\theta = \\frac{\\sqrt7}{4}',
    '面積 = \\frac{1}{2} \\cdot 10 \\cdot 12 \\cdot \\frac{\\sqrt7}{4} = \\red{\\box{15\\sqrt7}}',
  ], { s: 13, lh: 1.45, gap: 2 });
  {   // sides 8 (opposite θ), 10, 12 (opposite 2θ)
    const s = 9.5, U = [575, 962], V = [U[0] + 12 * s, U[1]], W = [U[0] + 7.5 * s, U[1] - 6.614 * s];
    sk.poly([U, V, W], { closed: true, c: 'blue', w: 1.3 });
    sk.arc(U[0], U[1], 16, 0, 41.4, { c: 'orange', w: 1 });
    sk.arc(W[0], W[1], 12, 180 + 41.4, 180 + 41.4 + 82.8, { c: 'orange', w: 1 });
    sk.label(U[0] + 18, U[1] - 15, '\\orange{\\theta}', { s: 10 });
    sk.label(W[0] - 7, W[1] + 10, '\\orange{2\\theta}', { s: 9 });
    sk.label((U[0] + V[0]) / 2 - 6, U[1] + 1, '\\green{12}', { s: 10 });
    sk.label((U[0] + W[0]) / 2 - 18, (U[1] + W[1]) / 2 - 12, '\\green{10}', { s: 10 });
    sk.label((V[0] + W[0]) / 2 + 4, (V[1] + W[1]) / 2 - 10, '\\green{8}', { s: 10 });
  }
});

/* ---------------- 第 3 頁 : Q7 – Q9 ---------------- */
page(4, (pg, sk) => {
  // Q7
  MANS(pg, 16, 172, [1, 2, 4]);
  MK(pg, 180, 200, true); MK(pg, 181, 226, true); MK(pg, 209, 251, false); MK(pg, 194, 277, true); MK(pg, 482, 300, false);
  T(pg, 200, 197, '|x − 1| \\le 2 ⇒ −2 \\le x − 1 \\le 2', { s: 12.5 });
  T(pg, 201, 223, 'y = (x + y) − x：−1 − 3 \\le y \\le 1 + 1', { s: 12.5 });
  T(pg, 229, 248, 'x = y = 0 也符合 ⇒ x^2 + y^2 最小是 0', { s: 12.5 });
  T(pg, 214, 274, 'x − 2y = 3x − 2(x + y) \\ge −3 − 2 = −5 > −6', { s: 12.5 });
  T(pg, 502, 297, '平行四邊形 = 4 \\times 2 = 8', { s: 12.5 });
  {
    const u = 18, O = [690, 262], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 40, O[1], O[0] + 82, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 92, O[0], O[1] - 58, { c: 'gray', w: 0.8, head: 3.5 });
    sk.poly([M(-1, 0), M(-1, 2), M(3, -2), M(3, -4)], { fill: 'hl', op: 0.55, c: 'green', w: 1.2 });
    let a = M(-1.6, 2.6), b = M(3.6, -2.6); sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 0.8, dash: '3 3' });
    a = M(-1.6, 0.6); b = M(3.6, -4.6); sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 0.8, dash: '3 3' });
    sk.label(M(-1, 0)[0] - 14, M(-1, 1)[1] - 8, '\\green{2}', { s: 9 });
    sk.label(M(1, 0)[0] - 3, M(0, -4)[1] + 2, '\\green{4}', { s: 9 });
    sk.label(M(-1, 0)[0] - 12, O[1] + 1, '\\gray{\\small{−1}}', { s: 8 });
    sk.label(M(3, 0)[0] + 2, O[1] - 14, '\\gray{\\small{3}}', { s: 8 });
  }

  // Q8
  MANS(pg, 16, 398, [1, 4, 5]);
  MK(pg, 424, 503, true); MK(pg, 668, 528, false); MK(pg, 350, 555, false); MK(pg, 429, 580, true); MK(pg, 258, 632, true);
  T(pg, 444, 500, 'a^x > 0 可為任意正數', { s: 11.5 });
  T(pg, 370, 552, '凹口向上 ⇒ 弦 PR 的中點在圖形上方 ⇒ AP + CR > 2BQ', { s: 12 });
  T(pg, 449, 577, 'A(−t, 0)、C(t, 0) ⇒ a^{−t} \\cdot a^t = 1', { s: 12 });
  T(pg, 278, 626, 'y = \\log_a x，再乘 \\log a：\\log a \\cdot \\frac{\\log x}{\\log a} = \\log x', { s: 12 });
  T(pg, 100, 664, '(2) 凹口向上，越右邊越陡 ⇒ m_1 < m_3 < m_2 \\small{\\gray{(PR 的斜率夾在中間)}}', { s: 12.5 });

  // Q9
  MANS(pg, 16, 730, [2, 3]);
  MK(pg, 688, 765, false); MK(pg, 688, 806, true); MK(pg, 656, 847, true); MK(pg, 210, 913, false); MK(pg, 498, 952, false);
  T(pg, 100, 988, [
    '(1) 丁出布才贏：\\frac{1}{3}　(2) 丙、丁都出布：\\frac{1}{9}',
    '(3) 丙、丁各出剪或布，扣掉都剪：\\frac{2 \\cdot 2 − 1}{9} = \\frac{1}{3}',
  ], { s: 12, lh: 1.3, gap: 2 });
  T(pg, 430, 988, [
    '(4) 已有剪、石 ⇒ 丙、丁都不能出布：\\frac{2 \\cdot 2}{9} = \\frac{4}{9} < \\frac{1}{2}',
    '(5) 恰出兩種拳：\\frac{C\\stk{3}{2}(2^4 − 2)}{3^4} = \\frac{42}{81} = \\frac{14}{27} > \\frac{1}{2}',
  ], { s: 12, lh: 1.3, gap: 2 });
});

/* ---------------- 第 4 頁 : Q10 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q10
  MANS(pg, 16, 92, [2, 3, 5]);
  MK(pg, 560, 168, false); MK(pg, 390, 194, true); MK(pg, 166, 220, true); MK(pg, 590, 255, false); MK(pg, 635, 303, true); 
  T(pg, 580, 166, '只是整體趨勢', { s: 11.5 });
  T(pg, 410, 186, 'L 過 (\\mu_x, \\mu_y) = (2, 1)：m = \\frac{4 − 1}{−2 − 2} = −\\frac{3}{4} > −0.8', { s: 11.5 });
  T(pg, 186, 213, 'm = r \\cdot \\frac{\\sig_y}{\\sig_x}：−\\frac{3}{4} = −0.8 \\cdot \\frac{\\sig_y}{\\sig_x} ⇒ \\frac{\\sig_y}{\\sig_x} = \\frac{15}{16} < 1', { s: 12.5 });
  T(pg, 610, 250, '(0, \\frac{5}{2}) 在 L 上', { s: 11.5 });
  T(pg, 100, 345, [
    '(4) x = 0 代入 L：y = 1 − \\frac{3}{4}(0 − 2) = \\frac{5}{2}，新的點剛好在迴歸直線上',
    '⇒ 資料整體更貼近直線，|r\'| 變大 ⇒ r\' 更接近 −1 ⇒ r\' < r',
    '(5) X、Y 都標準化後 \\sig_X = \\sig_Y = 1 ⇒ 斜率 = r \\cdot \\frac{1}{1} = −0.8',
  ], { s: 12.5, lh: 1.4, gap: 2 });

  // Q11
  MANS(pg, 16, 463, [2, 3, 4, 5]);
  MK(pg, 207, 515, false); MK(pg, 227, 540, true); MK(pg, 167, 565, true); MK(pg, 271, 591, true); MK(pg, 427, 619, true);
  T(pg, 227, 508, '\\tan A = \\frac{\\ov{DE}}{\\ov{AD}} ⇒ \\ov{AD} = \\frac{4}{\\tan A}', { s: 11.5 });
  T(pg, 247, 537, '\\ov{BF} = \\ov{BC} − \\ov{CF} = \\ov{BC} − \\ov{DE} = 6\\sin A − 4', { s: 12 });
  T(pg, 187, 562, '\\ov{AE} > \\ov{DE} = 4 ⇒ \\ov{BE} = 6 − \\ov{AE} < 2 ⇒ \\ov{EF} < \\ov{BE} < 2', { s: 12 });
  T(pg, 291, 585, '\\frac{1}{2} \\cdot 6\\cos A \\cdot 6\\sin A = 18\\sin A\\cos A = 9\\sin 2A', { s: 11.5 });
  T(pg, 447, 616, 'A = 45\\deg 時最大：\\ov{AC} = 3\\sqrt2，\\ov{AD} = \\ov{DE} = 4', { s: 12 });
  T(pg, 120, 650, '⇒ \\ov{DF}^2 = \\ov{DC}^2 + \\ov{CF}^2 = (3\\sqrt2 − 4)^2 + 4^2 = 34 − 24\\sqrt2 + 16 = 50 − 24\\sqrt2', { s: 12.5 });

  // Q12
  MANS(pg, 16, 771, [1, 3, 5]);
  T(pg, 165, 791, '\\orange{取 \\log：(\\log 2)x + (\\log 7)y = \\log 112 是直線，斜率 = −\\frac{\\log 2}{\\log 7} = −\\log_7 2}', { s: 12 });
  MK(pg, 222, 821, true); MK(pg, 238, 846, false); MK(pg, 243, 872, true); MK(pg, 390, 897, false); MK(pg, 442, 922, true);
  T(pg, 242, 818, '2^4 \\cdot 7^1 = 16 \\cdot 7 = 112', { s: 12 });
  T(pg, 258, 843, 'y = 0：x = \\log_2 112 < \\log_2 128 = 7', { s: 12 });
  T(pg, 263, 869, 'x < 0 且 y < 0 ⇒ 2^x \\cdot 7^y < 1 \\ne 112', { s: 12 });
  T(pg, 410, 891, 'L\' 斜率 = \\frac{1}{\\log_7 2} = \\log_2 7 < \\log_2 8 = 3', { s: 12 });
  T(pg, 462, 919, '斜率 < 0 ⇒ \\tan\\theta = |斜率| = \\log_7 2', { s: 12 });
});

/* ---------------- 第 5 頁 : Q13 – Q17 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 14, 168, '\\frac{5}{27}', { s: 16 });
  T(pg, 538, 246, [
    '分母 2 \\sim 9 的最簡真分數',
    '依序 1、2、2、4、2、6、4、6 個',
    '共 27 種 ⇒ E = 5 \\cdot \\frac{1}{27} = \\red{\\frac{5}{27}}',
  ], { s: 11.5, lh: 1.4 });

  // Q14
  ANS(pg, 14, 450, '770', { s: 17 });
  T(pg, 482, 497, [
    'n 奇：\\frac{n^2\\pi}{2} 與 \\frac{\\pi}{2} 同界 ⇒ 加 0',
    'n 偶：\\frac{n^2\\pi}{2} 與 0 同界 ⇒ 加 1',
  ], { s: 11, lh: 1.2 });
  T(pg, 100, 552, '⇒ a_n：1, 1, 2, 2, 3, 3, …, 10, 10，平方和 = 2(1^2 + 2^2 + … + 10^2) = 2 \\times 385 = \\red{\\box{770}}', { s: 12.5 });

  // Q15
  ANS(pg, 14, 580, '17', { s: 17 });
  T(pg, 452, 605, [
    'A 為原點：B(4, 0)、C(6, 2\\sqrt3)、D(4, 4\\sqrt3)、E(0, 4\\sqrt3)',
    'P = \\frac{B + C}{2} = (5, \\sqrt3)，Q = \\frac{D + 3E}{4} = (1, 4\\sqrt3)',
  ], { s: 11, lh: 1.3 });
  T(pg, 120, 650, '\\vec{AP} \\cdot \\vec{AQ} = 5 \\cdot 1 + \\sqrt3 \\cdot 4\\sqrt3 = 5 + 12 = \\red{\\box{17}}', { s: 12.5 });

  // Q16
  ANS(pg, 4, 682, '−21x + 19', { s: 10.5 });
  T(pg, 560, 738, [
    'a_k b_k = (2k − 1)(−x)^{k − 1}',
    'f(x) = 1 − 3x + 5x^2 − … − 39x^{19}',
  ], { s: 11.5, lh: 1.35 });
  T(pg, 320, 778, [
    'r(x) = mx + n：f(1) = (1 − 3) + (5 − 7) + … + (37 − 39) = −20 = m + n',
    'f(−1) = 1 + 3 + 5 + … + 39 = 20^2 = 400 = −m + n',
    '⇒ m = −210，n = 190 ⇒ \\frac{r(x)}{10} = \\red{\\box{−21x + 19}}',
  ], { s: 11.5, lh: 1.4 });

  // Q17
  ANS(pg, 4, 856, '(−\\frac{1}{2}, −4)', { s: 10 });
  T(pg, 420, 862, [
    '\\circ{1} ⇒ f(x) = (x + 1)^3(ax + b) + x + 1',
    '\\circ{3} f(0) = b + 1 = −2 ⇒ b = −3',
    '\\circ{2} f(1) = 8(a + b) + 2 = −6 ⇒ a = 2',
    'f(x) + 2 = (x + 1)^3(2x − 3) + x + 3',
  ], { s: 12, lh: 1.45 });
  T(pg, 440, 990, [
    '= 2x^4 + 3x^3 − 3x^2 − 6x',
    '⇒ g(x) = 2x^3 + 3x^2 − 3x − 6',
    '中心 x = −\\frac{3}{3 \\cdot 2} = −\\frac{1}{2}，g(−\\frac{1}{2}) = −4',
    '⇒ \\red{\\box{(−\\frac{1}{2}, −4)}}',
  ], { s: 12, lh: 1.4, gap: 1 });
});

/* ---------------- 第 6 頁 : Q18 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q18
  ANS(pg, 18, 362, '(4)');
  T(pg, 150, 442, [
    'P：半徑 1，角度 \\theta 從 0 到 \\frac{\\pi}{2} ⇒ S_1 = 1 \\cdot \\frac{\\pi}{2} = \\frac{\\pi}{2}',
    'Q：半徑 2，角度 3\\theta 從 0 到 \\frac{3\\pi}{2} ⇒ S_2 = 2 \\cdot \\frac{3\\pi}{2} = 3\\pi',
    '⇒ \\frac{S_2}{S_1} = \\red{\\box{6}}',
  ], { s: 13, lh: 1.5, gap: 2 });
  {
    const u = 29, O = [668, 514], th = 35, M = (r, d) => [O[0] + r * u * Math.cos(d * Math.PI / 180), O[1] - r * u * Math.sin(d * Math.PI / 180)];
    sk.arrow(O[0] - 72, O[1], O[0] + 80, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 64, O[0], O[1] - 72, { c: 'gray', w: 0.8, head: 3.5 });
    sk.arc(O[0], O[1], u, 0, 90, { c: 'blue', w: 1.6 });
    sk.arc(O[0], O[1], 2 * u, 0, 270, { c: 'green', w: 1.6 });
    const P = M(1, th), Q = M(2, 3 * th);
    sk.line(O[0], O[1], P[0], P[1], { c: 'gray', w: 0.9 }); sk.line(O[0], O[1], Q[0], Q[1], { c: 'gray', w: 0.9 });
    sk.line(P[0], P[1], Q[0], Q[1], { c: 'red', w: 1.2, dash: '3 3' });
    sk.arc(O[0], O[1], 11, th, 3 * th, { c: 'orange', w: 1 });
    sk.dot(P[0], P[1], { r: 1.8 }); sk.dot(Q[0], Q[1], { r: 1.8, c: 'green' });
    sk.label(P[0] + 3, P[1] - 12, 'P', { s: 10 }); sk.label(Q[0] - 12, Q[1] - 12, '\\green{Q}', { s: 10 });
    sk.label(O[0] + 2, O[1] - 25, '\\orange{\\small{2\\theta}}', { s: 9 });
    sk.label(O[0] - 11, O[1] + 1, '\\gray{O}', { s: 9 });
    sk.label(O[0] + u - 3, O[1] + 1, '\\gray{\\small{1}}', { s: 8 }); sk.label(O[0] + 2 * u - 3, O[1] + 1, '\\gray{\\small{2}}', { s: 8 });
  }

  // Q19
  ANS(pg, 12, 580, '(3, 1)', { s: 15 });
  T(pg, 100, 668, [
    '19.  \\ang POQ = 3\\theta − \\theta = 2\\theta，0 \\le 2\\theta \\le \\pi',
    '餘弦定理：\\ov{PQ}^2 = 1^2 + 2^2 − 2 \\cdot 1 \\cdot 2\\cos 2\\theta = 5 − 4\\cos 2\\theta',
    '−1 \\le \\cos 2\\theta \\le 1 ⇒ 1 \\le \\ov{PQ}^2 \\le 9 ⇒ (M, m) = \\red{\\box{(3, 1)}}',
    '\\gray{\\small{(\\theta = \\frac{\\pi}{2}：P(0, 1)、Q(0, −2) 最遠；\\theta = 0：P(1, 0)、Q(2, 0) 最近)}}',
  ], { s: 14, lh: 1.55, gap: 2 });

  // Q20
  ANS(pg, 4, 628, ['1', '\\small{(−\\sqrt2, \\sqrt2)}'], { s: 13, lh: 1.25 });
  T(pg, 100, 792, [
    '20.  \\tri OPQ = \\frac{1}{2} \\cdot 1 \\cdot 2 \\cdot \\sin 2\\theta = \\sin 2\\theta \\le 1',
    '2\\theta = \\frac{\\pi}{2}，即 \\theta = \\frac{\\pi}{4} 時面積最大 = \\red{\\box{1}}',
    '此時 Q(2\\cos\\frac{3\\pi}{4}, 2\\sin\\frac{3\\pi}{4}) = \\red{\\box{(−\\sqrt2, \\sqrt2)}}',
  ], { s: 14, lh: 1.6, gap: 3 });
});
