/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    // Case 1: Target found
    if (nums[mid] === target) {
      return mid;
    }

    // Case 2: Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Target is in the sorted left half
      } else {
        left = mid + 1; // Target is in the unsorted right half
      }
    }
    // Case 3: Right half is sorted
    else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Target is in the sorted right half
      } else {
        right = mid - 1; // Target is in the unsorted left half
      }
    }
  }

  return -1; // Target not found
}

// Test Cases
const testCases = [
  { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
  { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
  { nums: [1], target: 0, expected: -1 },
  { nums: [1], target: 1, expected: 0 },
  { nums: [6, 7, 1, 2, 3, 4, 5], target: 3, expected: 4 },
  { nums: [5, 1, 3], target: 5, expected: 0 },
  { nums: [3, 1], target: 1, expected: 1 },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = search(nums, target);
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
