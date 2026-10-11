/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(nums) {
  const buildBST = (left, right) => {
    if (left > right) return null;

    // Select middle element to ensure balance
    const mid = (left + right) >> 1;
    const root = new TreeNode(nums[mid]);

    // Recursively build left and right subtrees
    root.left = buildBST(left, mid - 1);
    root.right = buildBST(mid + 1, right);

    return root;
  };

  return buildBST(0, nums.length - 1);
}

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
