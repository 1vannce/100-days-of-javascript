### Day 84: Distinct Subsequences

Given two strings `s` and `t`, return the **number of distinct subsequences of `s` which equals `t`**.

> A **subsequence** of a string is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ACE"` is a subsequence of `"ABCDE"` while `"AEC"` is not).

The test cases are generated so that the answer fits on a 32-bit signed integer.

**Crucial Requirement:** A naive recursive search branching on every matching character runs in $O(2^M)$ exponential time. Solve this using **bottom-up 2D Dynamic Programming** in **$O(M \times N)$ time** (where $M = \text{s.length}$ and $N = \text{t.length}$), and optimize memory to **$O(N)$ auxiliary space** using a 1D DP array updated **right-to-left** (`j` from `N` down to `1`).

**Examples**

```javascript
// Example 1:
numDistinct("rabbbit", "rabbit");
// Output: 3
// Explanation:
// As shown below, there are 3 ways you can generate "rabbit" from "rabbbit":
// rabb[b]it -> "rabbit"
// rab[b]bit -> "rabbit"
// ra[b]bbit -> "rabbit"

// Example 2:
numDistinct("babgbag", "bag");
// Output: 5
// Explanation:
// [ba]b[g]bag
// [ba]bgba[g]
// [b]abgb[ag]
// ba[b]gb[ag]
// babg[bag]

// Example 3:
numDistinct("abc", "abcd");
// Output: 0
// Explanation: Source string is shorter than target string.
```

**Constraints**

- $1 \le \text{s.length}, \text{t.length} \le 1000$
- `s` and `t` consist of English letters.
- **Time Complexity:** $O(M \times N)$ where $M = \text{s.length}$ and $N = \text{t.length}$.
- **Auxiliary Space Complexity:** $O(N)$ using a 1D reverse-updated DP array instead of a full $M \times N$ table.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
function numDistinct(s, t) {
  // Write your code here
}
```

---

**Approach**

1. **Pruning:** If `s.length < t.length`, return `0`.
2. **State:** `dp[i][j]` is the number of subsequences of `s[0 ... i - 1]` that equal `t[0 ... j - 1]`.
3. **Base cases:** `dp[i][0] = 1` (delete everything to form `""`), and `dp[0][j] = 0` for `j >= 1`.
4. **Skip** `s[i - 1]`: always allowed, giving `dp[i - 1][j]` ways.
5. **Match** `s[i - 1]` with `t[j - 1]`: only when they are equal, adding `dp[i - 1][j - 1]` ways.
6. **Rolling row:** Keep one array with `dp[0] = 1`. For each character of `s`, iterate `j` backward from `min(i, N)` to `1`, so `dp[j - 1]` still holds the previous row's value when it is read. The answer is `dp[N]`.

**Note on large numbers:** Some prefix counts can grow past `Number.MAX_SAFE_INTEGER` even when the answer fits in 32 bits. This does not affect the result. A count that feeds into the answer can't be larger than the answer, because each of its ways extends to a different full match. So only counts that never reach `dp[N]` can lose precision.
