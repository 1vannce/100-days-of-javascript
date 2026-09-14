/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function binarySearch(nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (nums[mid] === target) {
      // Target found
      return mid;
    } else if (nums[mid] < target) {
      // Search right half
      start = mid + 1;
    } else {
      // Search left half
      end = mid - 1;
    }
  }

  // Target not found
  return -1;
}

// Test Cases
const testCases = [
  { nums: [-1, 0, 3, 5, 9, 12], target: 9, expected: 4 },
  { nums: [-1, 0, 3, 5, 9, 12], target: 2, expected: -1 },
  { nums: [5], target: 5, expected: 0 },
  { nums: [5], target: -5, expected: -1 },
  { nums: [1, 3, 5, 7, 9, 11], target: 1, expected: 0 },
  { nums: [1, 3, 5, 7, 9, 11], target: 11, expected: 5 },
  { nums: [], target: 3, expected: -1 },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = binarySearch(nums, target);
    const passed = result === expected;
    return {
      Nums: `[${nums}]`,
      Target: target,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
