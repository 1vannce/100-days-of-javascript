### Day 79: Unique Paths II

You are given an `m x n` integer array `obstacleGrid`. There is a robot initially located at the **top-left corner** (`obstacleGrid[0][0]`). The robot tries to move to the **bottom-right corner** (`obstacleGrid[m - 1][n - 1]`). The robot can only move either **down** or **right** at any point in time.

An obstacle and space are marked as `1` or `0` respectively in `obstacleGrid`. A path that the robot takes cannot include **any** square that is an obstacle.

Return the **number of possible unique paths** that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to $2 \times 10^9$.

**Crucial Requirement:** Unlike Day 78, you cannot blindly pre-fill the first row and first column with `1`s—if an obstacle appears at `(0, k)` or `(k, 0)`, every cell beyond it along that edge becomes unreachable (`0` paths). Solve this using a **1D rolling DP array** in $O(m \times n)$ time and $O(n)$ auxiliary space without mutating the input `obstacleGrid`.

**Examples**

```javascript
// Example 1:
uniquePathsWithObstacles([
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]);
// Output: 2
// Explanation: There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right

// Example 2:
uniquePathsWithObstacles([
  [0, 1],
  [0, 0],
]);
// Output: 1

// Example 3:
uniquePathsWithObstacles([
  [1, 0],
  [0, 0],
]);
// Output: 0
// Explanation: The starting cell itself is blocked by an obstacle.
```

**Constraints**

- $m == \text{obstacleGrid.length}$
- $n == \text{obstacleGrid}[i]\text{.length}$
- $1 \le m, n \le 100$
- `obstacleGrid[i][j]` is `0` or `1`.
- **Time Complexity:** $O(m \times n)$ — single pass across all grid cells.
- **Auxiliary Space Complexity:** $O(n)$ — using a 1D rolling row array instead of a full $m \times n$ matrix.

**Starter Code**

```javascript
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
function uniquePathsWithObstacles(obstacleGrid) {
  // Write your code here
}
```

---

**Approach**

1. **Early exit:** If the start or the destination is an obstacle, return `0`.
2. **Recurrence:** `dp[r][c] = 0` on an obstacle, otherwise `dp[r - 1][c] + dp[r][c - 1]`.
3. **Rolling row:** Start with `dp = new Array(n).fill(0)` and `dp[0] = 1`. For each cell, an obstacle sets `dp[c] = 0`; otherwise `dp[c] += dp[c - 1]` (when `c > 0`). Before the update `dp[c]` is the cell above, and `dp[c - 1]` is the already-updated cell to the left.
4. **Why `c === 0` needs no `else`:** `dp[0]` keeps its value from the row above, staying `1` until an obstacle in column `0` zeroes it for all later rows. The same zeroing stops an obstacle on the top row from feeding paths to the cells beyond it.
