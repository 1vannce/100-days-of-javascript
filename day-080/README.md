### Day 80: Minimum Path Sum

Given an `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which **minimizes the sum of all numbers along its path**.

> **Note:** You can only move either **down** or **right** at any point in time.

**Crucial Requirement:** A greedy traversal (always stepping into the smaller adjacent neighbor) fails whenever a higher-cost immediate cell unlocks a sequence of cheap cells downstream. Solve this using **bottom-up 1D rolling Dynamic Programming** in $O(m \times n)$ time and $O(n)$ auxiliary space without mutating the input `grid`.

**Examples**

```javascript
// Example 1:
minPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]);
// Output: 7
// Explanation: Because the path 1 -> 3 -> 1 -> 1 -> 1 minimizes the sum (7).

// Example 2:
minPathSum([
  [1, 2, 3],
  [4, 5, 6],
]);
// Output: 12
// Explanation: Path 1 -> 2 -> 3 -> 6 = 12 (beats 1 -> 4 -> 5 -> 6 = 16).

// Example 3:
minPathSum([[5]]);
// Output: 5
```

**Constraints**

- $m == \text{grid.length}$
- $n == \text{grid}[i]\text{.length}$
- $1 \le m, n \le 200$
- $0 \le \text{grid}[i][j] \le 200$
- **Time Complexity:** $O(m \times n)$ — single pass across all grid cells.
- **Auxiliary Space Complexity:** $O(n)$ — using a 1D rolling row array rather than allocating a full $m \times n$ matrix.

**Starter Code**

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function minPathSum(grid) {
  // Write your code here
}
```

---

**Approach**

1. **Recurrence:** `dp[r][c] = grid[r][c] + min(dp[r - 1][c], dp[r][c - 1])`.
2. **Rolling row:** Start with `dp = new Array(n).fill(Infinity)` and `dp[0] = 0`. Before the update `dp[c]` is the cell above, and `dp[c - 1]` is the already-updated cell to the left.
3. **Why `Infinity` with `dp[0] = 0`:** On row `0`, `dp[0]` becomes `grid[0][0]` and each `c > 0` takes `grid[0][c] + min(Infinity, dp[c - 1])`, so the first row is a prefix sum with no special case.
4. **Leftmost column:** It can only be reached from above, so each row starts with `dp[0] += grid[r][0]`.
