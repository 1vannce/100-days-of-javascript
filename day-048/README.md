### Day 48: Rotting Oranges

Given an `m x n` grid, each cell contains `0` (empty), `1` (fresh orange), or `2` (rotten orange). Every minute, any fresh orange adjacent horizontally or vertically to a rotten orange becomes rotten.

Return the minimum number of minutes until no fresh oranges remain, or `-1` if this is impossible.

**Crucial Requirement:** Rotting spreads simultaneously from all rotten oranges. Use multi-source breadth-first search (BFS) to model each minute as one layer of propagation.

**Examples**

```javascript
orangesRotting([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]); // 4

orangesRotting([
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
]); // -1: the bottom-left fresh orange is unreachable.

orangesRotting([[0, 2]]); // 0: no fresh oranges initially.
```

**Constraints**

- `m === grid.length` and `n === grid[i].length`.
- `1 <= m, n <= 10`.
- Each cell is `0`, `1`, or `2`.
- Time complexity: O(m × n).
- Auxiliary space: O(m × n) for the BFS queue.

**Starter Code**

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
  // Write your code here
}
```

**Solution: Multi-Source BFS**

1. Scan the grid, count fresh oranges, and enqueue every initially rotten orange.
2. While there are queued cells and fresh oranges, capture the queue's current end index. Process only the cells before that boundary for this minute.
3. For each cell, inspect its four cardinal neighbors. Immediately mark each fresh neighbor rotten, decrement the fresh count, and enqueue it for the next minute.
4. Increment the elapsed minutes after finishing the layer. Return that count if no fresh oranges remain; otherwise return `-1`.

Initially, the queue holds all minute-zero sources. Processing one layer discovers exactly the fresh oranges adjacent to that minute's rotten frontier. Freezing the layer boundary ensures those newly rotten oranges spread only in the following minute. By induction, each orange is reached at its earliest possible minute, so the final elapsed count is minimal. Marking oranges on discovery prevents duplicate entries when waves meet. If the queue is exhausted with fresh oranges remaining, no path from any source can reach them.

The scan and traversal take O(m × n) time because each orange is enqueued at most once and checks at most four neighbors. A head index avoids the repeated array shifting of `queue.shift()`. The queue retains at most O(m × n) coordinates. The function mutates the supplied grid as oranges rot. With no fresh oranges initially, the loop is skipped and the result is `0`.

**Run the Test Harness**

From the repository root:

```bash
node day-048/solution.js
```

The `console.table` harness includes all six supplied cases plus single-cell grids, grids without sources, all-rotten oranges, a single column, diagonal isolation, overlapping waves, and a maximum-size grid. Each input is cloned before running. Failures set a nonzero exit code.

**Hints**

- Seed the queue with all rotten oranges before starting BFS.
- Freeze each layer's boundary so new entries wait until the next minute.
- Mark fresh neighbors rotten before enqueueing them.
- Return `-1` if the fresh count stays positive after propagation stops.
