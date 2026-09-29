/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of the current window
    if (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove indices whose values are less than current element
    while (deque.length && nums[i] >= nums[deque[deque.length - 1]]) {
      deque.pop();
    }

    // Add current index
    deque.push(i);

    // Add max for the current window
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// Test cases
const testCases = [
  { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, expected: [3, 3, 5, 5, 6, 7] },
  { nums: [1], k: 1, expected: [1] },
  { nums: [1, -1], k: 1, expected: [1, -1] },
  { nums: [9, 11], k: 2, expected: [11] },
  { nums: [4, -2], k: 2, expected: [4] },
  { nums: [7, 2, 4], k: 2, expected: [7, 4] },
];

console.table(
  testCases.map(({ nums, k, expected }) => {
    const result = maxSlidingWindow(nums, k);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    return {
      Nums: `[${nums}]`,
      K: k,
      Expected: `[${expected}]`,
      Actual: `[${result}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
