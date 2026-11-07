/**
 * @param {string} s
 * @return {string[][]}
 */
function partition(s) {
  const n = s.length;
  const result = [];
  const path = [];

  // isPal[i][j] === true when s[i..j] is a palindrome (O(1) checks while backtracking)
  const isPal = Array.from({ length: n }, () => new Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      isPal[i][j] = s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1]);
    }
  }

  function backtrack(startIdx) {
    if (startIdx === n) {
      result.push([...path]);
      return;
    }

    for (let endIdx = startIdx; endIdx < n; endIdx++) {
      if (!isPal[startIdx][endIdx]) continue;

      path.push(s.slice(startIdx, endIdx + 1)); // choose
      backtrack(endIdx + 1); // explore the remaining suffix
      path.pop(); // unchoose
    }
  }

  backtrack(0);
  return result;
}

// Helper to sort partitions for deterministic comparison
function normalizePartitions(partitions) {
  return partitions
    .map((p) => [...p])
    .sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
      }
      return 0;
    });
}

// Helper to check if a single string is palindrome
function isPalindromeStr(str) {
  let l = 0, r = str.length - 1;
  while (l < r) {
    if (str[l++] !== str[r--]) return false;
  }
  return true;
}

const testCases = [
  {
    name: "Standard string with overlapping palindromes 'aab'",
    s: "aab",
    expectedCount: 2,
    expectedPartitions: [["a", "a", "b"], ["aa", "b"]],
  },
  {
    name: "Single character 'a'",
    s: "a",
    expectedCount: 1,
    expectedPartitions: [["a"]],
  },
  {
    name: "No non-trivial palindromes 'ab'",
    s: "ab",
    expectedCount: 1,
    expectedPartitions: [["a", "b"]],
  },
  {
    name: "All characters identical 'aaaa'",
    s: "aaaa",
    expectedCount: 8, // 2^(4-1) = 8 partitions
    expectedPartitions: null,
  },
  {
    name: "Symmetric palindrome 'racecar'",
    s: "racecar",
    expectedCount: 4, // r|a|c|e|c|a|r, r|a|cec|a|r, r|aceca|r, racecar
    expectedPartitions: null,
  },
];

console.table(
  testCases.map(({ name, s, expectedCount, expectedPartitions }) => {
    const result = partition(s);
    const normalizedActual = normalizePartitions(result);
    let passed = result.length === expectedCount;

    if (passed && expectedPartitions) {
      const normalizedExpected = normalizePartitions(expectedPartitions);
      passed = JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Verify all parts of every partition are valid palindromes
    const allValidPalindromes = result.every((part) =>
      part.every((substring) => isPalindromeStr(substring))
    );

    // Verify concatenated partitions reconstruct original string
    const allReconstructed = result.every((part) => part.join("") === s);

    const signatures = new Set(normalizedActual.map((p) => JSON.stringify(p)));
    const hasNoDuplicates = signatures.size === expectedCount;

    return {
      Scenario: name,
      InputString: s,
      Length: s.length,
      GeneratedCount: result.length,
      ExpectedCount: expectedCount,
      PalindromesValid: allValidPalindromes,
      StringReconstructed: allReconstructed,
      Passed: passed && hasNoDuplicates && allValidPalindromes && allReconstructed ? "PASS" : "FAIL",
    };
  })
);
