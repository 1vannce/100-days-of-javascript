### Day 67: Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:

1. Each of the digits `1-9` must occur exactly once in each row.
2. Each of the digits `1-9` must occur exactly once in each column.
3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

The `'.'` character indicates empty cells that need to be filled.

**Crucial Requirement:** A naive validator checking rows, columns, and 3x3 boxes on every trial cell incurs excessive runtime overhead. Optimize candidate validation to $O(1)$ time using bitmasks or boolean lookup arrays for rows, columns, and boxes, running in $O(9^m)$ time (where $m$ is the number of empty cells) and $O(1)$ auxiliary space. Modify the `board` **in-place**.

**Examples**

```javascript
// Example 1:
const board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];

solveSudoku(board);

// Board modified in-place to:
// [
//   ["5","3","4","6","7","8","9","1","2"],
//   ["6","7","2","1","9","5","3","4","8"],
//   ["1","9","8","3","4","2","5","6","7"],
//   ["8","5","9","7","6","1","4","2","3"],
//   ["4","2","6","8","5","3","7","9","1"],
//   ["7","1","3","9","2","4","8","5","6"],
//   ["9","6","1","5","3","7","2","8","4"],
//   ["2","8","7","4","1","9","6","3","5"],
//   ["3","4","5","2","8","6","1","7","9"]
// ]
```

**Constraints**

- $\text{board.length} == 9$
- $\text{board}[i]\text{.length} == 9$
- $\text{board}[i][j]$ is a digit `'1'-'9'` or `'.'`.
- It is **guaranteed** that the input board has **exactly one valid solution**.
- **Time Complexity:** $O(9^m)$ where $m$ is the number of empty cells ($m \le 81$).
- **Auxiliary Space Complexity:** $O(1)$ constant space (recursion depth bounded to 81).

**Starter Code**

```javascript
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solveSudoku(board) {
  // Write your code here
}
```

---

**Approach**

Track used digits with three arrays of 9 bitmasks (`rows`, `cols`, `boxes`), where bit `d` means digit `d` is taken. One pass over the grid seeds them with the pre-filled digits. `solve(r, c)` walks cells in row-major order, skipping filled cells. For an empty cell, a digit is a candidate when `(rows[r] | cols[c] | boxes[b]) & (1 << val)` is zero, which is an O(1) check. Choose it (write the digit and set the bits), explore the next cell, and on failure unchoose (restore `'.'` and clear the bits). Returning `true` as soon as `r === 9` stops the search with the board already filled in-place.
