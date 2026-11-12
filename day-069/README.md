### Day 69: Restore IP Addresses

A valid IP address consists of exactly four integers separated by single dots. Each integer is between `0` and `255` (inclusive) and cannot have leading zeros.

- For example, `"0.1.2.201"` and `"192.168.1.1"` are valid IP addresses, but `"0.011.255.245"`, `"192.168.1.312"` and `"192.168@1.1"` are invalid IP addresses.

Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting dots into `s`. You are not allowed to reorder or remove any digits in `s`. You may return the valid IP addresses in any order.

**Crucial Requirement:** A valid IP segment (octet) has strict rules: it must be between 1 and 3 characters long, value $\le 255$, and if its length is greater than 1, it cannot start with `'0'`. Write a backtracking algorithm that segments `s` into 4 parts in $O(3^4)$ bounded time and $O(1)$ auxiliary space (since the recursion depth is capped at 4).

**Examples**

```javascript
// Example 1:
restoreIpAddresses("25525511135");
// Output: ["255.255.11.135", "255.255.111.35"]

// Example 2:
restoreIpAddresses("0000");
// Output: ["0.0.0.0"]

// Example 3:
restoreIpAddresses("101023");
// Output: ["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"]
```

**Constraints**

- $1 \le \text{s.length} \le 20$
- `s` consists of digits only.
- **Time Complexity:** $O(3^4) = O(81) = O(1)$, as there are at most $3^4$ decision paths to explore.
- **Auxiliary Space Complexity:** $O(1)$, since the recursion stack depth is bounded by 4 segments.

**Starter Code**

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses(s) {
  // Write your code here
}
```

---

**Approach**

Return `[]` immediately if `s.length` is outside `4..12`, since an IP needs 4 octets of 1-3 digits. Otherwise `backtrack(startIdx)` picks one octet per level: try lengths 1 to 3, and for each slice `part` stop (`break`) if it runs past the end of `s`, has a leading zero with length > 1, or exceeds 255 (longer slices from the same start can only be worse). A valid `part` is pushed onto the shared `segments` array (choose), explored with `backtrack(startIdx + len)`, then popped (unchoose). When `segments.length === 4`, the path is a result only if `startIdx === s.length`; either way it returns. Depth is capped at 4 and each level branches at most 3 ways, so work and space are constant.
