/**
 * Bottom-up interval DP with a 1D rolling row — O(N^2) time, O(N) space.
 * While processing start index i, dp[j] holds the longest palindromic subsequence
 * length of s[i ... j].
 * Before the update dp[j] is the interval s[i + 1 ... j] (drop the left end), dp[j - 1]
 * is s[i ... j - 1] (drop the right end), and prevDiag carries s[i + 1 ... j - 1].
 * @param {string} s
 * @return {number}
 */
function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = new Array(n).fill(1);

  for (let i = n - 2; i >= 0; i--) {
    let prevDiag = 0; // the inner interval of an adjacent pair is empty

    for (let j = i + 1; j < n; j++) {
      const temp = dp[j];

      if (s[i] === s[j]) {
        dp[j] = 2 + prevDiag;
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }

      prevDiag = temp;
    }
  }

  return dp[n - 1];
}

const testCases = [
  {
    name: "Standard non-contiguous palindrome ('bbbab')",
    s: "bbbab",
    expected: 4,
  },
  {
    name: "Adjacent pair inside unmatched ends ('cbbd')",
    s: "cbbd",
    expected: 2,
  },
  {
    name: "Full string palindrome ('racecar')",
    s: "racecar",
    expected: 7,
  },
  {
    name: "Single character base case ('z')",
    s: "z",
    expected: 1,
  },
  {
    name: "All distinct characters ('abcdef')",
    s: "abcdef",
    expected: 1,
  },
  {
    name: "Interleaved nested palindrome ('character')",
    s: "character",
    expected: 5, // "carac"
  },
  {
    name: "Upper bound 1000-char alternating stress test",
    s: "ab".repeat(500),
    expected: 999,
  },
];

console.table(
  testCases.map(({ name, s, expected }) => {
    const start = performance.now();
    const result = longestPalindromeSubseq(s);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Length: s.length,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
