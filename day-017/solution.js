/**
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

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

// Test Cases
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
