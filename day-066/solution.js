/**
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens(n) {
  const result = [];
  const queens = []; // queens[r] = column of the queen in row r
  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col

  function backtrack(r) {
    if (r === n) {
      result.push(
        queens.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1))
      );
      return;
    }

    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;

      // choose
      cols.add(c);
      diag1.add(r - c);
      diag2.add(r + c);
      queens.push(c);

      backtrack(r + 1); // explore

      // unchoose
      queens.pop();
      cols.delete(c);
      diag1.delete(r - c);
      diag2.delete(r + c);
    }
  }

  backtrack(0);
  return result;
}

// Helper to validate N-Queens constraints on a generated solution
function isValidNQueensSolution(board, n) {
  if (board.length !== n) return false;
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  for (let r = 0; r < n; r++) {
    const rowStr = board[r];
    if (rowStr.length !== n) return false;
    const c = rowStr.indexOf("Q");
    if (c === -1 || rowStr.lastIndexOf("Q") !== c) return false; // exactly one Q per row

    if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) return false;
    cols.add(c);
    diag1.add(r - c);
    diag2.add(r + c);
  }
  return true;
}

const testCases = [
  {
    name: "4-Queens board",
    n: 4,
    expectedCount: 2,
  },
  {
    name: "1-Queen board",
    n: 1,
    expectedCount: 1,
  },
  {
    name: "8-Queens standard chessboard",
    n: 8,
    expectedCount: 92,
  },
];

console.table(
  testCases.map(({ name, n, expectedCount }) => {
    const result = solveNQueens(n);
    const passedCount = result.length === expectedCount;
    const allValid = result.every((board) => isValidNQueensSolution(board, n));

    // Verify uniqueness of boards
    const signatures = new Set(result.map((b) => JSON.stringify(b)));
    const hasNoDuplicates = signatures.size === result.length;

    return {
      Scenario: name,
      N: n,
      GeneratedCount: result.length,
      ExpectedCount: expectedCount,
      AllValid: allValid,
      UniqueCheck: hasNoDuplicates,
      Passed: passedCount && allValid && hasNoDuplicates ? "PASS" : "FAIL",
    };
  })
);
