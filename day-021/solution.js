/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;

  // Move fast pointer n+1 steps ahead to maintain a gap of n nodes between fast and slow
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both pointers until fast reaches the end of the list
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Remove the nth node from the end by skipping it
  slow.next = slow.next.next;

  return dummy.next;
}

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

// Test cases
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
