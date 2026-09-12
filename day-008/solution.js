/**
 * @param {number[]} arr
 * @return {number[]}
 */
function bubbleSort(arr) {
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

// Test Cases
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
