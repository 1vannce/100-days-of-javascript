/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
function change(amount, coins) {
  // dp[a] = number of combinations that form total a.
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1; // one way to make 0: choose no coins

  // Coins in the outer loop fix a canonical order, so 1 + 2 and 2 + 1
  // are counted once as a single combination.
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }

  return dp[amount];
}

const testCases = [
  {
    name: "Standard denominations [1, 2, 5] -> amount 5",
    amount: 5,
    coins: [1, 2, 5],
    expected: 4,
  },
  {
    name: "Unreachable target [2] -> amount 3",
    amount: 3,
    coins: [2],
    expected: 0,
  },
  {
    name: "Exact single coin match [10] -> amount 10",
    amount: 10,
    coins: [10],
    expected: 1,
  },
  {
    name: "Zero amount base case [1, 2, 5] -> amount 0",
    amount: 0,
    coins: [1, 2, 5],
    expected: 1,
  },
  {
    name: "Combination vs Permutation trap [1, 2] -> amount 4",
    amount: 4,
    coins: [1, 2],
    expected: 3, // [1,1,1,1], [1,1,2], [2,2] (Permutations would return 5)
  },
  {
    name: "Larger stress test [1, 2, 5] -> amount 500",
    amount: 500,
    coins: [1, 2, 5],
    expected: 12701,
  },
];

console.table(
  testCases.map(({ name, amount, coins, expected }) => {
    const start = performance.now();
    const result = change(amount, [...coins]);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Target: amount,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
