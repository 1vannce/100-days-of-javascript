### Day 73: House Robber II

You are planning a nighttime heist in a circular neighborhood where all houses are arranged in a continuous ring. Because of this circular layout, **the first house is directly adjacent to the last house**.

Each house contains a non-negative integer stash of cash represented in an array `nums`. Adjacent houses share a connected security system that automatically triggers an alarm if two neighboring houses are broken into on the same night.

Given an integer array `nums` representing the amount of money in each house, return the **maximum amount of money** you can rob tonight without alerting the police.

**Crucial Requirement:** Trying to track whether index `0` was robbed inside a single DP loop creates messy conditional state dependencies. Instead, decompose the circular constraint into **two independent linear DP subproblems**: compute the optimal loot over `nums[0 ... n - 2]` (excluding the last house) and `nums[1 ... n - 1]` (excluding the first house), and return the maximum of the two in $O(n)$ time and $O(1)$ auxiliary space.

**Examples**

```javascript
// Example 1:
robCircular([2, 3, 2]);
// Output: 3
// Explanation: You cannot rob house 0 (money = 2) and then rob house 2 (money = 2),
// because they are adjacent in the circle. The maximum is house 1 (money = 3).

// Example 2:
robCircular([1, 2, 3, 1]);
// Output: 4
// Explanation: Rob house 0 (money = 1) and house 2 (money = 3).
// Total amount = 1 + 3 = 4.

// Example 3:
robCircular([1, 2, 3]);
// Output: 3
```

**Constraints**

- $1 \le \text{nums.length} \le 100$
- $0 \le \text{nums}[i] \le 1000$
- **Time Complexity:** $O(n)$ — two linear passes through slices of length $n - 1$.
- **Auxiliary Space Complexity:** $O(1)$ — constant memory using rolling state variables with index bounds (no `.slice()` copies).

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function robCircular(nums) {
  // Write your code here
}
```

---

**Approach**

House `0` and house `n - 1` are adjacent, so no valid solution robs both. Every optimal solution therefore falls into one of two cases: exclude the last house (solve linear House Robber on indices `0` to `n - 2`) or exclude the first house (indices `1` to `n - 1`). A helper `robRange(start, end)` runs the rolling-variable recurrence `current = max(prev1, prev2 + nums[i])` over inclusive index bounds, avoiding `.slice()` copies. A single-house array is returned directly, since the two ranges would otherwise be empty or overlap incorrectly. The answer is `max(robRange(0, n - 2), robRange(1, n - 1))`.
