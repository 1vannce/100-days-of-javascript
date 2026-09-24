/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(-1);
  let current = dummy;

  // Traverse both lists while neither is null
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Attach the remaining nodes from whichever list is not empty
  current.next = list1 !== null ? list1 : list2;

  // Return the head of the merged list (skipping the dummy)
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
