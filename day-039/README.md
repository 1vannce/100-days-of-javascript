### Day 39: Delete Node in a BST

Given a root node reference of a binary search tree (BST) and a `key`, delete the node with the given `key` in the BST. Return the **root node reference** (possibly updated) of the BST.

Deletion can be divided into two stages:

1. Search for a node to remove.
2. If the node is found, delete the node while maintaining valid BST properties.

**Crucial Requirement:** The core challenge is handling the **three distinct structural cases** when the target node is found:

- **Case 1 (Leaf node):** The node has no children. Simply remove it ($O(1)$ rewiring).
- **Case 2 (Single child):** The node has only one child. Replace the node with its child.
- **Case 3 (Two children):** The node has both left and right children. Replace the node's value with its **inorder successor** (the smallest value in its right subtree) or inorder predecessor, and recursively delete that successor node.

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
//        5                      5
//      /   \                  /   \
//     3     6       ==>      4     6
//    / \     \              /       \
//   2   4     7            2         7
// Input: root = [5, 3, 6, 2, 4, null, 7], key = 3
// Output: [5, 4, 6, 2, null, null, 7]
// (Note: replacing node 3 with 2 is also valid: [5, 2, 6, null, 4, null, 7])

// Example 2:
// Input: root = [5, 3, 6, 2, 4, null, 7], key = 0
// Output: [5, 3, 6, 2, 4, null, 7] (Key 0 not found, tree unchanged)

// Example 3:
// Input: root = [], key = 0
// Output: []
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 10^4]$.
- $-10^5 \le \text{Node.val} \le 10^5$.
- Each node has a **unique** value.
- `root` is a valid binary search tree.
- $-10^5 \le \text{key} \le 10^5$.
- Time Complexity: $O(h)$ where $h$ is the height of the tree ($O(\log n)$ balanced, $O(n)$ skewed).
- Auxiliary Space Complexity: $O(h)$ for recursion stack depth.

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
function deleteNode(root, key) {
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

// Helpers for validation
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

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

function containsVal(root, val) {
  if (!root) return false;
  if (root.val === val) return true;
  return containsVal(root.left, val) || containsVal(root.right, val);
}

function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

const testCases = [
  { tree: [5, 3, 6, 2, 4, null, 7], key: 3, shouldExist: false },
  { tree: [5, 3, 6, 2, 4, null, 7], key: 0, shouldExist: false }, // key not in tree
  { tree: [5, 3, 6, 2, 4, null, 7], key: 5, shouldExist: false }, // deleting root
  { tree: [], key: 0, shouldExist: false },
  { tree: [1], key: 1, shouldExist: false },
  { tree: [2, 1, 3], key: 1, shouldExist: false }, // deleting leaf
  { tree: [2, 1], key: 2, shouldExist: false }, // node with 1 child
];

console.table(
  testCases.map(({ tree, key }) => {
    const originalCount = tree.filter((x) => x !== null).length;
    const keyOriginallyPresent = tree.includes(key);
    const root = buildTree(tree);
    const updated = deleteNode(root, key);

    const isBST = isValidBST(updated);
    const hasKey = containsVal(updated, key);
    const newCount = countNodes(updated);
    const expectedCount = keyOriginallyPresent
      ? originalCount - 1
      : originalCount;
    const passed = isBST && !hasKey && newCount === expectedCount;

    return {
      InputTree: `[${tree.slice(0, 6)}${tree.length > 6 ? "..." : ""}]`,
      Key: key,
      ValidBST: isBST,
      KeyRemoved: !hasKey,
      CountMatch: newCount === expectedCount,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Locating the Node:**
- If `key < root.val`, delegate to the left: `root.left = deleteNode(root.left, key)`.
- If `key > root.val`, delegate to the right: `root.right = deleteNode(root.right, key)`.

- **When `root.val === key` (Target Found):**
- **0 or 1 Child:** If `root.left === null`, return `root.right`. If `root.right === null`, return `root.left`. This naturally handles both leaf nodes (returning `null`) and single-child nodes (splicing the child up).
- **2 Children:** Find the **inorder successor** (the minimum node in `root.right` by following `.left` until `null`). Copy that successor's value into `root.val`, then delete that duplicate from the right subtree: `root.right = deleteNode(root.right, root.val)`.
