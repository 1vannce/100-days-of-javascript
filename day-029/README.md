### Day 29: Maximum Depth of Binary Tree

Given the `root` of a binary tree, return its **maximum depth**.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Crucial Requirement:** Write an algorithm that computes the depth efficiently. Aim for an intuitive recursive DFS approach, but test your versatility by thinking about how a BFS level-order traversal naturally yields the exact same answer.

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
//     3
//    / \
//   9  20
//     /  \
//    15   7
// Input: [3, 9, 20, null, null, 15, 7]
// Output: 3

// Example 2:
//   1
//    \
//     2
// Input: [1, null, 2]
// Output: 2

// Example 3:
// Input: []
// Output: 0

// Example 4:
// Input: [0]
// Output: 1
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 10^4]$.
- $-100 \le \text{Node.val} \le 100$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes in the tree.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree (call stack depth).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
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
  { tree: [3, 9, 20, null, null, 15, 7], expected: 3 },
  { tree: [1, null, 2], expected: 2 },
  { tree: [], expected: 0 },
  { tree: [0], expected: 1 },
  { tree: [1, 2, 3, 4, null, null, 5], expected: 3 },
  { tree: [1, 2, null, 3, null, 4], expected: 4 },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = maxDepth(root);
    const passed = result === expected;

    return {
      Tree: `[${tree}]`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Base Case:** If `root === null`, the depth is simply `0`.
- **Divide and Conquer (DFS):**
- Find the maximum depth of the left subtree recursively: `maxDepth(root.left)`.
- Find the maximum depth of the right subtree recursively: `maxDepth(root.right)`.
- The depth of the current root is $1 + \max(\text{leftDepth}, \text{rightDepth})$.

- **Iterative BFS Alternative:** If you reuse the level-order traversal queue from Day 28, simply increment a `depth` counter every time an entire level finishes processing.
