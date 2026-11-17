/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // dp[a] = fewest coins needed to form total a (amount + 1 acts as Infinity).
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  const sorted = [...coins].sort((a, b) => a - b);

  for (let a = 1; a <= amount; a++) {
    for (const coin of sorted) {
      if (coin > a) break; // remaining coins are larger, none can fit
      dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
}

const testCases = [
  {
    name: "Standard canonical denominations [1, 2, 5] -> 11",
    coins: [1, 2, 5],
    amount: 11,
    expected: 3,
  },
  {
    name: "Unreachable odd target with even coin [2] -> 3",
    coins: [2],
    amount: 3,
    expected: -1,
  },
  {
    name: "Zero amount edge case [1] -> 0",
    coins: [1],
    amount: 0,
    expected: 0,
  },
  {
    name: "Non-greedy optimal choice [1, 3, 4] -> 6",
    coins: [1, 3, 4],
    amount: 6,
    expected: 2,
  },
  {
    name: "Large denomination exceeding target [5, 10] -> 3",
    coins: [5, 10],
    amount: 3,
    expected: -1,
  },
  {
    name: "Upper bound target stress test [1, 7, 10] -> 9999",
    coins: [1, 7, 10],
    amount: 9999,
    expected: 1002, // 999 * 10 + 1 * 7 + 2 * 1 = 1002 coins
  },
];

console.table(
  testCases.map(({ name, coins, amount, expected }) => {
    const start = performance.now();
    const result = coinChange([...coins], amount);
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
