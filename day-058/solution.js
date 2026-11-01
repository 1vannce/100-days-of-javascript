/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);

  const result = [];
  const path = [];

  function backtrack(startIdx) {
    result.push([...path]);

    for (let i = startIdx; i < nums.length; i++) {
      if (i > startIdx && nums[i] === nums[i - 1]) continue; // skip duplicate sibling

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
    name: "Duplicate value pair [1, 2, 2]",
    nums: [1, 2, 2],
    expectedCount: 6,
    expectedSubsets: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
  },
  {
    name: "Single value",
    nums: [0],
    expectedCount: 2,
    expectedSubsets: [[], [0]],
  },
  {
    name: "All elements identical [2, 2, 2]",
    nums: [2, 2, 2],
    expectedCount: 4, // [], [2], [2, 2], [2, 2, 2]
    expectedSubsets: [[], [2], [2, 2], [2, 2, 2]],
  },
  {
    name: "Unsorted with multiple duplicates [4, 4, 4, 1, 4]",
    nums: [4, 4, 4, 1, 4],
    expectedCount: 10,
    expectedSubsets: null, // verified via count and uniqueness
  },
  {
    name: "Negative duplicates [-1, 1, 2, -1]",
    nums: [-1, 1, 2, -1],
    expectedCount: 12,
    expectedSubsets: null,
  },
];

console.table(
  testCases.map(({ name, nums, expectedCount, expectedSubsets }) => {
    const result = subsetsWithDup([...nums]);
    const normalizedActual = normalizeSubsets(result);

    let passed = result.length === expectedCount;

    if (passed && expectedSubsets) {
      const normalizedExpected = normalizeSubsets(expectedSubsets);
      passed =
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Verify there are no duplicate subsets in the output
    const signatures = new Set(normalizedActual.map((s) => JSON.stringify(s)));
    const hasNoDuplicates = signatures.size === result.length;

    return {
      Scenario: name,
      Input: JSON.stringify(nums),
      ResultCount: result.length,
      ExpectedCount: expectedCount,
      UniqueCheck: hasNoDuplicates,
      Passed: passed && hasNoDuplicates ? "PASS" : "FAIL",
    };
  }),
);
