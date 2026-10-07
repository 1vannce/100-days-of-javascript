### Day 33: Diameter of Binary Tree

Given the `root` of a binary tree, return the length of the **diameter** of the tree.

The **diameter** of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The **length** of a path between two nodes is represented by the number of **edges** between them.

**Crucial Requirement:** Compute the diameter in **$O(n)$ time** with a single post-order DFS traversal. Avoid calculating subtree heights repeatedly at every node, which degrades runtime to $O(n^2)$.

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
//          1
//         / \
//        2   3
//       / \
//      4   5
// Input: root = [1, 2, 3, 4, 5]
// Output: 3
// Explanation: 3 is the length of the path [4, 2, 1, 3] or [5, 2, 1, 3].

// Example 2:
//      1
//     /
//    2
// Input: root = [1, 2]
// Output: 1

// Example 3:
//          1
//         / \
//        2   3
//       /
//      4
//     /
//    5
//   /
//  6
// Input: root = [1, 2, 3, 4, null, null, null, 5, null, 6]
// Output: 4 (Path: 6 -> 5 -> 4 -> 2 -> 1 -> 3 has 5 nodes, 4 edges)
```

**Constraints**

- The number of nodes in the tree is in the range $[1, 10^4]$.
- $-100 \le \text{Node.val} \le 100$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree (call stack space).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
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
  { tree: [1, 2, 3, 4, 5], expected: 3 },
  { tree: [1, 2], expected: 1 },
  { tree: [1], expected: 0 },
  {
    tree: [4, -7, -3, null, null, -9, -3, 9, -7, -4, null, 6, null, -6, -6],
    expected: 5,
  },
  { tree: [1, 2, null, 3, 4, 5, null, null, 6], expected: 4 },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = diameterOfBinaryTree(root);
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

- **Two Metrics at Each Node:**

1. **Subtree Height (returned to parent):** The longest path from this node down to any leaf. Formally: $1 + \max(\text{leftHeight}, \text{rightHeight})$.
2. **Local Diameter (candidate for global max):** The path that bridges through this node as an apex: $\text{leftHeight} + \text{rightHeight}$ (edges).

- **Global Variable or Closure:** Keep a tracking variable `let maxDiameter = 0;` outside your recursive helper.
- **Helper Return Contract:** Have the helper function return the **height** of the subtree so the parent can use it, but update `maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight)` inside each call before returning.
- **Base Case:** If `node === null`, return height `0`.
