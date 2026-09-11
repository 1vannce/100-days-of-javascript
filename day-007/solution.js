/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const bracketMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let char of s) {
    // If it's an opening bracket, push to stack
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    }
    // If it's a closing bracket, check for match
    else {
      const top = stack.pop();
      if (top != bracketMap[char]) {
        return false;
      }
    }
  }

  // Valid if stack is empty (all brackets matched)
  return stack.length === 0;
}

const testCases = [
  // Test 0
  { s: "()", expected: true },
  // Test 1
  { s: "()[]{}", expected: true },
  // Test 2
  { s: "(]", expected: false },
  // Test 3
  { s: "([)]", expected: false },
  // Test 4
  { s: "{[]}", expected: true },
  // Test 5
  { s: "[", expected: false },
  // Test 6
  { s: "]", expected: false },
];

console.table(
  testCases.map(({ s, expected }) => {
    const result = isValid(s);
    return {
      Input: s,
      Expected: expected,
      Actual: result,
      Passed: result === expected ? "PASS" : "FAIL",
    };
  }),
);
