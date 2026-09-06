### Day 2: Reverse Words in a Sentence

Write a function `reverseWords(str)` that reverses the order of words in a given sentence, while keeping the individual letters in each word in their original order. Multiple spaces between words should be compressed into a single space, and leading or trailing whitespace should be removed.

**Examples**

```javascript
reverseWords("the sky is blue");
// Output: "blue is sky the"

reverseWords("  hello world  ");
// Output: "world hello"

reverseWords("a good   example");
// Output: "example good a"
```

**Constraints**

- The input `str` is always a string containing English letters, digits, and spaces.
- Words are separated by at least one space.
- The returned string must not contain leading or trailing spaces.
- You should reduce multiple spaces between two words to a single space in the reversed string.

**Starter Code**

```javascript
/**
 * @param {string} str
 * @return {string}
 */
function reverseWords(str) {
  // Write your code here
}
```

---

**Hints**

- **Break it down:** Look into `str.trim()` to handle surrounding whitespace, and `str.split(" ")` to break the sentence into an array of words.
- **Filter empty slots:** Splitting by a single space when multiple spaces exist produces empty strings (`""`) in your array. You can clean these up using `Array.prototype.filter()`.
- **Put it back together:** Once you have a clean array of words, `Array.prototype.reverse()` flips an array in place, and `Array.prototype.join(" ")` glues it back into a string.
