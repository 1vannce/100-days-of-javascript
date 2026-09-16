### Day 12: Insertion Sort

Write a function `insertionSort(arr)` that sorts an array of numbers in ascending order using the **Insertion Sort** algorithm.

Insertion Sort works similarly to how people sort playing cards in their hands: the array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed into the correct position in the sorted part by shifting larger elements one position to the right.

**Crucial Requirement:** Sort the array **in-place**. Do not allocate secondary arrays or use `Array.prototype.sort()`.

**Examples**

```javascript
insertionSort([12, 11, 13, 5, 6]);
// Output: [5, 6, 11, 12, 13]

insertionSort([4, 3, 2, 10, 12, 1, 5, 6]);
// Output: [1, 2, 3, 4, 5, 6, 10, 12]

insertionSort([-2, 5, 0, -1]);
// Output: [-2, -1, 0, 5]

insertionSort([]);
// Output: []
```

**Constraints**

- $0 \le \text{arr.length} \le 1000$
- Numbers can be positive, negative, or zero.
- Auxiliary Space Complexity: $O(1)$ (modify `arr` in place).
- Best-case Time Complexity: $O(n)$ (for nearly sorted arrays).

**Starter Code**

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
function insertionSort(arr) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { input: [12, 11, 13, 5, 6], expected: [5, 6, 11, 12, 13] },
  { input: [4, 3, 2, 10, 12, 1, 5, 6], expected: [1, 2, 3, 4, 5, 6, 10, 12] },
  { input: [-2, 5, 0, -1], expected: [-2, -1, 0, 5] },
  { input: [1, 2, 3], expected: [1, 2, 3] },
  { input: [9, 4], expected: [4, 9] },
  { input: [7], expected: [7] },
  { input: [], expected: [] },
];

console.table(
  testCases.map(({ input, expected }) => {
    const original = [...input];
    insertionSort(input);
    const passed = `${input}` === `${expected}`;

    return {
      Input: `[${original}]`,
      Expected: `[${expected}]`,
      Actual: `[${input}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Outer Loop:** Start iterating from index `1` up to `arr.length - 1`. Assume the element at index `0` is already trivially sorted.
- **Store the Current Value:** Save `const current = arr[i];` and initialize a pointer `let j = i - 1;`.
- **The Shift:** Use a `while` loop running backward (`j >= 0 && arr[j] > current`). Shift elements one slot forward (`arr[j + 1] = arr[j]`) and decrement `j--`.
- **The Insertion:** Place `current` into its newly vacated position: `arr[j + 1] = current;`.
