### Day 76: Longest Increasing Subsequence

Given an integer array `nums`, return the length of the **longest strictly increasing subsequence**.

> A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements. For example, `[3, 6, 2, 7]` is a subsequence of `[0, 3, 1, 6, 2, 2, 7]`.

**Crucial Requirement:** A standard bottom-up DP approach checks all prior indices `j < i` for every element `i`, running in $O(n^2)$ time and $O(n)$ auxiliary space. Implement that foundational DP solution first, then optimize it to $O(n \log n)$ time and $O(n)$ auxiliary space using Patience Sorting (greedy tail tracking + binary search).

**Examples**

```javascript
// Example 1:
lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);
// Output: 4
// Explanation: The longest increasing subsequence is [2, 3, 7, 101] (or [2, 3, 7, 18]),
// therefore the length is 4.

// Example 2:
lengthOfLIS([0, 1, 0, 3, 2, 3]);
// Output: 4
// Explanation: [0, 1, 2, 3] has length 4.

// Example 3:
lengthOfLIS([7, 7, 7, 7, 7, 7, 7]);
// Output: 1
// Explanation: Strictly increasing requires nums[j] < nums[i], so equal elements cannot extend a sequence.
```

**Constraints**

- **Time Complexity:** $O(n^2)$ for standard DP; $O(n \log n)$ for the binary search optimization.
- **Auxiliary Space Complexity:** $O(n)$ for the DP table or tails array.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  // Write your code here
}
```

---

**Approach**

1. **Classic DP, $O(n^2)$:** Let `dp[i]` be the length of the longest strictly increasing subsequence ending at index `i`, initialized to `1`. For each `i`, scan every `j < i`; if `nums[j] < nums[i]`, set `dp[i] = max(dp[i], dp[j] + 1)`. The answer is the maximum of `dp`.
2. **Patience sorting, $O(n \log n)$:** Maintain a sorted array `tails` where `tails[k]` is the smallest possible tail of any strictly increasing subsequence of length `k + 1`. For each number, binary search (lower bound) for the first `tails[left] >= num`. If none exists, append; otherwise replace `tails[left]` with `num`, keeping tails as small as possible to maximize future extension. `tails` is not necessarily a real subsequence, but `tails.length` equals the LIS length.
