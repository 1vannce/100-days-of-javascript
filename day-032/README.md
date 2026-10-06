### Day 32: Path Sum

Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.

A **leaf** is a node with no children (`left === null` and `right === null`).

**Crucial Requirement:** A valid path must terminate at an actual **leaf node**. A partial path ending at an internal node with one child does not count, even if the running sum matches `targetSum`.

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
//              5
//             / \
//            4   8
//           /   / \
//          11  13  4
//         /  \      \
//        7    2      1
// TargetSum: 22
// Path: 5 -> 4 -> 11 -> 2 (Sum: 5 + 4 + 11 + 2 = 22)
// Output: true

// Example 2:
//       1
//      / \
//     2   3
// TargetSum: 5
// Output: false (Paths: 1->2 = 3, 1->3 = 4)

// Example 3:
// Input: root = [], targetSum = 0
// Output: false (Empty tree has no root-to-leaf path)
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 5000]$.
- $-1000 \le \text{Node.val} \le 1000$.
- $-1000 \le \text{targetSum} \le 1000$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes in the tree.
- Auxiliary Space Complexity: $O(h)$ where $h$ is the height of the tree ($O(n)$ worst-case).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
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
  {
    tree: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
    targetSum: 22,
    expected: true,
  },
  {
    tree: [1, 2, 3],
    targetSum: 5,
    expected: false,
  },
  {
    tree: [],
    targetSum: 0,
    expected: false,
  },
  {
    tree: [1, 2],
    targetSum: 1,
    expected: false, // Node 1 is not a leaf because it has a child (2)
  },
  {
    tree: [1, 2],
    targetSum: 3,
    expected: true,
  },
  {
    tree: [-2, null, -3],
    targetSum: -5,
    expected: true,
  },
];

console.table(
  testCases.map(({ tree, targetSum, expected }) => {
    const root = buildTree(tree);
    const result = hasPathSum(root, targetSum);
    const passed = result === expected;

    return {
      Tree: `[${tree.slice(0, 7)}${tree.length > 7 ? "..." : ""}]`,
      Target: targetSum,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Base Case:** An empty node cannot provide a valid path: if `root === null`, return `false`.
- **The Leaf Check:** A node is a leaf only when `root.left === null && root.right === null`. If it is a leaf, check if its value matches the remaining sum: `root.val === targetSum`.
- **Subtract as You Descend:** Instead of carrying an accumulator forward, subtract `root.val` from `targetSum` as you branch down: `const remainingSum = targetSum - root.val;`.
- **Recursive Branching:** Return `hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum)`. If either path yields a match, the expression evaluates to `true`.
