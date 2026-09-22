/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNode(head) {
  let slow = head;
  let fast = head;

  // Move fast pointer by 2 steps, slow by 1 step
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // When fast reaches the end, slow is at the middle
  return slow;
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

// Test Cases
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
