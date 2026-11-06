/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
function combinationSum3(k, n) {
  const result = [];
  const path = [];

  function backtrack(startDigit, remain) {
    if (path.length === k) {
      if (remain === 0) result.push([...path]);
      return;
    }

    for (let digit = startDigit; digit <= 9; digit++) {
      // ascending digits: this and every later digit overshoots, so stop
      if (digit > remain) break;

      path.push(digit); // choose
      backtrack(digit + 1, remain - digit); // explore (digit + 1: single use)
      path.pop(); // unchoose
    }
  }

  backtrack(1, n);
  return result;
}

// Helper to sort combinations for deterministic comparison
function normalizeCombinations(combs) {
  return combs
    .map((c) => [...c].sort((a, b) => a - b))
    .sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
      }
      return 0;
    });
}

const testCases = [
  {
    name: "Single valid combination (k=3, n=7)",
    k: 3,
    n: 7,
    expectedCount: 1,
    expectedCombs: [[1, 2, 4]],
  },
  {
    name: "Multiple valid combinations (k=3, n=9)",
    k: 3,
    n: 9,
    expectedCount: 3,
    expectedCombs: [[1, 2, 6], [1, 3, 5], [2, 3, 4]],
  },
  {
    name: "Impossible target too small (k=4, n=1)",
    k: 4,
    n: 1,
    expectedCount: 0,
    expectedCombs: [],
  },
  {
    name: "Max digit sum boundary (k=9, n=45)",
    k: 9,
    n: 45,
    expectedCount: 1,
    expectedCombs: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
  },
  {
    name: "Target sum too large for k elements (k=3, n=30)",
    k: 3,
    n: 30, // max sum of 3 digits is 7+8+9 = 24
    expectedCount: 0,
    expectedCombs: [],
  },
];

console.table(
  testCases.map(({ name, k, n, expectedCount, expectedCombs }) => {
    const result = combinationSum3(k, n);
    const normalizedActual = normalizeCombinations(result);
    let passed = result.length === expectedCount;

    if (passed && expectedCombs) {
      const normalizedExpected = normalizeCombinations(expectedCombs);
      passed = JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    const allLengthsValid = result.every((c) => c.length === k);
    const allSumsValid = result.every((c) => c.reduce((a, b) => a + b, 0) === n);
    const signatures = new Set(normalizedActual.map((c) => JSON.stringify(c)));
    const hasNoDuplicates = signatures.size === expectedCount;

    return {
      Scenario: name,
      K: k,
      N: n,
      ResultCount: result.length,
      ExpectedCount: expectedCount,
      ValidLengths: allLengthsValid,
      ValidSums: allSumsValid,
      Passed: passed && hasNoDuplicates && allLengthsValid && allSumsValid ? "PASS" : "FAIL",
    };
  })
);
