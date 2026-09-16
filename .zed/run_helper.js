import { spawnSync } from "child_process";

const t = performance.now();
const res = spawnSync(process.execPath, [process.argv[2]], {
  stdio: "inherit",
});

const elapsed = performance.now() - t;
const duration =
  elapsed < 1000
    ? `${Math.round(elapsed)}ms`
    : `${(elapsed / 1000).toFixed(2)}s`;

if (res.status === 0 || res.status === null) {
  console.log(`\n✨ Done in ${duration}\n`);
} else {
  console.log(`\n💥 Failed with code ${res.status} in ${duration}\n`);
}
