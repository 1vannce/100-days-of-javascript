/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function inorderTraversal(root) {
  let res = [];
  function helper(node) {
    if (!node) return;
    helper(node.left);
    res.push(node.val);
    helper(node.right);
  }
  helper(root);
  return res;
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
  { tree: [1, null, 2, 3], expected: [1, 3, 2] },
  { tree: [1, 2, 3, 4, 5], expected: [4, 2, 5, 1, 3] },
  { tree: [], expected: [] },
  { tree: [1], expected: [1] },
  { tree: [4, 2, 6, 1, 3, 5, 7], expected: [1, 2, 3, 4, 5, 6, 7] },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = inorderTraversal(root);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    return {
      Tree: `[${tree}]`,
      Expected: `[${expected}]`,
      Actual: `[${result}]`,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
