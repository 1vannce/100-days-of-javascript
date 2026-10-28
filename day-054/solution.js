// Binary min-heap ordered by the path cost in [cost, node] entries.
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(item) {
    this.heap.push(item);
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][0] <= this.heap[idx][0]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;

    while (true) {
      const left = 2 * idx + 1;
      const right = left + 1;
      let smallest = idx;

      if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right;
      }
      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }

    return min;
  }
}

/**
 * Dijkstra's algorithm for directed edges with nonnegative weights.
 * Time: O((V + E) log V), since unique directed edges imply E <= V(V - 1).
 * Auxiliary space: O(V + E), including stale entries in the heap.
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function networkDelayTime(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, weight] of times) {
    adj[u].push([v, weight]);
  }

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap = new MinHeap();
  heap.push([0, k]);

  while (heap.size() > 0) {
    const [cost, u] = heap.pop();
    // A shorter route may have been queued after this entry.
    if (cost > dist[u]) continue;

    for (const [v, weight] of adj[u]) {
      const nextCost = cost + weight;
      if (nextCost < dist[v]) {
        dist[v] = nextCost;
        heap.push([nextCost, v]);
      }
    }
  }

  let delay = 0;
  for (let node = 1; node <= n; node++) {
    if (dist[node] === Infinity) return -1;
    delay = Math.max(delay, dist[node]);
  }
  return delay;
}

const testCases = [
  {
    name: "Standard 4-node path",
    times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]],
    n: 4, k: 2, expected: 2,
  },
  {
    name: "Simple 2-node direct transmission",
    times: [[1, 2, 1]],
    n: 2, k: 1, expected: 1,
  },
  {
    name: "Unreachable source direction",
    times: [[1, 2, 1]],
    n: 2, k: 2, expected: -1,
  },
  {
    name: "Multiple routes with different path costs",
    times: [[1, 2, 5], [1, 3, 2], [3, 2, 1], [2, 4, 2], [3, 4, 6]],
    n: 4, k: 1, expected: 5,
  },
  {
    name: "Disconnected 3-node graph",
    times: [[1, 2, 1]],
    n: 3, k: 1, expected: -1,
  },
  {
    name: "Zero-weight cycle and equal paths",
    times: [[1, 2, 0], [2, 1, 0], [1, 3, 2], [2, 3, 2]],
    n: 3, k: 1, expected: 2,
  },
  {
    name: "Stale expensive route must be skipped",
    times: [[1, 2, 100], [1, 3, 1], [3, 2, 1], [2, 4, 1]],
    n: 4, k: 1, expected: 3,
  },
  {
    name: "Every arrival costs zero",
    times: [[3, 2, 0], [2, 1, 0]],
    n: 3, k: 3, expected: 0,
  },
  {
    name: "Single node already has the signal",
    times: [],
    n: 1, k: 1, expected: 0,
  },
  {
    name: "Maximum-length chain",
    times: Array.from({ length: 99 }, (_, i) => [i + 1, i + 2, 100]),
    n: 100, k: 1, expected: 9900,
  },
];

const results = testCases.map(({ name, times, n, k, expected }) => {
  const result = networkDelayTime(times, n, k);
  return {
    Scenario: name,
    Nodes: n,
    Edges: times.length,
    Source: k,
    Expected: expected,
    Actual: result,
    Passed: result === expected ? "PASS" : "FAIL",
  };
});
console.table(results);
if (results.some(({ Passed }) => Passed === "FAIL")) process.exitCode = 1;
