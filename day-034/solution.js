/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
  const stack = [];
  let prevVal = -Infinity;

  while (root || stack.length > 0) {
    // Reach the leftmost node
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    // If current node is less than or equal to previous, it's not a valid BST
    if (root.val <= prevVal) return false;

    prevVal = root.val;
    root = root.right;
  }

  return true;
}

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

// Test cases
const testCases = [
  { tree: [2, 1, 3], expected: true },
  { tree: [5, 1, 4, null, null, 3, 6], expected: false },
  { tree: [5, 4, 6, null, null, 3, 7], expected: false },
  { tree: [1, 1], expected: false }, // strictly less/greater required
  { tree: [2147483647], expected: true },
  { tree: [10, 5, 15, null, null, 6, 20], expected: false },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = isValidBST(root);
    const passed = result === expected;
    return {
      Tree: `[${tree.slice(0, 6)}${tree.length > 6 ? "..." : ""}]`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
