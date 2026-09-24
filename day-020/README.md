### Day 20: Palindrome Linked List

Given the `head` of a singly linked list, return `true` if it is a palindrome, or `false` otherwise.

A linked list is a palindrome if the sequence of values read from left to right is identical to the sequence read from right to left.

**Crucial Requirement:** Implement a solution that runs in **$O(n)$ time** and **$O(1)$ auxiliary space**. Do not copy node values into a JavaScript array or string to check with two pointers.

**Definition for Singly-Linked List Node:**

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

**Examples**

```javascript
// Example 1:
// Input: 1 -> 2 -> 2 -> 1 -> null
// Output: true

// Example 2:
// Input: 1 -> 2 -> null
// Output: false

// Example 3:
// Input: 1 -> 2 -> 3 -> 2 -> 1 -> null
// Output: true

// Example 4:
// Input: 1 -> null
// Output: true
```

**Constraints**

- The number of nodes in the list is in the range $[1, 10^5]$.
- $0 \le \text{Node.val} \le 9$.
- Time Complexity: $O(n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
function isPalindrome(head) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helpers to bridge JS arrays and linked lists
function arrayToList(arr) {
  if (!arr.length) return null;
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

const testCases = [
  { input: [1, 2, 2, 1], expected: true },
  { input: [1, 2], expected: false },
  { input: [1, 2, 3, 2, 1], expected: true },
  { input: [1], expected: true },
  { input: [1, 0, 0], expected: false },
  { input: [1, 2, 3, 4, 3, 2, 1], expected: true },
];

console.table(
  testCases.map(({ input, expected }) => {
    const list = arrayToList(input);
    const result = isPalindrome(list);
    const passed = result === expected;

    return {
      Input: `[${input}]`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Phase 1 (Find the Middle):** Use the Day 18 technique (slow/fast pointers) to locate the midpoint of the linked list.
- **Phase 2 (Reverse the Second Half):** Use the Day 16 technique (`prev`, `curr`, `nextTemp`) to reverse the second half of the list in place, starting right after the midpoint.
- **Phase 3 (Compare Both Halves):** Run two pointers simultaneously—one starting from `head` and the other from the head of the newly reversed second half. Compare their values until the second half hits `null`.
- **Optional Polish:** In production, it is standard practice to reverse the second half back to its original orientation before returning to keep data mutations non-destructive.
