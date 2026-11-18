### Day 75: Coin Change II

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the **number of combinations** that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin. The answer is guaranteed to fit into a signed 32-bit integer.

**Crucial Requirement:** Iterating amount in the outer loop and coins in the inner loop (as in Day 74) counts permutations—treating `1 + 2` and `2 + 1` as distinct ways to reach 3. To count unique combinations without duplicates, invert the loop hierarchy: iterate over each coin in the outer loop and update target totals `a` from `coin` up to `amount` in the inner loop, running in $O(\text{amount} \times N)$ time and $O(\text{amount})$ auxiliary space.

**Examples**

```javascript
// Example 1:
change(5, [1, 2, 5]);
// Output: 4
// Explanation: There are four ways to make up the amount:
// 5 = 5
// 5 = 2 + 2 + 1
// 5 = 2 + 1 + 1 + 1
// 5 = 1 + 1 + 1 + 1 + 1

// Example 2:
change(3, [2]);
// Output: 0
// Explanation: The amount of 3 cannot be made up just with coins of 2.

// Example 3:
change(10, [10]);
// Output: 1

// Example 4:
change(0, [1, 2, 5]);
// Output: 1
// Explanation: There is exactly 1 way to make amount 0 (choose no coins).
```

**Constraints**

- All the values of `coins` are unique.
- **Time Complexity:** $O(\text{amount} \times N)$ where $N = \text{coins.length}$.
- **Auxiliary Space Complexity:** $O(\text{amount})$ for the 1D DP combination table.

**Starter Code**

```javascript
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
function change(amount, coins) {
  // Write your code here
}
```

---

**Approach**

Let `dp[a]` be the number of combinations that form total `a`, with `dp[0] = 1` (the empty selection). Process one coin denomination at a time in the outer loop, and for each coin sweep `a` forward from `coin` to `amount`, applying `dp[a] += dp[a - coin]`. Committing to one denomination across the whole range enforces a canonical coin order, so `[1, 2]` is counted once and `[2, 1]` is never generated. Sweeping forward lets the same coin be reused any number of times (unbounded knapsack). The answer is `dp[amount]`.
