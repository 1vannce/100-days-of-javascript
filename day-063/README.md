### Day 63: Combination Sum III

Find all valid combinations of `k` numbers that sum up to `n` such that the following conditions are true:

- Only numbers `1` through `9` are used.
- Each number is used at most once.

Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

**Crucial Requirement:** The decision space is tiny (subsets of $\{1, 2, \dots, 9\}$ of size $k$). Implement a clean backtracking algorithm with dual-pruning conditions: stop early if the current combination length exceeds $k$ or if the running sum exceeds $n$. Run in $O(\binom{9}{k})$ time and $O(k)$ auxiliary space.

**Examples**

```javascript
// Example 1:
combinationSum3(3, 7);
// Output: [[1, 2, 4]]
// Explanation:
// 1 + 2 + 4 = 7
// There are no other valid combinations of 3 numbers that sum to 7.

// Example 2:
combinationSum3(3, 9);
// Output: [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
// Explanation:
// 1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// Total 3 valid combinations.

// Example 3:
combinationSum3(4, 1);
// Output: []
// Explanation: The smallest sum of 4 numbers is 1 + 2 + 3 + 4 = 10. Since 10 > 1, there are no valid combinations.
```

**Constraints**

- $2 \le k \le 9$
- $1 \le n \le 60$
- **Time Complexity:** $O(\binom{9}{k} \cdot k)$ — there are at most $\binom{9}{k}$ combinations, each taking $O(k)$ to copy.
- **Auxiliary Space Complexity:** $O(k)$ for the recursion stack and path buffer.

**Starter Code**

```javascript
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
function combinationSum3(k, n) {
  // Write your code here
}
```

---

**Approach**

Backtrack over the digits `1` to `9` with a `startDigit`, so digits are chosen in ascending order and each is used at most once (recurse with `digit + 1`). Two prunes keep the search small: the path stops growing once it holds `k` digits (it is recorded only if the remaining target is exactly `0`), and the loop `break`s as soon as `digit > remain`, since every later digit is larger still.
