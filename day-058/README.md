### Day 58: Subsets II

Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Crucial Requirement:** Converting generated subsets to stringified signatures or filtering through a global `Set` adds unnecessary memory and runtime overhead ($O(n \cdot 2^n)$ with high constant factors). Solve this by sorting the array first and performing in-flight branch pruning during backtracking in $O(n \cdot 2^n)$ time and $O(n)$ auxiliary space.

**Examples**

```javascript
// Example 1:
subsetsWithDup([1, 2, 2]);
// Output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]

// Example 2:
subsetsWithDup([0]);
// Output: [[], [0]]

// Example 3:
subsetsWithDup([4, 4, 4, 1, 4]);
// Output: [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]]
```

**Constraints**

- $1 \le \text{nums.length} \le 10$
- $-10 \le \text{nums}[i] \le 10$
- **Time Complexity:** $O(n \log n + n \cdot 2^n)$ where $n = \text{nums.length}$.
- **Auxiliary Space Complexity:** $O(n)$ for the recursion stack and path array (excluding the output container).

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsetsWithDup(nums) {
  // Write your code here
}
```

---

**Hints**

- **Sort First:** Always sort the input array: `nums.sort((a, b) => a - b)`. This places duplicate numbers consecutively, allowing you to identify identical choices at the current recursion level.
- **The Sibling Pruning Rule:**
  - When looping with `for (let i = start; i < nums.length; i++)`:
  - If `i > start` and `nums[i] === nums[i - 1]`, skip this iteration with `continue`.
  - Why `i > start`? Because `i === start` represents choosing the duplicate element at the next depth (e.g., picking the second `2` to form `[2, 2]`), which is entirely valid. Skipping only when `i > start` prevents starting an identical branch at the same recursion level.
- **Backtracking Structure:**
  1. Add a snapshot to results: `result.push([...currentPath])`.
  2. Iterate from `start` to `nums.length - 1`.
  3. Apply the sibling skip rule.
  4. Choose: `currentPath.push(nums[i])`.
  5. Explore: `backtrack(i + 1, currentPath)`.
  6. Unchoose: `currentPath.pop()`.
