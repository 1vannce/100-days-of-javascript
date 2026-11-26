### Day 82: Edit Distance

Given two strings `word1` and `word2`, return the **minimum number of operations** required to convert `word1` to `word2`.

You have the following three operations permitted on a word:

1. **Insert** a character
2. **Delete** a character
3. **Replace** a character

**Crucial Requirement:** A naive top-down recursion branching on insert, delete, and replace operations takes exponential time, loosely bounded by $O(3^{M + N})$. Solve this using **bottom-up 2D Dynamic Programming** in **$O(M \times N)$ time** (where $M = \text{word1.length}$ and $N = \text{word2.length}$), and optimize the memory footprint from an $O(M \times N)$ matrix down to **$O(\min(M, N))$ auxiliary space** using a 1D rolling row and a diagonal tracker variable.

**Examples**

```javascript
// Example 1:
minDistance("horse", "ros");
// Output: 3
// Explanation:
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose  (remove 'r')
// rose  -> ros   (remove 'e')

// Example 2:
minDistance("intention", "execution");
// Output: 5
// Explanation:
// intention -> inention  (remove 't')
// inention  -> enention  (replace 'i' with 'e')
// enention  -> exention  (replace 'n' with 'x')
// exention  -> exection  (replace 'n' with 'c')
// exection  -> execution (insert 'u')

// Example 3:
minDistance("", "abc");
// Output: 3
// Explanation: 3 insertions required to convert an empty string to "abc".
```

**Constraints**

- $0 \le \text{word1.length}, \text{word2.length} \le 500$
- `word1` and `word2` consist of lowercase English letters.
- **Time Complexity:** $O(M \times N)$ where $M = \text{word1.length}$ and $N = \text{word2.length}$.
- **Auxiliary Space Complexity:** $O(\min(M, N))$ using a rolling 1D array instead of a full $M \times N$ table.

**Starter Code**

```javascript
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  // Write your code here
}
```

---

**Approach**

1. **State:** `dp[i][j]` is the minimum number of edits to turn `word1[0 ... i - 1]` into `word2[0 ... j - 1]`.
2. **Base cases:** `dp[i][0] = i` (delete everything) and `dp[0][j] = j` (insert everything).
3. **Match** (`word1[i - 1] === word2[j - 1]`): `dp[i][j] = dp[i - 1][j - 1]`.
4. **Mismatch:** `dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])` for replace, delete, and insert.
5. **Rolling row:** Make `word2` the shorter string and start with `dp = [0, 1, ..., word2.length]`. For each row `i`, save `prevDiag = dp[0]`, set `dp[0] = i`, and before overwriting `dp[j]` save it in `temp`; it becomes the diagonal for column `j + 1`.
