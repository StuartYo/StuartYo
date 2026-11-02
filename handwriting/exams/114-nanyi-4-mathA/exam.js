/* 114 學年度 南一 學測第四次聯合模擬考 數學A (114nanyi4A) — handwritten solutions
 * Based on the booklet's own 解析 (PDF p.9–12), trimmed. Q4 uses the substitution w = 5 − (β − 1) instead of the graph
 * (graph kept as a sketch), Q14 uses OP·OQ ≤ |OP| ≤ 7, Q16 puts B at the origin with α = ∠CBG, Q19 proves the closed
 * form of Aⁿ directly by induction. Q20: options (1) and (4) are the same product A²PA² (both 25/81); key says (1).
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet, p.9–12 解析). A4 scan, no /Rotate.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈45–60, options at x≈78.
 */

/* ---------------- 第 1 頁 : Q1 – Q4 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 16, 195, '(1)');
  T(pg, 100, 304, [
    'f(1) = 1 − 2 + 3 + a + b = 4 ⇒ a + b = 2',
    'f(−1) = 1 − 2 − 3 − a + b = 6 ⇒ −a + b = 10 ⇒ a = −4，b = 6',
    'a^3 + b^3 = −64 + 216 = \\red{\\box{152}}',
  ], { s: 13.5, lh: 1.5 });

  // Q2
  ANS(pg, 16, 432, '(1)');
  T(pg, 82, 566, [
    'L_2、L_3 交於 A(5, −7)，y = −1 交 L_2、L_3 於 C(2, −1)、B(4, −1)',
    '舊區域 \\tri ABC = \\frac{1}{2} \\cdot 2 \\cdot 6 = 6，新區域 = 相似的大三角形，面積 24',
    '面積比 = 高的比平方：(\\frac{k + 7}{6})^2 = 4 ⇒ k + 7 = 12 ⇒ k = \\red{\\box{5}}',
  ], { s: 12.5, lh: 1.6, gap: 1 });
  {   // region of Q2
    const u = 12.5, O = [626, 545], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    const L = (a, b, o) => sk.line(a[0], a[1], b[0], b[1], o);
    const A = M(5, -7), B = M(4, -1), C = M(2, -1), D = M(3, 5), E = M(-1, 5);
    sk.poly([A, B, C], { fill: 'hl', op: 0.6, c: 'none' });
    L(M(-1.3, 5.6), M(5.25, -7.5), { c: 'blue', w: 1.2 });          // L2: 2x + y = 3
    L(M(2.9, 5.6), M(5.08, -7.5), { c: 'blue', w: 1.2 });           // L3: 6x + y = 23
    L(M(-1.8, -1), M(6.2, -1), { c: 'blue', w: 1.1 });              // y = -1
    L(M(-1.8, 5), M(6.2, 5), { c: 'orange', w: 1.1, dash: '4 3' }); // y = k
    [[A, 'A', 6, -6], [B, 'B', 5, 2], [C, 'C', -14, 2], [D, 'D', 4, -16], [E, 'E', -14, -16]].forEach(([p, s, dx, dy]) => {
      sk.dot(p[0], p[1], { r: 1.6 }); sk.label(p[0] + dx, p[1] + dy, s, { s: 10 });
    });
    sk.label(M(6.2, 0)[0] + 3, M(0, 5)[1] - 8, '\\orange{y = k}', { s: 10 });
    sk.label(M(6.2, 0)[0] + 3, M(0, -1)[1] - 8, 'y = −1', { s: 10 });
  }

  // Q3
  ANS(pg, 16, 664, '(2)');
  T(pg, 100, 776, [
    'f\'(x) = 3x^2 − 6ax = 3x(x − 2a) ⇒ 水平的一次近似在 x = 0、x = 2a',
    'f(0) = b > 0，所以 x 軸是 x = 2a 那條：f(2a) = 8a^3 − 12a^3 + b = 0 ⇒ b = 4a^3',
    '對稱中心 x = a，f(a) = a^3 − 3a^3 + 4a^3 = 2a^3 ⇒ (a, 2a^3) 在 \\red{\\box{y = 2x^3}} 上',
  ], { s: 13, lh: 1.6, gap: 1 });

  // Q4
  ANS(pg, 16, 875, '(5)');
  T(pg, 82, 968, [
    '令 u = α − 1：2^u = 5 − u',
    '令 v = β − 1：\\log_2 v = 5 − v ⇔ v = 2^{5 − v}',
    '\\orange{w = 5 − v 滿足 2^w = 5 − w}，跟 u 同一個方程式',
    '2^u 遞增、5 − u 遞減 ⇒ 實根唯一 ⇒ u = w = 5 − v',
    '⇒ (α − 1) + (β − 1) = 5 ⇒ α + β = \\red{\\box{7}}',
    '\\gray{\\small{看圖：兩曲線對稱於 y = x − 1，交點 A、B 的中點 (\\frac{7}{2}, \\frac{5}{2})}}',
  ], { s: 13, lh: 1.5, gap: 0 });
  {   // y = 2^(x-1), y = log2(x-1), y = x - 1, x + y = 6
    const u = 19, O = [588, 1078], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    const bis = (g, a, b) => { for (let i = 0; i < 60; i++) { const m = (a + b) / 2; (g(a) * g(m) <= 0) ? b = m : a = m; } return (a + b) / 2; };
    const al = bis(x => Math.pow(2, x - 1) + x - 6, 2, 4), be = bis(x => Math.log2(x - 1) + x - 6, 3, 6);
    sk.arrow(O[0] - 10, O[1], O[0] + 160, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 22, O[0], O[1] - 128, { c: 'gray', w: 0.8, head: 3.5 });
    let a = M(0.2, -0.8), b = M(7.3, 6.3); sk.line(a[0], a[1], b[0], b[1], { c: 'gray', w: 0.9, dash: '3 3' });
    const g0 = M(0.3, 5.7), g1 = M(7.2, -1.2); sk.line(g0[0], g0[1], g1[0], g1[1], { c: 'green', w: 1.1 });
    sk.fn(x => Math.pow(2, x - 1), -0.4, 3.75, M, { c: 'blue', w: 1.3 });
    sk.fn(x => Math.log2(x - 1), 1.42, 8, M, { c: 'blue', w: 1.3, n: 60 });
    const A = M(al, 6 - al), B = M(be, 6 - be);
    sk.dot(A[0], A[1], { r: 1.7, c: 'red' }); sk.dot(B[0], B[1], { r: 1.7, c: 'red' });
    sk.label(A[0] - 14, A[1] - 6, 'A', { s: 10 }); sk.label(B[0] + 3, B[1] - 16, 'B', { s: 10 });
    sk.label(M(3.7, 0)[0] - 30, M(0, 6)[1] - 8, '2^{x−1}', { s: 10 });
    sk.label(M(6.9, 0)[0] - 18, M(0, 2.6)[1] + 4, '\\small{\\log_2(x − 1)}', { s: 10 });
    sk.label(b[0] - 48, b[1] - 6, '\\gray{\\small{y = x − 1}}', { s: 9 });
    sk.label(g1[0] - 50, g1[1] - 2, '\\green{\\small{x + y = 6}}', { s: 9 });
  }
});

/* ---------------- 第 2 頁 : Q5 – Q7 ---------------- */
page(3, (pg, sk) => {
  // Q5
  ANS(pg, 16, 104, '(3)');
  T(pg, 172, 186, [
    '\\orange{兩直線歪斜 ⇔ 4 個端點不共面}',
    '\\orange{一個四面體恰有 3 對歪斜線 (對邊)}',
    '6 點取 4 點：C\\stk{6}{4} = 15',
    '共面的只有底面 5 點取 4 點：C\\stk{5}{4} = 5',
    '⇒ 四面體 10 個 ⇒ 10 × 3 = \\red{\\box{30}} 對',
  ], { s: 13, lh: 1.45 });
  T(pg, 172, 300, '\\gray{\\small{A 與底面任 3 點都不共面；底面上任兩條線共面，不歪斜}}', { s: 12 });

  // Q6
  ANS(pg, 16, 425, '(3)');
  T(pg, 82, 563, [
    '相加消去：a_n = \\log_2(\\frac{11}{12} \\cdot \\frac{1 \\cdot 4}{2 \\cdot 3} \\cdot \\frac{2 \\cdot 5}{3 \\cdot 4} \\cdots \\frac{(n − 1)(n + 2)}{n(n + 1)}) = \\log_2(\\frac{11}{12} \\cdot \\frac{1}{n} \\cdot \\frac{n + 2}{3})',
    '= \\log_2\\frac{11(n + 2)}{36n} = \\log_2\\frac{1}{3} ⇒ 33(k + 2) = 36k ⇒ k = \\red{\\box{22}}',
  ], { s: 12.5, lh: 1.45, gap: 2 });

  // Q7
  MANS(pg, 16, 709, [1, 3, 4, 5]);
  MK(pg, 243, 818, true); MK(pg, 277, 845, false); MK(pg, 453, 872, true); MK(pg, 670, 899, true); MK(pg, 727, 924, true);
  T(pg, 268, 820, '36 < 0.7n < 37 ⇒ 51.4 < n < 52.9 ⇒ n = 52', { s: 12 });
  T(pg, 302, 847, '只知 Q_1、Q_3、平均，中位數無法確定', { s: 12 });
  T(pg, 478, 874, '9.2 × 52 = 478.4', { s: 12 });
  T(pg, 82, 954, [
    '(1) X 是 1 \\sim n 的編號；若 0.7n 是整數 k，P_{70} = \\frac{k + (k + 1)}{2} 不是整數，故取第 ⌈0.7n⌉ 個 = 37',
    '(4) 標準化 z = \\frac{6 − 9.2}{2} = −1.6',
    '(5) \\Sig(y_i − a)^2 \\ge \\Sig(y_i − \\mu)^2 = n\\sig^2 = 52 × 2^2 = 208 \\gray{(a = \\mu 時最小)}',
  ], { s: 12.5, lh: 1.6, gap: 2 });
});

