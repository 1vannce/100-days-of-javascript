### Day 44: Merge k Sorted Lists

You are given an array of `k` linked lists, each sorted in ascending order. Merge them into one sorted linked list and return its head.

**Crucial Requirement:** Use an O(N log k) merge algorithm, where `N` is the total number of nodes. Reuse the linked-list nodes; do not concatenate their values into an array and sort them, or repeatedly merge each list into a growing result.

**Definition for Singly-Linked List Node**

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

**Examples**

```text
Input: lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
Output: [1, 1, 2, 3, 4, 4, 5, 6]

Input: lists = []
Output: []

Input: lists = [[]]
Output: []
```

The arrays above represent linked lists. An empty list is represented by `null` in the implementation.

**Constraints**

- Each input list is sorted in ascending order.
- The total number of nodes is in the range `[0, 10^4]`.
- Target time complexity: O(N log k).
- Auxiliary space: O(k) for a min-heap, or O(log k) for recursive divide and conquer.

**Starter Code**

```javascript
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
  // Write your code here
}
```

**Solution: Balanced Divide and Conquer**

1. Split the range of list indices into two halves until each range contains one list.
2. Merge the sorted results of the two halves using the iterative two-pointer technique from Day 19.
3. Attach the smaller node to the output tail and advance its source pointer. Attach any remaining suffix when one list runs out.

Each node participates in at most `ceil(log2(k))` merge levels, giving O(N log k) merging time. Including visiting empty input lists, the full bound is O(k + N log k) for `k >= 2`; zero or one list returns immediately. Only O(log k) recursive frames are live at once, and each two-list merge uses constant extra space. The implementation passes index ranges rather than copying arrays, leaves the input array entries unchanged, and relinks the original nodes. Treat the original lists as consumed after merging.

**Run the Test Harness**

From the repository root:

```bash
node day-044/solution.js
```

The file includes `ListNode`, `arrayToList`, `listToArray`, and a `console.table` harness suitable for Zed. It covers the five supplied cases plus all-empty inputs, a single list, and duplicate values mixed with empty lists. A failing case sets a nonzero exit code.

**Hints**

- **Min-heap alternative:** Store the head of each non-empty list in a min-heap keyed by `node.val`. Extract the smallest node, attach it to the result, and insert its successor. The heap holds at most `k` nodes.
- **Divide and conquer:** Merge balanced halves rather than repeatedly merging the next list into an ever-growing result. Reuse the two-pointer merge from Day 19.
- Use an iterative two-list merge so the stack depth depends on `k`, rather than the number of nodes.
