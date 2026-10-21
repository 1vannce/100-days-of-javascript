/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const stack = [];
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== "1") continue;

      count++;
      // Sink on discovery so each cell enters the stack at most once.
      grid[row][col] = "0";
      stack.push([row, col]);

      while (stack.length > 0) {
        const [r, c] = stack.pop();
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
            grid[nr][nc] === "1"
          ) {
            grid[nr][nc] = "0";
            stack.push([nr, nc]);
          }
        }
      }
    }
  }

  return count;
}

function runTests() {
  const testCases = [
    {
      name: "Single connected island",
      grid: [
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
      ],
      expected: 1,
    },
    {
      name: "Three disconnected islands",
      grid: [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"],
      ],
      expected: 3,
    },
    { name: "All water", grid: [["0", "0", "0"], ["0", "0", "0"]], expected: 0 },
    { name: "All land", grid: [["1", "1"], ["1", "1"]], expected: 1 },
    { name: "Diagonal disconnected land", grid: [["1", "0"], ["0", "1"]], expected: 2 },
    { name: "1xN single-row strip", grid: [["1", "0", "1", "1", "0", "1", "1"]], expected: 3 },
    { name: "Single land cell", grid: [["1"]], expected: 1 },
    { name: "Single water cell", grid: [["0"]], expected: 0 },
    { name: "Single-column strip", grid: [..."1011011"].map((cell) => [cell]), expected: 3 },
    {
      name: "Ring surrounding water",
      grid: [
        ["1", "1", "1"],
        ["1", "0", "1"],
        ["1", "1", "1"],
      ],
      expected: 1,
    },
    {
      name: "Maximum-size all land",
      grid: Array.from({ length: 300 }, () => Array(300).fill("1")),
      expected: 1,
    },
    {
      name: "Maximum-size checkerboard",
      grid: Array.from({ length: 300 }, (_, r) =>
        Array.from({ length: 300 }, (_, c) => (r + c) % 2 === 0 ? "1" : "0")
      ),
      expected: 45000,
    },
    {
      name: "Long winding island",
      grid: Array.from({ length: 299 }, (_, r) =>
        Array.from({ length: 300 }, (_, c) =>
          r % 2 === 0 || c === (r % 4 === 1 ? 299 : 0) ? "1" : "0"
        )
      ),
      expected: 1,
    },
  ];

  const results = testCases.map(({ name, grid, expected }) => {
    const gridClone = grid.map((row) => [...row]);
    const result = numIslands(gridClone);
    const sunk = gridClone.every((row) => row.every((cell) => cell === "0"));
    const repeatResult = numIslands(gridClone);
    const passed = result === expected && sunk && repeatResult === 0;

    return {
      Scenario: name,
      Dimensions: `${grid.length}x${grid[0].length}`,
      Expected: expected,
      Actual: result,
      Sunk: sunk,
      Passed: passed ? "PASS" : "FAIL",
    };
  });

  console.table(results);
  if (results.some(({ Passed }) => Passed === "FAIL")) {
    process.exitCode = 1;
  }
}

runTests();
