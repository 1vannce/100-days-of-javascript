/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val);
  if (root.val < val) {
    root.right = insertIntoBST(root.right, val);
  } else {
    root.left = insertIntoBST(root.left, val);
  }
  return root;
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helpers for testing
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

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

function findNode(root, val) {
  if (!root) return false;
  if (root.val === val) return true;
  return findNode(root.left, val) || findNode(root.right, val);
}

function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// Test cases
const testCases = [
  { tree: [4, 2, 7, 1, 3], val: 5 },
  { tree: [40, 20, 60, 10, 30, 50, 70], val: 25 },
  { tree: [], val: 5 },
  { tree: [4, 2], val: 3 },
  { tree: [10, 5, 15], val: 12 },
];

console.table(
  testCases.map(({ tree, val }) => {
    const initialCount = tree.filter((x) => x !== null).length;
    const root = buildTree(tree);
    const updated = insertIntoBST(root, val);

    const isBST = isValidBST(updated);
    const hasVal = findNode(updated, val);
    const nodesCount = countNodes(updated);
    const passed = isBST && hasVal && nodesCount === initialCount + 1;

    return {
      InputTree: `[${tree.slice(0, 5)}${tree.length > 5 ? "..." : ""}]`,
      InsertVal: val,
      ValidBST: isBST,
      Inserted: hasVal,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
