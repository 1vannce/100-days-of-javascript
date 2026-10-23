### Day 49: Pacific Atlantic Water Flow

Given an `m x n` integer matrix `heights`, return the coordinates of cells whose rainwater can flow to both the Pacific and Atlantic oceans, in any order.

The Pacific touches the top and left edges. The Atlantic touches the bottom and right edges. Water flows north, south, east, or west to a cell of equal or lower height, and from an ocean boundary cell into that ocean.

**Crucial Requirement:** Search backward from each ocean's boundaries, moving to neighbors of equal or greater height. Searching downhill separately from every cell can take O((m × n)²); two multi-source searches take O(m × n).

**Examples**

```javascript
pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]); // [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]

pacificAtlantic([[1]]); // [[0, 0]]: touches both oceans.

pacificAtlantic([[2, 1], [1, 2]]);
// [[0, 0], [0, 1], [1, 0], [1, 1]]
```

**Constraints**

- `m === heights.length` and `n === heights[r].length`.
- `1 <= m, n <= 200`.
- `0 <= heights[r][c] <= 100000`.
- Time complexity: O(m × n).
- Auxiliary space: O(m × n) for two boolean visited matrices and the traversal queue.

**Starter Code**

```javascript
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {
  // Write your code here
}
```

**Solution: Reverse Multi-Source BFS**

1. Allocate a boolean visited matrix and seed a queue with all cells on the Pacific's top and left edges. Mark each cell as it is enqueued, preventing duplicate corner entries.
2. Traverse the queue using a head index. Visit an unvisited cardinal neighbor only when its height is greater than or equal to the current cell's height.
3. Repeat with a separate visited matrix, starting at the Atlantic's bottom and right edges.
4. Scan the grid and collect cells marked in both matrices.

Every step in a reverse search corresponds to a valid downhill or level step toward that ocean when reversed. Thus every marked cell can reach the ocean. Conversely, reversing any valid path from a cell to an ocean produces an uphill or level path from a seeded boundary cell, so the search marks every cell that can reach it. The intersection therefore contains exactly the cells that reach both oceans.

Each cell is enqueued at most once per ocean and checks four neighbors. Including initialization and the final scan, time is O(m × n) and auxiliary space is O(m × n). A head index avoids `queue.shift()` costs, and iterative BFS avoids recursion limits on large plateaus. The input matrix is unchanged.

**Correction to the Supplied Harness**

For `[[9, 8, 7], [6, 5, 4], [3, 2, 1]]`, the correct result is `[[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]]`, rather than all nine cells. Every cell can reach the Atlantic downhill, but only the top row and left column can reach the Pacific. For example, the center cell of height `5` cannot climb to `8` or `6` to reach the Pacific.

**Run the Test Harness**

From the repository root:

```bash
node day-049/solution.js
```

The `console.table` harness covers the three examples, the corrected descending grid, an ascending grid, a single row and column, a zero plateau, a trapped low center, a high center, and maximum-size plateau and slope grids. It compares complete coordinate lists after sorting, checks that inputs remain unchanged, and sets a nonzero exit code on failure.

**Hints**

- Start at every boundary cell for each ocean before processing its queue.
- Reverse water flow with `neighborHeight >= currentHeight`.
- Keep separate Pacific and Atlantic reachability matrices.
- Mark cells when enqueuing them and return the intersection.
