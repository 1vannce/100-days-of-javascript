### Day 43: Find K Closest Elements

Given a **sorted** integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in **ascending order**.

An integer `a` is closer to `x` than an integer `b` if:

- $\vert{}a - x\vert{} < \vert{}b - x\vert{}$, or
- $\vert{}a - x\vert{} == \vert{}b - x\vert{}$ and $a < b$

**Crucial Requirement:** The input array is already sorted. While a Max-Heap of size $k$ based on $\vert{}num - x\vert{}$ solves this in $O(n \log k)$ time, you can achieve **$O(\log(n - k) + k)$ time** by combining binary search with a sliding window of size $k$.

**Examples**

```javascript
findClosestElements([1, 2, 3, 4, 5], 4, 3);
// Output: [1, 2, 3, 4]

findClosestElements([1, 1, 2, 3, 4, 5], 4, -1);
// Output: [1, 1, 2, 3]

findClosestElements([1, 2, 3, 4, 5], 4, -1);
// Output: [1, 2, 3, 4]

findClosestElements([1, 3], 1, 2);
// Output: [1]
// Explanation: |1 - 2| === |3 - 2| === 1, but 1 < 3, so 1 wins tie-breaker.
```

**Constraints**

- $1 \le k \le \text{arr.length} \le 10^4$
- `arr` is sorted in **ascending** order.
- $-10^4 \le \text{arr}[i], x \le 10^4$
- Time Complexity: $O(\log(n - k) + k)$ optimal binary search, or $O(n \log k)$ using a heap.
- Auxiliary Space Complexity: $O(1)$ excluding the output slice.

**Starter Code**

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
function findClosestElements(arr, k, x) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { arr: [1, 2, 3, 4, 5], k: 4, x: 3, expected: [1, 2, 3, 4] },
  { arr: [1, 1, 2, 3, 4, 5], k: 4, x: -1, expected: [1, 1, 2, 3] },
  { arr: [1, 2, 3, 4, 5], k: 4, x: -1, expected: [1, 2, 3, 4] },
  { arr: [1, 3], k: 1, x: 2, expected: [1] },
  { arr: [0, 0, 1, 2, 3, 3, 4, 7, 7, 8], k: 3, x: 5, expected: [3, 3, 4] },
  { arr: [1, 10, 15, 25, 35, 45, 50, 59], k: 2, x: 30, expected: [25, 35] },
];

console.table(
  testCases.map(({ arr, k, x, expected }) => {
    const result = findClosestElements(arr, k, x);
    const passed = JSON.stringify(result) === JSON.stringify(expected);

    return {
      Arr: `[${arr.slice(0, 5)}${arr.length > 5 ? "..." : ""}]`,
      K: k,
      X: x,
      Expected: JSON.stringify(expected),
      Actual: JSON.stringify(result),
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Heap Strategy ($O(n \log k)$):**
- Maintain a Max-Heap of size $k$ containing `[Math.abs(val - x), val]`.
- If a new element is closer than the heap root, evict root and insert.
- Extract all elements and sort them ascending before returning.

- **Optimal Binary Search for Window Start ($O(\log(n - k) + k)$):**
- Notice that the answer is always a contiguous subarray of length $k$.
- Instead of finding elements, binary search for the **starting index** `left` in the range `[0, arr.length - k]`.
- For midpoint `mid`, compare the distance of element `arr[mid]` versus `arr[mid + k]` to `x`:
- If `x - arr[mid] > arr[mid + k] - x`, then `arr[mid + k]` is strictly closer to `x` than `arr[mid]`, meaning the window must start further to the right (`left = mid + 1`).
- Otherwise, the window starting at `mid` is equal or better (`right = mid`).

- Return `arr.slice(left, left + k)`.
