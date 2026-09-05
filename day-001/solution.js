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

// Test Case: 1
console.log("Output: " + countVowels("hello"));

// Test Case: 2
console.log("Output: " + countVowels("JavaScript"));

// Test Case: 3
console.log("Output: " + countVowels("sky"));

// Test Case: 4
console.log("Output: " + countVowels("AEIOU"));
