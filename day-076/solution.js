/**
 * Approach 1: Classic bottom-up DP — O(n^2) time, O(n) space.
 * dp[i] = length of the longest strictly increasing subsequence ending at i.
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLISQuadratic(nums) {
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(1);
  let best = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
      }
    }
    if (dp[i] > best) best = dp[i];
  }

  return best;
}

/**
 * Approach 2: Patience sorting + binary search — O(n log n) time, O(n) space.
 * tails[k] = smallest possible tail of any strictly increasing subsequence
 * of length k + 1. tails is always sorted, so we can binary search it.
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    // lower_bound: first index where tails[left] >= num
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }

    if (left === tails.length) tails.push(num);
    else tails[left] = num;
  }

  return tails.length;
}

const testCases = [
  {
    name: "Standard mixed sequence [10, 9, 2, 5, 3, 7, 101, 18]",
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    expected: 4,
  },
  {
    name: "Sequence with dips and recovery [0, 1, 0, 3, 2, 3]",
    nums: [0, 1, 0, 3, 2, 3],
    expected: 4,
  },
  {
    name: "All identical elements (strictly increasing test)",
    nums: [7, 7, 7, 7, 7, 7, 7],
    expected: 1,
  },
  {
    name: "Strictly decreasing sequence",
    nums: [9, 8, 7, 6, 5, 4],
    expected: 1,
  },
  {
    name: "Single element array",
    nums: [42],
    expected: 1,
  },
  {
    name: "Large performance stress test (n = 2500)",
    nums: Array.from({ length: 2500 }, (_, i) => (i % 2 === 0 ? i : -i)),
    expected: 1250,
  },
];

console.table(
  testCases.map(({ name, nums, expected }) => {
    const start = performance.now();
    const result = lengthOfLIS([...nums]);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const quadratic = lengthOfLISQuadratic([...nums]);
    const passed = result === expected && quadratic === expected;

    return {
      Scenario: name,
      Length: nums.length,
      Expected: expected,
      Actual: result,
      Quadratic: quadratic,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
