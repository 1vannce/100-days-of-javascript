### Day 35: Lowest Common Ancestor of a Binary Search Tree

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes, `p` and `q`.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**)."

**Crucial Requirement:** Exploit the BST property ($left < root < right$) to navigate directly toward the answer in **$O(h)$ time** and **$O(1)$ auxiliary space**. Do not perform an unguided exhaustive traversal as you would in a general binary tree.

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
//             6
//           /   \
//          2     8
//         / \   / \
//        0   4 7   9
//           / \
//          3   5
// Input: root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 8
// Output: Node with val = 6
// Explanation: The LCA of nodes 2 and 8 is 6.

// Example 2:
// Same tree as above.
// Input: root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 4
// Output: Node with val = 2
// Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself.

// Example 3:
//      2
//     /
//    1
// Input: root = [2, 1], p = 2, q = 1
// Output: Node with val = 2
```

**Constraints**

- The number of nodes in the tree is in the range $[2, 10^5]$.
- $-10^9 \le \text{Node.val} \le 10^9$.
- All `Node.val` are **unique**.
- `p` and `q` are distinct and guaranteed to exist in the BST.
- Time Complexity: $O(h)$ where $h$ is the height of the tree ($O(\log n)$ for balanced, $O(n)$ skewed).
- Auxiliary Space Complexity: $O(1)$ iterative, or $O(h)$ recursive.

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
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

// Helpers to construct BST and retrieve node references
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

function findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) || findNode(root.right, val);
}

const treeData = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5];

const testCases = [
  { pVal: 2, qVal: 8, expectedVal: 6 },
  { pVal: 2, qVal: 4, expectedVal: 2 },
  { pVal: 3, qVal: 5, expectedVal: 4 },
  { pVal: 0, qVal: 5, expectedVal: 2 },
  { pVal: 7, qVal: 9, expectedVal: 8 },
];

console.table(
  testCases.map(({ pVal, qVal, expectedVal }) => {
    const root = buildTree(treeData);
    const p = findNode(root, pVal);
    const q = findNode(root, qVal);
    const result = lowestCommonAncestor(root, p, q);
    const passed = result !== null && result.val === expectedVal;

    return {
      P: pVal,
      Q: qVal,
      ExpectedLCA: expectedVal,
      ActualLCA: result ? result.val : null,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **The Split Point Invariant:** In a BST, the LCA is the first node along your traversal where `p` and `q` split into different branches (or where the current node equals either `p` or `q`).
- **Both Nodes in Left Subtree:** If both `p.val < current.val` and `q.val < current.val`, the common ancestor must be somewhere in the left subtree. Move `current = current.left`.
- **Both Nodes in Right Subtree:** If both `p.val > current.val` and `q.val > current.val`, the common ancestor must be somewhere in the right subtree. Move `current = current.right`.
- **Split or Exact Match:** If one value is on the left and the other is on the right (or `current` matches `p` or `q`), you have found the split point. Return `current` immediately.
