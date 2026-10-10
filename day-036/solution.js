/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    // Traverse to the leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Process the node
    current = stack.pop();
    k--;

    // Check if we found the kth smallest
    if (k === 0) return current.val;

    // Move to the right subtree
    current = current.right;
  }
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
  { tree: [3, 1, 4, null, 2], k: 1, expected: 1 },
  { tree: [5, 3, 6, 2, 4, null, null, 1], k: 3, expected: 3 },
  { tree: [2, 1, 3], k: 2, expected: 2 },
  { tree: [4, 2, 5, 1, 3], k: 4, expected: 4 },
  { tree: [1], k: 1, expected: 1 },
  { tree: [10, 5, 15, 3, 7, 12, 18], k: 5, expected: 12 },
];

console.table(
  testCases.map(({ tree, k, expected }) => {
    const root = buildTree(tree);
    const result = kthSmallest(root, k);
    const passed = result === expected;
    return {
      Tree: `[${tree.slice(0, 6)}${tree.length > 6 ? "..." : ""}]`,
      K: k,
      Expected: expected,
      Actual: result,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
