### Day 23: Evaluate Reverse Polish Notation

You are given an array of strings `tokens` that represents an arithmetic expression in **Reverse Polish Notation** (RPN / postfix notation).

Evaluate the expression and return an integer that represents the value of the expression.

**Note that:**

- The valid operators are `'+'`, `'-'`, `'*'`, and `'/'`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero** (e.g., $13 / 5 = 2$, $-7 / 3 = -2$).
- There will not be any division by zero.
- The input represents a valid arithmetic expression in reverse polish notation.

**Examples**

```javascript
evalRPN(["2", "1", "+", "3", "*"]);
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

evalRPN(["4", "13", "5", "/", "+"]);
// Output: 6
// Explanation: (4 + (13 / 5)) = 4 + 2 = 6

evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]);
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 22
```

**Constraints**

- $1 \le \text{tokens.length} \le 10^4$
- `tokens[i]` is either an operator (`'+'`, `'-'`, `'*'`, `'/'`), or an integer in the range $[-200, 200]$.
- Time Complexity: $O(n)$ where $n$ is the length of `tokens`.
- Auxiliary Space Complexity: $O(n)$ for the stack.

**Starter Code**

```javascript
/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
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
```

---

**Hints**

- **Stack Mechanics:** Maintain a stack array `const stack = []`.
- **Operands vs. Operators:** Iterate through `tokens`:
- If the token is a number, convert it to a numeric type (`Number(token)`) and push it onto the stack.
- If the token is an operator, pop the top two numbers from the stack.

- **Operand Order Matters:** The first popped value is the **right operand** ($b$), and the second popped value is the **left operand** ($a$). For example, with `"-"`, compute $a - b$, not $b - a$.
- **Truncation Toward Zero:** In JavaScript, `Math.floor()` rounds down toward negative infinity (`Math.floor(-1.5) === -2`). To truncate toward zero, use `Math.trunc(a / b)` or the bitwise trick `(a / b) | 0`.
- **Result:** After processing all tokens, the final answer will be the single remaining element in the stack (`stack[0]`).
