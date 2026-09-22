### Day 18: Middle of the Linked List

Given the `head` of a singly linked list, return the **middle node** of the linked list.

If there are two middle nodes (i.e., the list has an even length), return the **second middle node**.

**Crucial Requirement:** Find the middle node in a **single pass** with **$O(1)$ auxiliary space**. Do not convert the linked list into an array or iterate through the list twice to count its length first.

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
// Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
// Output: Node with value 3 (returns list: 3 -> 4 -> 5 -> null)

// Example 2:
// Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
// Output: Node with value 4 (returns list: 4 -> 5 -> 6 -> null)

// Example 3:
// Input: 1 -> null
// Output: Node with value 1
```

**Constraints**

- The number of nodes in the list is in the range $[1, 100]$.
- $1 \le \text{Node.val} \le 100$.
- Time Complexity: $O(n)$ (single traversal).
- Auxiliary Space Complexity: $O(1)$.

**Starter Code**

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNode(head) {
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
  { input: [1, 2, 3, 4, 5], expected: [3, 4, 5] },
  { input: [1, 2, 3, 4, 5, 6], expected: [4, 5, 6] },
  { input: [1], expected: [1] },
  { input: [1, 2], expected: [2] },
  { input: [10, 20, 30, 40, 50, 60, 70], expected: [40, 50, 60, 70] },
];

console.table(
  testCases.map(({ input, expected }) => {
    const list = arrayToList(input);
    const mid = middleNode(list);
    const actual = listToArray(mid);
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

- **Ratio of Speeds:** If runner `fast` moves twice as fast as runner `slow`, where will `slow` be when `fast` crosses the finish line?
- **Pointer Movement:** In each iteration of the loop, advance `slow` by 1 node (`slow = slow.next`) and `fast` by 2 nodes (`fast = fast.next.next`).
- **Termination Guards:** The `while` condition should check `fast !== null && fast.next !== null`.
- When length is odd, `fast.next === null` marks the end.
- When length is even, `fast === null` marks the end, and `slow` lands directly on the second middle node.
