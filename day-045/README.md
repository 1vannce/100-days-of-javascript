### Day 45: Find Median from Data Stream

The **median** is the middle value in an ordered integer list. When the list has an even number of elements, the median is the mean of its two middle values. For example, `[2, 3, 4]` has median `3`, and `[2, 3]` has median `2.5`.

Implement the `MedianFinder` class:

- `MedianFinder()` initializes the object.
- `addNum(num)` adds an integer from the data stream.
- `findMedian()` returns the median of all elements so far. Answers within `1e-5` of the actual answer are accepted.

**Crucial Requirement:** Use two complementary heaps: a max-heap for the smaller half and a min-heap for the larger half. Insertion must take O(log n) time and median retrieval O(1). Sorting on every insertion or inserting into a sorted array with `splice()` does not meet the requirement.

**Example**

```javascript
const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
medianFinder.findMedian(); // 1.5
medianFinder.addNum(3);
medianFinder.findMedian(); // 2
```

**Constraints**

- `-100000 <= num <= 100000`.
- At least one element exists before calling `findMedian()`.
- At most `50000` calls are made to `addNum()` and `findMedian()` combined.
- `addNum()`: O(log n) time.
- `findMedian()`: O(1) time.
- Auxiliary space: O(n) to store the stream elements.

**Starter Code**

```javascript
class MedianFinder {
  constructor() {
    // Initialize your two heaps here
  }

  /**
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    // Write your code here
  }

  /**
   * @return {number}
   */
  findMedian() {
    // Write your code here
  }
}
```

**Solution: Two Heaps**

1. Keep the smaller half in `smallHalf`, a max-heap, and the larger half in `largeHalf`, a min-heap.
2. Insert into `smallHalf`, then move its maximum into `largeHalf`. This maintains the partition: every value in the smaller half is less than or equal to every value in the larger half.
3. If `largeHalf` has more elements, move its minimum back to `smallHalf`. The smaller half always has the same number of elements or exactly one extra.
4. For an odd count, return `smallHalf.peek()`. For an even count, average the two heap roots.

The comparator-based `Heap` helper uses array-backed binary heaps with bubble-up and bubble-down operations. Each insertion performs a constant number of O(log n) heap operations. Retrieving the median only reads heap sizes and roots, taking O(1). Together, the heaps store each stream element once, using O(n) space.

**Run the Test Harness**

From the repository root:

```bash
node day-045/solution.js
```

The self-contained file includes both heaps and a `console.table` harness suitable for Zed. It checks the median after every insertion for the supplied stream, a single value, descending values, duplicates, negative values, and alternating constraint boundaries. It also checks size balance, partition order, and repeated median retrieval. A failing case sets a nonzero exit code.

**Hints**

- A max-heap exposes the largest value in the lower half; a min-heap exposes the smallest value in the upper half.
- Moving heap roots preserves order across the partition, including duplicate values.
- Keep the extra element in the lower half so the odd-count median is always its root.
