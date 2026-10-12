### Day 38: Insert into a Binary Search Tree

You are given the `root` node of a binary search tree (BST) and a `val` to insert into the tree. Return the `root` of the BST after the insertion.

It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return **any** of them. (The most common and clean approach inserts the new node as a leaf).

**Crucial Requirement:** Implement this in $O(h)$ time where $h$ is the height of the tree. Write both an intuitive recursive solution and an $O(1)$ auxiliary space iterative solution.

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
//        4                       4
//      /   \                   /   \
//     2     7       ==>       2     7
//    / \                     / \   /
//   1   3                   1   3 5
// Input: root = [4, 2, 7, 1, 3], val = 5
// Output: [4, 2, 7, 1, 3, 5]

// Example 2:
// Input: root = [40, 20, 60, 10, 30, 50, 70], val = 25
// Output: [40, 20, 60, 10, 30, 50, 70, null, null, 25]

// Example 3:
// Input: root = [], val = 5
// Output: [5]
```

**Constraints**

- The number of nodes in the tree is in the range $[0, 10^4]$.
- $-10^8 \le \text{Node.val} \le 10^8$.
- All values in `root` are **unique**.
- `val` is not in the original BST.
- Time Complexity: $O(h)$ where $h$ is the height of the BST ($O(\log n)$ balanced, $O(n)$ skewed).
- Auxiliary Space Complexity: $O(1)$ iterative, or $O(h)$ recursive.

**Starter Code**

```javascript
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
function insertIntoBST(root, val) {
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

// Helpers for testing
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

function findNode(root, val) {
  if (!root) return false;
  if (root.val === val) return true;
  return findNode(root.left, val) || findNode(root.right, val);
}

function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

const testCases = [
  { tree: [4, 2, 7, 1, 3], val: 5 },
  { tree: [40, 20, 60, 10, 30, 50, 70], val: 25 },
  { tree: [], val: 5 },
  { tree: [4, 2], val: 3 },
  { tree: [10, 5, 15], val: 12 },
];

console.table(
  testCases.map(({ tree, val }) => {
    const initialCount = tree.filter((x) => x !== null).length;
    const root = buildTree(tree);
    const updated = insertIntoBST(root, val);

    const isBST = isValidBST(updated);
    const hasVal = findNode(updated, val);
    const nodesCount = countNodes(updated);
    const passed = isBST && hasVal && nodesCount === initialCount + 1;

    return {
      InputTree: `[${tree.slice(0, 5)}${tree.length > 5 ? "..." : ""}]`,
      InsertVal: val,
      ValidBST: isBST,
      Inserted: hasVal,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Base Case (Empty Root):** If `root === null`, create and return a `new TreeNode(val)`.
- **Standard Leaf Insertion (Recursive):**
- If `val < root.val`, set `root.left = insertIntoBST(root.left, val)`.
- If `val > root.val`, set `root.right = insertIntoBST(root.right, val)`.
- Return `root`.

- **Iterative Approach ($O(1)$ Space):**
- Traverse with `let curr = root;`.
- If `val < curr.val`:
- If `curr.left === null`, attach `curr.left = new TreeNode(val)` and break.
- Otherwise, move `curr = curr.left`.

- If `val > curr.val`:
- If `curr.right === null`, attach `curr.right = new TreeNode(val)` and break.
- Otherwise, move `curr = curr.right`.
