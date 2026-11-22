/**
 * Bottom-up DP with a 1D rolling row — O(m * n) time, O(n) space.
 * dp[c] holds the number of paths to the current row's column c:
 * before the update it is the cell above, dp[c - 1] is the cell to the left.
 * An obstacle zeroes its cell, which also blocks everything reached only through it.
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0;

  const dp = new Array(n).fill(0);
  dp[0] = 1;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (obstacleGrid[r][c] === 1) {
        dp[c] = 0;
      } else if (c > 0) {
        dp[c] += dp[c - 1];
      }
    }
  }

  return dp[n - 1];
}

const testCases = [
  {
    name: "Standard 3x3 grid with center obstacle",
    grid: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    expected: 2,
  },
  {
    name: "2x2 grid with top-right obstacle",
    grid: [
      [0, 1],
      [0, 0],
    ],
    expected: 1,
  },
  {
    name: "Blocked starting cell edge case",
    grid: [
      [1, 0],
      [0, 0],
    ],
    expected: 0,
  },
  {
    name: "Blocked destination cell edge case",
    grid: [
      [0, 0],
      [0, 1],
    ],
    expected: 0,
  },
  {
    name: "Top-row obstacle blocking remainder of first row",
    grid: [
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    expected: 1,
  },
  {
    name: "Completely walled-off diagonal barrier",
    grid: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
    ],
    expected: 0,
  },
];

console.table(
  testCases.map(({ name, grid, expected }) => {
    const start = performance.now();
    // Deep clone grid to ensure immutability check
    const clonedGrid = grid.map((row) => [...row]);
    const result = uniquePathsWithObstacles(clonedGrid);
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
