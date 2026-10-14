/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
  let maxSum = Number.MIN_SAFE_INTEGER;

  function dfs(node) {
    if (!node) return 0;

    // Get max path sum from left and right subtrees, ignoring negative sums
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));

    // Update global max with the path passing through current node (left + node + right)
    maxSum = Math.max(maxSum, left + right + node.val);

    // Return max path sum extending upward (node + max(left, right))
    return Math.max(left, right) + node.val;
  }

  dfs(root);
  return maxSum;
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
