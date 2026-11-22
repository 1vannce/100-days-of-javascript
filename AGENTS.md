# Project instructions

## Project
- Purpose: One JavaScript problem per day for daily practice. The owner writes the solutions; agents give hints only.
- Stack: Plain JavaScript run with Node.js. No package manager, no test runner.
- Environment: Node.js. No environment variables or `.env` files.

## Commands
- Run a day: `node day-NNN/solution.js` (one day at a time, for example `node day-079/solution.js`).
- No install step: there is no `package.json`.

## Architecture and conventions
- Each day lives in `day-NNN/` with `README.md` (problem, constraints, examples, hints) and `solution.js` (solution plus `testCases`, printed with `console.table`).
- `day-xxx/` is the blank template for a new day.
- The root `README.md` has the Current Progress table. Add a row for each new day.
- Commits use Conventional Commits, for example `feat(day-079): unique paths ii`.

## Boundaries
- Never write, complete, or fix a `solution.js` unless the user explicitly asks for the solution in that message. Otherwise give hints only.
- Do not edit `day-xxx/` or an existing day folder unless asked.
- Do not commit to `main`. Work on a branch and open a pull request from it.

## Verification
- Before handing off: run `node day-NNN/solution.js` for each day you touched and read the test case output.
- CI also runs: nothing. The repo has no CI.
