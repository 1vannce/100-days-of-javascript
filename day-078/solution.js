/**
 * Bottom-up DP with a 1D rolling row — O(m * n) time, O(min(m, n)) space.
 * row[c] holds the number of paths to the current row's column c:
 * before the update it is the cell above, row[c - 1] is the cell to the left.
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
  // Keep the rolling row as short as possible.
  if (n > m) [m, n] = [n, m];

  const row = new Array(n).fill(1); // Top row: exactly one path to each cell

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1];
    }
  }

  return row[n - 1];
}

const testCases = [
  {
    name: "Standard 3x7 grid",
    m: 3,
    n: 7,
    expected: 28,
  },
  {
    name: "Narrow 3x2 grid",
    m: 3,
    n: 2,
    expected: 3,
  },
  {
    name: "Single cell 1x1 edge case",
    m: 1,
    n: 1,
    expected: 1,
  },
  {
    name: "Single row 1x10 grid",
    m: 1,
    n: 10,
    expected: 1,
  },
  {
    name: "Square 10x10 grid",
    m: 10,
    n: 10,
    expected: 48620,
  },
  {
    name: "Large asymmetric 51x9 grid",
    m: 51,
    n: 9,
    expected: 1916797311,
  },
];

console.table(
  testCases.map(({ name, m, n, expected }) => {
    const start = performance.now();
    const result = uniquePaths(m, n);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Grid: `${m}x${n}`,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
