/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true; // choose
      path.push(nums[i]);
      backtrack(); // explore
      path.pop(); // unchoose
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// Alternative: in-place swapping, no used array or separate path
function permuteSwap(nums) {
  const result = [];

  function backtrack(firstIdx) {
    if (firstIdx === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = firstIdx; i < nums.length; i++) {
      [nums[firstIdx], nums[i]] = [nums[i], nums[firstIdx]]; // choose
      backtrack(firstIdx + 1); // explore
      [nums[firstIdx], nums[i]] = [nums[i], nums[firstIdx]]; // unchoose
    }
  }

  backtrack(0);
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
    name: "Standard 3-element set",
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
    name: "Two elements",
    nums: [0, 1],
    expectedCount: 2,
    expectedPerms: [
      [0, 1],
      [1, 0],
    ],
  },
  {
    name: "Single element",
    nums: [1],
    expectedCount: 1,
    expectedPerms: [[1]],
  },
  {
    name: "4-element set permutation count verification",
    nums: [1, 2, 3, 4],
    expectedCount: 24,
    expectedPerms: null,
  },
];

for (const [label, fn] of [
  ["Used-array", permute],
  ["In-place swap", permuteSwap],
]) {
  console.log(label);
  console.table(
    testCases.map(({ name, nums, expectedCount, expectedPerms }) => {
      const result = fn([...nums]);
      const normalizedActual = normalizePermutations(result);
      let passed = result.length === expectedCount;

      if (passed && expectedPerms) {
        const normalizedExpected = normalizePermutations(expectedPerms);
        passed =
          JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
      }

      // Verify all generated permutations are unique and of correct length
      const signatures = new Set(
        normalizedActual.map((p) => JSON.stringify(p)),
      );
      const allValidLengths = result.every((p) => p.length === nums.length);
      const hasNoDuplicates = signatures.size === expectedCount;

      return {
        Scenario: name,
        InputSize: nums.length,
        GeneratedCount: result.length,
        ExpectedCount: expectedCount,
        ValidLengths: allValidLengths,
        UniqueCheck: hasNoDuplicates,
        Passed: passed && hasNoDuplicates && allValidLengths ? "PASS" : "FAIL",
      };
    }),
  );
}
