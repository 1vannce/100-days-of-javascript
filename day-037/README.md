### Day 37: Convert Sorted Array to Binary Search Tree

Given an integer array `nums` where the elements are sorted in **strictly ascending order**, convert it to a **height-balanced** binary search tree.

A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than 1.

**Crucial Requirement:** Construct the tree in **$O(n)$ time** and **$O(\log n)$ auxiliary space** (excluding output space). You must select elements such that the resulting tree strictly maintains the balanced BST height property.

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
// Input: nums = [-10, -3, 0, 5, 9]
// One valid height-balanced BST output:
//          0
//        /   \
//      -3     9
//      /     /
//    -10    5
// Level-order representation: [0, -3, 9, -10, null, 5]
// Note: [0, -10, 5, null, -3, null, 9] is also a valid balanced BST.

// Example 2:
// Input: nums = [1, 3]
// Output: [3, 1] (or [1, null, 3])

// Example 3:
// Input: nums = [1]
// Output: [1]
```

**Constraints**

- $1 \le \text{nums.length} \le 10^4$
- $-10^4 \le \text{nums}[i] \le 10^4$
- `nums` is sorted in a **strictly increasing** order.
- Time Complexity: $O(n)$ where $n$ is the length of `nums`.
- Auxiliary Space Complexity: $O(\log n)$ for the recursive call stack.

**Starter Code**

```javascript
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(nums) {
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

// Validator 1: Verify BST invariant (Inorder must be strictly increasing)
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

// Validator 2: Verify Height-Balanced property (|leftHeight - rightHeight| <= 1)
function checkBalanced(root) {
  function getHeight(node) {
    if (!node) return 0;
    const left = getHeight(node.left);
    if (left === -1) return -1;
    const right = getHeight(node.right);
    if (right === -1) return -1;

    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  }
  return getHeight(root) !== -1;
}

// Helper to count nodes
function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

const testCases = [
  { nums: [-10, -3, 0, 5, 9] },
  { nums: [1, 3] },
  { nums: [1] },
  { nums: [1, 2, 3, 4, 5, 6, 7] },
  { nums: [-50, -20, 0, 10, 25, 30, 45, 99] },
];

console.table(
  testCases.map(({ nums }) => {
    const root = sortedArrayToBST(nums);
    const isBST = isValidBST(root);
    const isBalanced = checkBalanced(root);
    const totalNodes = countNodes(root);
    const passed = isBST && isBalanced && totalNodes === nums.length;

    return {
      InputArray: `[${nums.length > 5 ? nums.slice(0, 5) + "..." : nums}]`,
      NodeCount: totalNodes,
      ValidBST: isBST,
      Balanced: isBalanced,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Divide and Conquer (Binary Search Analogy):** Since the array is sorted, the middle element must serve as the root to divide the remaining nodes equally between the left and right subtrees.
- **Finding the Midpoint:** Use index bounds `left` and `right`. Calculate `mid = Math.floor((left + right) / 2)`.
- **Subtree Partitioning:**
- Recursively build the left subtree with elements in index range `[left, mid - 1]`.
- Recursively build the right subtree with elements in index range `[mid + 1, right]`.

- **Zero Allocations:** Do not use `nums.slice()` inside the recursion, as array copying would degrade runtime to $O(n \log n)$ and increase auxiliary memory to $O(n \log n)$. Pass pointers `left` and `right` instead.
- **Base Case:** When `left > right`, return `null`.
