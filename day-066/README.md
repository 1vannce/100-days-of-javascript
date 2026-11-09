### Day 66: N-Queens

The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens threaten each other.

Given an integer `n`, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

**Crucial Requirement:** A naive check of board diagonals and rows for every placement takes $O(n)$ per cell, blowing up recursion overhead. Optimize conflict detection to $O(1)$ time by tracking occupied columns and diagonals (`row - col + n` and `row + col`) using state sets or bitmasks, running in $O(n!)$ time and $O(n)$ auxiliary space (excluding output storage).

**Examples**

```javascript
// Example 1:
solveNQueens(4);
// Output:
// [
//   [".Q..", "...Q", "Q...", "..Q."],
//   ["..Q.", "Q...", "...Q", ".Q.."]
// ]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.

// Example 2:
solveNQueens(1);
// Output: [["Q"]]
```

**Constraints**

- $1 \le n \le 9$
- **Time Complexity:** $O(n!)$ — there are $n!$ possible queen placements to explore, pruned efficiently by constraints.
- **Auxiliary Space Complexity:** $O(n)$ for recursion stack depth and tracking sets.

**Starter Code**

```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens(n) {
  // Write your code here
}
```

---

**Approach**

Place one queen per row, so row conflicts can never happen. Three sets give O(1) conflict checks: `cols` for occupied columns, `diag1` for `row - col` (main diagonals) and `diag2` for `row + col` (anti-diagonals). For each column in the current row, skip it if any set already holds it (prune), otherwise add the column and both diagonals and push the column onto `queens` (choose), recurse into the next row (explore), then pop and delete them (unchoose). Boards are only formatted into `'.'`/`'Q'` strings when `r === n`, so the working state stays O(n).
