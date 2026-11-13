### Day 70: Word Break II

Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Crucial Requirement:** Naive backtracking without memoization re-computes valid suffix sentences repeatedly when multiple prefix splits converge on the same remaining substring (for example, `"aaaa...ab"` with `["a", "aa", "aaa"]`), resulting in $O(2^N)$ exponential redundant work. Optimize your solution using Top-Down Memoization (`memo` map caching `startIdx -> validSuffixSentences[]`) in $O(N \cdot 2^N)$ worst-case output time and $O(N \cdot 2^N)$ auxiliary space, eliminating overlapping subproblem recomputation.

**Examples**

```javascript
// Example 1:
wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]);
// Output: ["cats and dog", "cat sand dog"]

// Example 2:
wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]);
// Output: [
//   "pine apple pen apple",
//   "pineapple pen apple",
//   "pine applepen apple"
// ]
// Explanation: Note that you are allowed to reuse a dictionary word.

// Example 3:
wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);
// Output: []
```

**Constraints**

- $1 \le \text{s.length} \le 20$
- $1 \le \text{wordDict.length} \le 1000$
- $1 \le \text{wordDict}[i]\text{.length} \le 10$
- `s` and `wordDict[i]` consist of only lowercase English letters.
- All the strings of `wordDict` are unique.
- Input is generated in a way that the length of the answer doesn't exceed $10^5$.
- **Time Complexity:** $O(N^2 + 2^N)$ where $N = \text{s.length}$ (memoization prevents redundant suffix recomputations).
- **Auxiliary Space Complexity:** $O(N \cdot 2^N)$ for storing memoized suffix results and recursion call stack.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
function wordBreak(s, wordDict) {
  // Write your code here
}
```

---

**Approach**

Put `wordDict` in a `Set` for O(1) lookups and track `maxWordLen` so prefix slices never exceed the longest word. `dfs(startIdx)` returns every valid sentence for the suffix starting at `startIdx`: it returns the cached result if present, returns `[""]` at `s.length` (a complete match), and otherwise tries each prefix up to `maxWordLen` long. For every prefix in the dictionary, it joins the prefix with each sentence from `dfs(endIdx)`. The result is stored in `memo` before returning, so dead-end suffixes like `"aaaaab"` are explored once and then answered from the cache instead of recomputed.
