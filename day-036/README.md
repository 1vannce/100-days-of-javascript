### Day 36: Kth Smallest Element in a BST

Given the `root` of a binary search tree (BST) and an integer `k`, return the $k^{\text{th}}$ smallest value (**1-indexed**) of all the values of the nodes in the tree.

**Crucial Requirement:** Exploit the BST inorder invariant to find the answer without extracting all nodes into an array or sorting. Stop traversing as soon as the $k^{\text{th}}$ element is reached to ensure optimal average-case runtime.

**Definition for a Binary Tree Node:**

```javascript
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

**Examples**

```javascript
// Example 1:
//       3
//      / \
//     1   4
//      \
//       2
// Input: root = [3, 1, 4, null, 2], k = 1
// Output: 1

// Example 2:
//         5
//        / \
//       3   6
//      / \
//     2   4
//    /
//   1
// Input: root = [5, 3, 6, 2, 4, null, null, 1], k = 3
// Output: 3

// Example 3:
//      2
//     / \
//    1   3
// Input: root = [2, 1, 3], k = 2
// Output: 2
```

**Constraints**

- The number of nodes in the tree is $n$.
- $1 \le k \le n \le 10^4$.
- $0 \le \text{Node.val} \le 10^4$.
- Time Complexity: $O(h + k)$ where $h$ is the tree height.
- Auxiliary Space Complexity: $O(h)$ for the recursion stack or iterative traversal stack.

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
  // Write your code here
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper to construct binary tree from level-order array representation
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift();

    if (i < arr.length && arr[i] !== null) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

const testCases = [
  { tree: [3, 1, 4, null, 2], k: 1, expected: 1 },
  { tree: [5, 3, 6, 2, 4, null, null, 1], k: 3, expected: 3 },
  { tree: [2, 1, 3], k: 2, expected: 2 },
  { tree: [4, 2, 5, 1, 3], k: 4, expected: 4 },
  { tree: [1], k: 1, expected: 1 },
  { tree: [10, 5, 15, 3, 7, 12, 18], k: 5, expected: 12 },
];

console.table(
  testCases.map(({ tree, k, expected }) => {
    const root = buildTree(tree);
    const result = kthSmallest(root, k);
    const passed = result === expected;

    return {
      Tree: `[${tree.slice(0, 6)}${tree.length > 6 ? "..." : ""}]`,
      K: k,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **The Inorder Invariant:** An inorder traversal (`left -> root -> right`) visits nodes of a valid BST in strictly non-decreasing sorted order. The $k^{\text{th}}$ visited node is therefore the $k^{\text{th}}$ smallest.
- **Early Termination (Iterative Stack):** Use an explicit stack (the pattern from Day 27). Dive left as deep as possible. When popping a node from the stack, decrement $k$.
- **The Stop Condition:** When $k === 0$, the node you just popped is the target element—return its value immediately without traversing the rest of the tree.
