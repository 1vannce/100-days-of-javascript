/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
function findCheapestPrice(n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;

  for (let round = 0; round < k + 1; round++) {
    const tempPrices = [...prices];

    for (const [from, to, cost] of flights) {
      if (prices[from] === Infinity) continue;

      // Read the previous round so each round adds at most one flight.
      tempPrices[to] = Math.min(tempPrices[to], prices[from] + cost);
    }

    prices = tempPrices;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}

const testCases = [
  {
    name: "Standard graph with stop budget constraint",
    n: 4,
    flights: [
      [0, 1, 100],
      [1, 2, 100],
      [2, 0, 100],
      [1, 3, 600],
      [2, 3, 200],
    ],
    src: 0,
    dst: 3,
    k: 1,
    expected: 700,
  },
  {
    name: "Optimal indirect route within allowed stops",
    n: 3,
    flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]],
    src: 0,
    dst: 2,
    k: 1,
    expected: 200,
  },
  {
    name: "Direct flight required (k = 0)",
    n: 3,
    flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]],
    src: 0,
    dst: 2,
    k: 0,
    expected: 500,
  },
  {
    name: "No route possible within stop budget",
    n: 4,
    flights: [[0, 1, 100], [1, 2, 100], [2, 3, 100]],
    src: 0,
    dst: 3,
    k: 1,
    expected: -1,
  },
  {
    name: "Multiple paths with different stop counts",
    n: 5,
    flights: [
      [0, 1, 5],
      [1, 2, 5],
      [0, 3, 2],
      [3, 1, 2],
      [1, 4, 1],
      [4, 2, 1],
    ],
    src: 0,
    dst: 2,
    k: 2,
    expected: 7, // 0 -> 1 -> 4 -> 2 uses exactly two stops.
  },
  {
    name: "No flights",
    n: 2,
    flights: [],
    src: 0,
    dst: 1,
    k: 1,
    expected: -1,
  },
  {
    name: "Flights are directed",
    n: 2,
    flights: [[1, 0, 50]],
    src: 0,
    dst: 1,
    k: 0,
    expected: -1,
  },
  {
    name: "Snapshot prevents chaining during a direct-only round",
    n: 3,
    flights: [[0, 1, 1], [1, 2, 1]],
    src: 0,
    dst: 2,
    k: 0,
    expected: -1,
  },
  {
    name: "Retain a costlier path that leaves enough flights",
    n: 5,
    flights: [[0, 1, 1], [1, 2, 1], [0, 2, 10], [2, 3, 1], [3, 4, 1]],
    src: 0,
    dst: 4,
    k: 2,
    expected: 12,
  },
  {
    name: "Reverse-ordered edges with maximum stop budget",
    n: 100,
    flights: Array.from({ length: 99 }, (_, i) => [98 - i, 99 - i, 10000]),
    src: 0,
    dst: 99,
    k: 99,
    expected: 990000,
  },
];

const results = testCases.map(({ name, n, flights, src, dst, k, expected }) => {
  const before = JSON.stringify(flights);
  const result = findCheapestPrice(n, flights, src, dst, k);
  const unchanged = JSON.stringify(flights) === before;

  return {
    Scenario: name,
    Nodes: n,
    Edges: flights.length,
    K: k,
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
