### Day 52: Redundant Connection

In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed. The graph is represented as an array `edges` of length `n` where `edges[i] = [u_i, v_i]` indicates that there is an edge between nodes `u_i` and `v_i`.

Return an edge that can be removed so that the resulting graph is a tree of `n` nodes. If there are multiple answers, return the answer that occurs **last** in the input `edges`.

**Crucial Requirement:** Write an algorithm using **Disjoint Set Union (Union-Find)** with path compression and union-by-rank. Processing edges sequentially ensures you identify the exact redundant edge creating the cycle in near-linear **$O(n \cdot \alpha(n))$ time** (where $\alpha$ is the Inverse Ackermann function, effectively $O(1)$) and **$O(n)$ space**.

**Examples**

```javascript
// Example 1:
findRedundantConnection([[1, 2], [1, 3], [2, 3]]);
// Output: [2, 3]
// Explanation: Nodes 1, 2, and 3 form a triangle cycle. [2, 3] appears last in the input.

// Example 2:
findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]);
// Output: [1, 4]
// Explanation: The cycle is 1-2-3-4-1. The edge [1, 4] is the last edge in the input that closes this cycle.

// Example 3:
findRedundantConnection([[1, 3], [3, 4], [1, 5], [3, 5], [2, 3]]);
// Output: [3, 5]

```

**Constraints**

* $n == \text{edges.length}$
* $3 \le n \le 1000$
* $\text{edges}[i]\text{.length} == 2$
* $1 \le u_i < v_i \le n$
* There are no repeated edges in `edges`.
* The given graph is connected.
* Time Complexity: $O(n \cdot \alpha(n)) \approx O(n)$
* Auxiliary Space Complexity: $O(n)$ for parent and rank arrays.

**Starter Code**

```javascript
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
function findRedundantConnection(edges) {
  // Write your code here
}

```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  {
    name: "3-node triangle cycle",
    edges: [[1, 2], [1, 3], [2, 3]],
    expected: [2, 3],
  },
  {
    name: "5-node graph with cycle at [1, 4]",
    edges: [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]],
    expected: [1, 4],
  },
  {
    name: "Later duplicate connection in 5-node tree",
    edges: [[1, 3], [3, 4], [1, 5], [3, 5], [2, 3]],
    expected: [3, 5],
  },
  {
    name: "Cycle at the very end of 4 nodes",
    edges: [[1, 2], [2, 3], [3, 1]],
    expected: [3, 1],
  },
  {
    name: "Large ring with pending branch",
    edges: [[1, 4], [3, 4], [1, 3], [1, 2], [4, 5]],
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
  })
);

```

---

**Hints**

* **Disjoint Set Union (DSU) Invariant:** In a tree, adding an edge between two vertices that are **already in the same connected component** creates a cycle.
* **Initialization:**
* Since nodes are 1-indexed up to $n$, initialize a `parent` array where `parent[i] = i` for $1 \le i \le n$.
* Initialize a `rank` array filled with `1` or `0`.


* **Path Compression:**
* When writing `find(i)`, recursively set `parent[i] = find(parent[i])` so every node points directly to the component root, flattening future lookups to $O(1)$.


* **Union by Rank:**
* When writing `union(u, v)`:
* Find roots `rootU = find(u)` and `rootV = find(v)`.
* If `rootU === rootV`, an existing path already connects $u$ and $v$—the current edge `[u, v]` is redundant and closes a cycle! Return `false`.
* Otherwise, attach the shorter tree under the taller tree, update ranks, and return `true`.




* **Processing Order:** Iterate through `edges` in the given order. The first edge where `union(u, v)` returns `false` is guaranteed to be the redundant connection that appeared last in the cycle.
