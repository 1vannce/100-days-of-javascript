### Day 61: Combination Sum

Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.

The same number may be chosen from `candidates` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum to `target` is less than 150 combinations for the given input.

**Crucial Requirement:** Write an efficient backtracking algorithm that prunes invalid branches early (when `currentSum > target` or `target < 0`). To prevent generating duplicate combinations (e.g., `[2, 2, 3]` and `[3, 2, 2]`), ensure your recursive calls only explore candidates at or after the current index (`startIdx`).

**Examples**

```javascript
// Example 1:
combinationSum([2, 3, 6, 7], 7);
// Output: [[2, 2, 3], [7]]
// Explanation:
// 2 and 3 can be combined: 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.

// Example 2:
combinationSum([2, 3, 5], 8);
// Output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]

// Example 3:
combinationSum([2], 1);
// Output: []
```

**Constraints**

- All elements of `candidates` are distinct.
- **Time Complexity:** $O(N^{T/M})$ where $N$ is the number of candidates, $T$ is the target value, and $M$ is the minimal value among candidates.
- **Auxiliary Space Complexity:** $O(T/M)$ for the recursion stack depth and combination path buffer.

**Starter Code**

```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  // Write your code here
}
```

---

**Approach**

Sort candidates ascending, then backtrack with a `startIdx`. Each step subtracts the chosen candidate from the remaining target; `0` records a copy of the path. Recursing with `i` (not `i + 1`) allows unlimited reuse, while never looking before `startIdx` prevents permutations of the same combination. Because candidates are sorted, once `candidates[i] > remain` the loop `break`s, pruning every later candidate too.
