/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solveSudoku(board) {
  // Bit d (1-9) set means digit d is already used in that row/column/box
  const rows = new Array(9).fill(0);
  const cols = new Array(9).fill(0);
  const boxes = new Array(9).fill(0);

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === ".") continue;
      const bit = 1 << Number(board[r][c]);
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)] |= bit;
    }
  }

  function solve(r, c) {
    if (r === 9) return true;
    if (c === 9) return solve(r + 1, 0);
    if (board[r][c] !== ".") return solve(r, c + 1);

    const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);

    for (let val = 1; val <= 9; val++) {
      const bit = 1 << val;
      if ((rows[r] | cols[c] | boxes[b]) & bit) continue;

      // choose
      board[r][c] = String(val);
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[b] |= bit;

      if (solve(r, c + 1)) return true; // explore

      // unchoose
      board[r][c] = ".";
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[b] &= ~bit;
    }

    return false;
  }

  solve(0, 0);
}

// Helper to validate solved board follows Sudoku rules
function isValidSudokuSolution(board) {
  for (let r = 0; r < 9; r++) {
    const rowSet = new Set();
    const colSet = new Set();
    const boxSet = new Set();

    for (let c = 0; c < 9; c++) {
      // Check Row
      if (board[r][c] === "." || rowSet.has(board[r][c])) return false;
      rowSet.add(board[r][c]);

      // Check Column
      if (board[c][r] === "." || colSet.has(board[c][r])) return false;
      colSet.add(board[c][r]);

      // Check 3x3 Box
      const boxR = 3 * Math.floor(r / 3) + Math.floor(c / 3);
      const boxC = 3 * (r % 3) + (c % 3);
      const val = board[boxR][boxC];
      if (val === "." || boxSet.has(val)) return false;
      boxSet.add(val);
    }
  }
  return true;
}

const testCases = [
  {
    name: "Classic Standard Sudoku Puzzle",
    board: [
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ],
  },
  {
    name: "Sparse Sudoku Puzzle",
    board: [
      [".", ".", "9", "7", "4", "8", ".", ".", "."],
      ["7", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", "2", ".", "1", ".", "9", ".", ".", "."],
      [".", ".", "7", ".", ".", ".", "2", "4", "."],
      [".", "6", ".", ".", "1", ".", ".", "3", "."],
      [".", "9", "3", ".", ".", ".", "5", ".", "."],
      [".", ".", ".", "4", ".", "1", ".", "2", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "3"],
      [".", ".", ".", "6", "8", "2", "4", ".", "."],
    ],
  },
];

console.table(
  testCases.map(({ name, board }) => {
    // Clone board to preserve test data
    const boardClone = board.map((row) => [...row]);
    solveSudoku(boardClone);

    const valid = isValidSudokuSolution(boardClone);
    const noEmptyCells = boardClone.every((row) =>
      row.every((cell) => cell !== ".")
    );

    return {
      Scenario: name,
      NoEmptyCells: noEmptyCells,
      ValidSudoku: valid,
      Passed: valid && noEmptyCells ? "PASS" : "FAIL",
    };
  })
);
