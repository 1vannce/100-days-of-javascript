/**
 * @param {string} str
 * @return {number}
 */
function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;

  const cleanStr = str.toLowerCase();

  for (const char of cleanStr) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

function run(input) {
  console.log("Output:", countVowels(input));
}

// Test Case: 1
run("hello");

// Test Case: 2
run("JavaScript");

// Test Case: 3
run("sky");

// Test Case: 4
run("AEIOU");
