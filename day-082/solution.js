/**
 * Bottom-up DP with a 1D rolling row — O(M * N) time, O(min(M, N)) space.
 * dp[j] holds the edit distance between the current word1 prefix and word2[0 ... j - 1].
 * Before the update dp[j] is the cell above (delete), dp[j - 1] is the cell to the left
 * (insert), and prevDiag carries the cell diagonally up-left (replace or match).
 * Edit distance is symmetric, so swapping the words keeps the answer the same.
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  if (word2.length > word1.length) [word1, word2] = [word2, word1];

  const dp = Array.from({ length: word2.length + 1 }, (_, j) => j);

  for (let i = 1; i <= word1.length; i++) {
    let prevDiag = dp[0];
    dp[0] = i;

    for (let j = 1; j <= word2.length; j++) {
      const temp = dp[j];

      if (word1[i - 1] === word2[j - 1]) {
        dp[j] = prevDiag;
      } else {
        dp[j] = 1 + Math.min(prevDiag, dp[j], dp[j - 1]);
      }

      prevDiag = temp;
    }
  }

  return dp[word2.length];
}

const testCases = [
  {
    name: "Standard transformation ('horse' -> 'ros')",
    word1: "horse",
    word2: "ros",
    expected: 3,
  },
  {
    name: "Multi-step transformation ('intention' -> 'execution')",
    word1: "intention",
    word2: "execution",
    expected: 5,
  },
  {
    name: "Empty source string edge case ('' -> 'abc')",
    word1: "",
    word2: "abc",
    expected: 3,
  },
  {
    name: "Empty target string edge case ('hello' -> '')",
    word1: "hello",
    word2: "",
    expected: 5,
  },
  {
    name: "Identical strings ('algorithm' -> 'algorithm')",
    word1: "algorithm",
    word2: "algorithm",
    expected: 0,
  },
  {
    name: "Complete disjoint strings ('abcd' -> 'efgh')",
    word1: "abcd",
    word2: "efgh",
    expected: 4,
  },
  {
    name: "Upper bound 500x500 stress test",
    word1: "a".repeat(500),
    word2: "b".repeat(500),
    expected: 500,
  },
];

console.table(
  testCases.map(({ name, word1, word2, expected }) => {
    const start = performance.now();
    const result = minDistance(word1, word2);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Lengths: `${word1.length}x${word2.length}`,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
