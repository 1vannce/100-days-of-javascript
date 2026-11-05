/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
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

      // skip duplicate siblings: same value already started a branch at this level
      if (i > startIdx && sorted[i] === sorted[i - 1]) continue;

      path.push(sorted[i]); // choose
      backtrack(i + 1, remain - sorted[i]); // explore (i + 1: single use)
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
    name: "Standard candidate set with duplicates",
    candidates: [10, 1, 2, 7, 6, 1, 5],
    target: 8,
    expectedCount: 4,
    expectedCombs: [
      [1, 1, 6],
      [1, 2, 5],
      [1, 7],
      [2, 6],
    ],
  },
  {
    name: "Multiple identical elements [2, 5, 2, 1, 2]",
    candidates: [2, 5, 2, 1, 2],
    target: 5,
    expectedCount: 2,
    expectedCombs: [[1, 2, 2], [5]],
  },
  {
    name: "No valid combination",
    candidates: [3, 4, 5],
    target: 2,
    expectedCount: 0,
    expectedCombs: [],
  },
  {
    name: "Exact total match using all elements",
    candidates: [1, 1, 1],
    target: 3,
    expectedCount: 1,
    expectedCombs: [[1, 1, 1]],
  },
];

console.table(
  testCases.map(({ name, candidates, target, expectedCount, expectedCombs }) => {
    const result = combinationSum2([...candidates], target);
    const normalizedActual = normalizeCombinations(result);
    let passed = result.length === expectedCount;

    if (passed && expectedCombs) {
      const normalizedExpected = normalizeCombinations(expectedCombs);
      passed = JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    const allSumsCorrect = result.every((c) => c.reduce((a, b) => a + b, 0) === target);
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
  })
);
