/**
 * @param {number[]} arr
 * @return {number[]}
 */
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    // Find the index of the smallest element in the unsorted portion
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

// Test Cases
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
