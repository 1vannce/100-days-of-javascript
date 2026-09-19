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
  let prev = null;
  let current = head;

  while (current !== null) {
    let next = current.next; // Save next node
    current.next = prev; // Reverse pointer
    prev = current; // Move prev forward
    current = next; // Move current forward
  }
  return prev; // New head
}

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

// Test Cases
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
