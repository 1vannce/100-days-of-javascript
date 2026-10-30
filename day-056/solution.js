/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  let queue = [[beginWord, 1]];
  let visited = new Set([beginWord]);

  while (queue.length > 0) {
    const [word, count] = queue.shift();

    if (word === endWord) return count;

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        // ASCII 'a'-'z'
        const newWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, count + 1]);
        }
      }
    }
  }

  return 0;
}

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
