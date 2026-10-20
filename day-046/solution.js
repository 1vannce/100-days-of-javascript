/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
function leastInterval(tasks, n) {
  const frequencies = new Array(26).fill(0);
  for (const task of tasks) {
    frequencies[task.charCodeAt(0) - 65]++;
  }

  let maxFreq = 0;
  let maxFreqCount = 0;
  for (const frequency of frequencies) {
    if (frequency > maxFreq) {
      maxFreq = frequency;
      maxFreqCount = 1;
    } else if (frequency === maxFreq) {
      maxFreqCount++;
    }
  }

  // Full cooldown frames followed by the last copy of each most frequent task.
  const frameLength = (maxFreq - 1) * (n + 1) + maxFreqCount;
  // Enough other tasks can fill every idle slot and extend the frames.
  return Math.max(tasks.length, frameLength);
}

function runTests() {
  const testCases = [
    { tasks: ["A", "A", "A", "B", "B", "B"], n: 2, expected: 8 },
    { tasks: ["A", "C", "A", "B", "D", "B"], n: 1, expected: 6 },
    { tasks: ["A", "A", "A", "B", "B", "B"], n: 0, expected: 6 },
    {
      tasks: ["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"],
      n: 2,
      expected: 16,
    },
    { tasks: ["A", "B", "C", "D", "E"], n: 2, expected: 5 },
    { tasks: ["A", "A", "B", "B", "C", "C", "D", "D"], n: 2, expected: 8 },
    { tasks: ["Z"], n: 100, expected: 1 },
    { tasks: ["Z", "Z", "Z"], n: 2, expected: 7 },
    { tasks: ["A", "A", "B", "B", "C", "C"], n: 3, expected: 7 },
    { tasks: Array(10000).fill("A"), n: 100, expected: 1009900 },
    { tasks: Array(10000).fill("A"), n: 0, expected: 10000 },
    {
      tasks: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(2)],
      n: 100,
      expected: 127,
    },
  ];

  const results = testCases.map(({ tasks, n, expected }) => {
    const before = tasks.join("");
    const result = leastInterval(tasks, n);
    const passed = result === expected && tasks.join("") === before;

    return {
      Tasks: before.length > 30 ? `${before.slice(0, 26)}... (${tasks.length})` : before,
      N: n,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  });

  console.table(results);
  if (results.some(({ Passed }) => Passed === "FAIL")) {
    process.exitCode = 1;
  }
}

runTests();
