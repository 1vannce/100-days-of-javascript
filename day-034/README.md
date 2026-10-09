### Day 34: Validate Binary Search Tree

Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:

- The **left subtree** of a node contains only nodes with keys **strictly less** than the node's key.
- The **right subtree** of a node contains only nodes with keys **strictly greater** than the node's key.
- Both the left and right subtrees must also be binary search trees.

**Crucial Trap:** It is not sufficient to simply check if `node.left.val < node.val` and `node.right.val > node.val` locally. Every node in the entire left subtree must be less than the ancestor, and every node in the right subtree must be greater.

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
//      2
//     / \
//    1   3
// Input: root = [2, 1, 3]
// Output: true

// Example 2:
//        5
//       / \
//      1   4
//         / \
//        3   6
// Input: root = [5, 1, 4, null, null, 3, 6]
// Output: false
// Explanation: The root node's value is 5, but its right child's value is 4.

// Example 3:
//        5
//       / \
//      4   6
//         / \
//        3   7
// Input: root = [5, 4, 6, null, null, 3, 7]
// Output: false
// Explanation: Node 3 is in the right subtree of 5, but 3 < 5.
```

**Constraints**

- The number of nodes in the tree is in the range $[1, 10^4]$.
- $-2^{31} \le \text{Node.val} \le 2^{31} - 1$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree ($O(n)$ worst-case).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
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
  { tree: [2, 1, 3], expected: true },
  { tree: [5, 1, 4, null, null, 3, 6], expected: false },
  { tree: [5, 4, 6, null, null, 3, 7], expected: false },
  { tree: [1, 1], expected: false }, // strictly less/greater required
  { tree: [2147483647], expected: true },
  { tree: [10, 5, 15, null, null, 6, 20], expected: false },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = isValidBST(root);
    const passed = result === expected;

    return {
      Tree: `[${tree.slice(0, 6)}${tree.length > 6 ? "..." : ""}]`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Approach 1: Range Propagation (DFS):**
- Pass down valid open intervals `(min, max)` for each node.
- For the root, the interval is `(-Infinity, Infinity)`.
- Going left constrains the upper bound: `(min, root.val)`.
- Going right constrains the lower bound: `(root.val, max)`.
- If `node.val <= min` or `node.val >= max`, return `false`.

- **Approach 2: Inorder Traversal Property:**
- Recall from Day 27 that an inorder traversal (`left -> root -> right`) of a valid BST always yields values in **strictly monotonically increasing order**.
- Keep track of the `prev` visited node's value; if `node.val <= prev`, the tree violates BST rules.
