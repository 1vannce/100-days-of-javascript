/**
 * Keep the k largest values in a min-heap.
 * Time: O(n log k), space: O(k).
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  const heap = new MinHeap();

  for (const num of nums) {
    if (heap.size() < k) {
      heap.insert(num);
    } else if (num > heap.peek()) {
      // Replace the smallest of the top k values with a larger value.
      heap.extractMin();
      heap.insert(num);
    }
  }

  // The root is the smallest of the k largest values.
  return heap.peek();
}

// Min-heap used by findKthLargest.
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

// Test cases
const testCases = [
  { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 },
  { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 },
  { nums: [1], k: 1, expected: 1 },
  { nums: [-1, -1], k: 2, expected: -1 },
  { nums: [7, 10, 4, 3, 20, 15], k: 3, expected: 10 },
  { nums: [99, 99], k: 1, expected: 99 },
  { nums: [1, 2, 3, 4, 5], k: 1, expected: 5 },
  { nums: [5, 4, 3, 2, 1], k: 5, expected: 1 },
  { nums: [-10, -3, -7, -3], k: 2, expected: -3 },
  { nums: [0, -10000, 10000, 0], k: 3, expected: 0 },
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
