### Day 27: Binary Tree Inorder Traversal

Given the `root` of a binary tree, return the **inorder traversal** of its nodes' values as an array.

In an inorder traversal, nodes are visited in the following order:

1. Traverse the **left** subtree.
2. Visit the **root** node.
3. Traverse the **right** subtree.

**Crucial Requirement:** Write an **iterative** solution using an explicit stack rather than a recursive helper. While recursion is natural for trees, implementing it iteratively tests your deep understanding of the call stack and how branch traversal actually works under the hood.

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
//   1
//    \
//     2
//    /
//   3
// Input: [1, null, 2, 3]
// Output: [1, 3, 2]

// Example 2:
//       1
//      / \
//     2   3
//    / \
//   4   5
// Input: [1, 2, 3, 4, 5]
// Output: [4, 2, 5, 1, 3]

// Example 3:
// Input: []
// Output: []

// Example 4:
// Input: [1]
// Output: [1]
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 100]$.
- $-100 \le \text{Node.val} \le 100$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes in the tree.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree (for the stack).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function inorderTraversal(root) {
  // Write your iterative traversal here
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
  { tree: [1, null, 2, 3], expected: [1, 3, 2] },
  { tree: [1, 2, 3, 4, 5], expected: [4, 2, 5, 1, 3] },
  { tree: [], expected: [] },
  { tree: [1], expected: [1] },
  { tree: [4, 2, 6, 1, 3, 5, 7], expected: [1, 2, 3, 4, 5, 6, 7] },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = inorderTraversal(root);
    const passed = JSON.stringify(result) === JSON.stringify(expected);

    return {
      Tree: `[${tree}]`,
      Expected: `[${expected}]`,
      Actual: `[${result}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Simulate the Call Stack:** Initialize an empty stack `const stack = []`, a result array `const result = []`, and a traversal pointer `let curr = root;`.
- **Outer Traversal Loop:** Run a loop condition that keeps going as long as there is an unvisited node or pending parent: `while (curr !== null || stack.length > 0)`.
- **Dive Left:** While `curr !== null`, push `curr` onto the stack and move left (`curr = curr.left`). This mimics recursive descent to the leftmost leaf.
- **Visit Root:** When `curr` hits `null`, pop from the stack (`curr = stack.pop()`), push its value to `result.push(curr.val)`.
- **Traverse Right:** Move to the right branch (`curr = curr.right`) and repeat the loop.
