/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
function findClosestElements(arr, k, x) {
  let left = 0;
  let right = arr.length - k;

  while (left < right) {
    const mid = left + ((right - left) >> 1);
    // Compare distance of left bound (arr[mid]) and right bound (arr[mid + k]) to x
    if (x - arr[mid] > arr[mid + k] - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr.slice(left, left + k);
}

// Test cases
const testCases = [
  { arr: [1, 2, 3, 4, 5], k: 4, x: 3, expected: [1, 2, 3, 4] },
  { arr: [1, 1, 2, 3, 4, 5], k: 4, x: -1, expected: [1, 1, 2, 3] },
  { arr: [1, 2, 3, 4, 5], k: 4, x: -1, expected: [1, 2, 3, 4] },
  { arr: [1, 3], k: 1, x: 2, expected: [1] },
  { arr: [0, 0, 1, 2, 3, 3, 4, 7, 7, 8], k: 3, x: 5, expected: [3, 3, 4] },
  { arr: [1, 10, 15, 25, 35, 45, 50, 59], k: 2, x: 30, expected: [25, 35] },
];

console.table(
  testCases.map(({ arr, k, x, expected }) => {
    const result = findClosestElements(arr, k, x);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    return {
      Arr: `[${arr.slice(0, 5)}${arr.length > 5 ? "..." : ""}]`,
      K: k,
      X: x,
      Expected: JSON.stringify(expected),
      Actual: JSON.stringify(result),
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
