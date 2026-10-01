/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
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
    tree: [3, 9, 20, null, null, 15, 7],
    expected: [[3], [9, 20], [15, 7]],
  },
  { tree: [1], expected: [[1]] },
  { tree: [], expected: [] },
  {
    tree: [1, 2, 3, 4, null, null, 5],
    expected: [[1], [2, 3], [4, 5]],
  },
  {
    tree: [1, 2, 3, 4, 5, 6, 7],
    expected: [[1], [2, 3], [4, 5, 6, 7]],
  },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const result = levelOrder(root);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    return {
      Tree: `[${tree}]`,
      Expected: JSON.stringify(expected),
      Actual: JSON.stringify(result),
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
