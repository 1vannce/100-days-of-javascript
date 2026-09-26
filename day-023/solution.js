/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
  let stack = [];
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b), // Truncate toward zero
  };

  for (const token of tokens) {
    if (operators[token]) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0];
}

// Test cases
const testCases = [
  { tokens: ["2", "1", "+", "3", "*"], expected: 9 },
  { tokens: ["4", "13", "5", "/", "+"], expected: 6 },
  {
    tokens: [
      "10",
      "6",
      "9",
      "3",
      "+",
      "-11",
      "*",
      "/",
      "*",
      "17",
      "+",
      "5",
      "+",
    ],
    expected: 22,
  },
  { tokens: ["3", "-4", "+"], expected: -1 },
  { tokens: ["4", "-2", "/", "2", "-3", "-", "-"], expected: -7 },
];

console.table(
  testCases.map(({ tokens, expected }) => {
    const result = evalRPN(tokens);
    const passed = result === expected;
    return {
      Expression: tokens.join(" "),
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
