### Day 65: Word Search

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a single word path.

**Crucial Requirement:** A naive solution that copies the entire grid or maintains a global `Set` of visited cell coordinates `(r, c)` incurs heavy allocation overhead during deep recursion. Solve this by performing in-place grid mutation backtracking (temporarily marking the current cell with a sentinel value like `'#'` and restoring it during the unchoose step) in $O(m \cdot n \cdot 4^L)$ time (where $L$ is `word.length`) and $O(L)$ auxiliary space.

**Examples**

```javascript
// Example 1:
exist(board, "ABCCED");
// Output: true

// Example 2:
exist(board, "SEE");
// Output: true

// Example 3:
exist(board, "ABCB");
// Output: false
// Explanation: The cell 'B' at (0, 1) cannot be reused to reach 'B' again.
```

where `board` is:

```
A B C E
S F C S
A D E E
```

**Constraints**

- $m == \text{board.length}$
- $n == \text{board}[i]\text{.length}$
- $1 \le m, n \le 6$
- $1 \le \text{word.length} \le 15$
- `board` and `word` consist of lowercase and uppercase English letters.
- **Time Complexity:** $O(m \cdot n \cdot 4^L)$ where $L = \text{word.length}$.
- **Auxiliary Space Complexity:** $O(L)$ for the recursion call stack.

**Starter Code**

```javascript
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  // Write your code here
}
```

---

**Approach**

Scan every cell and start a DFS wherever `board[r][c]` matches `word[0]`. The DFS marks the current cell `'#'` in place (choose), tries the four neighbours for the next letter (explore), then restores the original letter (unchoose), so the only extra memory is the recursion stack. Two optional prunes: return `false` early if any letter occurs more often in `word` than on the board, and search the reversed word when its first letter is more common than its last, which shrinks the number of starting branches.
