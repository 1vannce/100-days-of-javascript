/**
 * @param {string} str
 * @return {boolean}
 */
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

function run(input) {
  console.log("Output:", isPalindrome(input));
}

// Test Case: 1
run("A man, a plan, a canal: Panama");

// Test Case: 2
run("race a car");

// Test Case: 1
run(" ");

// Test Case: 1
run("0P");
