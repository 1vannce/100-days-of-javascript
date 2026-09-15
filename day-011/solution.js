/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

const testCases = [
  { nums: [1, 3, 5, 6], target: 5, expected: 2 },
  { nums: [1, 3, 5, 6], target: 2, expected: 1 },
  { nums: [1, 3, 5, 6], target: 7, expected: 4 },
  { nums: [1, 3, 5, 6], target: 0, expected: 0 },
  { nums: [1], target: 0, expected: 0 },
  { nums: [1], target: 2, expected: 1 },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = searchInsert(nums, target);
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