/* ---------------- 第 3 頁 : Q8 – Q9 ---------------- */
page(4, (pg, sk) => {
  // Q8
  MANS(pg, 16, 103, [2, 4, 5]);
  MK(pg, 363, 452, false); MK(pg, 380, 484, true); MK(pg, 362, 523, false); MK(pg, 552, 590, true); MK(pg, 540, 628, true);
  T(pg, 574, 584, '\\frac{20C\\stk{60}{3}}{C\\stk{20}{3} \\cdot 60} = \\frac{59 \\cdot 58}{19 \\cdot 18} ≈ 10.006', { s: 11.5 });
  T(pg, 562, 630, '1000 × 4 × 10 = 40000', { s: 12 });
  T(pg, 82, 656, [
    '(1) C\\stk{40}{5}C\\stk{75}{15} 會重複計算 (同一組號碼，依「先選的 5 個偶數」不同被算很多次)',
    '(2) \\frac{C\\stk{20}{4}}{C\\stk{80}{4}} = \\frac{20}{80} \\cdot \\frac{19}{79} \\cdot \\frac{18}{78} \\cdot \\frac{17}{77} < (\\frac{1}{4})^4 = \\frac{1}{256}',
    '(3) 得不到獎金 = 中 0 或 1 個：\\frac{C\\stk{60}{4} + 20C\\stk{60}{3}}{C\\stk{80}{4}} ≈ 0.74 > \\frac{81}{256} ≈ 0.32',
  ], { s: 12.5, lh: 1.45, gap: 1 });

  // Q9
  MANS(pg, 16, 755, [2, 3, 5]);
  MK(pg, 330, 788, false); MK(pg, 478, 818, true); MK(pg, 680, 858, true); MK(pg, 408, 896, false); MK(pg, 600, 932, true);
  T(pg, 352, 786, 'f(x) = 2\\sin(2x − \\frac{\\pi}{3})，週期 \\pi', { s: 12 });
  T(pg, 500, 814, 'f(\\frac{5\\pi}{12}) = 2\\sin\\frac{\\pi}{2} = 2 是最大值', { s: 12 });
  T(pg, 430, 892, '2x − \\frac{\\pi}{3} \\in [\\frac{\\pi}{3}, \\pi] ⇒ f \\in [0, 2]', { s: 12 });
  T(pg, 82, 958, [
    '\\orange{f(x) = 2(\\frac{1}{2}\\sin 2x − \\frac{\\sqrt3}{2}\\cos 2x) = 2\\sin(2x − \\frac{\\pi}{3})}',
    '(3) 2\\sin(2x − \\frac{\\pi}{3}) = \\sqrt3 ⇒ 2x − \\frac{\\pi}{3} = \\frac{\\pi}{3} 或 \\frac{2\\pi}{3} ⇒ x = \\frac{\\pi}{3}、\\frac{\\pi}{2} ⇒ \\ov{PQ} = \\frac{\\pi}{2} − \\frac{\\pi}{3} = \\frac{\\pi}{6}',
    '(5) 振幅 2、週期 \\pi 都相同：2\\cos 2x = 2\\sin(2x + \\frac{\\pi}{2}) = 2\\sin(2(x + \\frac{5\\pi}{12}) − \\frac{\\pi}{3})，f 左移 \\frac{5\\pi}{12}',
  ], { s: 13.5, lh: 1.6, gap: 3 });
});

