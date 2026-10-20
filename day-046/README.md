### Day 46: Task Scheduler

Given a character array `tasks`, each uppercase letter represents a CPU task that takes one unit of time. Tasks may be executed in any order, and the CPU may be idle.

The non-negative integer `n` is the cooldown: at least `n` units of time must separate any two occurrences of the same task. Return the minimum time needed to finish every task.

**Crucial Requirement:** Compute the optimal schedule length in O(tasks.length) time and O(1) extra space using a fixed frequency table of 26 letters and idle-slot filling logic.

**Examples**

```javascript
leastInterval(["A", "A", "A", "B", "B", "B"], 2); // 8
// A -> B -> idle -> A -> B -> idle -> A -> B

leastInterval(["A", "C", "A", "B", "D", "B"], 1); // 6
// A -> B -> A -> D -> B -> C

leastInterval(["A", "A", "A", "B", "B", "B"], 0); // 6
// No cooldown means no idle time is needed.

leastInterval(
  ["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"],
  2
); // 16
// A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle
// -> A -> idle -> idle -> A
```

**Constraints**

- `1 <= tasks.length <= 10000`.
- Each task is an uppercase English letter from `A` through `Z`.
- `0 <= n <= 100`.
- Time complexity: O(tasks.length).
- Auxiliary space complexity: O(1).

**Starter Code**

```javascript
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
function leastInterval(tasks, n) {
  // Write your code here
}
```

**Solution: Frequency Frames**

1. Count each letter in an array of size 26.
2. Find `maxFreq`, the largest frequency, and `maxFreqCount`, the number of task types with that frequency.
3. Compute `(maxFreq - 1) * (n + 1) + maxFreqCount`.
4. Return the larger of that frame length and `tasks.length`.

The most frequent tasks determine the required spacing. There are `maxFreq - 1` full frames, each at least `n + 1` time units wide, followed by the final occurrence of each of the `maxFreqCount` most frequent tasks. For `AAABBB` with cooldown 2, the frames are `AB_ | AB_ | AB`, totaling 8 units.

Other tasks fill the gaps. When there are too few, the unfilled slots must remain idle. When there are enough, the frames can expand to accommodate every task without idle time. This gives the optimal length:

```javascript
Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxFreqCount)
```

Both terms are lower bounds: every task needs one unit, and the repeated tasks require their cooldown spacing. Filling the frames attains the larger bound. Taking the maximum also handles cooldown zero and cases with more tied task types than the nominal frame width.

Counting takes O(tasks.length), and scanning 26 frequencies takes constant time. The fixed array uses O(1) auxiliary space. The input is not modified.

**Run the Test Harness**

From the repository root:

```bash
node day-046/solution.js
```

The self-contained `console.table` harness works in Zed and includes the six supplied cases, a single task, one repeated task type, three tied maximum frequencies, maximum-size inputs with cooldown 100 and zero, and all 26 letters tied. It also checks that the input stays unchanged. A failing case sets a nonzero exit code.

**Hints**

- Count all task frequencies before counting ties for the maximum.
- Remember the final copy of every task type tied at the maximum.
- The schedule can never be shorter than the number of tasks.
