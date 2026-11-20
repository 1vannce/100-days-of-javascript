/**
 * 0/1 Knapsack subset-sum DP — O(n * target) time, O(target) space.
 * dp[s] = true if some subset of the numbers seen so far sums to s.
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
  const totalSum = nums.reduce((acc, val) => acc + val, 0);
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  if (nums.some((num) => num > target)) return false;

  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    // Reverse loop: dp[s - num] still reflects the state before `num`,
    // so each number is used at most once (0/1 knapsack).
    for (let s = target; s >= num; s--) {
      if (dp[s - num]) dp[s] = true;
    }
    if (dp[target]) return true; // Early exit optimization
  }

  return dp[target];
}

const testCases = [
  {
    name: "Valid partition [1, 5, 11, 5]",
    nums: [1, 5, 11, 5],
    expected: true,
  },
  {
    name: "Odd total sum impossible [1, 2, 3, 5]",
    nums: [1, 2, 3, 5],
    expected: false,
  },
  {
    name: "Even sum but no valid subset [2, 2, 3, 5]",
    nums: [2, 2, 3, 5],
    expected: false,
  },
  {
    name: "Single element array [1]",
    nums: [1],
    expected: false,
  },
  {
    name: "Single element exceeding half target [100, 4, 6]",
    nums: [100, 4, 6],
    expected: false,
  },
  {
    name: "Large balanced array with duplicate values",
    nums: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19],
    expected: true, // Sum = 38, target = 19
  },
];

console.table(
  testCases.map(({ name, nums, expected }) => {
    const start = performance.now();
    const result = canPartition([...nums]);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Length: nums.length,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
