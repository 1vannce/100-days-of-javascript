class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.inStack.push(x);
  }

  /**
   * @return {number}
   */
  pop() {
    if (this.outStack.length === 0) {
      // Move all elements from inStack to outStack
      // This reverses the order, making the oldest element accessible
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }

  /**
   * @return {number}
   */
  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.length > 0
      ? this.outStack[this.outStack.length - 1]
      : null;
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

// Test cases
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
