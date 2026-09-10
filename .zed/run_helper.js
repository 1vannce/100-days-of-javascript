import { spawnSync } from "child_process";
const t = performance.now();
const res = spawnSync(process.execPath, [process.argv[2]], {
  stdio: "inherit",
});
const s = ((performance.now() - t) / 1000).toFixed(3);
console.log(
  "\n[Done] exited with code=" +
    (res.status !== null ? res.status : 0) +
    " in " +
    s +
    " seconds",
);
