/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
  function mergeTwoLists(left, right) {
    const dummy = new ListNode(0);
    let tail = dummy;

    // Reuse the original nodes instead of copying values into a new list.
    while (left !== null && right !== null) {
      if (left.val <= right.val) {
        tail.next = left;
        left = left.next;
      } else {
        tail.next = right;
        right = right.next;
      }
      tail = tail.next;
    }

    tail.next = left !== null ? left : right;
    return dummy.next;
  }

  function mergeRange(start, end) {
    if (start > end) return null;
    if (start === end) return lists[start];

    const mid = start + Math.floor((end - start) / 2);
    const left = mergeRange(start, mid);
    const right = mergeRange(mid + 1, end);
    return mergeTwoLists(left, right);
  }

  // Balanced merging processes each node at most once per O(log k) level.
  return mergeRange(0, lists.length - 1);
}

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helpers for testing
function arrayToList(arr) {
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
  {
    rawLists: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6],
    ],
    expected: [1, 1, 2, 3, 4, 4, 5, 6],
  },
  { rawLists: [], expected: [] },
  { rawLists: [[]], expected: [] },
  {
    rawLists: [[-2, 1, 4], [-3, 0], [-10]],
    expected: [-10, -3, -2, 0, 1, 4],
  },
  { rawLists: [[1], [0]], expected: [0, 1] },
  { rawLists: [[], [], []], expected: [] },
  { rawLists: [[-3, 0, 7]], expected: [-3, 0, 7] },
  { rawLists: [[], [1, 1], [], [1], []], expected: [1, 1, 1] },
];

const results = testCases.map(({ rawLists, expected }) => {
  const listNodes = rawLists.map((arr) => arrayToList(arr));
  const mergedHead = mergeKLists(listNodes);
  const actual = listToArray(mergedHead);
  const passed = JSON.stringify(actual) === JSON.stringify(expected);

  return {
    InputLists: JSON.stringify(rawLists),
    Expected: JSON.stringify(expected),
    Actual: JSON.stringify(actual),
    Passed: passed ? "PASS" : "FAIL",
  };
});

console.table(results);
if (results.some(({ Passed }) => Passed === "FAIL")) {
  process.exitCode = 1;
}
