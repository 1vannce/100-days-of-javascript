### Day 6: Valid Anagram

Write a function `isAnagram(s, t)` that takes two strings `s` and `t`, and returns `true` if `t` is an anagram of `s`, and `false` otherwise.

An **anagram** is a word formed by rearranging the letters of a different word, typically using all original letters exactly once.

**Examples**

```javascript
isAnagram("anagram", "nagaram");
// Output: true

isAnagram("rat", "car");
// Output: false

isAnagram("listen", "silent");
// Output: true

isAnagram("a", "ab");
// Output: false
```

**Constraints**

- $1 \le \text{s.length}, \text{t.length} \le 5 \times 10^4$
- `s` and `t` consist of lowercase English letters only.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases directly with clean, standard formatting:

```javascript
const testCases = [
  { s: "anagram", t: "nagaram", expected: true },
  { s: "rat", t: "car", expected: false },
  { s: "listen", t: "silent", expected: true },
  { s: "a", t: "ab", expected: false },
  { s: "aabbcc", t: "abcabc", expected: true },
];

console.table(
  testCases.map(({ s, t, expected }) => {
    const result = isAnagram(s, t);
    return {
      S: `"${s}"`,
      T: `"${t}"`,
      Expected: expected,
      Actual: result,
      Passed: result === expected ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Early Exit:** If `s.length !== t.length`, they cannot be anagrams. Check this first.
- **Sorting Approach:** Sorting both strings (`str.split("").sort().join("")`) and comparing them works, but takes $O(n \log n)$ time.
- **Frequency Counting ($O(n)$):** Use a `Map` or a plain object to count character frequencies:

1. Increment counts for letters in `s`.
2. Decrement counts for letters in `t`.
3. If any count drops below zero or does not end at zero, `t` is not an anagram.
