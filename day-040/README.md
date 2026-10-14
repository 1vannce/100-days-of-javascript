### Day 40: Binary Tree Maximum Path Sum

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return the **maximum path sum** of any non-empty path.

**Crucial Requirement:** Nodes can contain **negative values**. A subtree path sum might reduce your total, so your algorithm must know when to discard a branch entirely (treat it as $0$). Compute the maximum sum in a single bottom-up post-order pass running in **$O(n)$ time**.

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
//       1
//      / \
//     2   3
// Input: root = [1, 2, 3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with path sum 2 + 1 + 3 = 6.

// Example 2:
//       -10
//       /  \
//      9   20
//         /  \
//        15   7
// Input: root = [-10, 9, 20, null, null, 15, 7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with path sum 15 + 20 + 7 = 42.

// Example 3:
// Input: root = [-3]
// Output: -3
```

**Constraints**

- The number of nodes in the tree is in the range $[1, 3 \times 10^4]$.
- $-1000 \le \text{Node.val} \le 1000$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes in the tree.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree ($O(n)$ worst-case).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
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
  { tree: [1, 2, 3], expected: 6 },
  { tree: [-10, 9, 20, null, null, 15, 7], expected: 42 },
  { tree: [-3], expected: -3 },
  { tree: [2, -1], expected: 2 },
  { tree: [-2, -1], expected: -1 },
  { tree: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], expected: 48 },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = maxPathSum(root);
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

- **Two Distinct Values at Each Node:**

1. **Branch Gain (returned to caller):** The maximum path starting at this node and extending downward into **at most one** child: `node.val + Math.max(leftGain, rightGain)`.
2. **Apex Arch (candidate for global max):** The path that turns at this node, connecting both left and right branches: `node.val + leftGain + rightGain`.

- **Pruning Negative Contributions:** If a subtree returns a negative gain, do not include it in the path. Clamp any negative child gain to zero: `Math.max(0, getGain(child))`.
- **Global Max Tracking:** Initialize a global accumulator `let maxSum = -Infinity;`. Inside the recursive post-order helper, update `maxSum = Math.max(maxSum, node.val + leftGain + rightGain)`.
- **Return Value:** The helper function must return only the **single-branch contribution** (`node.val + Math.max(leftGain, rightGain)`), because an ancestor path cannot branch down both children of a lower node without creating a fork.
