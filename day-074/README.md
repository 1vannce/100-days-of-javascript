### Day 74: Coin Change

You are given an integer array `coins` representing denominations of currency and an integer `amount` representing a target total.

Return the **fewest number of coins** needed to make up that exact amount. If that total cannot be formed by any combination of the given denominations, return `-1`.

You may assume that you have an infinite supply of each coin denomination.

**Crucial Requirement:** A greedy approach (always picking the largest denomination that fits) fails on non-canonical coin systems—for instance, given `coins = [1, 3, 4]` and `amount = 6`, greedy picks `4 + 1 + 1` (3 coins), whereas the optimal solution is `3 + 3` (2 coins). Solve this using bottom-up 1D Dynamic Programming in $O(\text{amount} \times N)$ time (where $N$ is the number of denominations) and $O(\text{amount})$ auxiliary space.

**Examples**

```javascript
// Example 1:
coinChange([1, 2, 5], 11);
// Output: 3
// Explanation: 11 = 5 + 5 + 1 (3 coins total)

// Example 2:
coinChange([2], 3);
// Output: -1
// Explanation: It is impossible to form 3 using only 2-unit coins.

// Example 3:
coinChange([1], 0);
// Output: 0
// Explanation: Zero coins are needed to make an amount of 0.

// Example 4:
coinChange([1, 3, 4], 6);
// Output: 2
// Explanation: 6 = 3 + 3 (2 coins, beating the greedy 4 + 1 + 1 choice)
```

**Constraints**

- **Time Complexity:** $O(\text{amount} \times N)$ where $N = \text{coins.length}$.
- **Auxiliary Space Complexity:** $O(\text{amount})$ for the 1D DP lookup table.

**Starter Code**

```javascript
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // Write your code here
}
```

---

**Approach**

Let `dp[a]` be the fewest coins needed to form total `a`. Initialize every entry to `amount + 1` (a sentinel larger than any valid answer) except `dp[0] = 0`. For each total `a` from `1` to `amount`, try every coin that fits: `dp[a] = min(dp[a], dp[a - coin] + 1)`. Coins are sorted ascending so the inner loop can `break` as soon as `coin > a`. If `dp[amount]` is still greater than `amount`, no combination exists and the result is `-1`; otherwise it is `dp[amount]`. Since the table is built from smaller totals, it considers every combination and therefore handles non-canonical systems like `[1, 3, 4]` that defeat greedy.
