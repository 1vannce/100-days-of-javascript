### Day 77: Partition Equal Subset Sum

Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or `false` otherwise.

**Crucial Requirement:** Each element in `nums` may be placed in at most one subset (0/1 Knapsack constraint). A naive recursive subset search runs in $O(2^n)$ exponential time. Reduce this problem to finding a subset that sums to `totalSum / 2`, and solve it using 1D space-optimized Dynamic Programming with a reverse inner loop (`target` down to `num`) in $O(n \times \text{target})$ time and $O(\text{target})$ auxiliary space.

**Examples**

```javascript
// Example 1:
canPartition([1, 5, 11, 5]);
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11] (both sum to 11).

// Example 2:
canPartition([1, 2, 3, 5]);
// Output: false
// Explanation: Total sum is 11 (odd), so it cannot be split into two equal integer sums.

// Example 3:
canPartition([2, 2, 3, 5]);
// Output: false
// Explanation: Total sum is 12 (target = 6), but no subset sums to 6.
```

**Constraints**

- $1 \le \text{nums.length} \le 200$
- $1 \le \text{nums}[i] \le 100$
- **Time Complexity:** $O(n \times \text{target})$ where $\text{target} = \frac{\sum \text{nums}}{2}$.
- **Auxiliary Space Complexity:** $O(\text{target})$ using a 1D boolean DP array instead of a 2D $n \times \text{target}$ matrix.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
  // Write your code here
}
```

---

**Approach**

1. **Prune early:** If `totalSum` is odd, two equal integer sums are impossible, so return `false`. Otherwise set `target = totalSum / 2`; if any single `num > target`, return `false`.
2. **1D DP state:** `dp[s]` is `true` if some subset of the numbers seen so far sums to `s`. Start with `dp[0] = true` (the empty subset).
3. **Reverse inner loop (0/1 vs. unbounded):** For each `num`, iterate `s` from `target` down to `num` and set `dp[s] = true` when `dp[s - num]` is true. Going backward guarantees `dp[s - num]` still reflects the state *before* `num` was considered, so each number is used at most once. (Iterating forward, as in Day 75's Coin Change II, would allow reuse.)
4. **Early exit:** Return `true` as soon as `dp[target]` becomes `true`.
