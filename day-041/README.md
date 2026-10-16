### Day 41: Implement a Min-Heap

Implement a `MinHeap` class representing a complete binary tree stored in an array where each parent node is smaller than or equal to its children (the **Min-Heap property**).

Your `MinHeap` must support the following methods:

- `insert(val)`: Inserts a number into the heap while maintaining the heap property ($O(\log n)$).
- `extractMin()`: Removes and returns the minimum element from the root of the heap ($O(\log n)$). If the heap is empty, return `null`.
- `peek()`: Returns the minimum element without removing it ($O(1)$). If empty, return `null`.
- `size()`: Returns the number of elements currently stored in the heap ($O(1)$).

**Crucial Notes:**

- Maintain elements in a standard 0-indexed JavaScript array `this.heap = []`.
- Use the standard array mapping formulas for a 0-indexed complete binary tree:
- Left child of index $i$: $2i + 1$
- Right child of index $i$: $2i + 2$
- Parent of index $i$: $\lfloor (i - 1) / 2 \rfloor$

- All mutations must maintain the tree invariants using **bubble-up (sift-up)** on insertion and **bubble-down (sift-down)** on extraction.

**Examples**

```javascript
const minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);

minHeap.peek(); // 1
minHeap.size(); // 4
minHeap.extractMin(); // 1
minHeap.peek(); // 3
minHeap.extractMin(); // 3
minHeap.extractMin(); // 5
minHeap.extractMin(); // 8
minHeap.extractMin(); // null
```

**Constraints**

- Values inserted are integers in the range $[-10^9, 10^9]$.
- At most $2 \times 10^4$ operations will be invoked.
- Time Complexity:
- `peek()`, `size()`: $O(1)$
- `insert()`, `extractMin()`: $O(\log n)$ where $n$ is the current number of elements.

- Auxiliary Space Complexity: $O(n)$ to store elements.

**Starter Code**

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  /**
   * @param {number} val
   * @return {void}
   */
  insert(val) {
    // Write your code here
  }

  /**
   * @return {number|null}
   */
  extractMin() {
    // Write your code here
  }

  /**
   * @return {number|null}
   */
  peek() {
    // Write your code here
  }

  /**
   * @return {number}
   */
  size() {
    // Write your code here
  }
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
function runTests() {
  const heap = new MinHeap();
  const results = [];

  // Test 1: Empty checks
  results.push({
    Test: "Empty heap peek & extract",
    Passed:
      heap.peek() === null && heap.extractMin() === null && heap.size() === 0,
  });

  // Test 2: Ingestion & sorting property
  const input = [15, 10, 20, 17, 8, 25, 3];
  input.forEach((val) => heap.insert(val));

  results.push({
    Test: "Size after 7 inserts",
    Passed: heap.size() === 7,
  });

  results.push({
    Test: "Peek minimum element (3)",
    Passed: heap.peek() === 3,
  });

  // Test 3: Sorted extraction order
  const extracted = [];
  while (heap.size() > 0) {
    extracted.push(heap.extractMin());
  }

  const expectedSorted = [...input].sort((a, b) => a - b);
  const isSorted = JSON.stringify(extracted) === JSON.stringify(expectedSorted);

  results.push({
    Test: "Extract all produces strictly ascending array",
    Passed: isSorted,
  });

  // Test 4: Handling duplicates and negative numbers
  const mixed = [-5, 4, -10, 4, 0];
  mixed.forEach((val) => heap.insert(val));
  const mixedExtracted = [];
  while (heap.size() > 0) {
    mixedExtracted.push(heap.extractMin());
  }
  const expectedMixed = [...mixed].sort((a, b) => a - b);

  results.push({
    Test: "Negative numbers and duplicates extracted correctly",
    Passed: JSON.stringify(mixedExtracted) === JSON.stringify(expectedMixed),
  });

  console.table(
    results.map((r) => ({
      ...r,
      Status: r.Passed ? "PASS" : "FAIL",
    })),
  );
}

runTests();
```

---

**Hints**

- **Helper Functions:** Create private or utility swap methods: `swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }`.
- **Bubble-Up on Insert:**
- Push the new value to the end of `this.heap`.
- Start an index at `idx = this.heap.length - 1`.
- While `idx > 0`, calculate `parentIdx = Math.floor((idx - 1) / 2)`.
- If `this.heap[idx] < this.heap[parentIdx]`, swap them and update `idx = parentIdx`. Otherwise, break.

- **Bubble-Down on ExtractMin:**
- If `this.heap.length === 0`, return `null`.
- If `this.heap.length === 1`, return `this.heap.pop()`.
- Save the root `const min = this.heap[0]`.
- Move the last element to the root: `this.heap[0] = this.heap.pop()`.
- Start an index at `idx = 0`. Compute left child ($2 \cdot idx + 1$) and right child ($2 \cdot idx + 2$).
- Find the smaller of the two children. If the current element is greater than the smaller child, swap with that child and update `idx`. Repeat until the heap property is restored.
