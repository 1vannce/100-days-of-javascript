/**
 * @param {number[][]} points
 * @return {number}
 */
function minCostConnectPoints(points) {
  const n = points.length;
  const visited = new Array(n).fill(false);
  const minDist = new Array(n).fill(Infinity);
  minDist[0] = 0;
  let totalCost = 0;

  for (let count = 0; count < n; count++) {
    // Select the cheapest connection from the current tree to a new point.
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && (u === -1 || minDist[v] < minDist[u])) {
        u = v;
      }
    }

    visited[u] = true;
    totalCost += minDist[u];

    // Compute distances on demand; no edges or adjacency matrix are stored.
    for (let v = 0; v < n; v++) {
      if (visited[v]) continue;
      const dist = Math.abs(points[u][0] - points[v][0])
        + Math.abs(points[u][1] - points[v][1]);
      minDist[v] = Math.min(minDist[v], dist);
    }
  }

  return totalCost;
}

const testCases = [
  {
    name: "5-point cluster",
    points: [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]],
    expected: 20,
  },
  {
    name: "3-point triangle",
    points: [[3, 12], [-2, 5], [-4, 1]],
    expected: 18,
  },
  {
    name: "Single point",
    points: [[0, 0]],
    expected: 0,
  },
  {
    name: "Square corners",
    points: [[0, 0], [1, 1], [1, 0], [0, 1]],
    expected: 3,
  },
  {
    name: "Collinear points along X axis",
    points: [[-10, 0], [-5, 0], [0, 0], [5, 0], [10, 0]],
    expected: 20,
  },
  {
    name: "Two points at coordinate limits",
    points: [[-1000000, -1000000], [1000000, 1000000]],
    expected: 4000000,
  },
  {
    name: "Coordinate-limit square",
    points: [[-1000000, -1000000], [1000000, 1000000],
      [-1000000, 1000000], [1000000, -1000000]],
    expected: 6000000,
  },
  {
    name: "Maximum-size reverse-order vertical line",
    points: Array.from({ length: 1000 }, (_, i) => [0, 999 - i]),
    expected: 999,
  },
];

const results = testCases.map(({ name, points, expected }) => {
  const before = JSON.stringify(points);
  const result = minCostConnectPoints(points);
  const unchanged = JSON.stringify(points) === before;

  return {
    Scenario: name,
    NumPoints: points.length,
    Expected: expected,
    Actual: result,
    Unchanged: unchanged,
    Passed: result === expected && unchanged ? "PASS" : "FAIL",
  };
});

console.table(results);
if (results.some(({ Passed }) => Passed === "FAIL")) {
  process.exitCode = 1;
}
