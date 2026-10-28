### Day 53: Min Cost to Connect All Points

Given an array `points` of integer coordinates on a 2D plane, return the minimum cost to connect all points so there is exactly one simple path between any two points.

The cost of connecting `[xi, yi]` and `[xj, yj]` is their Manhattan distance:

```text
abs(xi - xj) + abs(yi - yj)
```

**Crucial Requirement:** Use Prim's algorithm with an array-based minimum-distance tracker in **O(V²) time** and **O(V) auxiliary space**. The graph is complete; do not store all edges, build an adjacency matrix, or sort edges for Kruskal's algorithm.

**Examples**

```javascript
minCostConnectPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]);
// Output: 20 (edge costs 4 + 3 + 4 + 9)

minCostConnectPoints([[3, 12], [-2, 5], [-4, 1]]);
// Output: 18

minCostConnectPoints([[0, 0]]);
// Output: 0
```

**Constraints**

- `1 <= points.length <= 1000`
- `-10^6 <= xi, yi <= 10^6`
- All coordinate pairs are distinct.

**Starter Code**

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
function minCostConnectPoints(points) {
  // Write your code here
}
```

**Approach and Hints**

1. Initialize `visited` to `false` and `minDist` to `Infinity` for every point. Set `minDist[0] = 0` to start the tree at point 0 with no connection cost.
2. Repeat `V` times: scan for the unvisited point `u` with the smallest `minDist[u]`, mark it visited, and add its connection cost to the total.
3. For every unvisited point `v`, compute its Manhattan distance to `u` and update `minDist[v]` if this connection is cheaper.

The invariant is that `minDist[v]` stores the cheapest edge from any point already in the tree to unvisited point `v`. Selecting the smallest such value chooses a cheapest edge across the cut between visited and unvisited points. By the MST cut property, this edge can extend a minimum spanning tree. Every selection adds one new point without forming a cycle, so after all points are visited the total is the minimum connection cost.

Each iteration scans at most `V` points twice, giving **O(V²) time**. Only the `visited` and `minDist` arrays grow with the input, giving **O(V) auxiliary space**. Distances are calculated on demand and the input is unchanged.

**Run the Test Harness**

From the repository root:

```bash
node day-053/solution.js
```

The solution includes the five supplied scenarios plus coordinate-limit and maximum-size cases. The table reports expected and actual costs, input preservation, and PASS/FAIL; failures set a nonzero exit code.
