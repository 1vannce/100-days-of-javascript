### Day 12: Search Insert Position

Write a function `searchInsert(nums, target)` that takes a sorted array of distinct integers `nums` and a target value `target`.

Return the index if the `target` is found. If not, return the index where it would be if it were inserted in order.

**Crucial Requirement:** You must write an algorithm with **$O(\log n)$ runtime complexity**. Do not use linear searches like `findIndex()` or `indexOf()`.

**Examples**

```javascript
searchInsert([1, 3, 5, 6], 5);
// Output: 2  (5 exists at index 2)

searchInsert([1, 3, 5, 6], 2);
// Output: 1  (2 would be inserted between 1 and 3)

searchInsert([1, 3, 5, 6], 7);
// Output: 4  (7 is greater than all elements; belongs at index 4)

searchInsert([1, 3, 5, 6], 0);
// Output: 0  (0 is smaller than all elements; belongs at index 0)
```

**Constraints**

- $1 \le \text{nums.length} \le 10^4$
- $-10^4 \le \text{nums}[i], \text{target} \le 10^4$
- `nums` contains **distinct** values sorted in ascending order.
- Time Complexity: $O(\log n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { nums: [1, 3, 5, 6], target: 5, expected: 2 },
  { nums: [1, 3, 5, 6], target: 2, expected: 1 },
  { nums: [1, 3, 5, 6], target: 7, expected: 4 },
  { nums: [1, 3, 5, 6], target: 0, expected: 0 },
  { nums: [1], target: 0, expected: 0 },
  { nums: [1], target: 2, expected: 1 },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = searchInsert(nums, target);
    const passed = result === expected;

    return {
      Nums: `[${nums}]`,
      Target: target,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Pointer Dynamics:** Start with `left = 0` and `right = nums.length - 1`. The loop termination condition should remain `while (left <= right)`.
- **Standard Mid Calculation:** In each iteration, evaluate `const mid = Math.floor((left + right) / 2)`.
- **If Found:** If `nums[mid] === target`, return `mid` immediately.
- **The Insertion Pointer:** Pay close attention to what happens when the loop finishes without finding the target. At the exact moment `left > right`, which pointer naturally rests at the insertion position?
