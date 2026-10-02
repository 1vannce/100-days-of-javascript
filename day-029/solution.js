/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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
  { tree: [3, 9, 20, null, null, 15, 7], expected: 3 },
  { tree: [1, null, 2], expected: 2 },
  { tree: [], expected: 0 },
  { tree: [0], expected: 1 },
  { tree: [1, 2, 3, 4, null, null, 5], expected: 3 },
  { tree: [1, 2, null, 3, null, 4], expected: 4 },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = maxDepth(root);
    const passed = result === expected;
    return {
      Tree: `[${tree}]`,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