/* ---------------- 第 4 頁 : Q10 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q10
  MANS(pg, 8, 101, [2, 3, 4]);
  MK(pg, 254, 159, false); MK(pg, 457, 189, true); MK(pg, 459, 228, true); MK(pg, 497, 268, true); MK(pg, 517, 308, false);
  T(pg, 276, 158, '\\vec{AB} = (1, 9)、\\vec{AC} = (5, 1) ⇒ 面積 = \\frac{1}{2}|1 − 45| = 22', { s: 12 });
  T(pg, 480, 184, '\\tri ABP = |2 − k| \\cdot 22 = \\frac{3}{5} \\cdot 22 ⇒ k = \\frac{7}{5}', { s: 12 });
  T(pg, 482, 224, '\\vec{CB} = (−4, 8) ⊥ L ⇒ m = \\frac{1}{2}', { s: 12 });
  T(pg, 520, 262, '\\frac{|(1, 9) \\cdot (2, 1)|}{\\sqrt{82} \\cdot \\sqrt5} = \\frac{11}{\\sqrt{410}}', { s: 12 });
  T(pg, 540, 306, '需 \\ov{BR} : \\ov{RC} = 1 : 4', { s: 12 });
  T(pg, 82, 335, [
    '(2) \\vec{AP} 中 k\\vec{AB} 那段平行 AB，不影響高 ⇒ \\tri ABP = |2 − k|\\tri ABC，\\gray{k = \\frac{13}{5} 不合}',
    '(5) 切點 \\ov{BR} = \\frac{\\ov{AB} + \\ov{BC} − \\ov{AC}}{2} = \\frac{\\sqrt{82} + \\sqrt{80} − \\sqrt{26}}{2} ≈ 6.45 ≠ \\frac{1}{5}\\ov{BC} = \\frac{\\sqrt{80}}{5} ≈ 1.79',
  ], { s: 12, lh: 1.5, gap: 1 });

  // Q11
  MANS(pg, 8, 392, [1, 3, 5]);
  MK(pg, 614, 502, true); MK(pg, 160, 571, false); MK(pg, 482, 601, true); MK(pg, 332, 630, false); MK(pg, 191, 694, true);
  T(pg, 636, 494, ['垂直 ⇒ 不平行', '⇒ 行列式 \\ne 0'], { s: 11.5, lh: 1.3 });
  T(pg, 182, 572, '\\vec{OC} = s\\vec{OA} + t\\vec{OB}，z 分量 = 0 ⇒ z_3 = 0', { s: 12 });
  T(pg, 502, 601, '\\det M = (\\vec{OA} × \\vec{OB}) \\cdot \\vec{OC} = 0', { s: 12 });
  T(pg, 352, 629, '反例 (1,0,0)、(0,1,0)、(0,0,1)：面積 \\frac{\\sqrt3}{2} ≠ \\frac{1}{2}', { s: 12 });
  T(pg, 212, 694, '任意向量都可表示 ⇒ \\vec{OA}、\\vec{OB}、\\vec{OC} 不共面 ⇒ \\det M \\ne 0', { s: 12 });

  // Q12
  MANS(pg, 8, 776, [2, 4, 5]);
  MK(pg, 174, 844, false); MK(pg, 198, 905, true); MK(pg, 290, 930, false); MK(pg, 268, 955, true); MK(pg, 284, 986, true);
  T(pg, 198, 838, 'A = \\mat{5k & 1 − 25k \\\\ 1 − k & 5k}，旋轉 ⇒ 1 − 25k = −(1 − k) ⇒ k = \\frac{1}{13}', { s: 12 });
  T(pg, 312, 930, 'C^2 = I ⇒ A^4C^2 = A^4 是旋轉矩陣', { s: 12 });
  T(pg, 290, 955, 'A^4C = 旋轉 × 鏡射，\\det = 1 × (−1) = −1 ⇒ 鏡射', { s: 12 });
  T(pg, 306, 980, 'C^{−1} = C ⇒ \\frac{(I + C)^2}{4} = \\frac{1}{4}\\mat{2&2\\\\2&2} = \\frac{1}{2}\\mat{1&1\\\\1&1}，元素 \\ge 0、每行和 1', { s: 12 });
  T(pg, 82, 1026, [
    '(2) A = \\frac{1}{13}\\mat{5&−12\\\\12&5}，\\tan\\theta = \\frac{12}{5}，\\sqrt3 < \\frac{12}{5} < 2 + \\sqrt3 ⇒ 60\\deg < \\theta < 75\\deg',
    '⇒ P\' = (\\cos 3\\theta, \\sin 3\\theta)，180\\deg < 3\\theta < 225\\deg ⇒ 第三象限',
  ], { s: 12.5, lh: 1.5, gap: 2 });
});

/* ---------------- 第 5 頁 : Q13 – Q17 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 8, 164, '4', { s: 19 });
  T(pg, 100, 204, [
    '2^x + 4^y = 2^x + 2^{2y} \\ge 2\\sqrt{2^{x + 2y}} = 2\\sqrt{4} = 4',
    '等號：2^x = 2^{2y} ⇒ x = 2y = 1 ⇒ 最小值 \\red{\\box{4}}',
  ], { s: 13.5, lh: 1.6 });

  // Q14
  ANS(pg, 2, 266, ['(7,', '\\frac{56}{5})'], { s: 17, lh: 1.25 });
  T(pg, 82, 424, [
    'ax + by = \\vec{OP} \\cdot \\vec{OQ} \\le |\\vec{OP}| \\cdot 1 \\le 5 + 2 = 7 ⇒ M = 7 \\gray{(O 到圓心 5、半徑 2)}',
    '等號：P 在 O 往 (3, 4) 方向最遠點 (\\frac{21}{5}, \\frac{28}{5})，Q 同方向 (\\frac{3}{5}, \\frac{4}{5})',
    'N = \\frac{21 + 28 + 3 + 4}{5} = \\frac{56}{5} ⇒ \\red{\\box{(7, \\frac{56}{5})}}',
  ], { s: 12.5, lh: 1.45, gap: 0 });
  {
    const u = 7.5, O = [622, 486], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    const C = M(3, 4), P = M(4.2, 5.6), Q = M(0.6, 0.8);
    sk.circle(C[0], C[1], 2 * u, { c: 'blue', w: 1.1 });
    sk.circle(O[0], O[1], u, { c: 'green', w: 1 });
    sk.line(O[0], O[1], P[0], P[1], { c: 'orange', w: 1.1 });
    sk.dot(O[0], O[1], { r: 1.4 }); sk.dot(C[0], C[1], { r: 1.3 }); sk.dot(P[0], P[1], { r: 1.6, c: 'red' }); sk.dot(Q[0], Q[1], { r: 1.5, c: 'red' });
    sk.label(O[0] - 15, O[1] - 4, '\\small{O}', { s: 9 }); sk.label(P[0] + 4, P[1] - 12, 'P', { s: 10 });
    sk.label(Q[0] + 3, Q[1] - 2, '\\green{\\small{Q}}', { s: 9 }); sk.label(C[0] + 17, C[1] - 2, '\\gray{\\small{(3, 4)}}', { s: 9 });
  }

  // Q15
  ANS(pg, 4, 505, '\\frac{61}{64}', { s: 17 });
  T(pg, 82, 562, [
    '\\sin(A + B) = \\sin C ⇒ a : b : c = 2 : 3 : 4，\\cos A = \\frac{9 + 16 − 4}{24} = \\frac{7}{8}，\\cos B = \\frac{4 + 16 − 9}{16} = \\frac{11}{16}',
    '\\cos(A − B) = \\frac{7}{8} \\cdot \\frac{11}{16} + \\frac{\\sqrt{15}}{8} \\cdot \\frac{3\\sqrt{15}}{16} = \\frac{77 + 45}{128} = \\red{\\box{\\frac{61}{64}}}',
  ], { s: 12, lh: 1.45, gap: 1 });

  // Q16
  ANS(pg, 2, 650, ['4 −', '4\\sqrt5'], { s: 14, lh: 1.25 });
  T(pg, 226, 757, '\\orange{B 為原點，令 \\ang CBG = \\alpha \\in (0, \\pi)}', { s: 12 });
  T(pg, 82, 786, [
    'A(−4, 0)、G(2, 0)、C(2\\cos\\alpha, 2\\sin\\alpha)、F = C + (0, 4) \\gray{(正方形在上方)}',
    '\\vec{AC} \\cdot \\vec{FG} = (4 + 2\\cos\\alpha)(2 − 2\\cos\\alpha) + 2\\sin\\alpha(−2\\sin\\alpha − 4) = 4 − 4\\cos\\alpha − 8\\sin\\alpha',
    '\\cos\\alpha + 2\\sin\\alpha 最大 \\sqrt5 \\gray{(\\tan\\alpha = 2，α 在範圍內)} ⇒ 最小值 \\red{\\box{4 − 4\\sqrt5}}',
  ], { s: 12, lh: 1.4, gap: 0 });

  // Q17
  ANS(pg, 4, 846, '\\frac{50}{3}', { s: 17 });
  T(pg, 346, 926, [
    '(c, b, 2) = b(a, 1, c) ⇒ c = ab，bc = 2',
    '⇒ c = \\frac{2}{b}，a = \\frac{2}{b^2}；y 坐標差 1 ⇒ \\vec{AB} = ±(a, 1, c)',
  ], { s: 12, lh: 1.5 });
  T(pg, 82, 996, [
    '\\ov{AB} ∥ \\ov{CD} 且等長 ⇒ 平行四邊形，距離 = \\frac{17}{\\ov{AB}} = \\frac{17}{\\sqrt{\\frac{4}{b^4} + 1 + \\frac{4}{b^2}}} = \\frac{17}{1 + \\frac{2}{b^2}}',
    'b = 10 時最大：\\frac{17}{1 + \\frac{1}{50}} = \\red{\\box{\\frac{50}{3}}}',
  ], { s: 12.5, lh: 1.5, gap: 2 });
});

/* ---------------- 第 6 頁 : Q18 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q18
  ANS(pg, 2, 384, '\\frac{14}{27}', { s: 16 });
  T(pg, 290, 417, '\\gray{紅在甲：甲抽到白 (\\frac{2}{3}) 才留甲；紅在乙：乙抽到紅 (\\frac{1}{3}) 才回甲}', { s: 11.5 });
  T(pg, 82, 446, 'A = \\frac{1}{3}\\mat{2&1\\\\1&2}，A^2 = \\frac{1}{9}\\mat{5&4\\\\4&5}，A^3\\mat{1\\\\0} = \\frac{1}{27}\\mat{14&13\\\\13&14}\\mat{1\\\\0} = \\frac{1}{27}\\mat{14\\\\13} ⇒ \\red{\\box{\\frac{14}{27}}}', { s: 13.5 });

  // Q19
  ANS(pg, 2, 494, '\\frac{1 + 3^{−n}}{2}', { s: 13 });
  T(pg, 82, 546, 'A^n = \\frac{1}{2}\\mat{1 + 3^{−n} & 1 − 3^{−n} \\\\ 1 − 3^{−n} & 1 + 3^{−n}}，n 輪後在甲 = \\red{\\box{\\frac{1}{2} + \\frac{1}{2 \\cdot 3^n}}} \\gray{(證明見頁底)}', { s: 13.5 });

  // Q20
  ANS(pg, 14, 600, '(1)');
  T(pg, 332, 862, [
    '\\orange{第 1 輪 A；第 2 輪 A 後只留「在甲」那列 (PA)；3、4 輪 A^2}',
    'PA = \\mat{\\frac{2}{3}&\\frac{1}{3}\\\\0&0} ⇒ 分子 = A^2(PA)A\\mat{1\\\\0} ⇒ \\red{\\box{(1)}}',
  ], { s: 12, lh: 1.45 });

  // Q19 proof
  T(pg, 82, 950, [
    '19. 證明：n = 1：\\frac{1}{2}\\mat{\\frac{4}{3}&\\frac{2}{3}\\\\\\frac{2}{3}&\\frac{4}{3}} = A 成立。設 n = k 成立，令 r = 3^{−k}：',
    'A^{k+1} = A^kA = \\frac{1}{2}\\mat{1 + r & 1 − r\\\\1 − r & 1 + r} \\cdot \\frac{1}{3}\\mat{2&1\\\\1&2} = \\frac{1}{6}\\mat{3 + r & 3 − r\\\\3 − r & 3 + r} = \\frac{1}{2}\\mat{1 + \\frac{r}{3} & 1 − \\frac{r}{3}\\\\1 − \\frac{r}{3} & 1 + \\frac{r}{3}}',
    '\\frac{r}{3} = 3^{−(k+1)} ⇒ n = k + 1 也成立，由數學歸納法得證。所求 = A^n\\mat{1\\\\0} 的第 1 個 = \\frac{1}{2}(1 + \\frac{1}{3^n})',
  ], { s: 12, lh: 1.35, gap: 2 });
  T(pg, 82, 1088, '\\gray{20. 註：(4) 的 A(AP)A^2 = A^2PA^2，與 (1) 是同一個乘積 (都 = \\frac{25}{81})，(4) 其實也對；官方答案 (1)}', { s: 11.5 });
});
