### Day 64: Palindrome Partitioning

Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of `s`.

> A palindrome is a string that reads the same backward as forward (e.g., `"a"`, `"aba"`, `"racecar"`).

**Crucial Requirement:** A string of length $n$ has $2^{n-1}$ possible partitioning cuts. Write a backtracking algorithm that slices prefixes, verifies palindrome validity, and recurses on the remaining suffix in $O(n \cdot 2^n)$ time and $O(n)$ auxiliary space. Optimize string checks either via two-pointer validation or 2D dynamic programming memoization.

**Examples**

```javascript
// Example 1:
partition("aab");
// Output: [["a", "a", "b"], ["aa", "b"]]
// Explanation:
// "a" | "a" | "b" -> all parts are palindromes.
// "aa" | "b"      -> "aa" and "b" are both palindromes.

// Example 2:
partition("a");
// Output: [["a"]]

// Example 3:
partition("ab");
// Output: [["a", "b"]]
```

**Constraints**

- `s` consists of lowercase English letters only.
- **Time Complexity:** $O(n \cdot 2^n)$ where $n$ = `s.length`.
- **Auxiliary Space Complexity:** $O(n)$ for the recursion stack and current path buffer.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @return {string[][]}
 */
function partition(s) {
  // Write your code here
}
```

---

**Approach**

Backtrack with a `startIdx`: try every `endIdx` from `startIdx` to the end, and only when `s[startIdx..endIdx]` is a palindrome, push that prefix, recurse on `endIdx + 1`, then pop. When `startIdx === s.length` the whole string is partitioned, so a copy of the path is recorded. A precomputed 2D DP table (`isPal[i][j] = s[i] === s[j] && (j - i < 2 || isPal[i+1][j-1])`) makes each palindrome check O(1). The DP table is O(n²) memory; the recursion stack and path stay O(n).
