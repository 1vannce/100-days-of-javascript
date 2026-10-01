### Day 28: Binary Tree Level Order Traversal

Given the `root` of a binary tree, return the **level order traversal** of its nodes' values (i.e., from left to right, level by level as a 2D array).

Each inner array should represent the values of the nodes at that specific depth level, starting from the root at level 0.

**Crucial Requirement:** Implement this using an iterative **Queue-based BFS** pattern. Group node values strictly by their respective depth levels.

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
// Output: [[3], [9, 20], [15, 7]]

// Example 2:
//   1
// Input: [1]
// Output: [[1]]

// Example 3:
// Input: []
// Output: []

// Example 4:
//     1
//    / \
//   2   3
//  /     \
// 4       5
// Input: [1, 2, 3, 4, null, null, 5]
// Output: [[1], [2, 3], [4, 5]]
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 2000]$.
- $-1000 \le \text{Node.val} \le 1000$.
- Time Complexity: $O(n)$ where $n$ is the number of nodes in the tree.
- Auxiliary Space Complexity: $O(w)$ where $w$ is the maximum width of the tree (for the queue).

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
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
    tree: [3, 9, 20, null, null, 15, 7],
    expected: [[3], [9, 20], [15, 7]],
  },
  { tree: [1], expected: [[1]] },
  { tree: [], expected: [] },
  {
    tree: [1, 2, 3, 4, null, null, 5],
    expected: [[1], [2, 3], [4, 5]],
  },
  {
    tree: [1, 2, 3, 4, 5, 6, 7],
    expected: [[1], [2, 3], [4, 5, 6, 7]],
  },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = levelOrder(root);
    const passed = JSON.stringify(result) === JSON.stringify(expected);

    return {
      Tree: `[${tree}]`,
      Expected: JSON.stringify(expected),
      Actual: JSON.stringify(result),
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Handling Empty Trees:** Guard against a `null` root immediately by returning `[]`.
- **The Queue Setup:** Initialize a queue containing only the root: `const queue = [root];` and an outer results array `const levels = [];`.
- **Snapshot the Level Size:** At the beginning of each BFS step, record `const levelSize = queue.length;`. This locks in exactly how many nodes belong to the current depth level before you start pushing their children.
- **The Inner Iteration:** Loop `levelSize` times using a standard `for` loop:
- Dequeue a node (`const node = queue.shift();`).
- Push `node.val` into a temporary `currentLevel` array.
- If `node.left` exists, push it into `queue`.
- If `node.right` exists, push it into `queue`.

- **Store the Level:** Once the `for` loop completes, push `currentLevel` into `levels`. Repeat until `queue` is empty.
