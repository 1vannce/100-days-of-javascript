### Day 7: Valid Parentheses

Write a function `isValid(s)` that determines if an input string of brackets is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

The bracket types are: `()`, `{}`, and `[]`.

**Examples**

```javascript
isValid("()");
// Output: true

isValid("()[]{}");
// Output: true

isValid("(]");
// Output: false

isValid("([)]");
// Output: false (order is incorrect; ']' appears before ')' closes)

isValid("{[]}");
// Output: true
```

**Constraints**

- $1 \le \text{s.length} \le 10^4$
- `s` consists of parentheses only: `'('`, `')'`, `'{'`, `'}'`, `'['`, `']'`.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { s: "()", expected: true },
  { s: "()[]{}", expected: true },
  { s: "(]", expected: false },
  { s: "([)]", expected: false },
  { s: "{[]}", expected: true },
  { s: "[", expected: false },
  { s: "]", expected: false },
];

console.table(
  testCases.map(({ s, expected }) => {
    const result = isValid(s);
    return {
      Input: `"${s}"`,
      Expected: expected,
      Actual: result,
      Passed: result === expected ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Early Parity Check:** If the string length is odd (`s.length % 2 !== 0`), can it ever be valid?
- **Stack Operations:** A JavaScript array acts as a stack using `push()` to add to the top and `pop()` to remove from the top.
- **Matching Strategy:**
- When you encounter an opening bracket (`(`, `{`, `[`), push its corresponding closing bracket (or the opening bracket itself) onto your stack.
- When you encounter a closing bracket, `pop()` the top item off your stack. If the popped item doesn't match the current character, return `false`.

- **Final Check:** Don't forget to verify if the stack is completely empty after iterating through the entire string (`stack.length === 0`).
