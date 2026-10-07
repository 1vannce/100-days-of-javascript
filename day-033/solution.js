/**
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function dfs(node) {
    if (node === null) return 0;

    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Heights count nodes, so their sum is the path length in edges.
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  dfs(root);
  return maxDiameter;
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
  { tree: [1, 2, 3, 4, 5], expected: 3 },
  { tree: [1, 2], expected: 1 },
  { tree: [1], expected: 0 },
  {
    tree: [4, -7, -3, null, null, -9, -3, 9, -7, -4, null, 6, null, -6, -6],
    expected: 5,
  },
  { tree: [1, 2, null, 3, 4, 5, null, null, 6], expected: 4 },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = diameterOfBinaryTree(root);
    const passed = result === expected;
    return {
      Tree: `[${tree.slice(0, 6)}${tree.length > 6 ? "..." : ""}]`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
