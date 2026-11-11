### Day 68: Letter Combinations of a Phone Number

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that `1` does not map to any letters.

```plaintext
2 -> "abc"    3 -> "def"    4 -> "ghi"
5 -> "jkl"    6 -> "mno"    7 -> "pqrs"
8 -> "tuv"    9 -> "wxyz"
```

**Crucial Requirement:** A string of $N$ digits can produce up to $4^N$ combinations (since digits `7` and `9` have 4 mapping options). Write a clean backtracking algorithm that builds combinations index-by-index in $O(4^N \cdot N)$ time and $O(N)$ auxiliary space, handling the edge case of an empty input string gracefully by returning an empty array `[]`.

**Examples**

```javascript
// Example 1:
letterCombinations("23");
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// Example 2:
letterCombinations("");
// Output: []

// Example 3:
letterCombinations("2");
// Output: ["a","b","c"]
```

**Constraints**

- $0 \le \text{digits.length} \le 4$
- `digits[i]` is a digit in the range `['2', '9']`.
- **Time Complexity:** $O(4^N \cdot N)$ where $N = \text{digits.length}$.
- **Auxiliary Space Complexity:** $O(N)$ for the recursion stack call depth and string buffer.

**Starter Code**

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
  // Write your code here
}
```

---

**Approach**

Return `[]` immediately for empty input. Otherwise `backtrack(index)` handles one digit per level: look up that digit's letters in `KEYPAD`, and for each letter push it onto a shared `path` array (choose), recurse on `index + 1` (explore), then pop it (unchoose). When `index === digits.length`, the path holds one full combination, so `path.join("")` is added to `results`. The recursion depth and `path` buffer are both at most `N`, and each of the up to $4^N$ results costs $O(N)$ to build.
