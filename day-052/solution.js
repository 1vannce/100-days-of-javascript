/**
 * @param {number[][]} edges
 * @return {number[]}
 */
function findRedundantConnection(edges) {
  // Initialize parent array: each node is its own parent initially
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);

  // Helper function to find root with path compression
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // Path compression
    }
    return parent[x];
  }

  // Helper function to union two sets
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) {
      return false; // Cycle detected, edge is redundant
    }

    parent[rootX] = rootY; // Union the sets
    return true;
  }

  // Process edges
  for (const [u, v] of edges) {
    if (!union(u, v)) {
      return [u, v]; // Return the redundant edge
    }
  }

  return []; // Should not reach here given problem constraints
}

const testCases = [
  {
    name: "3-node triangle cycle",
    edges: [
      [1, 2],
      [1, 3],
      [2, 3],
    ],
    expected: [2, 3],
  },
  {
    name: "5-node graph with cycle at [1, 4]",
    edges: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 4],
      [1, 5],
    ],
    expected: [1, 4],
  },
  {
    name: "Later duplicate connection in 5-node tree",
    edges: [
      [1, 3],
      [3, 4],
      [1, 5],
      [3, 5],
      [2, 3],
    ],
    expected: [3, 5],
  },
  {
    name: "Cycle at the very end of 4 nodes",
    edges: [
      [1, 2],
      [2, 3],
      [3, 1],
    ],
    expected: [3, 1],
  },
  {
    name: "Large ring with pending branch",
    edges: [
      [1, 4],
      [3, 4],
      [1, 3],
      [1, 2],
      [4, 5],
    ],
    expected: [1, 3],
  },
];

console.table(
  testCases.map(({ name, edges, expected }) => {
    const result = findRedundantConnection(edges);
    const passed =
      Array.isArray(result) &&
      result[0] === expected[0] &&
      result[1] === expected[1];

    return {
      Scenario: name,
      TotalEdges: edges.length,
      Expected: JSON.stringify(expected),
      Actual: JSON.stringify(result),
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
