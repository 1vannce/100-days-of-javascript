/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
  const stack = [];
  const result = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    // While stack is not empty and current temp is warmer than stack top
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }
  return result;
}

// Test cases
const testCases = [
  {
    temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    expected: [1, 1, 4, 2, 1, 1, 0, 0],
  },
  {
    temperatures: [30, 40, 50, 60],
    expected: [1, 1, 1, 0],
  },
  {
    temperatures: [30, 60, 90],
    expected: [1, 1, 0],
  },
  {
    temperatures: [89, 62, 70, 58, 47, 47, 46, 76, 100, 70],
    expected: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0],
  },
  {
    temperatures: [55],
    expected: [0],
  },
];

console.table(
  testCases.map(({ temperatures, expected }) => {
    const result = dailyTemperatures(temperatures);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    return {
      Temperatures: `[${temperatures}]`,
      Expected: `[${expected}]`,
      Actual: `[${result}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
