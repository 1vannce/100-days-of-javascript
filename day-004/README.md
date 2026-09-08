### Day 4: Find the First Non-Repeating Character

Write a function `firstNonRepeating(str)` that finds the first character in a string that does not repeat anywhere else. Return the character itself. If every character repeats or the string is empty, return `null`.

**Examples**

```javascript
firstNonRepeating("leetcode");
// Output: "l"  ('l' appears only once, and comes first)

firstNonRepeating("loveleetcode");
// Output: "v"  ('l', 'o', and 'e' repeat; 'v' is the first unique character)

firstNonRepeating("aabbcc");
// Output: null (every character repeats)

firstNonRepeating("");
// Output: null
```

**Constraints**

- The string `str` consists of lowercase English letters only.
- Empty strings should return `null`.
- Case-sensitive (assume input is already clean lowercase).

**Starter Code**

```javascript
/**
 * @param {string} str
 * @return {string|null}
 */
function firstNonRepeating(str) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  { input: "leetcode", expected: "l" },
  { input: "loveleetcode", expected: "v" },
  { input: "aabbcc", expected: null },
  { input: "racecars", expected: "e" },
  { input: "", expected: null },
];

console.table(
  testCases.map(({ input, expected }) => {
    const result = firstNonRepeating(input);
    return {
      Input: `"${input}"`,
      Expected: expected,
      Actual: result,
      Passed: result === expected ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Two-Pass Approach:**

1. Make a first pass through the string to count the occurrences of each character using a plain object `{}` or a `Map`.
2. Make a second pass through the string in order. Check your map: the first character with a count of `1` is your answer.

- **Built-in Shortcut (`indexOf` vs `lastIndexOf`):** A character is unique if its first occurrence index (`str.indexOf(char)`) is identical to its last occurrence index (`str.lastIndexOf(char)`). _(Note: while clean to write, this approach runs in $O(n^2)$ time versus the $O(n)$ map approach)._
