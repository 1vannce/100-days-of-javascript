/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const queue = [];
  let freshCount = 0;
  let head = 0;
  let minutes = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) freshCount++;
      else if (grid[row][col] === 2) queue.push([row, col]);
    }
  }

  while (head < queue.length && freshCount > 0) {
    // Freeze this minute's frontier; newly rotten cells wait for the next layer.
    const levelEnd = queue.length;
    while (head < levelEnd) {
      const [row, col] = queue[head++];
      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;
        if (
          nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
          grid[nr][nc] === 1
        ) {
          // Mark on discovery so overlapping waves enqueue each orange only once.
          grid[nr][nc] = 2;
          freshCount--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++;
  }

  return freshCount === 0 ? minutes : -1;
}

function runTests() {
  const testCases = [
    {
      name: "Standard propagation (4 minutes)",
      grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]],
      expected: 4,
    },
    {
      name: "Isolated fresh orange (unreachable)",
      grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]],
      expected: -1,
    },
    { name: "No fresh oranges initially", grid: [[0, 2]], expected: 0 },
    { name: "Only empty spaces", grid: [[0, 0], [0, 0]], expected: 0 },
    {
      name: "Multiple rotten sources acting simultaneously",
      grid: [[2, 1, 0, 2], [1, 1, 1, 1]],
      expected: 2,
    },
    { name: "Linear chain", grid: [[2, 1, 1, 1, 1]], expected: 4 },
    { name: "Single fresh orange without a source", grid: [[1]], expected: -1 },
    { name: "Single rotten orange", grid: [[2]], expected: 0 },
    { name: "Single empty cell", grid: [[0]], expected: 0 },
    { name: "All fresh without a source", grid: [[1, 1], [1, 1]], expected: -1 },
    { name: "All rotten", grid: [[2, 2], [2, 2]], expected: 0 },
    { name: "Single-column chain", grid: [[2], [1], [1], [1]], expected: 3 },
    { name: "Diagonal contact cannot spread rot", grid: [[2, 0], [0, 1]], expected: -1 },
    { name: "Overlapping waves", grid: [[2, 1, 2]], expected: 1 },
    {
      name: "Maximum-size grid from one corner",
      grid: Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => row === 0 && col === 0 ? 2 : 1)
      ),
      expected: 18,
    },
  ];

  const results = testCases.map(({ name, grid, expected }) => {
    const gridClone = grid.map((row) => [...row]);
    const result = orangesRotting(gridClone);
    const passed = result === expected;

    return {
      Scenario: name,
      Dimensions: `${grid.length}x${grid[0].length}`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  });

  console.table(results);
  if (results.some(({ Passed }) => Passed === "FAIL")) {
    process.exitCode = 1;
  }
}

runTests();
