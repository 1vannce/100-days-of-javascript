### Day 81: Longest Common Subsequence

Given two strings `text1` and `text2`, return the **length of their longest common subsequence**. If there is no common subsequence, return `0`.

> A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
>
> - For example, `"ace"` is a subsequence of `"abcde"`.
> - A **common subsequence** of two strings is a subsequence that is common to both strings.

**Crucial Requirement:** A naive recursive comparison (`lcs(i + 1, j)` vs `lcs(i, j + 1)`) explores $O(2^{M+N})$ overlapping branches. Solve this using **bottom-up 2D Dynamic Programming** in **$O(M \times N)$ time** (where $M = \text{text1.length}$ and $N = \text{text2.length}$), and optimize the memory footprint from an $O(M \times N)$ 2D table down to **$O(\min(M, N))$ auxiliary space** using a rolling 1D array with a diagonal tracker variable.

**Examples**

```javascript
// Example 1:
longestCommonSubsequence("abcde", "ace");
// Output: 3
// Explanation: The longest common subsequence is "ace" and its length is 3.

// Example 2:
longestCommonSubsequence("abc", "abc");
// Output: 3
// Explanation: The longest common subsequence is "abc" and its length is 3.

// Example 3:
longestCommonSubsequence("abc", "def");
// Output: 0
// Explanation: There is no such common subsequence, so the result is 0.
```

**Constraints**

- $1 \le \text{text1.length}, \text{text2.length} \le 1000$
- `text1` and `text2` consist of only lowercase English characters.
- **Time Complexity:** $O(M \times N)$ where $M = \text{text1.length}$ and $N = \text{text2.length}$.
- **Auxiliary Space Complexity:** $O(\min(M, N))$ using a rolling 1D row rather than a full $M \times N$ matrix.

**Starter Code**

```javascript
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
  // Write your code here
}
```

---

**Approach**

1. **State:** `dp[i][j]` is the LCS length of the prefixes `text1[0 ... i - 1]` and `text2[0 ... j - 1]`. Row `0` and column `0` are `0`.
2. **Match** (`text1[i - 1] === text2[j - 1]`): `dp[i][j] = 1 + dp[i - 1][j - 1]`.
3. **Mismatch:** `dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])`.
4. **Rolling row:** Make `text2` the shorter string and keep `dp = new Array(text2.length + 1).fill(0)`. Before overwriting `dp[j]`, save it in `temp`; it becomes the diagonal (`prevDiag`) for column `j + 1`.
