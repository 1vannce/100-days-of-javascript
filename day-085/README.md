### Day 85: Wildcard Matching

Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for `'?'` and `'*'` where:

- `'?'` matches any single character.
- `'*'` matches any sequence of characters (including the empty sequence).

The matching should cover the **entire** input string (not partial).

**Crucial Requirement:** A naive recursive backtracking implementation branches exponentially when multiple `'*'` wildcards appear (e.g., `s = "aaa...b"`, `p = "*a*a*a*c"`). Solve this using **bottom-up 2D Dynamic Programming** in **$O(M \times N)$ time** (where $M = \text{s.length}$ and $N = \text{p.length}$), and optimize memory to **$O(N)$ auxiliary space** using a rolling 1D boolean array with a diagonal tracker variable. (Bonus: try the $O(1)$ space two-pointer greedy approach.)

**Examples**

```javascript
isMatch("aa", "a");      // false: "a" does not match the entire string "aa"
isMatch("aa", "*");      // true:  '*' matches any sequence
isMatch("cb", "?a");     // false: '?' matches 'c', but 'a' does not match 'b'
isMatch("adceb", "*a*b"); // true:  first '*' is empty, second '*' matches "dce"
```

**Constraints**

- $0 \le \text{s.length}, \text{p.length} \le 2000$
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'?'` or `'*'`.
- **Time Complexity:** $O(M \times N)$.
- **Auxiliary Space Complexity:** $O(N)$ using a rolling 1D boolean DP row.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  // Write your code here
}
```

---

**Approach**

1. **State:** `dp[i][j]` is `true` if `s[0 ... i - 1]` matches `p[0 ... j - 1]`.
2. **Base cases:** `dp[0][0] = true`; `dp[0][j] = dp[0][j - 1]` when `p[j - 1]` is `'*'`, else `false`; `dp[i][0] = false` for `i >= 1`.
3. **Transitions:**
   - `'?'` or equal characters: `dp[i][j] = dp[i - 1][j - 1]`.
   - `'*'`: `dp[i][j] = dp[i][j - 1] || dp[i - 1][j]` (match zero characters, or consume one and keep the `'*'`).
   - Otherwise `false`.
4. **Rolling row:** Keep one array. Before overwriting `dp[j]`, save it in `temp`; `prevDiag` carries the previous row's `dp[j - 1]`.
