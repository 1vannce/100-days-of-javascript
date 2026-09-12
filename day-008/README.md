### Day 8: Bubble Sort

Write a function `bubbleSort(arr)` that sorts an array of numbers in ascending order using the **Bubble Sort** algorithm.

Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is completely sorted.

**Crucial Requirement:** Sort the array **in-place** using adjacent swaps. Do not use the native `Array.prototype.sort()`.

**Examples**

```javascript
bubbleSort([5, 1, 4, 2, 8]);
// Output: [1, 2, 4, 5, 8]

bubbleSort([3, 0, -2, 5, -1]);
// Output: [-2, -1, 0, 3, 5]

bubbleSort([1, 2, 3]);
// Output: [1, 2, 3]
```

**Constraints**

- $0 \le \text{arr.length} \le 1000$
- Numbers can be positive, negative, or zero.
- $O(1)$ auxiliary space complexity (modify `arr` in place).

**Starter Code**

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
function bubbleSort(arr) {
  // Write your Bubble Sort algorithm here
}
```

---

**Automated Test Harness for Zed**

```javascript
const testCases = [
  { input: [5, 1, 4, 2, 8], expected: [1, 2, 4, 5, 8] },
  { input: [3, 0, -2, 5, -1], expected: [-2, -1, 0, 3, 5] },
  { input: [1, 2, 3], expected: [1, 2, 3] },
  { input: [2, 1], expected: [1, 2] },
  { input: [42], expected: [42] },
  { input: [], expected: [] },
];

console.table(
  testCases.map(({ input, expected }) => {
    const original = [...input];
    bubbleSort(input);
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

- **Outer Loop:** Run an outer loop from $i = 0$ to $i < n - 1$. After each complete pass $i$, the largest remaining unsorted element is guaranteed to have "bubbled up" to its correct position at the end.
- **Inner Loop Optimization:** Compare adjacent items up to $j < n - 1 - i$. You don't need to re-check the already-sorted tail elements.
- **Swap Syntax:** Use modern ES6 destructuring to swap adjacent elements cleanly:

```javascript
[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
```

- **Early Exit Optimization:** Track a `swapped = false` flag inside each outer iteration. If an entire pass completes without a single swap, the array is already sorted—break out early!
