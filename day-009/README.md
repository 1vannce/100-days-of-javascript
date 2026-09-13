### Day 9: Selection Sort

Write a function `selectionSort(arr)` that sorts an array of numbers in ascending order using the **Selection Sort** algorithm.

Selection Sort divides the array into two parts: a sorted subarray at the front and an unsorted subarray at the back. In every iteration, the algorithm finds the **minimum element** in the unsorted portion and swaps it with the element at the beginning of the unsorted portion.

**Crucial Requirement:** Sort the array **in-place** using index tracking and swaps. Do not allocate secondary arrays or use `Array.prototype.sort()`.

**Examples**

```javascript
selectionSort([64, 25, 12, 22, 11]);
// Output: [11, 12, 22, 25, 64]

selectionSort([5, -1, 3, 0, 2]);
// Output: [-1, 0, 2, 3, 5]

selectionSort([1, 2, 3]);
// Output: [1, 2, 3]

selectionSort([]);
// Output: []
```

**Constraints**

- $0 \le \text{arr.length} \le 1000$
- Numbers can be positive, negative, or zero.
- Auxiliary Space Complexity: $O(1)$ (modify `arr` in place).
- Return the sorted array (or mutate it in place).

**Starter Code**

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
function selectionSort(arr) {
  // Write your Selection Sort algorithm here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { input: [64, 25, 12, 22, 11], expected: [11, 12, 22, 25, 64] },
  { input: [5, -1, 3, 0, 2], expected: [-1, 0, 2, 3, 5] },
  { input: [1, 2, 3], expected: [1, 2, 3] },
  { input: [9, 4], expected: [4, 9] },
  { input: [7], expected: [7] },
  { input: [], expected: [] },
];

console.table(
  testCases.map(({ input, expected }) => {
    const original = [...input];
    selectionSort(input);
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

- **Outer Loop:** Run an outer loop `for (let i = 0; i < arr.length - 1; i++)`. Index `i` marks the boundary between the sorted subarray and the unsorted subarray.
- **Track the Minimum Index:** Inside the outer loop, assume the smallest remaining value is at `minIndex = i`.
- **Inner Loop:** Run `for (let j = i + 1; j < arr.length; j++)`. If you find `arr[j] < arr[minIndex]`, update `minIndex = j`.
- **The Swap:** After the inner loop finishes, if `minIndex !== i`, swap the elements:

```javascript
[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
```

- **Contrast with Bubble Sort:** While Bubble Sort makes multiple adjacent swaps per pass, Selection Sort makes at most **one single swap per pass** ($O(n)$ swaps total).
