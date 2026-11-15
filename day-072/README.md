### Day 72: House Robber

You are a seasoned strategist planning a heist along a street lined with houses. Each house contains a specific stash of cash represented by a non-negative integer in an array `nums`.

However, adjacent houses are wired to a shared security grid: if two neighboring houses are entered on the same night, an alarm triggers automatically.

Given an integer array `nums` representing the cash stored in each house, return the maximum amount of money you can collect tonight without alerting the security system.

**Crucial Requirement:** A greedy approach (such as comparing the sum of even-indexed houses vs. odd-indexed houses) fails whenever skipping two consecutive houses yields a higher total (e.g., `[2, 1, 1, 2]`). Solve this using bottom-up space-optimized Dynamic Programming (two rolling state variables tracking the maximum profit up to `i - 1` and `i - 2`) in $O(n)$ time and $O(1)$ auxiliary space.

**Examples**

```javascript
// Example 1:
rob([1, 2, 3, 1]);
// Output: 4
// Explanation: Rob house 0 (money = 1) and house 2 (money = 3).
// Total amount = 1 + 3 = 4.

// Example 2:
rob([2, 7, 9, 3, 1]);
// Output: 12
// Explanation: Rob house 0 (2), house 2 (9), and house 4 (1).
// Total amount = 2 + 9 + 1 = 12.

// Example 3:
rob([2, 1, 1, 2]);
// Output: 4
// Explanation: Rob house 0 (2) and house 3 (2), skipping two middle houses.
// Total amount = 2 + 2 = 4.
```

**Constraints**

- $1 \le \text{nums.length} \le 100$
- $0 \le \text{nums}[i] \le 400$
- **Time Complexity:** $O(n)$ — single linear pass through the array.
- **Auxiliary Space Complexity:** $O(1)$ — constant memory using rolling state variables rather than an $O(n)$ DP array.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  // Write your code here
}
```

---

**Approach**

At house `i` there are two mutually exclusive choices: rob it (`prev2 + nums[i]`) or skip it (`prev1`), so `dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`. Only the last two values are needed, so the DP array is replaced by two rolling variables: `prev2` (best loot up to `i - 2`) and `prev1` (best loot up to `i - 1`). Both start at `0`, which also covers the single-house case. Iterate through `nums`, computing `current = max(prev1, prev2 + amount)` and shifting the window, then return `prev1`.
