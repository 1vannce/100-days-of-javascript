### Day 78: Unique Paths

There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (`grid[0][0]`). The robot tries to move to the **bottom-right corner** (`grid[m - 1][n - 1]`). The robot can only move either **down** or **right** at any point in time.

Given the two integers `m` and `n`, return the **number of possible unique paths** that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to $2 \times 10^9$.

**Crucial Requirement:** A naive recursive exploration (`uniquePaths(r + 1, c) + uniquePaths(r, c + 1)`) takes $O(2^{m+n})$ exponential time. Solve this using **bottom-up Dynamic Programming** in $O(m \times n)$ time, and optimize the memory footprint from an $O(m \times n)$ 2D matrix down to a $O(\min(m, n))$ 1D rolling row.

**Examples**

```javascript
// Example 1:
uniquePaths(3, 7);
// Output: 28

// Example 2:
uniquePaths(3, 2);
// Output: 3
// Explanation: Right -> Down -> Down, Down -> Down -> Right, Down -> Right -> Down.

// Example 3:
uniquePaths(1, 1);
// Output: 1
```

**Constraints**

- $1 \le m, n \le 100$
- **Time Complexity:** $O(m \times n)$ — visiting each grid coordinate once.
- **Auxiliary Space Complexity:** $O(\min(m, n))$ using a 1D rolling array instead of a full $m \times n$ grid.

**Starter Code**

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
  // Write your code here
}
```

---

**Approach**

1. **Recurrence:** Every cell `(r, c)` is entered only from above or from the left, so `dp[r][c] = dp[r - 1][c] + dp[r][c - 1]`.
2. **Base cases:** The top row and leftmost column each have exactly one path.
3. **Rolling row:** Row `r` only needs row `r - 1` and the cell to its left. Start with `row = new Array(n).fill(1)` and for each later row do `row[c] += row[c - 1]`: before the update `row[c]` is the cell above, and `row[c - 1]` is already the updated cell to the left.
4. **Space trick:** Swap so `n <= m` before allocating `row`, giving $O(\min(m, n))$ space. Return `row[n - 1]`.
