/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const charMap = {};
  for (let char of s) charMap[char] = (charMap[char] || 0) + 1;
  for (let char of t) {
    if (!charMap[char]) return false;
    charMap[char]--;
  }
  return true;
}

const testCases = [
  // Test 0
  { s: "anagram", t: "nagaram", expected: true },
  // Test 1
  { s: "rat", t: "car", expected: false },
  // Test 2
  { s: "listen", t: "silent", expected: true },
  // Test 3
  { s: "a", t: "ab", expected: false },
  // Test 4
  { s: "aabbcc", t: "abcabc", expected: true },
];

console.table(
  testCases.map(({ s, t, expected }) => {
    const result = isAnagram(s, t);
    return {
      S: `${s}`,
      T: `${t}`,
      Expected: expected,
      Actual: result,
      Passed: result === expected ? "PASS" : "FAIL",
    };
  }),
);
