/**
 * @param {string} str
 * @return {string|null}
 */
function firstNonRepeating(str) {
  const charCount = new Map();

  // First pass: Count occurences
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Second pass: Find first character with count 1
  for (const [char, count] of charCount) {
    if (count === 1) return char;
  }

  return null;
}

const testCases = [
  // Test 0
  { input: "leetcode", expected: "l" },
  // Test 1
  { input: "loveleetcode", expected: "v" },
  // Test 2
  { input: "aabbcc", expected: null },
  // Test 3
  { input: "racecars", expected: "e" },
  // Test 4
  { input: "", expected: null },
];

console.table(
  testCases.map(({ input, expected }) => {
    const result = firstNonRepeating(input);
    return {
      Input: input,
      Expected: expected,
      Actual: result,
      Passed: result === expected ? "PASS" : "FAIL",
    };
  }),
);
