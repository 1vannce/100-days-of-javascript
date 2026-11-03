### Day 60: Permutations II

Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations in any order.

**Crucial Requirement:** A naive solution that generates all $n!$ permutations and filters duplicates using a `Set` or stringified keys causes exponential performance degradation ($O(n \cdot n!)$ with heavy memory overhead). Solve this problem using in-flight backtracking branch pruning: sort the array first and skip duplicate branches at the same recursion depth in $O(n \cdot n!)$ time and $O(n)$ auxiliary space.

**Examples**

```javascript
// Example 1:
permuteUnique([1, 1, 2]);
// Output: [[1,1,2], [1,2,1], [2,1,1]]

// Example 2:
permuteUnique([1, 2, 3]);
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// Example 3:
permuteUnique([2, 2, 1, 1]);
// Output: [[1,1,2,2],[1,2,1,2],[1,2,2,1],[2,1,1,2],[2,1,2,1],[2,2,1,1]]
```

**Constraints**

- $1 \le \text{nums.length} \le 8$
- $-10 \le \text{nums}[i] \le 10$
- `nums` may contain repeated values.
- **Time Complexity:** $O(n \cdot n!)$ where $n = \text{nums.length}$.
- **Auxiliary Space Complexity:** $O(n)$ for the recursion stack, `used` boolean tracking array, and path buffer.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permuteUnique(nums) {
  // Write your code here
}
```

---

**Pruning Rule**

Sort first so equal values are adjacent. At each depth, skip `nums[i]` when `i > 0`, `nums[i] === nums[i - 1]` and `!used[i - 1]`: the identical earlier twin was already tried at this level, so picking `nums[i]` would repeat that branch. Duplicates are never generated, so no `Set` is needed.
