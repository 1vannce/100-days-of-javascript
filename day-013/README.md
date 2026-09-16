### Day 13: Find First and Last Position of Element in Sorted Array

Write a function `searchRange(nums, target)` that finds the starting and ending position of a given `target` value in an array of integers `nums` sorted in non-decreasing order.

If `target` is not found in the array, return `[-1, -1]`.

**Crucial Requirement:** You must write an algorithm with **$O(\log n)$ runtime complexity**. Do not use linear searches, `indexOf()`, or `lastIndexOf()`.

**Examples**

```javascript
searchRange([5, 7, 7, 8, 8, 10], 8);
// Output: [3, 4]

searchRange([5, 7, 7, 8, 8, 10], 6);
// Output: [-1, -1]

searchRange([], 0);
// Output: [-1, -1]

searchRange([1], 1);
// Output: [0, 0]

searchRange([2, 2], 2);
// Output: [0, 1]
```

**Constraints**

- $0 \le \text{nums.length} \le 10^5$
- $-10^9 \le \text{nums}[i], \text{target} \le 10^9$
- `nums` is an array of integers sorted in non-decreasing order.
- Time Complexity: $O(\log n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { nums: [5, 7, 7, 8, 8, 10], target: 8, expected: [3, 4] },
  { nums: [5, 7, 7, 8, 8, 10], target: 6, expected: [-1, -1] },
  { nums: [], target: 0, expected: [-1, -1] },
  { nums: [1], target: 1, expected: [0, 0] },
  { nums: [2, 2], target: 2, expected: [0, 1] },
  { nums: [1, 2, 3, 3, 3, 3, 4, 5], target: 3, expected: [2, 5] },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = searchRange(nums, target);
    const passed = `${result}` === `${expected}`;

    return {
      Nums: `[${nums}]`,
      Target: target,
      Expected: `[${expected}]`,
      Actual: result ? `[${result}]` : null,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Avoid Expanding Inward Linearly:** Finding any matching index and scanning left/right with a `while` loop degrades to $O(n)$ in the worst case (e.g., `[8, 8, 8, 8, 8]`).
- **Helper Function Pattern:** Write a reusable helper function `findBound(isFirst)` that performs a modified binary search.
- **Biasing the Search:**
- When searching for the **first** occurrence and `nums[mid] === target`, record `mid` as a candidate, but keep searching left: `right = mid - 1`.
- When searching for the **last** occurrence and `nums[mid] === target`, record `mid` as a candidate, but keep searching right: `left = mid + 1`.

- Run the helper twice: once for the starting index and once for the ending index. Both passes take $O(\log n)$, keeping total time strictly logarithmic.
