### Day 54: Network Delay Time

Given `n` nodes labeled `1` through `n` and directed edges `times[i] = [u, v, w]`, send a signal from node `k`. Return the minimum time until every node receives the signal, or `-1` if any node is unreachable.

**Requirement:** Use Dijkstra's algorithm with a binary min-heap. Edge weights may differ, so ordinary BFS does not compute shortest travel times. The constraints permit zero-weight edges; Dijkstra works with all nonnegative weights.

**Examples**

```javascript
networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2); // 2
networkDelayTime([[1, 2, 1]], 2, 1); // 1
networkDelayTime([[1, 2, 1]], 2, 2); // -1
```

In the first example, nodes 1 and 3 receive the signal at time 1, and node 4 receives it at time 2 through node 3.

**Constraints**

- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- Each edge contains three integers with `1 <= u, v <= n`, `u !== v`, and `0 <= w <= 100`.
- Every directed pair `(u, v)` is unique.

**Approach**

1. Build an adjacency list of outgoing `[neighbor, weight]` pairs.
2. Initialize distances to `Infinity`, except `dist[k] = 0`, and push `[0, k]` into the min-heap.
3. Pop the smallest path cost. Skip stale entries whose cost exceeds the current distance.
4. Relax each outgoing edge. When a strictly shorter route is found, update its distance and push the new `[cost, node]` entry.
5. Return `-1` if a distance is still infinite; otherwise return the largest distance among nodes `1` through `n`.

With nonnegative weights, the smallest queued current distance cannot be improved by a path through a more distant node. Thus each current entry popped from the heap finalizes its node's shortest distance. Strict improvements prevent zero-weight cycles from repeatedly queuing equal distances. The maximum shortest distance is when the final node receives the signal.

**Complexity**

- Time: `O((V + E) log V)`. The lazy heap can hold `O(E)` entries, giving `O(V + E log(E + 1))`; unique directed pairs imply `E <= V(V - 1)`, so this satisfies the required bound.
- Auxiliary space: `O(V + E)` for the adjacency list, distances, and heap.

**Run tests**

```bash
node day-054/solution.js
```

The table covers the five supplied scenarios, zero-weight edges and cycles, stale entries, a single-node graph, and a 100-node chain. The single-node test uses no edges because a one-node graph cannot have a valid non-self edge. Any failed case sets a nonzero exit code.
