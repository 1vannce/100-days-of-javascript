/**
 * @param {string} str
 * @return {string}
 */
function reverseWords(str) {
  return str.trim().split(" ").filter(Boolean).reverse().join(" ");
}

function run(input) {
  console.log("Output:", reverseWords(input));
}

// Test Case: 1
run("the sky is blue");

// Test Case: 2
run("  hello world  ");

// Test Case: 3
run("a good   example");
