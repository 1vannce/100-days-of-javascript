### Day 21: Remove Nth Node From End of List

Given the `head` of a singly linked list and an integer `n`, remove the $n^{\text{th}}$ node from the **end** of the list and return its head.

**Crucial Requirement:** Solve this in a **single pass** ($O(L)$ where $L$ is the length of the list) using $O(1)$ auxiliary space. Do not iterate through the list first to count its total length.

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
// Input: head = [1, 2, 3, 4, 5], n = 2
// 1 -> 2 -> 3 -> 4 -> 5 -> null (2nd from end is 4)
// Output: [1, 2, 3, 5]

// Example 2:
// Input: head = [1], n = 1
// Output: []

// Example 3:
// Input: head = [1, 2], n = 1
// Output: [1]

// Example 4:
// Input: head = [1, 2], n = 2 (removing the head node)
// Output: [2]
```

**Constraints**

- The number of nodes in the list is $sz$ ($1 \le sz \le 30$).
- $0 \le \text{Node.val} \le 100$.
- $1 \le n \le sz$.
- Time Complexity: $O(L)$ (single traversal).
- Auxiliary Space Complexity: $O(1)$.

**Starter Code**

```javascript
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
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
  { list: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5] },
  { list: [1], n: 1, expected: [] },
  { list: [1, 2], n: 1, expected: [1] },
  { list: [1, 2], n: 2, expected: [2] },
  { list: [10, 20, 30, 40], n: 4, expected: [20, 30, 40] },
];

console.table(
  testCases.map(({ list, n, expected }) => {
    const head = arrayToList(list);
    const updated = removeNthFromEnd(head, n);
    const actual = listToArray(updated);
    const passed = `${actual}` === `${expected}`;

    return {
      Input: `[${list}]`,
      N: n,
      Expected: `[${expected}]`,
      Actual: `[${actual}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Sentinel/Dummy Head:** Create a dummy node pointing to `head` (`dummy.next = head`). This simplifies edge cases when the node to remove is the original head itself.
- **The Fixed-Gap Sliding Window:** Use two pointers, `fast` and `slow`, both starting at `dummy`.
- **Advance Fast First:** Advance `fast` forward by $n + 1$ steps so that the distance between `fast` and `slow` is exactly $n$ nodes.
- **Slide Together:** Move both `fast` and `slow` one step forward at a time until `fast` reaches `null`.
- **Bypass the Target:** Because `slow` is positioned exactly before the node to be removed, splice it out with `slow.next = slow.next.next`.
- Return `dummy.next`.
