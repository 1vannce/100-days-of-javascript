/**
 * @param {ListNode} head
 * @return {boolean}
 */
function isPalindrome(head) {
  let values = [];
  let current = head;

  // Traverse and store values
  while (current) {
    values.push(current.val);
    current = current.next;
  }

  // Compare array with its reverse
  let left = 0;
  let right = values.length - 1;
  while (left < right) {
    if (values[left] !== values[right]) return false;
    left++;
    right--;
  }
  return true;
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

// Test cases
const testCases = [
  { input: [1, 2, 2, 1], expected: true },
  { input: [1, 2], expected: false },
  { input: [1, 2, 3, 2, 1], expected: true },
  { input: [1], expected: true },
  { input: [1, 0, 0], expected: false },
  { input: [1, 2, 3, 4, 3, 2, 1], expected: true },
];

console.table(
  testCases.map(({ input, expected }) => {
    const list = arrayToList(input);
    const result = isPalindrome(list);
    const passed = result === expected;
    return {
      Input: `[${input}]`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
