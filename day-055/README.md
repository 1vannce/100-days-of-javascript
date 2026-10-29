### Day 55: Cheapest Flights Within K Stops

There are `n` cities connected by directed flights. Each entry in `flights` is
`[from, to, price]`. Given `src`, `dst`, and `k`, return the cheapest price from
`src` to `dst` using at most `k` stops. Return `-1` if no such route exists.

**Stops:** At most `k` intermediate cities means at most `k + 1` flight edges.
With `k = 0`, only a direct flight is allowed.

**Crucial Requirement:** Use Bellman-Ford (or level-by-level relaxation) for
exactly `k + 1` rounds. Snapshot the prices array in each round so updates cannot
propagate across multiple flight edges in the same round.

**Examples**

```javascript
findCheapestPrice(
  4,
  [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]],
  0, 3, 1,
);
// 700: 0 -> 1 -> 3. The cheaper 0 -> 1 -> 2 -> 3 exceeds one stop.

findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1);
// 200: 0 -> 1 -> 2.

findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0);
// 500: only the direct flight is allowed.
```

**Constraints**

- `1 <= n <= 100`
- `0 <= flights.length <= n * (n - 1) / 2`
- Each flight contains exactly three integers: `[from, to, price]`.
- `0 <= from, to < n`, with `from !== to`
- `1 <= price <= 10000`
- No duplicate flights or self-loops
- `0 <= src, dst < n`, with `src !== dst`
- `0 <= k <= n - 1`

**Starter Code**

```javascript
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
function findCheapestPrice(n, flights, src, dst, k) {
  // Write your code here
}
```

**Approach and Hints**

1. Initialize all prices to `Infinity`, except `prices[src] = 0`.
2. Run exactly `k + 1` rounds. Copy `prices` into `tempPrices` at the start of each.
3. For every flight `[from, to, cost]`, skip unreachable origins. Otherwise,
   minimize `tempPrices[to]` using `prices[from] + cost`.
4. Replace `prices` with `tempPrices` after processing all flights.
5. Return the destination price, or `-1` if it remains `Infinity`.

After round `r`, each price is the cheapest cost using **at most `r` flights**.
Copying the array preserves shorter routes; reading only the previous round
ensures each relaxation adds at most one flight. Flight input order therefore
does not affect the result.

A single best-cost value per city in standard Dijkstra is insufficient here:
a cheaper route to a city may use too many flights to finish the trip, while a
more expensive route may leave enough flights available.

**Complexity:** The flight relaxations take `O((k + 1) * E)` time, commonly
written as `O(k * E)`. Including the `V`-element snapshots, the full running time
is `O(V + (k + 1) * (V + E))`. Auxiliary space is `O(V)` for the two price arrays.

**Automated Test Harness for Zed**

The harness is included at the bottom of `solution.js`. It prints a result table
for the five supplied scenarios and additional empty, directed, snapshot,
stop-budget, and maximum-size cases. It also checks that flights are unchanged
and sets a nonzero exit code if any case fails.

Run from the repository root:

```bash
node day-055/solution.js
```
