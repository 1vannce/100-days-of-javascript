### Day 3: Valid Palindrome

Write a function `isPalindrome(str)` that determines if a given string is a palindrome. A string is a palindrome if it reads the same forward and backward after converting all uppercase letters to lowercase and removing all non-alphanumeric characters (letters and digits).

**Examples**

```javascript
isPalindrome("A man, a plan, a canal: Panama");
// Output: true  (Explanation: "amanaplanacanalpanama" is the same backwards)

isPalindrome("race a car");
// Output: false (Explanation: "raceacar" is not equal to "racaecar")

isPalindrome(" ");
// Output: true  (Explanation: An empty string after filtering is considered a palindrome)

isPalindrome("0P");
// Output: false
```

**Constraints**

- The input `str` is guaranteed to be a string.
- Only alphanumeric characters (`a-z`, `A-Z`, `0-9`) are considered.
- Case-insensitive comparison.

**Starter Code**

```javascript
/**
 * @param {string} str
 * @return {boolean}
 */
function isPalindrome(str) {
  // Write your code here
}
```

---

**Hints**

- **Sanitizing the input:** Use `str.toLowerCase()` followed by `.replace(/[^a-z0-9]/g, "")` to strip punctuation and whitespace.
- **Approach 1 (Reverse string):** Can you compare the sanitized string to its reversed version (`.split("").reverse().join("")`)?
- **Approach 2 (Two pointers - optimal space):** Can you check characters from the outside inward (`left` index starting at `0`, `right` index starting at `str.length - 1`) until they meet in the middle?
