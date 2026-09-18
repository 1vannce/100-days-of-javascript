### Day 14: Search in Rotated Sorted Array

There is an integer array `nums` sorted in ascending order with distinct values.

Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` ($1 \le k < \text{nums.length}$) such that the resulting array is:
`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`.

For example, `[0, 1, 2, 4, 5, 6, 7]` might be rotated at pivot index 3 and become `[4, 5, 6, 7, 0, 1, 2]`.

Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

**Crucial Requirement:** You must write an algorithm with **$O(\log n)$ runtime complexity**. Do not use linear searches, `indexOf()`, or `includes()`.

**Examples**

```javascript
search([4, 5, 6, 7, 0, 1, 2], 0);
// Output: 4

search([4, 5, 6, 7, 0, 1, 2], 3);
// Output: -1

search([1], 0);
// Output: -1

search([6, 7, 1, 2, 3, 4, 5], 3);
// Output: 4
```

**Constraints**

- $1 \le \text{nums.length} \le 5000$
- $-10^4 \le \text{nums}[i], \text{target} \le 10^4$
- All values of `nums` are **unique**.
- `nums` is guaranteed to be rotated at some pivot or not rotated at all.
- Time Complexity: $O(\log n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
  { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
  { nums: [1], target: 0, expected: -1 },
  { nums: [1], target: 1, expected: 0 },
  { nums: [6, 7, 1, 2, 3, 4, 5], target: 3, expected: 4 },
  { nums: [5, 1, 3], target: 5, expected: 0 },
  { nums: [3, 1], target: 1, expected: 1 },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = search(nums, target);
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

- **The Halves Invariant:** Even after rotation, if you split the array down the middle, **at least one half is always normally sorted**.
- **Identify the Sorted Half:** Compare `nums[left]` and `nums[mid]`:
- If `nums[left] <= nums[mid]`, the **left side** is sorted.
- Otherwise, the **right side** must be sorted (`nums[mid] <= nums[right]`).

- **Check Target Boundaries:** Once you identify which half is strictly sorted, check if `target` falls cleanly within its boundary:
- If `target` is between `nums[left]` and `nums[mid]`, search left (`right = mid - 1`). Otherwise, search right (`left = mid + 1`).
- Apply the mirror logic if the right side is the sorted half.
