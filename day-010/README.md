### Day 11: Binary Search

Write a function `binarySearch(nums, target)` that takes a **sorted** array of integers `nums` and an integer `target`. If `target` exists in the array, return its index. If `target` does not exist, return `-1`.

**Crucial Requirement:** Your algorithm must run in **$O(\log n)$ runtime complexity**. Do not use linear scans, `Array.prototype.indexOf()`, or `Array.prototype.includes()`.

**Examples**

```javascript
binarySearch([-1, 0, 3, 5, 9, 12], 9);
// Output: 4  (9 exists in nums and its index is 4)

binarySearch([-1, 0, 3, 5, 9, 12], 2);
// Output: -1  (2 does not exist in nums)

binarySearch([5], 5);
// Output: 0

binarySearch([], 3);
// Output: -1
```

**Constraints**

- $0 \le \text{nums.length} \le 10^4$
- $-10^4 < \text{nums}[i], \text{target} < 10^4$
- All integers in `nums` are unique.
- `nums` is sorted in ascending order.
- Time Complexity: $O(\log n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function binarySearch(nums, target) {
  // Write your Binary Search algorithm here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { nums: [-1, 0, 3, 5, 9, 12], target: 9, expected: 4 },
  { nums: [-1, 0, 3, 5, 9, 12], target: 2, expected: -1 },
  { nums: [5], target: 5, expected: 0 },
  { nums: [5], target: -5, expected: -1 },
  { nums: [1, 3, 5, 7, 9, 11], target: 1, expected: 0 },
  { nums: [1, 3, 5, 7, 9, 11], target: 11, expected: 5 },
  { nums: [], target: 3, expected: -1 },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = binarySearch(nums, target);
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

- **Two Pointers:** Maintain two boundary pointers: `left = 0` and `right = nums.length - 1`.
- **The Loop Condition:** Continue while `left <= right`. Using `<=` ensures you don't skip single-element subarrays when `left === right`.
- **Find the Midpoint:** Calculate the middle index using `Math.floor((left + right) / 2)`.
- **Three Branches:**

1. If `nums[mid] === target`, you found the element—return `mid`.
2. If `nums[mid] < target`, the target must be in the right half: adjust `left = mid + 1`.
3. If `nums[mid] > target`, the target must be in the left half: adjust `right = mid - 1`.

- **Not Found:** If the loop terminates without finding the target, return `-1`.
