### Day 47: Number of Islands

Given an `m x n` binary grid containing `"1"` (land) and `"0"` (water), return the number of islands. Land cells belong to the same island when connected horizontally or vertically. All four edges are surrounded by water; diagonal contact does not connect islands.

**Crucial Requirement:** Run in O(m × n) time and sink visited land in place by changing `"1"` to `"0"`. Do not allocate a separate visited matrix.

**Examples**

```javascript
numIslands([
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
]); // 1

numIslands([
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
]); // 3

numIslands([["1", "0", "1", "1", "0", "1", "1"]]); // 3
```

**Constraints**

- `m === grid.length` and `n === grid[i].length`.
- `1 <= m, n <= 300`.
- Each cell is `"0"` or `"1"`.
- Time complexity: O(m × n).
- Auxiliary space: O(m × n) worst-case DFS stack; no visited matrix.

**Starter Code**

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  // Write your code here
}
```

**Solution: In-Place Iterative DFS**

1. Scan every coordinate in the grid.
2. When a cell contains `"1"`, increment the island count, sink it, and push its coordinates onto a stack.
3. Pop a cell and inspect its four neighbors. Sink each valid land neighbor immediately before pushing it.
4. Continue until the stack is empty, then resume scanning.

Each traversal reaches exactly the land connected to its starting cell. When it finishes, the entire island is water, so later scans cannot count that island again. Conversely, the first cell found in every remaining island starts one new traversal. Thus every island contributes exactly one to the count.

Sinking on discovery prevents duplicate stack entries. Each cell is scanned once and each land cell has at most four neighbors checked, giving O(m × n) time. The explicit DFS stack uses O(m × n) space in the worst case. It replaces recursive calls so maximum-size islands do not overflow Node.js's call stack. The function mutates the supplied grid; after it returns, all land has been sunk.

The prompt suggests O(min(m, n)) space for BFS. That bound is not guaranteed for arbitrary obstacle-shaped islands: a BFS frontier can be larger than the shorter grid dimension. A general BFS has an O(m × n) worst-case space bound, and an array queue retaining consumed entries can also retain all discovered cells. This solution uses DFS with its explicit O(m × n) stack bound.

**Run the Test Harness**

From the repository root:

```bash
node day-047/solution.js
```

The self-contained `console.table` harness includes all six supplied cases, single-cell grids, a single column, a ring, maximum-size all-land and checkerboard grids, and a long winding island. Every case also checks that all land is sunk and that running again on the same grid returns zero. Failures set a nonzero exit code. Test input clones are harness-only and are not part of the algorithm's auxiliary space.

**Hints**

- Count an island when starting its traversal, rather than when visiting each cell.
- Mark neighbors as water before pushing them, not when popping them.
- Check row and column bounds before accessing a neighbor.
- Use only horizontal and vertical directions.
