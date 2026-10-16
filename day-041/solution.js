class MinHeap {
  constructor() {
    this.heap = [];
  }

  /**
   * @param {number} val
   * @return {void}
   */
  insert(val) {
    this.heap.push(val);
    let idx = this.heap.length - 1;

    // Move the new value upward until its parent is no larger.
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;

      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }

  /**
   * @return {number|null}
   */
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;

    // Move the replacement root downward through the smaller child.
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let smallestIdx = idx;

      if (
        leftIdx < this.heap.length &&
        this.heap[leftIdx] < this.heap[smallestIdx]
      ) {
        smallestIdx = leftIdx;
      }
      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx] < this.heap[smallestIdx]
      ) {
        smallestIdx = rightIdx;
      }
      if (smallestIdx === idx) break;

      this.swap(idx, smallestIdx);
      idx = smallestIdx;
    }

    return min;
  }

  /**
   * @return {number|null}
   */
  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  /**
   * @return {number}
   */
  size() {
    return this.heap.length;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

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
