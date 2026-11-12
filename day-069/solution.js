/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses(s) {
  if (s.length < 4 || s.length > 12) return [];

  const results = [];
  const segments = [];

  function backtrack(startIdx) {
    if (segments.length === 4) {
      if (startIdx === s.length) results.push(segments.join("."));
      return;
    }

    for (let len = 1; len <= 3; len++) {
      if (startIdx + len > s.length) break;

      const part = s.slice(startIdx, startIdx + len);
      if (part.length > 1 && part[0] === "0") break;
      if (Number(part) > 255) break;

      segments.push(part); // choose
      backtrack(startIdx + len); // explore
      segments.pop(); // unchoose
    }
  }

  backtrack(0);
  return results;
}

// Helper to sort IP addresses for deterministic comparison
function normalizeIPs(ips) {
  return [...ips].sort();
}

// Helper to validate IP string structure
function isValidIPString(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (p.length === 0 || p.length > 3) return false;
    if (p.length > 1 && p[0] === "0") return false;
    const num = Number(p);
    return num >= 0 && num <= 255;
  });
}

const testCases = [
  {
    name: "Standard 11-digit string '25525511135'",
    s: "25525511135",
    expectedCount: 2,
    expectedIPs: ["255.255.11.135", "255.255.111.35"],
  },
  {
    name: "All zero minimum IP '0000'",
    s: "0000",
    expectedCount: 1,
    expectedIPs: ["0.0.0.0"],
  },
  {
    name: "Multiple zero segment combinations '101023'",
    s: "101023",
    expectedCount: 5,
    expectedIPs: [
      "1.0.10.23",
      "1.0.102.3",
      "10.1.0.23",
      "10.10.2.3",
      "101.0.2.3",
    ],
  },
  {
    name: "Too short string for 4 octets '111'",
    s: "111",
    expectedCount: 0,
    expectedIPs: [],
  },
  {
    name: "Too long string for 4 octets (max 12 chars allowed)",
    s: "255255255255255",
    expectedCount: 0,
    expectedIPs: [],
  },
];

console.table(
  testCases.map(({ name, s, expectedCount, expectedIPs }) => {
    const result = restoreIpAddresses(s);
    const normalizedActual = normalizeIPs(result);
    let passed = result.length === expectedCount;

    if (passed && expectedIPs) {
      const normalizedExpected = normalizeIPs(expectedIPs);
      passed =
        JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    // Verify all generated IP strings pass structural rules
    const allValidIPs = result.every((ip) => isValidIPString(ip));
    const signatures = new Set(normalizedActual);
    const hasNoDuplicates = signatures.size === expectedCount;

    return {
      Scenario: name,
      InputString: `"${s}"`,
      Length: s.length,
      GeneratedCount: result.length,
      ExpectedCount: expectedCount,
      IPFormatValid: allValidIPs,
      UniqueCheck: hasNoDuplicates,
      Passed: passed && hasNoDuplicates && allValidIPs ? "PASS" : "FAIL",
    };
  })
);
