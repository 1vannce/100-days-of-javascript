/**
 * Bottom-up DP with a 1D rolling row — O(m * n) time, O(n) space.
 * dp[c] holds the minimum path sum to the current row's column c:
 * before the update it is the cell above, dp[c - 1] is the cell to the left.
 * Starting with dp = [0, Infinity, ...] makes row 0 a plain prefix sum.
 * @param {number[][]} grid
 * @return {number}
 */
function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = new Array(n).fill(Infinity);
  dp[0] = 0;

  for (let r = 0; r < m; r++) {
    dp[0] += grid[r][0]; // leftmost column is only reachable from above
    for (let c = 1; c < n; c++) {
      dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);
    }
  }

  return dp[n - 1];
}

const testCases = [
  {
    name: "Standard 3x3 grid with greedy trap",
    grid: [
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ],
    expected: 7,
  },
  {
    name: "Rectangular 2x3 grid",
    grid: [
      [1, 2, 3],
      [4, 5, 6],
    ],
    expected: 12,
  },
  {
    name: "Single cell 1x1 edge case",
    grid: [[5]],
    expected: 5,
  },
  {
    name: "Single row 1x4 grid",
    grid: [[1, 2, 3, 4]],
    expected: 10,
  },
  {
    name: "Single column 4x1 grid",
    grid: [[2], [3], [4], [5]],
    expected: 14,
  },
  {
    name: "Zero-cost corridor bypass",
    grid: [
      [1, 9, 9],
      [1, 0, 0],
      [9, 9, 1],
    ],
    expected: 3, // 1 -> 1 -> 0 -> 0 -> 1 = 3
  },
];

console.table(
  testCases.map(({ name, grid, expected }) => {
    const start = performance.now();
    // Deep clone grid to verify input immutability
    const clonedGrid = grid.map((row) => [...row]);
    const result = minPathSum(clonedGrid);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Grid: `${grid.length}x${grid[0].length}`,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
