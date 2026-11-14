### Day 71: Climbing Stairs

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

**Crucial Requirement:** A naive top-down recursive approach (`climbStairs(n - 1) + climbStairs(n - 2)`) recalculates the same subproblems repeatedly, causing $O(2^n)$ exponential time complexity that times out on larger inputs. Solve this using bottom-up space-optimized Dynamic Programming (two state variables tracking the previous two step counts) in $O(n)$ time and $O(1)$ auxiliary space.

**Examples**

```javascript
// Example 1:
climbStairs(2);
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
climbStairs(3);
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// Example 3:
climbStairs(5);
// Output: 8
```

**Constraints**

- $1 \le n \le 45$
- **Time Complexity:** $O(n)$ — single linear pass from step `3` up to `n`.
- **Auxiliary Space Complexity:** $O(1)$ — constant memory using rolling variables instead of an $O(n)$ DP array.

**Starter Code**

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Write your code here
}
```

---

**Approach**

To reach step `i`, the final move came from step `i - 1` (a 1-step hop) or step `i - 2` (a 2-step hop), so `dp[i] = dp[i - 1] + dp[i - 2]`. Only the last two values are ever needed, so the DP array is replaced by two rolling variables: `prev2` (ways to reach step 1) and `prev1` (ways to reach step 2). Loop `i` from `3` to `n`, computing `current = prev1 + prev2` and shifting the window. Return `n` directly when `n <= 2`.
