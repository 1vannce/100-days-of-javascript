/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adjList = Array.from({ length: numCourses }, () => []);

  // Build graph
  for (const [course, prereq] of prerequisites) {
    adjList[prereq].push(course);
    inDegree[course]++;
  }

  // Initialize queue with courses having no prerequisites
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let coursesCompleted = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    coursesCompleted++;

    for (const nextCourse of adjList[current]) {
      inDegree[nextCourse]--;
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  return coursesCompleted === numCourses;
}

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
    prerequisites: [
      [1, 0],
      [0, 1],
    ],
    expected: false,
  },
  {
    name: "Diamond DAG (valid)",
    numCourses: 4,
    prerequisites: [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ],
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
    prerequisites: [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
    expected: false,
  },
  {
    name: "Disjoint components with one isolated cycle",
    numCourses: 5,
    prerequisites: [
      [1, 0],
      [2, 3],
      [3, 4],
      [4, 2],
    ],
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
  }),
);
