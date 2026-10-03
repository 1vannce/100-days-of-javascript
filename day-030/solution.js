/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
  if (root === null) {
    return null;
  }

  // Swap left and right children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helpers to serialize and deserialize trees for level-order validation
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

function treeToArray(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Trim trailing nulls
  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

// Test cases
const testCases = [
  { tree: [4, 2, 7, 1, 3, 6, 9], expected: [4, 7, 2, 9, 6, 3, 1] },
  { tree: [2, 1, 3], expected: [2, 3, 1] },
  { tree: [], expected: [] },
  { tree: [1, 2], expected: [1, null, 2] },
  { tree: [1, null, 2], expected: [1, 2] },
];

console.table(
  testCases.map(({ tree, expected }) => {
    const root = buildTree(tree);
    const inverted = invertTree(root);
    const actual = treeToArray(inverted);
    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    return {
      InputTree: `[${tree}]`,
      Expected: JSON.stringify(expected),
      Actual: JSON.stringify(actual),
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
