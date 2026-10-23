/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function findReachable(topLeft) {
    const reachable = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = [];

    function enqueue(row, col) {
      if (reachable[row][col]) return;
      // Mark on discovery, including corners shared by two ocean edges.
      reachable[row][col] = true;
      queue.push([row, col]);
    }

    for (let row = 0; row < rows; row++) {
      enqueue(row, topLeft ? 0 : cols - 1);
    }
    for (let col = 0; col < cols; col++) {
      enqueue(topLeft ? 0 : rows - 1, col);
    }

    // A head index keeps dequeueing O(1); reverse flow moves uphill or level.
    for (let head = 0; head < queue.length; head++) {
      const [row, col] = queue[head];
      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;
        if (
          nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
          !reachable[nr][nc] && heights[nr][nc] >= heights[row][col]
        ) {
          enqueue(nr, nc);
        }
      }
    }

    return reachable;
  }

  const pacificReachable = findReachable(true);
  const atlanticReachable = findReachable(false);
  const result = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pacificReachable[row][col] && atlanticReachable[row][col]) {
        result.push([row, col]);
      }
    }
  }
  return result;
}

function normalizeCoords(coords) {
  return coords.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function runTests() {
  const allCoords = (rows, cols) => Array.from({ length: rows * cols }, (_, i) =>
    [Math.floor(i / cols), i % cols]
  );
  const testCases = [
    {
      name: "Standard 5x5 island",
      heights: [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
      ],
      expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
    },
    { name: "Single 1x1 cell", heights: [[1]], expected: [[0, 0]] },
    {
      name: "2x2 diagonal",
      heights: [[2, 1], [1, 2]],
      expected: allCoords(2, 2),
    },
    {
      name: "Monotonic strictly descending 3x3",
      heights: [[9, 8, 7], [6, 5, 4], [3, 2, 1]],
      // Interior cells cannot flow uphill to the Pacific's top or left edge.
      expected: [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]],
    },
    {
      name: "Monotonic strictly ascending 3x3",
      heights: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      expected: [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]],
    },
    { name: "Single row", heights: [[5, 0, 3, 1, 9]], expected: allCoords(1, 5) },
    { name: "Single column", heights: [[5], [0], [3], [1]], expected: allCoords(4, 1) },
    {
      name: "Flat zero plateau",
      heights: [[0, 0, 0], [0, 0, 0]],
      expected: allCoords(2, 3),
    },
    {
      name: "Low center trapped inside a ridge",
      heights: [[5, 5, 5], [5, 1, 5], [5, 5, 5]],
      expected: allCoords(3, 3).filter(([row, col]) => row !== 1 || col !== 1),
    },
    {
      name: "High center reaches both oceans",
      heights: [[1, 1, 1], [1, 100000, 1], [1, 1, 1]],
      expected: allCoords(3, 3),
    },
    {
      name: "Maximum-size equal-height plateau",
      heights: Array.from({ length: 200 }, () => Array(200).fill(100000)),
      expected: allCoords(200, 200),
    },
    {
      name: "Maximum-size descending slope",
      heights: Array.from({ length: 200 }, (_, row) =>
        Array.from({ length: 200 }, (_, col) => 400 - row - col)
      ),
      expected: allCoords(200, 200).filter(([row, col]) => row === 0 || col === 0),
    },
  ];

  const results = testCases.map(({ name, heights, expected }) => {
    const before = JSON.stringify(heights);
    const actual = pacificAtlantic(heights);
    const unchanged = JSON.stringify(heights) === before;
    const passed = unchanged &&
      JSON.stringify(normalizeCoords(actual)) === JSON.stringify(normalizeCoords(expected));
    return {
      Scenario: name,
      Dimensions: `${heights.length}x${heights[0].length}`,
      ExpectedCount: expected.length,
      ActualCount: actual.length,
      Unchanged: unchanged,
      Passed: passed ? "PASS" : "FAIL",
    };
  });

  console.table(results);
  if (results.some(({ Passed }) => Passed === "FAIL")) {
    process.exitCode = 1;
  }
}

runTests();
