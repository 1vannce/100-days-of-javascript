### Day 31: Symmetric Tree

Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

**Crucial Requirement:** Implement a solution that compares subtrees symmetrically. While a recursive helper comparing two branches simultaneously is standard, aim to understand how an iterative solution using an explicit queue or stack mimics the exact same pairs.

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
//        1
//      /   \
//     2     2
//    / \   / \
//   3   4 4   3
// Input: root = [1, 2, 2, 3, 4, 4, 3]
// Output: true

// Example 2:
//        1
//      /   \
//     2     2
//      \     \
//       3     3
// Input: root = [1, 2, 2, null, 3, null, 3]
// Output: false

// Example 3:
// Input: root = []
// Output: true
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 1000]$.
- $-100 \le \text{Node.val} \le 100$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes in the tree.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree ($O(n)$ worst-case).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root) {
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
  { tree: [1, 2, 2, 3, 4, 4, 3], expected: true },
  { tree: [1, 2, 2, null, 3, null, 3], expected: false },
  { tree: [], expected: true },
  { tree: [1], expected: true },
  { tree: [1, 2, 2, 2, null, 2], expected: false },
  { tree: [1, 2, 3], expected: false },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = isSymmetric(root);
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

- **Two Roots Comparison:** Two trees are mirror images if:

1. Their roots have the same value.
2. The **right** child of each tree is a mirror reflection of the **left** child of the other tree.

- **Helper Function:** Create a helper `isMirror(t1, t2)`.
- If both `t1 === null && t2 === null`, return `true`.
- If only one is `null`, or `t1.val !== t2.val`, return `false`.
- Recurse on `isMirror(t1.left, t2.right)` and `isMirror(t1.right, t2.left)`.

- **Iterative Approach:** Push node pairs onto a queue or stack: `queue.push(root.left, root.right)`. Pop two nodes at a time and compare them symmetrically.
