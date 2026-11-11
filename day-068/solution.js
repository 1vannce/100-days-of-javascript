/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
  if (digits.length === 0) return [];

  const KEYPAD = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const results = [];
  const path = [];

  function backtrack(index) {
    if (index === digits.length) {
      results.push(path.join(""));
      return;
    }

    for (const char of KEYPAD[digits[index]]) {
      path.push(char); // choose
      backtrack(index + 1); // explore
      path.pop(); // unchoose
    }
  }

  backtrack(0);
  return results;
}

// Helper to sort combinations for deterministic comparison
function normalizeCombinations(combs) {
  return [...combs].sort();
}

const testCases = [
  {
    name: "Standard two-digit mapping '23'",
    digits: "23",
    expectedCount: 9,
    expectedCombs: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
  },
  {
    name: "Empty input string boundary ''",
    digits: "",
    expectedCount: 0,
    expectedCombs: [],
  },
  {
    name: "Single digit '2'",
    digits: "2",
    expectedCount: 3,
    expectedCombs: ["a", "b", "c"],
  },
  {
    name: "Digit with 4 mapping characters '7'",
    digits: "7",
    expectedCount: 4,
    expectedCombs: ["p", "q", "r", "s"],
  },
  {
    name: "Max length 4 digits containing 4-char mappings '79'",
    digits: "79",
    expectedCount: 16,
    expectedCombs: null,
  },
];

console.table(
  testCases.map(({ name, digits, expectedCount, expectedCombs }) => {
    const result = letterCombinations(digits);
    const normalizedActual = normalizeCombinations(result);
    let passed = result.length === expectedCount;

    if (passed && expectedCombs) {
      const normalizedExpected = normalizeCombinations(expectedCombs);
      passed =
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Verify combination lengths match input digits length
    const correctLengths =
      digits.length === 0
        ? result.length === 0
        : result.every((s) => s.length === digits.length);

    // Verify uniqueness
    const signatures = new Set(normalizedActual);
    const hasNoDuplicates = signatures.size === expectedCount;

    return {
      Scenario: name,
      Digits: `"${digits}"`,
      GeneratedCount: result.length,
      ExpectedCount: expectedCount,
      ValidLengths: correctLengths,
      UniqueCheck: hasNoDuplicates,
      Passed: passed && hasNoDuplicates && correctLengths ? "PASS" : "FAIL",
    };
  })
);
