### Day 30: Invert Binary Tree

Given the `root` of a binary tree, invert the tree (mirroring it horizontally so every left child becomes a right child and vice versa), and return its `root`.

**Crucial Requirement:** Solve this **in-place** by swapping child references on the nodes. You can implement this using either recursive DFS or an iterative queue/stack approach.

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
//        4                   4
//      /   \               /   \
//     2     7     ==>     7     2
//    / \   / \           / \   / \
//   1   3 6   9         9   6 3   1
// Input: root = [4, 2, 7, 1, 3, 6, 9]
// Output: [4, 7, 2, 9, 6, 3, 1]

// Example 2:
//      2                   2
//    /   \       ==>     /   \
//   1     3             3     1
// Input: root = [2, 1, 3]
// Output: [2, 3, 1]

// Example 3:
// Input: root = []
// Output: []
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 100]$.
- $-100 \le \text{Node.val} \le 100$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes in the tree.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree (for the call stack or traversal queue).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
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

// Helpers to serialize and deserialize trees for level-order validation
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

function treeToArray(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Trim trailing nulls
  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

const testCases = [
  { tree: [4, 2, 7, 1, 3, 6, 9], expected: [4, 7, 2, 9, 6, 3, 1] },
  { tree: [2, 1, 3], expected: [2, 3, 1] },
  { tree: [], expected: [] },
  { tree: [1, 2], expected: [1, null, 2] },
  { tree: [1, null, 2], expected: [1, 2] },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const inverted = invertTree(root);
    const actual = treeToArray(inverted);
    const passed = JSON.stringify(actual) === JSON.stringify(expected);

    return {
      InputTree: `[${tree}]`,
      Expected: JSON.stringify(expected),
      Actual: JSON.stringify(actual),
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Base Case:** If `root === null`, return `null`.
- **Swap the Pointers:** At the current node, swap `root.left` and `root.right` using standard JavaScript destructuring: `[root.left, root.right] = [root.right, root.left];`.
- **Recurse:** Recursively call `invertTree(root.left)` and `invertTree(root.right)` on the inverted children.
- **Iterative Variant:** If you prefer an iterative solution, use a queue or stack, enqueue `root`, and continuously pop a node, swap its left and right children, and push any non-null children into the queue.
