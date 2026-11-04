/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result = [];
  const path = [];

  function backtrack(startIdx, remain) {
    if (remain === 0) {
      result.push([...path]);
      return;
    }

    for (let i = startIdx; i < sorted.length; i++) {
      // sorted ascending: this and every later candidate overshoots, so stop
      if (sorted[i] > remain) break;

      path.push(sorted[i]); // choose
      backtrack(i, remain - sorted[i]); // explore (i, not i + 1: allow reuse)
      path.pop(); // unchoose
    }
  }

  backtrack(0, target);
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
    name: "Standard candidate set [2, 3, 6, 7] with target 7",
    candidates: [2, 3, 6, 7],
    target: 7,
    expectedCount: 2,
    expectedCombs: [[2, 2, 3], [7]],
  },
  {
    name: "Multiple reusable elements [2, 3, 5] with target 8",
    candidates: [2, 3, 5],
    target: 8,
    expectedCount: 3,
    expectedCombs: [
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ],
  },
  {
    name: "Impossible target smaller than smallest candidate",
    candidates: [2],
    target: 1,
    expectedCount: 0,
    expectedCombs: [],
  },
  {
    name: "Single candidate repeated exact multiple",
    candidates: [3],
    target: 9,
    expectedCount: 1,
    expectedCombs: [[3, 3, 3]],
  },
  {
    name: "Unsorted candidates input",
    candidates: [8, 3, 2],
    target: 11,
    expectedCount: 3,
    expectedCombs: [
      [2, 3, 3, 3],
      [3, 8],
      [2, 2, 2, 2, 3],
    ],
  },
];

console.table(
  testCases.map(({ name, candidates, target, expectedCount, expectedCombs }) => {
    const result = combinationSum([...candidates], target);
    const normalizedActual = normalizeCombinations(result);
    let passed = result.length === expectedCount;

    if (passed && expectedCombs) {
      const normalizedExpected = normalizeCombinations(expectedCombs);
      passed =
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Verify all generated combinations actually sum to target
    const allSumsCorrect = result.every(
      (c) => c.reduce((a, b) => a + b, 0) === target,
    );
    const signatures = new Set(normalizedActual.map((c) => JSON.stringify(c)));
    const hasNoDuplicates = signatures.size === expectedCount;

    return {
      Scenario: name,
      Target: target,
      GeneratedCount: result.length,
      ExpectedCount: expectedCount,
      SumsValid: allSumsCorrect,
      UniqueCheck: hasNoDuplicates,
      Passed: passed && hasNoDuplicates && allSumsCorrect ? "PASS" : "FAIL",
    };
  }),
);
