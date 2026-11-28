/**
 * Bottom-up DP with a 1D rolling row — O(M * N) time, O(N) space.
 * dp[j] is true when the first i characters of s match the first j characters of p.
 * prevDiag holds the previous row's dp[j - 1] before it gets overwritten.
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  const m = s.length;
  const n = p.length;

  const dp = new Array(n + 1).fill(false);
  dp[0] = true; // empty string matches empty pattern
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") dp[j] = dp[j - 1]; // leading stars match ""
    else break;
  }

  for (let i = 1; i <= m; i++) {
    let prevDiag = dp[0];
    dp[0] = false; // non-empty string never matches empty pattern

    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (p[j - 1] === "*") {
        dp[j] = dp[j - 1] || dp[j]; // zero chars || one more char
      } else if (p[j - 1] === "?" || p[j - 1] === s[i - 1]) {
        dp[j] = prevDiag;
      } else {
        dp[j] = false;
      }
      prevDiag = temp;
    }
  }

  return dp[n];
}

/**
 * Bonus: two-pointer greedy with backtracking to the last '*' — O(1) space.
 * Time is O(M * N) worst case, usually near linear.
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatchGreedy(s, p) {
  let i = 0;
  let j = 0;
  let starIdx = -1; // position of the last '*' in p
  let matchIdx = 0; // position in s where that '*' last resumed

  while (i < s.length) {
    if (j < p.length && (p[j] === "?" || p[j] === s[i])) {
      i++;
      j++;
    } else if (j < p.length && p[j] === "*") {
      starIdx = j++;
      matchIdx = i; // let '*' match empty first
    } else if (starIdx !== -1) {
      j = starIdx + 1; // retry: '*' swallows one more character
      i = ++matchIdx;
    } else {
      return false;
    }
  }

  while (j < p.length && p[j] === "*") j++;
  return j === p.length;
}

const testCases = [
  { name: "Exact literal mismatch ('aa', 'a')", s: "aa", p: "a", expected: false },
  { name: "Single wildcard star matching all ('aa', '*')", s: "aa", p: "*", expected: true },
  { name: "Single char wildcard mismatch ('cb', '?a')", s: "cb", p: "?a", expected: false },
  { name: "Multi-star empty and substring match ('adceb', '*a*b')", s: "adceb", p: "*a*b", expected: true },
  { name: "Empty string matched against multiple stars ('', '***')", s: "", p: "***", expected: true },
  { name: "Empty string matched against question mark ('', '?')", s: "", p: "?", expected: false },
  {
    name: "Catastrophic backtracking anti-greedy stress test",
    s: "a".repeat(500) + "b",
    p: "*a".repeat(250) + "*c",
    expected: false,
  },
];

console.table(
  testCases.map(({ name, s, p, expected }) => {
    const start = performance.now();
    const result = isMatch(s, p);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const greedy = isMatchGreedy(s, p);
    const passed = result === expected && greedy === expected;

    return {
      Scenario: name,
      Lengths: `${s.length}x${p.length}`,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
