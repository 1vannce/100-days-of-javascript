### Day 25: Implement Queue using Stacks

Implement a first in, first out (FIFO) queue using only two standard stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:

- `void push(int x)` Pushes element `x` to the back of the queue.
- `int pop()` Removes the element from the front of the queue and returns it.
- `int peek()` Returns the element at the front of the queue.
- `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.

**Crucial Notes:**

- You must use **only standard operations of a stack** — which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
- In JavaScript, simulate a stack using standard array operations strictly limited to `push()` and `pop()`. Do **not** use `shift()` or `unshift()`, as those are $O(n)$ queue operations natively.
- Can you implement the queue such that each operation is **amortized $O(1)$** time complexity?

**Examples**

```javascript
const myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

**Constraints**

- $1 \le x \le 9$
- At most $100$ calls will be made to `push`, `pop`, `peek`, and `empty`.
- All calls to `pop` and `peek` are valid (the queue will not be empty when either is called).
- Time Complexity: Amortized $O(1)$ for each operation.
- Space Complexity: $O(n)$ where $n$ is the number of elements in the queue.

**Starter Code**

```javascript
class MyQueue {
  constructor() {
    // Initialize your two stacks here
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    // Write your code here
  }

  /**
   * @return {number}
   */
  pop() {
    // Write your code here
  }

  /**
   * @return {number}
   */
  peek() {
    // Write your code here
  }

  /**
   * @return {boolean}
   */
  empty() {
    // Write your code here
  }
}
```

---

**Automated Test Harness for Zed**

Paste this at the bottom of your file to run and inspect your test cases cleanly:

```javascript
const operations = [
  { action: "push", arg: 1, expected: null },
  { action: "push", arg: 2, expected: null },
  { action: "peek", expected: 1 },
  { action: "pop", expected: 1 },
  { action: "empty", expected: false },
  { action: "push", arg: 3, expected: null },
  { action: "pop", expected: 2 },
  { action: "pop", expected: 3 },
  { action: "empty", expected: true },
];

const q = new MyQueue();

console.table(
  operations.map(({ action, arg, expected }) => {
    let actual = null;
    if (action === "push") {
      q.push(arg);
    } else if (action === "pop") {
      actual = q.pop();
    } else if (action === "peek") {
      actual = q.peek();
    } else if (action === "empty") {
      actual = q.empty();
    }

    const passed = action === "push" ? true : actual === expected;

    return {
      Action: action,
      Argument: arg !== undefined ? arg : "-",
      Expected: expected !== null ? expected : "-",
      Actual: actual !== null ? actual : "-",
      Passed: passed ? "PASS" : "FAIL",
    };
  }),
);
```

---

**Hints**

- **Two Specialized Stacks:** Name your stacks `this.inStack = []` and `this.outStack = []`.
- **Enqueue (Push):** Pushing is trivial—always append incoming elements directly to `this.inStack.push(x)`. This runs in strictly $O(1)$.
- **Dequeue (Pop/Peek):** Elements in `inStack` are in reverse order of output. If `this.outStack` is empty, drain `this.inStack` by popping every element one by one and pushing it into `this.outStack`. Now the top of `outStack` is the true front of the queue!
- **Amortized $O(1)$:** Each element is pushed and popped at most twice throughout its lifecycle across both stacks, guaranteeing that average operations remain $O(1)$.
- **Empty Check:** The entire queue is empty if and only if **both** `this.inStack.length === 0` and `this.outStack.length === 0`.
