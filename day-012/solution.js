/**
 * @param {number[]} arr
 * @return {number[]}
 */
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    // Shift elements greater than current to the right
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    // Insert the current element into its correct position
    arr[j + 1] = current;
  }
  return arr;
}

// Test Cases
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
