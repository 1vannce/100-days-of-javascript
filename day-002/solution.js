/**
 * @param {string} str
 * @return {string}
 */
function reverseWords(str) {
  return str.trim().split(" ").filter(Boolean).reverse().join(" ");
}

// Test Case: 1
console.log("Output:", reverseWords("the sky is blue"));

// Test Case: 2
console.log("Output:", reverseWords("  hello world  "));

// Test Case: 3
console.log("Output:", reverseWords("a good   example"));
