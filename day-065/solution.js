/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  if (word.length > m * n) return false;

  // frequency pruning: bail out if the board can't supply every letter
  const freq = new Map();
  for (const row of board) {
    for (const ch of row) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }
  const need = new Map();
  for (const ch of word) {
    need.set(ch, (need.get(ch) ?? 0) + 1);
    if (need.get(ch) > (freq.get(ch) ?? 0)) return false;
  }

  // start from the rarer end of the word to cut initial branching
  if ((freq.get(word[0]) ?? 0) > (freq.get(word[word.length - 1]) ?? 0)) {
    word = [...word].reverse().join("");
  }

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[index]) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = "#"; // choose (mark visited in place)

    let found = false;
    for (const [dr, dc] of dirs) {
      if (dfs(r + dr, c + dc, index + 1)) {
        found = true;
        break;
      }
    }

    board[r][c] = temp; // unchoose
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) return true;
    }
  }
  return false;
}

const testCases = [
  {
    name: "Valid multi-step snake path 'ABCCED'",
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    word: "ABCCED",
    expected: true,
  },
  {
    name: "Valid short path 'SEE'",
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    word: "SEE",
    expected: true,
  },
  {
    name: "Invalid path attempting cell reuse 'ABCB'",
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    word: "ABCB",
    expected: false,
  },
  {
    name: "Single cell match",
    board: [['A']],
    word: "A",
    expected: true,
  },
  {
    name: "Word longer than total grid area",
    board: [
      ['A', 'B'],
      ['C', 'D'],
    ],
    word: "ABCDE",
    expected: false,
  },
  {
    name: "Frequency pruning case (target has more chars than board)",
    board: [
      ['A', 'A'],
      ['A', 'A'],
    ],
    word: "AAAAA",
    expected: false,
  },
];

console.table(
  testCases.map(({ name, board, word, expected }) => {
    // Deep clone board so tests run independently
    const boardClone = board.map((row) => [...row]);
    const result = exist(boardClone, word);
    const restored = JSON.stringify(boardClone) === JSON.stringify(board);
    const passed = result === expected && restored;

    return {
      Scenario: name,
      Dimensions: `${board.length}x${board[0].length}`,
      WordLength: word.length,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  })
);
