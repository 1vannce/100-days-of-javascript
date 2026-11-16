/**
 * @param {number[]} nums
 * @return {number}
 */
function robCircular(nums) {
  if (nums.length === 1) return nums[0];

  // Linear House Robber over the inclusive index range [start, end].
  function robRange(start, end) {
    let prev2 = 0; // max loot up to house i - 2
    let prev1 = 0; // max loot up to house i - 1

    for (let i = start; i <= end; i++) {
      const current = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  }

  // House 0 and house n - 1 are adjacent, so at most one of them is robbed.
  return Math.max(robRange(0, nums.length - 2), robRange(1, nums.length - 1));
}

const testCases = [
  {
    name: "Circular 3-house conflict [2, 3, 2]",
    nums: [2, 3, 2],
    expected: 3,
  },
  {
    name: "Standard 4-house ring [1, 2, 3, 1]",
    nums: [1, 2, 3, 1],
    expected: 4,
  },
  {
    name: "3-house increasing ring [1, 2, 3]",
    nums: [1, 2, 3],
    expected: 3,
  },
  {
    name: "Single house edge case [100]",
    nums: [100],
    expected: 100,
  },
  {
    name: "Two houses circular pair [40, 85]",
    nums: [40, 85],
    expected: 85,
  },
  {
    name: "Double skip across circular boundary [2, 7, 9, 3, 1]",
    nums: [2, 7, 9, 3, 1],
    expected: 11, // index 0 (2) + index 2 (9) = 11
  },
];

console.table(
  testCases.map(({ name, nums, expected }) => {
    const start = performance.now();
    const result = robCircular([...nums]);
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
