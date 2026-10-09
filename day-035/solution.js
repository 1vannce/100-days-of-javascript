/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
  let node = root;

  while (node !== null) {
    if (p.val < node.val && q.val < node.val) {
      // Both are in the left subtree
      node = node.left;
    } else if (p.val > node.val && q.val > node.val) {
      // Both are in the right subtree
      node = node.right;
    } else {
      // Split point found — this is the LCA
      return node;
    }
  }

  return null; // Should never reach here
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helpers to construct BST and retrieve node references
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

function findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) || findNode(root.right, val);
}

const treeData = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5];

// Test cases
const testCases = [
  { pVal: 2, qVal: 8, expectedVal: 6 },
  { pVal: 2, qVal: 4, expectedVal: 2 },
  { pVal: 3, qVal: 5, expectedVal: 4 },
  { pVal: 0, qVal: 5, expectedVal: 2 },
  { pVal: 7, qVal: 9, expectedVal: 8 },
];

console.table(
  testCases.map(({ pVal, qVal, expectedVal }) => {
    const root = buildTree(treeData);
    const p = findNode(root, pVal);
    const q = findNode(root, qVal);
    const result = lowestCommonAncestor(root, p, q);
    const passed = result !== null && result.val === expectedVal;
    return {
      P: pVal,
      Q: qVal,
      ExpectedLCA: expectedVal,
      ActualLCA: result ? result.val : null,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
