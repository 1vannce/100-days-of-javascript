### Day 83: Longest Palindromic Subsequence

Given a string `s`, find the **longest palindromic subsequence's length** in `s`.

> A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Crucial Requirement:** A naive recursive exploration (`lps(i + 1, j)` vs `lps(i, j - 1)`) takes $O(2^N)$ exponential time. Solve this using **bottom-up Interval Dynamic Programming** in **$O(N^2)$ time** and **$O(N)$ auxiliary space** using a 1D rolling row and a diagonal tracker variable. *(Bonus: this also reduces to finding the Longest Common Subsequence between `s` and its reverse.)*

**Examples**

```javascript
// Example 1:
longestPalindromeSubseq("bbbab");
// Output: 4
// Explanation: One possible longest palindromic subsequence is "bbbb".

// Example 2:
longestPalindromeSubseq("cbbd");
// Output: 2
// Explanation: One possible longest palindromic subsequence is "bb".

// Example 3:
longestPalindromeSubseq("racecar");
// Output: 7
// Explanation: The entire string is already a palindrome.
```

**Constraints**

- $1 \le \text{s.length} \le 1000$
- `s` consists only of lowercase English letters.
- **Time Complexity:** $O(N^2)$ where $N = \text{s.length}$.
- **Auxiliary Space Complexity:** $O(N)$ using a 1D rolling DP array instead of a full $N \times N$ matrix.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function longestPalindromeSubseq(s) {
  // Write your code here
}
```

---

**Approach**

1. **State:** `dp[i][j]` is the longest palindromic subsequence length within `s[i ... j]`.
2. **Base case:** `dp[i][i] = 1`, and an empty interval is `0`.
3. **Match** (`s[i] === s[j]`): `dp[i][j] = 2 + dp[i + 1][j - 1]`.
4. **Mismatch:** `dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])`, dropping one endpoint.
5. **Order:** Iterate `i` backward from `n - 2` and `j` forward from `i + 1`, so both smaller intervals are already filled.
6. **Rolling row:** Start with every `dp[j] = 1`. For each `i`, set `prevDiag = 0`, and before overwriting `dp[j]` save it in `temp`; it becomes the diagonal for column `j + 1`. The answer is `dp[n - 1]`.
