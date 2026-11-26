/**
 * Bottom-up DP with a 1D rolling row — O(M * N) time, O(min(M, N)) space.
 * dp[j] holds the LCS length of the current text1 prefix and text2[0 ... j - 1].
 * Before the update dp[j] is the cell above, dp[j - 1] is the cell to the left,
 * and prevDiag carries the cell diagonally up-left.
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
  if (text2.length > text1.length) [text1, text2] = [text2, text1];

  const dp = new Array(text2.length + 1).fill(0);

  for (let i = 1; i <= text1.length; i++) {
    let prevDiag = 0;

    for (let j = 1; j <= text2.length; j++) {
      const temp = dp[j];

      if (text1[i - 1] === text2[j - 1]) {
        dp[j] = 1 + prevDiag;
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }

      prevDiag = temp;
    }
  }

  return dp[text2.length];
}

const testCases = [
  {
    name: "Standard interleaved subsequence ('abcde', 'ace')",
    text1: "abcde",
    text2: "ace",
    expected: 3,
  },
  {
    name: "Identical strings ('abc', 'abc')",
    text1: "abc",
    text2: "abc",
    expected: 3,
  },
  {
    name: "Disjoint character sets ('abc', 'def')",
    text1: "abc",
    text2: "def",
    expected: 0,
  },
  {
    name: "Repeated character alignment ('oxcpqrsvwf', 'shmtulqrypy')",
    text1: "oxcpqrsvwf",
    text2: "shmtulqrypy",
    expected: 2, // "qr"
  },
  {
    name: "Single character match ('a', 'a')",
    text1: "a",
    text2: "a",
    expected: 1,
  },
  {
    name: "Large 1000-char stress test",
    text1: "ab".repeat(500),
    text2: "ba".repeat(500),
    expected: 999,
  },
];

console.table(
  testCases.map(({ name, text1, text2, expected }) => {
    const start = performance.now();
    const result = longestCommonSubsequence(text1, text2);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Lengths: `${text1.length}x${text2.length}`,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
