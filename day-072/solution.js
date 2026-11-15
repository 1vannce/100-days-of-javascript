/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  let prev2 = 0; // max loot up to house i - 2
  let prev1 = 0; // max loot up to house i - 1

  for (const amount of nums) {
    const current = Math.max(prev1, prev2 + amount);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

const testCases = [
  {
    name: "Standard 4-house street [1, 2, 3, 1]",
    nums: [1, 2, 3, 1],
    expected: 4,
  },
  {
    name: "5-house alternating peak [2, 7, 9, 3, 1]",
    nums: [2, 7, 9, 3, 1],
    expected: 12,
  },
  {
    name: "Non-greedy double skip case [2, 1, 1, 2]",
    nums: [2, 1, 1, 2],
    expected: 4,
  },
  {
    name: "Single house edge case [50]",
    nums: [50],
    expected: 50,
  },
  {
    name: "Two houses choosing larger stash [10, 25]",
    nums: [10, 25],
    expected: 25,
  },
  {
    name: "All zero values [0, 0, 0, 0]",
    nums: [0, 0, 0, 0],
    expected: 0,
  },
];

console.table(
  testCases.map(({ name, nums, expected }) => {
    const start = performance.now();
    const result = rob([...nums]);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Houses: nums.length,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
