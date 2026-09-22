### Day 19: Merge Two Sorted Lists

You are given the heads of two sorted linked lists, `list1` and `list2`.

Merge the two lists into one **sorted** linked list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Crucial Requirement:** Solve this **in-place** with $O(1)$ auxiliary space by rewiring the existing `.next` references between nodes. Do not extract values into an array, sort them, and allocate a brand new list.

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
// Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
// Output: [1, 1, 2, 3, 4, 4]

// Example 2:
// Input: list1 = [], list2 = []
// Output: []

// Example 3:
// Input: list1 = [], list2 = [0]
// Output: [0]
```

**Constraints**

- The number of nodes in both lists is in the range $[0, 50]$.
- $-100 \le \text{Node.val} \le 100$.
- Both `list1` and `list2` are sorted in non-decreasing order.
- Time Complexity: $O(n + m)$ where $n$ and $m$ are the lengths of `list1` and `list2`.
- Auxiliary Space Complexity: $O(1)$.

**Starter Code**

```javascript
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
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
  { list1: [1, 2, 4], list2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4] },
  { list1: [], list2: [], expected: [] },
  { list1: [], list2: [0], expected: [0] },
  { list1: [5, 10, 15], list2: [2, 3, 20], expected: [2, 3, 5, 10, 15, 20] },
  { list1: [1, 2, 3], list2: [4, 5, 6], expected: [1, 2, 3, 4, 5, 6] },
];

console.table(
  testCases.map(({ list1, list2, expected }) => {
    const l1 = arrayToList(list1);
    const l2 = arrayToList(list2);
    const merged = mergeTwoLists(l1, l2);
    const actual = listToArray(merged);
    const passed = `${actual}` === `${expected}`;

    return {
      List1: `[${list1}]`,
      List2: `[${list2}]`,
      Expected: `[${expected}]`,
      Actual: `[${actual}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **The Dummy Head Pattern:** Create a sentinel node: `const dummy = new ListNode(-1);` and track a pointer `let current = dummy;`. This prevents special edge cases when choosing the first node.
- **Comparison Loop:** While both `list1 !== null && list2 !== null`:
- If `list1.val <= list2.val`, attach `current.next = list1` and advance `list1 = list1.next`.
- Otherwise, attach `current.next = list2` and advance `list2 = list2.next`.
- Always move `current = current.next`.

- **Leftover Nodes:** After the loop terminates, at most one list still has nodes. Attach the remaining chain in $O(1)$ time: `current.next = list1 !== null ? list1 : list2;`.
- **Return the Real Head:** Return `dummy.next`.
