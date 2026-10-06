/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right && root.val === targetSum) return true;
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
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
