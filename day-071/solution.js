/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1; // ways to reach step 1
  let prev1 = 2; // ways to reach step 2

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

const testCases = [
  {
    name: "Base case single step (n = 1)",
    n: 1,
    expected: 1,
  },
  {
    name: "Two steps (n = 2)",
    n: 2,
    expected: 2,
  },
  {
    name: "Three steps (n = 3)",
    n: 3,
    expected: 3,
  },
  {
    name: "Five steps (n = 5)",
    n: 5,
    expected: 8,
  },
  {
    name: "Medium staircase (n = 20)",
    n: 20,
    expected: 10946,
  },
  {
    name: "Upper constraint boundary (n = 45)",
    n: 45,
    expected: 1836311903,
  },
];

console.table(
  testCases.map(({ name, n, expected }) => {
    const start = performance.now();
    const result = climbStairs(n);
    const elapsedMs = (performance.now() - start).toFixed(4);
    const passed = result === expected;

    return {
      Scenario: name,
      Steps: n,
      Expected: expected,
      Actual: result,
      TimeMs: elapsedMs,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
