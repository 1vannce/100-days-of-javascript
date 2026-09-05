### Day 1: Count the Vowels

Write a function `countVowels(str)` that counts how many vowels (`a`, `e`, `i`, `o`, `u`) are in a given string. The check should be case-insensitive.

**Examples**

```javascript
countVowels("hello");
// Output: 2  ('e', 'o')

countVowels("JavaScript");
// Output: 3  ('a', 'a', 'i')

countVowels("sky");
// Output: 0

countVowels("AEIOU");
// Output: 5
```

**Constraints**

- The input `str` is always a string.
- Treat uppercase and lowercase vowels identically (`"A"` counts the same as `"a"`).
- Characters like spaces, numbers, and punctuation should be ignored.

**Starter Code**

```javascript
/**
 * @param {string} str
 * @return {number}
 */
function countVowels(str) {
  // Write your code here
}
```

---

**Hints**

- **Normalize first:** Converting the entire string to lowercase via `str.toLowerCase()` means you only ever have to check for lowercase vowels.
- **Keep track:** Initialize a counter variable (like `let count = 0;`) before looping, increment it when you find a match, and return it at the end.
- **Membership check:** You can check if a character is a vowel quickly with `"aeiou".includes(char)`.
