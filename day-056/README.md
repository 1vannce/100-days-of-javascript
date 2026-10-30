### Day 56: Word Ladder

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s_1 -> s_2 -> ... -> s_k` such that:

- Every adjacent pair of words differs by exactly one letter.
- Every $s_i$ for $1 \le i \le k$ is in `wordList`. (Note that `beginWord` does not need to be in `wordList`).
- $s_k == \text{endWord}$.

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the **number of words** in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.

**Crucial Requirement:** Unweighted shortest path on an implicit graph means **Breadth-First Search (BFS)** is the optimal paradigm. Comparing every word pair takes $O(N^2 \cdot L)$ time, which will time out for large dictionaries. Instead, explore neighbors by mutating each of the $L$ character positions across 26 letters in **$O(N \cdot L^2)$ time** using a `Set` for $O(1)$ lookups, or apply **Bidirectional BFS** for maximum performance.

**Examples**

```javascript
// Example 1:
ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]);
// Output: 5
// Explanation: One shortest transformation sequence is:
// "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.

// Example 2:
ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]);
// Output: 0
// Explanation: The endWord "cog" is not in wordList, so there is no valid transformation sequence.

// Example 3:
ladderLength("a", "c", ["a", "b", "c"]);
// Output: 2
// Explanation: "a" -> "c" is 2 words long.
```

**Constraints**

- $1 \le \text{beginWord.length} \le 10$
- $\text{endWord.length} == \text{beginWord.length}$
- $1 \le \text{wordList.length} \le 5000$
- `wordList[i].length == beginWord.length`
- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.
- `beginWord != endWord`
- All the words in `wordList` are **unique**.
- Time Complexity: $O(N \cdot L^2)$ where $N = \text{wordList.length}$ and $L = \text{beginWord.length}$.
- Auxiliary Space Complexity: $O(N \cdot L)$ for the dictionary set and BFS queue.

**Starter Code**

```javascript
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const testCases = [
  {
    name: "Standard transformation path (length 5)",
    beginWord: "hit",
    endWord: "cog",
    wordList: ["hot", "dot", "dog", "lot", "log", "cog"],
    expected: 5,
  },
  {
    name: "Target endWord not in dictionary",
    beginWord: "hit",
    endWord: "cog",
    wordList: ["hot", "dot", "dog", "lot", "log"],
    expected: 0,
  },
  {
    name: "Single-character direct jump",
    beginWord: "a",
    endWord: "c",
    wordList: ["a", "b", "c"],
    expected: 2,
  },
  {
    name: "Dead end path with cycle avoidance",
    beginWord: "hot",
    endWord: "dog",
    wordList: ["hot", "dog", "dot"],
    expected: 3,
  },
  {
    name: "Longer branch divergence",
    beginWord: "lead",
    endWord: "gold",
    wordList: ["load", "goad", "gold", "head", "read"],
    expected: 4, // lead -> load -> goad -> gold
  },
];

console.table(
  testCases.map(({ name, beginWord, endWord, wordList, expected }) => {
    const result = ladderLength(beginWord, endWord, wordList);
    const passed = result === expected;

    return {
      Scenario: name,
      Begin: beginWord,
      End: endWord,
      DictSize: wordList.length,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Early Exit Check:** Convert `wordList` into a `Set` immediately: `const dict = new Set(wordList)`. If `!dict.has(endWord)`, return `0` right away.
- **Generating Adjacent Neighbors ($26 \times L$):**
- Do not compare the current word against every other word in the dictionary ($O(N)$ comparisons per word).
- Instead, iterate over each character index `i` of the current word ($0 \le i < L$), and replace it with `'a'` through `'z'`.
- If the newly formed word is present in `dict`, it is a valid 1-step neighbor.

- **Sinking/Deleting Visited Words:**
- To prevent cycles and avoid managing a separate `visited` set, immediately delete any word you enqueue from `dict`: `dict.delete(nextWord)`.

- **Standard BFS (Level-by-Level):**
- Initialize `queue = [beginWord]` and `level = 1`.
- While `queue.length > 0`:
- Process all nodes at the current level (`const size = queue.length`).
- If `currWord === endWord`, return `level`.
- For each generated 1-letter mutation that exists in `dict`, delete it from `dict` and push it to `queue`.
- Increment `level++` after exhausting the current layer.

- **Optimization (Bidirectional BFS):**
- Grow two search frontiers simultaneously: one from `beginWord` and one from `endWord`. Always expand the smaller set at each step to shrink the search space from $O(b^d)$ to $O(b^{d/2})$.
