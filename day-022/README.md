### Day 22: Swap Nodes in Pairs

Given a singly linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

**Crucial Requirement:** Solve this **in-place** with $O(1)$ auxiliary space by rewiring the pointers directly. Do not simply swap node values (`node.val`) and do not copy nodes into an array.

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
// Input: 1 -> 2 -> 3 -> 4 -> null
// Output: 2 -> 1 -> 4 -> 3 -> null

// Example 2:
// Input: null
// Output: null

// Example 3:
// Input: 1 -> null
// Output: 1 -> null

// Example 4:
// Input: 1 -> 2 -> 3 -> null (odd length: last node stays untouched)
// Output: 2 -> 1 -> 3 -> null
```

**Constraints**

- The number of nodes in the list is in the range $[0, 100]$.
- $0 \le \text{Node.val} \le 100$.
- Time Complexity: $O(n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function swapPairs(head) {
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

function listToArray(head) {
  const result = [];
  let curr = head;
  while (curr !== null) {
    result.push(curr.val);
    curr = curr.next;
  }
  return result;
}

const testCases = [
  { list: [1, 2, 3, 4], expected: [2, 1, 4, 3] },
  { list: [], expected: [] },
  { list: [1], expected: [1] },
  { list: [1, 2, 3], expected: [2, 1, 3] },
  { list: [1, 2, 3, 4, 5, 6], expected: [2, 1, 4, 3, 6, 5] },
];

console.table(
  testCases.map(({ list, expected }) => {
    const head = arrayToList(list);
    const swapped = swapPairs(head);
    const actual = listToArray(swapped);
    const passed = `${actual}` === `${expected}`;

    return {
      Input: `[${list}]`,
      Expected: `[${expected}]`,
      Actual: `[${actual}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Use a Dummy Sentinel Node:** Set up `const dummy = new ListNode(0); dummy.next = head;` and keep a tracker pointer `let prev = dummy;`.
- **Look Ahead Two Steps:** Your `while` loop condition must verify both nodes exist to swap: `while (prev.next !== null && prev.next.next !== null)`.
- **Pointer Re-wiring Scheme:**

1. Identify the pair: `first = prev.next`, `second = prev.next.next`.
2. Adjust next pointers:

- `first.next = second.next;` (connect first to the remaining tail)
- `second.next = first;` (point second backward to first)
- `prev.next = second;` (connect the predecessor to second)

3. Advance `prev` forward two steps: `prev = first`.

- Return `dummy.next`.
