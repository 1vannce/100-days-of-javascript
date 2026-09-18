/**
 * @param {number[]} nums
 * @return {number}
 */
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // If mid element is less than the next, peak is on the right
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      // Otherwise, peak is on the left (including mid)
      right = mid;
    }
  }

  // left and right converge to the peak index
  return left;
}

// Test Cases
const testCases = [
  { nums: [1, 2, 3, 1], validExpected: [2] },
  { nums: [1, 2, 1, 3, 5, 6, 4], validExpected: [1, 5] },
  { nums: [1], validExpected: [0] },
  { nums: [1, 2], validExpected: [1] },
  { nums: [2, 1], validExpected: [0] },
  { nums: [1, 3, 20, 4, 1, 0], validExpected: [2] },
];

console.table(
  testCases.map(({ nums, validExpected }) => {
    const result = findPeakElement(nums);
    const passed = validExpected.includes(result);
    return {
      Nums: `[${nums}]`,
      ValidOutputs: `[${validExpected}]`,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
