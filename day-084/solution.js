/**
 * Bottom-up DP with a 1D rolling row — O(M * N) time, O(N) space.
 * After processing the first i characters of s, dp[j] holds the number of subsequences
 * of that prefix which equal t[0 ... j - 1].
 * j runs right-to-left so dp[j - 1] still holds the previous row's value when read.
 * Prefix counts that never reach dp[t.length] may lose integer precision; counts that
 * feed the answer are never larger than the answer, so the result stays exact.
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
function numDistinct(s, t) {
  const m = s.length;
  const n = t.length;
  if (m < n) return 0;

  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // one way to form the empty target

  for (let i = 1; i <= m; i++) {
    // a prefix of length i cannot form a target prefix longer than i
    for (let j = Math.min(i, n); j >= 1; j--) {
      if (s[i - 1] === t[j - 1]) {
        dp[j] += dp[j - 1];
      }
    }
  }

  return dp[n];
}

const testCases = [
  {
    name: "Triple repeated character match ('rabbbit' -> 'rabbit')",
    s: "rabbbit",
    t: "rabbit",
    expected: 3,
  },
  {
    name: "Multiple interleaved occurrences ('babgbag' -> 'bag')",
    s: "babgbag",
    t: "bag",
    expected: 5,
  },
  {
    name: "Source shorter than target pruning ('abc' -> 'abcd')",
    s: "abc",
    t: "abcd",
    expected: 0,
  },
  {
    name: "Identical single-path match ('algorithm' -> 'algorithm')",
    s: "algorithm",
    t: "algorithm",
    expected: 1,
  },
  {
    name: "Zero matches disjoint strings ('xyz' -> 'abc')",
    s: "xyz",
    t: "abc",
    expected: 0,
  },
  {
    name: "Combinatorial choose test ('aaaaa' -> 'aaa')",
    s: "aaaaa",
    t: "aaa",
    expected: 10, // C(5, 3) = 10
  },
  {
    name: "Upper bound with huge dead-end prefix counts",
    s: "a".repeat(1000),
    t: "a".repeat(999) + "b",
    expected: 0,
  },
];

console.table(
  testCases.map(({ name, s, t, expected }) => {
    const start = performance.now();
    const result = numDistinct(s, t);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Lengths: `${s.length}x${t.length}`,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
