### Day 59: Permutations

Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

**Crucial Requirement:** For an array of size $n$, there are $n!$ possible permutations. Write a clean backtracking algorithm running in $O(n \cdot n!)$ time and $O(n)$ auxiliary space (excluding the output array). Compare the two classic implementation approaches: used-array tracking versus in-place array swapping.

**Examples**

```javascript
// Example 1:
permute([1, 2, 3]);
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// Example 2:
permute([0, 1]);
// Output: [[0,1],[1,0]]

// Example 3:
permute([1]);
// Output: [[1]]
```

**Constraints**

- $1 \le \text{nums.length} \le 6$
- $-10 \le \text{nums}[i] \le 10$
- All integers of `nums` are unique.
- **Time Complexity:** $O(n \cdot n!)$ — there are $n!$ permutations, each requiring $O(n)$ time to copy into the result.
- **Auxiliary Space Complexity:** $O(n)$ for the recursion call stack and current path tracking.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  // Write your code here
}
```

---

**Approach Comparison**

| Approach      | Extra state                    | Output order    | Notes                                    |
| ------------- | ------------------------------ | --------------- | ---------------------------------------- |
| Used-array    | `path` + `used` (both O(n)) | Lexicographic   | Easiest to reason about; skips used slots |
| In-place swap | None besides recursion stack   | Not lexicographic | Mutates input; swap back to restore     |

Both run in $O(n \cdot n!)$ time and $O(n)$ auxiliary space.
