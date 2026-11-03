/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permuteUnique(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  const path = [];
  const used = new Array(sorted.length).fill(false);

  function backtrack() {
    if (path.length === sorted.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      // skip duplicate branch: equal value whose earlier twin was already tried at this depth
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;

      used[i] = true; // choose
      path.push(sorted[i]);
      backtrack(); // explore
      path.pop(); // unchoose
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// Helper to sort permutations for deterministic comparison
function normalizePermutations(perms) {
  return perms
    .map((p) => [...p])
    .sort((a, b) => {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
      }
      return 0;
    });
}

const testCases = [
  {
    name: "Duplicate pair [1, 1, 2]",
    nums: [1, 1, 2],
    expectedCount: 3,
    expectedPerms: [
      [1, 1, 2],
      [1, 2, 1],
      [2, 1, 1],
    ],
  },
  {
    name: "All distinct elements [1, 2, 3]",
    nums: [1, 2, 3],
    expectedCount: 6,
    expectedPerms: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
  },
  {
    name: "Two pairs of duplicates [2, 2, 1, 1]",
    nums: [2, 2, 1, 1],
    expectedCount: 6,
    expectedPerms: [
      [1, 1, 2, 2],
      [1, 2, 1, 2],
      [1, 2, 2, 1],
      [2, 1, 1, 2],
      [2, 1, 2, 1],
      [2, 2, 1, 1],
    ],
  },
  {
    name: "All elements identical [5, 5, 5]",
    nums: [5, 5, 5],
    expectedCount: 1,
    expectedPerms: [[5, 5, 5]],
  },
  {
    name: "Unsorted input with duplicates [3, 3, 0, 3]",
    nums: [3, 3, 0, 3],
    expectedCount: 4,
    expectedPerms: null,
  },
];

console.table(
  testCases.map(({ name, nums, expectedCount, expectedPerms }) => {
    const result = permuteUnique([...nums]);
    const normalizedActual = normalizePermutations(result);
    let passed = result.length === expectedCount;

    if (passed && expectedPerms) {
      const normalizedExpected = normalizePermutations(expectedPerms);
      passed =
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Verify all generated permutations are unique and of correct length
    const signatures = new Set(normalizedActual.map((p) => JSON.stringify(p)));
    const allValidLengths = result.every((p) => p.length === nums.length);
    const hasNoDuplicates = signatures.size === expectedCount;

    return {
      Scenario: name,
      Input: JSON.stringify(nums),
      GeneratedCount: result.length,
      ExpectedCount: expectedCount,
      ValidLengths: allValidLengths,
      UniqueCheck: hasNoDuplicates,
      Passed: passed && hasNoDuplicates && allValidLengths ? "PASS" : "FAIL",
    };
  }),
);
