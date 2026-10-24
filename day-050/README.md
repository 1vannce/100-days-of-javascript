### Day 50: Course Schedule

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `b_i` first if you want to take course `a_i`.

* For example, the pair `[0, 1]` indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false` (i.e., if there is a circular dependency / directed cycle).

**Crucial Requirement:** A curriculum can be completed if and only if its dependency graph is a **Directed Acyclic Graph (DAG)**. Implement an algorithm that detects cycles in **$O(V + E)$ time** and **$O(V + E)$ auxiliary space**, using either **Kahn's Algorithm (BFS via In-Degrees)** or **Three-Color DFS Cycle Detection**.

**Examples**

```javascript
// Example 1:
canFinish(2, [[1, 0]]);
// Output: true
// Explanation: There are 2 courses to take. To take course 1 you should have finished course 0. So it is possible.

// Example 2:
canFinish(2, [[1, 0], [0, 1]]);
// Output: false
// Explanation: To take course 1 you must take course 0, and to take course 0 you must take course 1. Circular dependency detected!

// Example 3:
canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
// Output: true
// Explanation: Course 0 has no prerequisites. Once taken, courses 1 and 2 can be completed, followed by course 3.

```

**Constraints**

* $1 \le \text{numCourses} \le 2000$
* $0 \le \text{prerequisites.length} \le 5000$
* $\text{prerequisites}[i]\text{.length} == 2$
* $0 \le a_i, b_i < \text{numCourses}$
* All prerequisite pairs are **unique**.
* Time Complexity: $O(V + E)$ where $V = \text{numCourses}$ and $E = \text{prerequisites.length}$.
* Auxiliary Space Complexity: $O(V + E)$ to construct the adjacency list and tracking arrays.

**Starter Code**

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  // Write your code here
}

```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  {
    name: "Linear chain (valid)",
    numCourses: 2,
    prerequisites: [[1, 0]],
    expected: true,
  },
  {
    name: "Direct 2-node cycle",
    numCourses: 2,
    prerequisites: [[1, 0], [0, 1]],
    expected: false,
  },
  {
    name: "Diamond DAG (valid)",
    numCourses: 4,
    prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]],
    expected: true,
  },
  {
    name: "Independent courses with no prerequisites",
    numCourses: 3,
    prerequisites: [],
    expected: true,
  },
  {
    name: "3-node circular loop",
    numCourses: 3,
    prerequisites: [[0, 1], [1, 2], [2, 0]],
    expected: false,
  },
  {
    name: "Disjoint components with one isolated cycle",
    numCourses: 5,
    prerequisites: [[1, 0], [2, 3], [3, 4], [4, 2]],
    expected: false,
  },
];

console.table(
  testCases.map(({ name, numCourses, prerequisites, expected }) => {
    const result = canFinish(numCourses, prerequisites);
    const passed = result === expected;

    return {
      Scenario: name,
      Courses: numCourses,
      Edges: prerequisites.length,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);

```

---

**Hints**

* **Pattern 1: Kahn's Algorithm (BFS In-Degree Reduction):**
* Build an adjacency list `adj` and an `inDegree` array of size `numCourses`.
* For each `[course, prereq]` in `prerequisites`, add `course` to `adj[prereq]` and increment `inDegree[course]++`.
* Initialize a `queue` with all courses that have `inDegree === 0` (courses with no prerequisites).
* Maintain a count of visited courses: `let taken = 0;`.
* While the queue is not empty, dequeue course `u`, increment `taken++`, and for each dependent course `v` in `adj[u]`:
* Decrement `inDegree[v]--`.
* If `inDegree[v] === 0`, push `v` into the queue.


* If `taken === numCourses`, return `true`; otherwise, any remaining unvisited courses belong to a cycle, so return `false`.


* **Pattern 2: DFS 3-Color State Tracking:**
* Track node states: `0 = unvisited`, `1 = visiting` (currently in the recursion call stack), `2 = visited` (fully processed).
* If DFS encounters a neighbor currently in state `1`, a back-edge exists, confirming a cycle.
