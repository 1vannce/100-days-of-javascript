### Day 42: Kth Largest Element in an Array

Given an integer array `nums` and an integer `k`, return the $k^{\text{th}}$ largest element in the array.

Note that it is the $k^{\text{th}}$ largest element in **sorted order**, not the $k^{\text{th}}$ distinct element.

Can you solve it without sorting the entire array in $O(n \log n)$ time?

**Crucial Requirement:** Implement an optimal solution using a **Min-Heap of size $k$** running in **$O(n \log k)$ time** and **$O(k)$ auxiliary space**. When $k \ll n$, this dramatically outperforms full sorting.

**Examples**

```javascript
findKthLargest([3, 2, 1, 5, 6, 4], 2);
// Output: 5
// Explanation: The sorted array is [1, 2, 3, 4, 5, 6], so the 2nd largest element is 5.

findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4);
// Output: 4
// Explanation: The sorted array is [1, 2, 2, 3, 3, 4, 5, 5, 6], so the 4th largest element is 4.

findKthLargest([1], 1);
// Output: 1

findKthLargest([-1, -1], 2);
// Output: -1
```

**Constraints**

- $1 \le k \le \text{nums.length} \le 10^5$
- $-10^4 \le \text{nums}[i] \le 10^4$
- Time Complexity: $O(n \log k)$
- Auxiliary Space Complexity: $O(k)$

**Starter Code**

```javascript
/**
 * You may include your MinHeap implementation from Day 41 or a compact inline version.
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
// Minimal MinHeap helper for validation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const pIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] < this.heap[pIdx]) {
        [this.heap[idx], this.heap[pIdx]] = [this.heap[pIdx], this.heap[idx]];
        idx = pIdx;
      } else {
        break;
      }
    }
  }

  _bubbleDown(idx) {
    const len = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < len && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < len && this.heap[right] < this.heap[smallest])
        smallest = right;

      if (smallest !== idx) {
        [this.heap[idx], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[idx],
        ];
        idx = smallest;
      } else {
        break;
      }
    }
  }
}

const testCases = [
  { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 },
  { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 },
  { nums: [1], k: 1, expected: 1 },
  { nums: [-1, -1], k: 2, expected: -1 },
  { nums: [7, 10, 4, 3, 20, 15], k: 3, expected: 10 },
  { nums: [99, 99], k: 1, expected: 99 },
];

console.table(
  testCases.map(({ nums, k, expected }) => {
    const result = findKthLargest(nums, k);
    const passed = result === expected;

    return {
      Nums: `[${nums.slice(0, 5)}${nums.length > 5 ? "..." : ""}]`,
      K: k,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Why a Min-Heap for Largest Elements?** Maintaining a Min-Heap of size $k$ guarantees that the root element is always the _smallest_ among the top $k$ largest elements seen so far. That root is by definition the $k^{\text{th}}$ largest element!
- **Window Invariant:**
- Loop through `num` in `nums`:
- Insert `num` into the Min-Heap.
- If the heap size exceeds $k$, evict the root with `extractMin()`.

- **Extracting the Answer:** Once all numbers have been processed, the heap retains exactly the $k$ largest elements. Return `heap.peek()`.
- **Quickselect Alternative ($O(n)$ average):** If you are familiar with Hoare's Quickselect (partitioning around a pivot like QuickSort), you can achieve $O(n)$ average time, though it has an $O(n^2)$ worst case without median-of-medians.
