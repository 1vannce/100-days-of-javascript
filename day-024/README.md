### Day 24: Daily Temperatures

Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the $i^{\text{th}}$ day to get a warmer temperature.

If there is no future day for which this is possible, keep `answer[i] === 0` instead.

**Crucial Requirement:** Write an algorithm with **$O(n)$ time complexity**. A nested brute-force loop comparing each day to every subsequent day takes $O(n^2)$ and will exceed time limits on large inputs.

**Examples**

```javascript
dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
// Output: [1, 1, 4, 2, 1, 1, 0, 0]

dailyTemperatures([30, 40, 50, 60]);
// Output: [1, 1, 1, 0]

dailyTemperatures([30, 60, 90]);
// Output: [1, 1, 0]

dailyTemperatures([89, 62, 70, 58, 47, 47, 46, 76, 100, 70]);
// Output: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0]
```

**Constraints**

- $1 \le \text{temperatures.length} \le 10^5$
- $30 \le \text{temperatures}[i] \le 100$
- Time Complexity: $O(n)$
- Auxiliary Space Complexity: $O(n)$

**Starter Code**

```javascript
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
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
```

---

**Hints**

- **Store Indices, Not Just Values:** Store the **indices** of previous days in your stack rather than the raw temperatures. An index lets you compute both the elapsed days (`i - prevIndex`) and inspect the temperature (`temperatures[prevIndex]`).
- **Monotonic Decreasing Property:** Keep the temperatures corresponding to indices on the stack in strictly descending order.
- **The Resolution Trigger:** As you iterate through each index `i`:
- While the stack is not empty and the current temperature `temperatures[i]` is strictly greater than `temperatures[stack[stack.length - 1]]`:
- Pop the top index: `const prevIndex = stack.pop();`
- Record the distance: `result[prevIndex] = i - prevIndex;`

- **Default Fill:** Initialize your result array filled with zeros (`new Array(temperatures.length).fill(0)`). Any index left on the stack at the end has no warmer future day and naturally remains `0`.
