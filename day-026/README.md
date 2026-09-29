### Day 26: Sliding Window Maximum

You are given an array of integers `nums`, and there is a sliding window of size `k` moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position, return the maximum value in the window.

Return an array containing the maximum value for each window position.

**Crucial Requirement:** Write an algorithm that runs in **$O(n)$ time complexity**. Finding the maximum in each window using `Math.max(...nums.slice(i, i + k))` takes $O(n \cdot k)$ time, which will time out on inputs where $k$ and $n$ reach tens of thousands.

**Examples**

```javascript
maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
// Output: [3, 3, 5, 5, 6, 7]
// Window position                Max
// -----------------             -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

maxSlidingWindow([1], 1);
// Output: [1]

maxSlidingWindow([1, -1], 1);
// Output: [1, -1]

maxSlidingWindow([9, 11], 2);
// Output: [11]

maxSlidingWindow([4, -2], 2);
// Output: [4]
```

**Constraints**

- $1 \le \text{nums.length} \le 10^5$
- $-10^4 \le \text{nums}[i] \le 10^4$
- $1 \le k \le \text{nums.length}$
- Time Complexity: $O(n)$
- Auxiliary Space Complexity: $O(k)$ for the deque

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, expected: [3, 3, 5, 5, 6, 7] },
  { nums: [1], k: 1, expected: [1] },
  { nums: [1, -1], k: 1, expected: [1, -1] },
  { nums: [9, 11], k: 2, expected: [11] },
  { nums: [4, -2], k: 2, expected: [4] },
  { nums: [7, 2, 4], k: 2, expected: [7, 4] },
];

console.table(
  testCases.map(({ nums, k, expected }) => {
    const result = maxSlidingWindow(nums, k);
    const passed = JSON.stringify(result) === JSON.stringify(expected);

    return {
      Nums: `[${nums}]`,
      K: k,
      Expected: `[${expected}]`,
      Actual: `[${result}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Store Indices in a Monotonic Deque:** Store **indices** in an array `deque = []` instead of raw values so you can easily verify whether an element has slipped out of the window.
- **Maintain Strictly Decreasing Order:** Before pushing index `i` into the back of the deque, pop all indices from the back whose values are smaller than or equal to `nums[i]` (`nums[deque[deque.length - 1]] <= nums[i]`). They can never be the maximum of this or any subsequent window.
- **Evict Stale Window Elements:** Remove indices from the front of the deque if they are out of the current window (`deque[0] <= i - k`).
- **Collect Results:** Once your loop index reaches `i >= k - 1`, the current maximum for that window will always sit at `nums[deque[0]]`. Append it to your output array.
