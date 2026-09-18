### Day 15: Find Peak Element

A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array `nums`, find a peak element, and return its **index**. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

**Crucial Requirement:** You must write an algorithm that runs in **$O(\log n)$ time**. Do not use linear searches, `Math.max()`, or `indexOf()`.

**Examples**

```javascript
findPeakElement([1, 2, 3, 1]);
// Output: 2  (Index 2 corresponds to value 3, which is greater than 2 and 1)

findPeakElement([1, 2, 1, 3, 5, 6, 4]);
// Output: 5  (Index 5 corresponds to value 6; index 1 with value 2 is also valid)

findPeakElement([1]);
// Output: 0

findPeakElement([1, 2]);
// Output: 1  (2 is strictly greater than 1 and out-of-bounds -∞)
```

**Constraints**

- $1 \le \text{nums.length} \le 1000$
- $-2^{31} \le \text{nums}[i] \le 2^{31} - 1$
- `nums[i] !== nums[i + 1]` for all valid `i` (no two adjacent elements are equal).
- Time Complexity: $O(\log n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function findPeakElement(nums) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { nums: [1, 2, 3, 1], validExpected: [2] },
  { nums: [1, 2, 1, 3, 5, 6, 4], validExpected: [1, 5] },
  { nums: [1], validExpected: [0] },
  { nums: [1, 2], validExpected: [1] },
  { nums: [2, 1], validExpected: [0] },
  { nums: [1, 3, 20, 4, 1, 0], validExpected: [2] },
];

console.table(
  testCases.map(({ nums, validExpected }) => {
    const result = findPeakElement(nums);
    const passed = validExpected.includes(result);

    return {
      Nums: `[${nums}]`,
      ValidOutputs: `[${validExpected}]`,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Think Like a Hiker:** Compare the midpoint `nums[mid]` to its immediate right neighbor `nums[mid + 1]`.
- **Uphill vs. Downhill:**
- If `nums[mid] < nums[mid + 1]`, you are on an **upward slope**. Because values never equal each other and boundary tails drop to $-\infty$, a peak is guaranteed to exist somewhere to the right (`left = mid + 1`).
- If `nums[mid] > nums[mid + 1]`, you are on a **downward slope**. The current element `mid` might be the peak itself, or a peak exists to the left (`right = mid`).

- **Loop Termination:** Notice the subtle boundary shift: use `while (left < right)`. When `left === right`, both pointers converge directly onto a valid peak index.
