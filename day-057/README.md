### Day 57: Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Crucial Requirement:** For an array of size $n$, the total number of subsets is $2^n$. Write a clean backtracking algorithm that constructs subsets incrementally in $O(n \cdot 2^n)$ time and $O(n)$ auxiliary space (excluding the output array), adhering to the classic choose $\rightarrow$ explore $\rightarrow$ unchoose pattern.

**Examples**

```javascript
// Example 1:
subsets([1, 2, 3]);
// Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

// Example 2:
subsets([0]);
// Output: [[], [0]]

// Example 3:
subsets([]);
// Output: [[]]
```

**Constraints**

- $1 \le \text{nums.length} \le 10$
- $-10 \le \text{nums}[i] \le 10$
- All numbers in `nums` are unique.
- **Time Complexity:** $O(n \cdot 2^n)$ — each of the $2^n$ subsets takes up to $O(n)$ time to copy into the result.
- **Auxiliary Space Complexity:** $O(n)$ for the recursion call stack and current path buffer.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
  // Write your code here
}
```

---

**Hints**

- **The State Space Tree:** At every node in the recursion tree, the current path (`path`) represents a valid subset. Immediately push a copy into the accumulator: `result.push([...path])`.
- **Exploration Loop:**
  - Define a helper: `backtrack(startIdx, path)`.
  - For each index `i` from `startIdx` to `nums.length - 1`:
    1. **Choose:** `path.push(nums[i])`
    2. **Explore:** `backtrack(i + 1, path)` (move forward so elements are never reused or considered out of order)
    3. **Unchoose:** `path.pop()`
- **Alternative (Cascading Iteration):** Start with `result = [[]]`. For every number `num` in `nums`, copy each existing subset, append `num`, and push it back into `result`.
- **Alternative (Bit Manipulation):** Map integers from $0$ to $2^n - 1$ to binary masks. If bit $j$ of mask $i$ is set, include `nums[j]`.
