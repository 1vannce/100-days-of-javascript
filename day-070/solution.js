/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
function wordBreak(s, wordDict) {
  const dictSet = new Set(wordDict);
  const maxWordLen = Math.max(...wordDict.map((w) => w.length));
  const memo = new Map(); // startIdx -> valid suffix sentences

  function dfs(startIdx) {
    if (memo.has(startIdx)) return memo.get(startIdx);
    if (startIdx === s.length) return [""];

    const sentences = [];
    const limit = Math.min(s.length, startIdx + maxWordLen);

    for (let endIdx = startIdx + 1; endIdx <= limit; endIdx++) {
      const prefix = s.slice(startIdx, endIdx);
      if (!dictSet.has(prefix)) continue;

      for (const suffix of dfs(endIdx)) {
        sentences.push(suffix === "" ? prefix : `${prefix} ${suffix}`);
      }
    }

    memo.set(startIdx, sentences);
    return sentences;
  }

  return dfs(0);
}

// Helper to sort sentences for deterministic comparison
function normalizeSentences(sentences) {
  return [...sentences].sort();
}

const testCases = [
  {
    name: "Standard overlapping split 'catsanddog'",
    s: "catsanddog",
    wordDict: ["cat", "cats", "and", "sand", "dog"],
    expectedCount: 2,
    expectedSentences: ["cat sand dog", "cats and dog"],
  },
  {
    name: "Multiple reusable word combinations 'pineapplepenapple'",
    s: "pineapplepenapple",
    wordDict: ["apple", "pen", "applepen", "pine", "pineapple"],
    expectedCount: 3,
    expectedSentences: [
      "pine apple pen apple",
      "pine applepen apple",
      "pineapple pen apple",
    ],
  },
  {
    name: "Dead-end suffix failure 'catsandog'",
    s: "catsandog",
    wordDict: ["cats", "dog", "sand", "and", "cat"],
    expectedCount: 0,
    expectedSentences: [],
  },
  {
    name: "Single word exact dictionary match",
    s: "leetcode",
    wordDict: ["leet", "code", "leetcode"],
    expectedCount: 2,
    expectedSentences: ["leet code", "leetcode"],
  },
  {
    name: "Heavy overlapping prefix pruning test 'aaaaab'",
    s: "aaaaab",
    wordDict: ["a", "aa", "aaa", "aaaa"],
    expectedCount: 0,
    expectedSentences: [],
  },
];

console.table(
  testCases.map(({ name, s, wordDict, expectedCount, expectedSentences }) => {
    const result = wordBreak(s, wordDict);
    const normalizedActual = normalizeSentences(result);
    let passed = result.length === expectedCount;

    if (passed && expectedSentences) {
      const normalizedExpected = normalizeSentences(expectedSentences);
      passed =
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Verify all sentences reconstruct original string when spaces are removed
    const allReconstructed = result.every(
      (sentence) => sentence.split(" ").join("") === s
    );

    // Verify every word in every sentence exists in wordDict
    const dictSet = new Set(wordDict);
    const allWordsValid = result.every((sentence) =>
      sentence.split(" ").every((word) => dictSet.has(word))
    );

    const signatures = new Set(normalizedActual);
    const hasNoDuplicates = signatures.size === expectedCount;

    return {
      Scenario: name,
      StringLen: s.length,
      GeneratedCount: result.length,
      ExpectedCount: expectedCount,
      Reconstructed: allReconstructed,
      ValidWords: allWordsValid,
      Passed:
        passed && hasNoDuplicates && allReconstructed && allWordsValid
          ? "PASS"
          : "FAIL",
    };
  })
);
