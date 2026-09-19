### Day 16: Reverse Linked List

Given the `head` of a singly linked list, reverse the list, and return the reversed list's head.

**Crucial Requirement:** Solve this **in-place** iteratively with $O(1)$ auxiliary memory by manipulating node pointers directly. Do not extract node values into an array to rebuild the list.

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
// Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
// Output: 5 -> 4 -> 3 -> 2 -> 1 -> null

// Input: 1 -> 2 -> null
// Output: 2 -> 1 -> null

// Input: null
// Output: null
```

**Constraints**

- The number of nodes in the list is in the range $[0, 5000]$.
- $-5000 \le \text{Node.val} \le 5000$.
- Time Complexity: $O(n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
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
  let dummy = new ListNode(0);
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
  { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
  { input: [1, 2], expected: [2, 1] },
  { input: [1], expected: [1] },
  { input: [], expected: [] },
  { input: [-1, 0, 1], expected: [1, 0, -1] },
];

console.table(
  testCases.map(({ input, expected }) => {
    const list = arrayToList(input);
    const reversed = reverseList(list);
    const actual = listToArray(reversed);
    const passed = `${actual}` === `${expected}`;

    return {
      Input: `[${input}]`,
      Expected: `[${expected}]`,
      Actual: `[${actual}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Three-Pointer Technique:** Maintain three pointers during traversal: `prev` (initialized to `null`), `curr` (initialized to `head`), and `nextTemp`.
- **Preserve the Reference:** Before breaking the current node's link, save the next node: `nextTemp = curr.next`.
- **Reverse the Link:** Point the current node backward: `curr.next = prev`.
- **Step Forward:** Move `prev = curr` and `curr = nextTemp`.
- **Return Value:** When `curr` reaches `null`, what does `prev` point to?
