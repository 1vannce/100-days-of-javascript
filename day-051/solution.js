/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let course = 0; course < numCourses; course++) {
    if (inDegree[course] === 0) queue.push(course);
  }

  const order = [];
  // A head index avoids the repeated array shifting that can cost O(V²).
  for (let head = 0; head < queue.length; head++) {
    const course = queue[head];
    order.push(course);

    for (const dependent of adj[course]) {
      inDegree[dependent]--;
      if (inDegree[dependent] === 0) queue.push(dependent);
    }
  }

  // Courses left unprocessed are blocked by a cycle.
  return order.length === numCourses ? order : [];
}

function isValidTopologicalOrder(numCourses, prerequisites, order) {
  if (!Array.isArray(order) || order.length !== numCourses) return false;

  const position = new Map();
  for (let i = 0; i < order.length; i++) {
    if (position.has(order[i])) return false;
    position.set(order[i], i);
  }

  for (let course = 0; course < numCourses; course++) {
    if (!position.has(course)) return false;
  }

  for (const [course, prereq] of prerequisites) {
    if (position.get(prereq) >= position.get(course)) return false;
  }
  return true;
}

const testCases = [
  {
    name: "Linear dependency chain",
    numCourses: 2,
    prerequisites: [[1, 0]],
    expectValidOrder: true,
  },
  {
    name: "Diamond DAG",
    numCourses: 4,
    prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]],
    expectValidOrder: true,
  },
  {
    name: "Direct 2-node cycle",
    numCourses: 2,
    prerequisites: [[1, 0], [0, 1]],
    expectValidOrder: false,
  },
  {
    name: "Single course with no prerequisites",
    numCourses: 1,
    prerequisites: [],
    expectValidOrder: true,
  },
  {
    name: "Multiple disconnected DAG components",
    numCourses: 6,
    prerequisites: [[1, 0], [2, 1], [4, 3], [5, 4]],
    expectValidOrder: true,
  },
  {
    name: "Cycle embedded in larger graph",
    numCourses: 4,
    prerequisites: [[1, 0], [2, 1], [0, 2], [3, 2]],
    expectValidOrder: false,
  },
  {
    name: "Isolated courses alongside a DAG",
    numCourses: 6,
    prerequisites: [[2, 1], [4, 2]],
    expectValidOrder: true,
  },
  {
    name: "Disconnected cycle after processable courses",
    numCourses: 6,
    prerequisites: [[1, 0], [3, 2], [2, 3]],
    expectValidOrder: false,
  },
  {
    name: "Maximum-size independent courses",
    numCourses: 2000,
    prerequisites: [],
    expectValidOrder: true,
  },
  {
    name: "Maximum-size reverse-label chain",
    numCourses: 2000,
    prerequisites: Array.from({ length: 1999 }, (_, i) => [i, i + 1]),
    expectValidOrder: true,
  },
  {
    name: "Maximum-size cycle",
    numCourses: 2000,
    prerequisites: Array.from({ length: 2000 }, (_, i) => [(i + 1) % 2000, i]),
    expectValidOrder: false,
  },
  {
    name: "Dense DAG with many prerequisites per course",
    numCourses: 200,
    prerequisites: Array.from({ length: 200 }, (_, course) =>
      Array.from({ length: course }, (_, prereq) => [course, prereq])
    ).flat(),
    expectValidOrder: true,
  },
];

const results = testCases.map(({ name, numCourses, prerequisites, expectValidOrder }) => {
  const before = JSON.stringify(prerequisites);
  const result = findOrder(numCourses, prerequisites);
  const unchanged = JSON.stringify(prerequisites) === before;
  const passed = unchanged && (expectValidOrder
    ? isValidTopologicalOrder(numCourses, prerequisites, result)
    : Array.isArray(result) && result.length === 0);

  return {
    Scenario: name,
    Courses: numCourses,
    OutputLength: result.length,
    ExpectedCycle: !expectValidOrder,
    Unchanged: unchanged,
    Passed: passed ? "PASS" : "FAIL",
  };
});

console.table(results);
if (results.some(({ Passed }) => Passed === "FAIL")) {
  process.exitCode = 1;
}
