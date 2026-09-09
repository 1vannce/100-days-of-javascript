### Day 5: Two Sum

Write a function `twoSum(nums, target)` that takes an array of integers `nums` and an integer `target`, and returns the **indices** of the two numbers such that they add up to `target`.

You may assume that each input has exactly one valid solution, and you may not use the same element twice. You can return the indices in any order.

**Examples**

```javascript
twoSum([2, 7, 11, 15], 9);
// Output: [0, 1]  (nums[0] + nums[1] === 2 + 7 === 9)

twoSum([3, 2, 4], 6);
// Output: [1, 2]  (nums[1] + nums[2] === 2 + 4 === 6)

twoSum([3, 3], 6);
// Output: [0, 1]
```

**Constraints**

- $2 \le \text{nums.length} \le 10^4$
- $-10^9 \le \text{nums}[i] \le 10^9$
- $-10^9 \le \text{target} \le 10^9$
- Exactly one valid answer exists.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed (Standard Console Format)**

Paste this at the bottom of your file to run and inspect your test cases directly with clean, standard formatting:

```javascript
const testCases = [
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { nums: [3, 2, 4], target: 6, expected: [1, 2] },
  { nums: [3, 3], target: 6, expected: [0, 1] },
  { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] },
];

console.table(
  testCases.map(({ nums, target, expected }) => {
    const result = twoSum(nums, target);
    return {
      Nums: `[${nums}]`,
      Target: target,
      Expected: `[${expected}]`,
      Actual: result ? `[${result}]` : null,
      Passed: `${result}` === `${expected}` ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **The Brute Force Trajectory:** A nested pair of loops checking all combinations takes $O(n^2)$ time. Can you solve this in a single pass ($O(n)$)?
- **Find the Complement:** For each number `num`, calculate `complement = target - num`.
- **Map Storage:** Use a `Map` (or object) to store values you have already seen mapped to their index (`value -> index`). At each element, check if the required `complement` is already stored in your map.
