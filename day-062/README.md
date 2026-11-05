### Day 62: Combination Sum II

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used once in the combination.

> Note: The solution set must not contain duplicate combinations.

**Crucial Requirement:** Combining single-use element bounds with duplicate input values requires both advance sorting and sibling branch pruning. Write a backtracking algorithm that avoids generating redundant combinations in $O(2^N)$ time and $O(N)$ auxiliary space.

**Examples**

```javascript
// Example 1:
combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
// Output:
// [
//   [1, 1, 6],
//   [1, 2, 5],
//   [1, 7],
//   [2, 6]
// ]

// Example 2:
combinationSum2([2, 5, 2, 1, 2], 5);
// Output:
// [
//   [1, 2, 2],
//   [5]
// ]
```

**Constraints**

- $1 \le \text{candidates.length} \le 100$
- $1 \le \text{candidates}[i] \le 50$
- $1 \le \text{target} \le 30$
- **Time Complexity:** $O(2^N)$ where $N = \text{candidates.length}$.
- **Auxiliary Space Complexity:** $O(N)$ for the recursion stack depth and current combination buffer.

**Starter Code**

```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
  // Write your code here
}
```

---

**Approach**

Sort candidates ascending so identical values sit next to each other, then backtrack with a `startIdx`. Recursing with `i + 1` (not `i`) makes each element single-use. To avoid duplicate combinations, skip any `candidates[i]` where `i > startIdx` and it equals `candidates[i - 1]`: that value already started a branch at this level, but it can still be picked at deeper levels (so `[1, 1, 6]` is found). Once `candidates[i] > remain`, the loop `break`s, since every later candidate is at least as large.
