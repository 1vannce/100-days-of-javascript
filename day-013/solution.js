/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  const search = (x) => {
    let left = 0;
    let right = nums.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (nums[mid] >= x) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  };

  const l = search(target);
  const r = search(target + 1);

  // If target is not found, l will equal r
  return l === r ? [-1, -1] : [l, r - 1];
}

// Test Cases
const testCases = [
  { nums: [5, 7, 7, 8, 8, 10], target: 8, expected: [3, 4] },
  { nums: [5, 7, 7, 8, 8, 10], target: 6, expected: [-1, -1] },
  { nums: [], target: 0, expected: [-1, -1] },
  { nums: [1], target: 1, expected: [0, 0] },
  { nums: [2, 2], target: 2, expected: [0, 1] },
  { nums: [1, 2, 3, 3, 3, 3, 4, 5], target: 3, expected: [2, 5] },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = searchRange(nums, target);
    const passed = `${result}` === `${expected}`;
    return {
      Nums: `[${nums}]`,
      Target: target,
      Expected: `[${expected}]`,
      Actual: result ? `[${result}]` : null,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
