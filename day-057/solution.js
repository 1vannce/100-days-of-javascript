/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(startIdx) {
    result.push([...path]);

    for (let i = startIdx; i < nums.length; i++) {
      path.push(nums[i]); // choose
      backtrack(i + 1); // explore
      path.pop(); // unchoose
    }
  }

  backtrack(0);
  return result;
}

// Helper to sort subsets for deterministic comparison
function normalizeSubsets(subsets) {
  return subsets
    .map((sub) => [...sub].sort((a, b) => a - b))
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
    name: "Standard 3-element set",
    nums: [1, 2, 3],
    expectedCount: 8,
    expectedSubsets: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
  },
  {
    name: "Single element",
    nums: [0],
    expectedCount: 2,
    expectedSubsets: [[], [0]],
  },
  {
    name: "Two negative elements",
    nums: [-1, -2],
    expectedCount: 4,
    expectedSubsets: [[], [-1], [-2], [-2, -1]],
  },
  {
    name: "4-element set power count verification",
    nums: [1, 2, 3, 4],
    expectedCount: 16,
    expectedSubsets: null, // verified via count and uniqueness
  },
];

console.table(
  testCases.map(({ name, nums, expectedCount, expectedSubsets }) => {
    const result = subsets(nums);
    const normalizedActual = normalizeSubsets(result);

    let passed = result.length === expectedCount;

    if (passed && expectedSubsets) {
      const normalizedExpected = normalizeSubsets(expectedSubsets);
      passed =
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Check for duplicate sets in result
    const setSignatures = new Set(normalizedActual.map((s) => JSON.stringify(s)));
    const hasNoDuplicates = setSignatures.size === result.length;

    return {
      Scenario: name,
      InputSize: nums.length,
      GeneratedSubsets: result.length,
      ExpectedSubsets: expectedCount,
      UniqueCheck: hasNoDuplicates,
      Passed: passed && hasNoDuplicates ? "PASS" : "FAIL",
    };
  }),
);
