### Day 17: Linked List Cycle

Given `head`, the head of a singly linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

**Crucial Requirement:** Solve this using **$O(1)$ auxiliary memory** (constant space). Do not use a `Set` or modify the nodes by attaching custom visited flags.

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
// Input: head = [3, 2, 0, -4], pos = 1 (tail connects to node index 1)
// 3 -> 2 -> 0 -> -4
//      ^          |
//      +----------+
// Output: true

// Example 2:
// Input: head = [1, 2], pos = 0 (tail connects to node index 0)
// 1 -> 2
// ^    |
// +----+
// Output: true

// Example 3:
// Input: head = [1], pos = -1 (no cycle)
// 1 -> null
// Output: false
```

**Constraints**

- The number of nodes in the list is in the range $[0, 10^4]$.
- $-10^5 \le \text{Node.val} \le 10^5$.
- Time Complexity: $O(n)$
- Auxiliary Space Complexity: $O(1)$

**Starter Code**

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
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

// Helper to build a linked list and optionally link the tail to a cycle index
function createLinkedListWithCycle(arr, pos) {
  if (arr.length === 0) return null;

  const nodes = arr.map((val) => new ListNode(val));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (pos >= 0 && pos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}

const testCases = [
  { arr: [3, 2, 0, -4], pos: 1, expected: true },
  { arr: [1, 2], pos: 0, expected: true },
  { arr: [1], pos: -1, expected: false },
  { arr: [], pos: -1, expected: false },
  { arr: [1, 2, 3, 4, 5], pos: -1, expected: false },
  { arr: [1, 2, 3, 4, 5], pos: 4, expected: true }, // self-loop at tail
];

console.table(
  testCases.map(({ arr, pos, expected }) => {
    const list = createLinkedListWithCycle(arr, pos);
    const result = hasCycle(list);

    return {
      Input: `[${arr}]`,
      CycleAt: pos,
      Expected: expected,
      Actual: result,
      Passed: result === expected ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Two Runners on a Track:** Imagine two runners on a track. If the track is a straight line, the faster runner reaches the end and stops. If the track is circular, the faster runner will eventually lap and catch up to the slower runner.
- **Pointers Setup:** Initialize `slow = head` and `fast = head`.
- **Step Sizes:** In each loop iteration, advance `slow` by 1 step (`slow = slow.next`) and `fast` by 2 steps (`fast = fast.next.next`).
- **Loop Guards:** Ensure `fast !== null && fast.next !== null` before attempting to step two nodes forward.
- **Collision Check:** If `slow === fast` at any point during iteration, you have confirmed a cycle. If `fast` hits `null`, the list terminates normally with no cycle.
