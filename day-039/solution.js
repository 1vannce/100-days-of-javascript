/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
function deleteNode(root, key) {
  if (!root) return null;

  // Traverse to the node to delete
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Case 1: Leaf node or one child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 2: Two children
    // Find the inorder successor (min value in right subtree)
    let temp = root.right;
    while (temp.left) {
      temp = temp.left;
    }

    // Replace current node's value with successor's value
    root.val = temp.val;

    // Delete the successor node
    root.right = deleteNode(root.right, temp.val);
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

// Helpers for validation
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

function containsVal(root, val) {
  if (!root) return false;
  if (root.val === val) return true;
  return containsVal(root.left, val) || containsVal(root.right, val);
}

function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// Test cases
const testCases = [
  { tree: [5, 3, 6, 2, 4, null, 7], key: 3, shouldExist: false },
  { tree: [5, 3, 6, 2, 4, null, 7], key: 0, shouldExist: false }, // key not in tree
  { tree: [5, 3, 6, 2, 4, null, 7], key: 5, shouldExist: false }, // deleting root
  { tree: [], key: 0, shouldExist: false },
  { tree: [1], key: 1, shouldExist: false },
  { tree: [2, 1, 3], key: 1, shouldExist: false }, // deleting leaf
  { tree: [2, 1], key: 2, shouldExist: false }, // node with 1 child
];

console.table(
  testCases.map(({ tree, key }) => {
    const originalCount = tree.filter((x) => x !== null).length;
    const keyOriginallyPresent = tree.includes(key);
    const root = buildTree(tree);
    const updated = deleteNode(root, key);

    const isBST = isValidBST(updated);
    const hasKey = containsVal(updated, key);
    const newCount = countNodes(updated);
    const expectedCount = keyOriginallyPresent
      ? originalCount - 1
      : originalCount;
    const passed = isBST && !hasKey && newCount === expectedCount;

    return {
      InputTree: `[${tree.slice(0, 6)}${tree.length > 6 ? "..." : ""}]`,
      Key: key,
      ValidBST: isBST,
      KeyRemoved: !hasKey,
      CountMatch: newCount === expectedCount,
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
