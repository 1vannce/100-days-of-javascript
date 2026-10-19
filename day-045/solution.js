// A comparator returns true when a has higher priority than b.
class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  push(val) {
    this.heap.push(val);
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (!this.compare(this.heap[idx], this.heap[parent])) break;
      [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;

    while (true) {
      let target = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (
        left < this.heap.length &&
        this.compare(this.heap[left], this.heap[target])
      ) target = left;
      if (
        right < this.heap.length &&
        this.compare(this.heap[right], this.heap[target])
      ) target = right;
      if (target === idx) break;

      [this.heap[idx], this.heap[target]] = [this.heap[target], this.heap[idx]];
      idx = target;
    }

    return top;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }
}

class MedianFinder {
  constructor() {
    this.smallHalf = new Heap((a, b) => a > b);
    this.largeHalf = new Heap((a, b) => a < b);
  }

  /**
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    this.smallHalf.push(num);
    // Moving the lower maximum keeps every lower value <= every upper value.
    this.largeHalf.push(this.smallHalf.pop());

    // The lower half holds the extra element when the total count is odd.
    if (this.largeHalf.size() > this.smallHalf.size()) {
      this.smallHalf.push(this.largeHalf.pop());
    }
  }

  /**
   * @return {number}
   */
  findMedian() {
    if (this.smallHalf.size() > this.largeHalf.size()) {
      return this.smallHalf.peek();
    }
    return (this.smallHalf.peek() + this.largeHalf.peek()) / 2;
  }
}

function runTests() {
  const testCases = [
    {
      name: "Supplied stream",
      values: [1, 2, 3, 4, 5, 0, -1, 10],
      expected: [1, 1.5, 2, 2.5, 3, 2.5, 2, 2.5],
    },
    { name: "Single value", values: [42], expected: [42] },
    {
      name: "Descending",
      values: [5, 4, 3, 2, 1],
      expected: [5, 4.5, 4, 3.5, 3],
    },
    { name: "Duplicates", values: [2, 2, 2, 2], expected: [2, 2, 2, 2] },
    {
      name: "Negative values",
      values: [-1, -2, -3, -4],
      expected: [-1, -1.5, -2, -2.5],
    },
    {
      name: "Alternating boundaries",
      values: [-100000, 100000, -100000, 100000, 0],
      expected: [-100000, 0, -100000, 0, 0],
    },
  ];

  const results = testCases.flatMap(({ name, values, expected }) => {
    const mf = new MedianFinder();
    return values.map((val, idx) => {
      mf.addNum(val);
      const actual = mf.findMedian();
      const sizesBalanced =
        mf.smallHalf.size() === mf.largeHalf.size() ||
        mf.smallHalf.size() === mf.largeHalf.size() + 1;
      const partitionOrdered =
        mf.largeHalf.size() === 0 || mf.smallHalf.peek() <= mf.largeHalf.peek();
      const passed =
        Math.abs(actual - expected[idx]) < 1e-5 &&
        mf.findMedian() === actual &&
        sizesBalanced && partitionOrdered;

      return {
        Test: name,
        Added: val,
        ExpectedMedian: expected[idx],
        ActualMedian: actual,
        Passed: passed ? "PASS" : "FAIL",
      };
    });
  });

  console.table(results);
  if (results.some(({ Passed }) => Passed === "FAIL")) {
    process.exitCode = 1;
  }
}

runTests();
