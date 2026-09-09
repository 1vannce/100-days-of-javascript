/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const numMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }

    numMap.set(nums[i], i);
  }

  return [];
}

const testCases = [
  {
    // Test 0
    nums: [2, 7, 11, 15],
    target: 9,
    expected: [0, 1],
  },
  {
    // Test 1
    nums: [3, 2, 4],
    target: 6,
    expected: [1, 2],
  },
  {
    // Test 2
    nums: [3, 3],
    target: 6,
    expected: [0, 1],
  },
  {
    // Test 3
    nums: [-1, -2, -3, -4, -5],
    target: -8,
    expected: [2, 4],
  },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = twoSum(nums, target);
    return {
      Nums: `[${nums}]`,
      Target: target,
      Expected: `[${expected}]`,
      Actual: result ? `[${result}]` : null,
      Passed: `${result}` === `${expected}` ? "PASS" : "FAIL",
    };
  }),
);
