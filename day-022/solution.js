/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function swapPairs(head) {
  if (!head || !head.next) return head;

  let dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  while (prev.next && prev.next.next) {
    let first = prev.next;
    let second = first.next;

    // Swap pointers
    first.next = second.next;
    second.next = first;
    prev.next = second;

    // Move prev two steps forward
    prev = first;
  }
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
