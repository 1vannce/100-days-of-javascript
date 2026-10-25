### Day 51: Course Schedule II

There are `numCourses` courses labeled from `0` to `numCourses - 1`. Each pair `[course, prereq]` in `prerequisites` means that `prereq` must be completed before `course`.

Return any valid ordering that includes every course exactly once. If a directed cycle makes it impossible to finish all courses, return `[]`.

**Crucial Requirement:** Reconstruct a topological order using **Kahn's Algorithm (BFS)** or **Post-Order DFS (Reverse Finish Order)** in **O(V + E) time** and **O(V + E) auxiliary space**.

**Examples**

```javascript
findOrder(2, [[1, 0]]);
// [0, 1]

findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
// [0, 1, 2, 3] or [0, 2, 1, 3]

findOrder(2, [[1, 0], [0, 1]]);
// []: circular dependency

findOrder(1, []);
// [0]
```

**Constraints**

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- Each prerequisite pair has exactly two course labels in `[0, numCourses)`.
- A course cannot be its own prerequisite.
- All prerequisite pairs are unique.

**Starter Code**

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses, prerequisites) {
  // Write your code here
}
```

**Solution: Kahn's Algorithm**

1. Build an adjacency list from each prerequisite to its dependent courses and count each course's in-degree.
2. Enqueue all courses with zero in-degree, including isolated courses.
3. Take the next queued course, append it to the order, and decrement the in-degree of each dependent. Enqueue a dependent when its in-degree reaches zero.
4. Return the order if it contains all courses; otherwise return `[]` because a cycle blocks the remaining courses.

Every queued course has no unfinished prerequisites, so appending it preserves a valid topological order. In an acyclic graph, every nonempty remaining subgraph has a zero-in-degree course, so all courses are eventually processed. If processing stops early, every remaining course has an unfinished prerequisite; following these dependencies in a finite graph must reach a cycle.

The queue uses a head index rather than `shift()` to keep each dequeue O(1). Each vertex is enqueued once and each edge is visited once, giving **O(V + E) time**. The adjacency list, in-degree array, queue, and output buffer use **O(V + E) auxiliary space**. The input is not modified.

**Run Tests**

```bash
node day-051/solution.js
```

The included harness checks all six supplied scenarios plus isolated courses, a disconnected cycle with a processable component, 2,000-course independent/chain/cycle graphs, and a dense DAG. It validates the ordering rather than requiring a specific sequence, checks that prerequisites remain unchanged, and sets a failing exit code if any test fails. An empty result is accepted only for cases expected to contain a cycle.

**DFS Alternative Hint**

Track states `0 = unvisited`, `1 = visiting`, and `2 = visited`. An edge to a visiting node detects a cycle. Append nodes after exploring their outgoing edges, then reverse the finish order.
