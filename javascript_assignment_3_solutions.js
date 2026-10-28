"use strict";

/* ==========================================================================
   ASSIGNMENT 3: JAVASCRIPT SOLUTIONS & DEBUGGING GUIDE
   ========================================================================== */

// ==========================================================================
// Q1 - DYNAMIC DATA PARSER
// ==========================================================================
console.log("==================== Q1: Dynamic Data Parser ====================");

const apiData = ["25", "true", "false", "NaN", "", "100px", "3.14", null, undefined];

const validNumericData = [];
const invalidNumericData = [];

console.log("\n--- Data Type Conversions ---");
apiData.forEach((item, index) => {
    // 1. Convert each value into Number, Boolean, and String
    const numVal = Number(item);
    const boolVal = Boolean(item);
    const strVal = String(item);

    console.log(`[Index ${index}] Original: ${JSON.stringify(item)}`);
    console.log(`  -> Number: ${numVal} | Boolean: ${boolVal} | String: "${strVal}"`);

    // 2. Strict check for valid numbers:
    // Skip empty strings/spaces, strings with letters ("100px"), NaN, null, and undefined.
    const isStrictlyValidNumber = 
        item !== null && 
        item !== undefined && 
        typeof item !== "boolean" &&
        String(item).trim() !== "" && 
        !isNaN(Number(item));

    if (isStrictlyValidNumber) {
        validNumericData.push(numVal);
    } else {
        invalidNumericData.push({
            originalValue: item,
            reason: isNaN(numVal) ? "Evaluates to NaN" : "Empty/Non-numeric format"
        });
    }
});

console.log("\n--- Detailed Summary Report ---");
console.log("Valid Numeric Data Array:", validNumericData);
console.log("Invalid Data Entries:", invalidNumericData);


// ==========================================================================
// Q2 - EMPLOYEE BONUS CALCULATOR
// ==========================================================================
console.log("\n==================== Q2: Employee Bonus Calculator ====================");

const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" },
    { name: "InvalidEmp", salary: "abc", years: "4" } // Test case for error handling
];

function processEmployeeBonus(empList) {
    empList.forEach((emp, index) => {
        try {
            // Strict Validation for missing properties
            if (!emp.name || emp.salary === undefined || emp.years === undefined) {
                throw new Error(`Missing required property in employee record at index ${index}`);
            }

            // Convert string inputs to numbers
            const salaryNum = Number(emp.salary);
            const yearsNum = Number(emp.years);

            // Validate numeric conversion success
            if (isNaN(salaryNum) || isNaN(yearsNum)) {
                throw new Error(`Invalid numeric data for salary or years for employee: ${emp.name}`);
            }

            // Calculate bonus: 10% if years > 3, else 5%
            const bonusRate = yearsNum > 3 ? 0.10 : 0.05;
            const bonusAmount = salaryNum * bonusRate;
            const totalCompensation = salaryNum + bonusAmount;

            console.log(`Employee: ${emp.name} | Salary: ₹${salaryNum} | Service: ${yearsNum} yrs | Bonus: ₹${bonusAmount} | Total: ₹${totalCompensation}`);

        } catch (error) {
            console.error(`[ERROR] Processing Failed for index ${index}: ${error.message}`);
        }
    });
}

processEmployeeBonus(employees);


// ==========================================================================
// Q3 - TRANSACTION VALIDATOR
// ==========================================================================
console.log("\n==================== Q3: Transaction Validator ====================");

const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

const validTransactions = [];
const invalidTransactions = [];

transactions.forEach((tx, index) => {
    try {
        // Breakpoint Observation Note:
        // Set a breakpoint here in VS Code to watch 'tx', 'validTransactions.length', and 'invalidTransactions.length'
        
        if (tx === null || tx === undefined) {
            throw new Error("Null or Undefined transaction entry detected.");
        }
        if (tx.id === undefined || tx.amount === undefined) {
            throw new Error(`Missing mandatory property ('id' or 'amount') at entry index ${index}`);
        }
        if (typeof tx.amount !== "number" || isNaN(tx.amount)) {
            throw new Error(`Invalid amount type for Transaction ID ${tx.id}`);
        }
        if (tx.amount < 0) {
            throw new Error(`Negative amount prohibited. Transaction ID ${tx.id} has amount ${tx.amount}`);
        }

        validTransactions.push(tx);

    } catch (err) {
        invalidTransactions.push({
            transactionData: tx,
            errorReason: err.message
        });
    }
});

console.log("\n--- Transaction Validation Report ---");
console.log(`Successful Transactions Count: ${validTransactions.length}`, validTransactions);
console.log(`Failed Transactions Count: ${invalidTransactions.length}`, invalidTransactions);


// ==========================================================================
// Q4 - DEBUGGING MYSTERY
// ==========================================================================
console.log("\n==================== Q4: Debugging Mystery ====================");

/*
Original Problem Code:
function showMessage() {
    greeting = "Welcome"; // Error under "use strict"!
    console.log(greeting);
}
showMessage();

Reason for Error:
In non-strict mode, assigning a value to an undeclared variable (`greeting = "Welcome"`) 
creates an implicit global variable attached to `window`/`globalThis`.
Under "use strict", implicit global creation is strictly forbidden to prevent global namespace pollution 
and accidental variable overrides. It throws a `ReferenceError: greeting is not defined`.
*/

// Fixed Version with proper variable scoping:
function showMessageFixed() {
    let greeting = "Welcome"; // Declared within function block scope
    console.log(`[Fixed showMessage]: ${greeting}`);
}

showMessageFixed();

/*
Debugging & Call Stack Observations:
1. When `showMessageFixed()` is invoked, a new execution context is pushed onto the Call Stack.
2. Scope rules dictate `greeting` is created inside the Local scope of `showMessageFixed`.
3. In VS Code Debugger: Watch variable `greeting` transitions from `undefined` (uninitialized step) to `"Welcome"`.
4. When the function finishes execution, its frame is popped off the Call Stack.
*/


// ==========================================================================
// Q5 - HOISTING LAB: THE SEQUENCE TRAP
// ==========================================================================
console.log("\n==================== Q5: Hoisting Lab ====================");

/*
Problem Code Analysis:
{ console.log("Game started"); }
console.log(score);
announce();
var score = 50;
function announce() {
    let status = "ready";
    startGame();
    function startGame() {
        console.log(status);
    }
}

Hoisting & Memory Allocation Explanation:
1. Function declarations (`announce`, `startGame`) are fully hoisted along with their function body.
2. `var score` is hoisted to the top of its scope, initialized with `undefined`. 
   `console.log(score)` prints `undefined` because assignment (`score = 50`) happens later.
3. `let status` inside `announce` is hoisted to the block top but remains in the Temporal Dead Zone (TDZ). 
   Accessing it before declaration causes a ReferenceError.
*/

// Fixed Version using ES5 Function Declarations:
var score = 50; // Proper position/initialization

function announceFixed() {
    let status = "ready";
    
    function startGame() {
        console.log(`[Q5 Fixed] Game status: ${status}`);
    }
    
    startGame();
}

console.log(`[Q5 Fixed] Score: ${score}`);
announceFixed();

// Refactored Version using Arrow Functions (Demonstrating TDZ Behavior):
console.log("\n--- Arrow Function Hoisting Comparison ---");

const scoreArrow = 50;

const startGameArrow = (status) => {
    console.log(`[Q5 Arrow] Game status: ${status}`);
};

const announceArrow = () => {
    const status = "ready";
    startGameArrow(status);
};

// Arrow functions assigned to let/const are NOT hoisted with initialization.
// They must be declared BEFORE being called, eliminating hoisting surprises.
announceArrow();


// ==========================================================================
// Q6 - PYRAMID PATTERN GENERATOR
// ==========================================================================
console.log("\n==================== Q6: Pyramid Pattern Generator ====================");

function generatePyramid(rows = 5) {
    console.log(`Generating Pyramid with ${rows} rows:`);
    
    // Using strict mode to force explicit variable declarations
    for (let i = 1; i <= rows; i++) {
        let line = "";
        for (let j = 1; j <= i; j++) {
            line += "*";
        }
        console.log(line);
    }
}

generatePyramid(5);

/*
Observation when replacing 'let' with 'var':
If `var` is used inside loops (e.g., `for (var i = 0...)`), `i` is function-scoped rather than block-scoped.
This means `i` leaks outside the loop block and persists across iterations, potentially causing 
variable pollution or unexpected value re-use in nested loops if variable names overlap.
*/


// ==========================================================================
// Q7 - SMART CALCULATOR
// ==========================================================================
console.log("\n==================== Q7: Smart Calculator ====================");

// Custom Error Class
class InvalidOperationError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidOperationError";
    }
}

function smartCalculate(operation, num1, num2) {
    try {
        switch (operation) {
            case "add":
                return num1 + num2;
            case "subtract":
                return num1 - num2;
            case "multiply":
                return num1 * num2;
            case "divide":
                if (num2 === 0) {
                    throw new Error("DivisionByZeroError: Cannot divide by zero.");
                }
                return num1 / num2;
            case "power":
                return Math.pow(num1, num2);
            case "root":
                if (num1 < 0) {
                    throw new Error("DomainError: Cannot compute square root of a negative number.");
                }
                return Math.sqrt(num1);
            default:
                throw new InvalidOperationError(`Operation '${operation}' is not recognized.`);
        }
    } catch (err) {
        return `[ERROR] ${err.name}: ${err.message}`;
    }
}

const operationsList = ["add", "divide", "power", "root", "subtract", "modulo"];
const n1 = 25, n2 = 0;

operationsList.forEach(op => {
    const result = smartCalculate(op, n1, n2);
    console.log(`Op: '${op}' | Inputs: (${n1}, ${n2}) => Result: ${result}`);
});


// ==========================================================================
// Q8 - STRICT MODE SHOWDOWN
// ==========================================================================
console.log("\n==================== Q8: Strict Mode Showdown ====================");

/*
Problematic Code under Non-Strict Mode vs Strict Mode:

1. Duplicate Parameters:
   function demo(a, a) { ... }
   - Non-Strict: Allowed! The second parameter `a` silently overwrites the first.
   - Strict Mode: Throws SyntaxError: Duplicate parameter name not allowed in this context.

2. Undeclared Variables:
   total = 10;
   - Non-Strict: Implicitly creates global variable `window.total`.
   - Strict Mode: Throws ReferenceError: total is not defined.

3. Deleting Unqualified Identifiers:
   delete total;
   - Non-Strict: Returns false or deletes global property.
   - Strict Mode: Throws SyntaxError: Delete of an unqualified identifier in strict mode.
*/

// Modern ES6 Compliant Code:
const demoES6 = (a, b) => {
    const total = a + b;
    console.log(`[ES6 Demo] Sum of ${a} and ${b} is: ${total}`);
    return total;
};

demoES6(5, 10);


// ==========================================================================
// Q9 - JSON AUDIT
// ==========================================================================
console.log("\n==================== Q9: JSON Audit ====================");

const rawData = [
    '{"user":"Alex", "age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina", "age": "22"}',
    '{"user":"Sam", "age": 16}'
];

const cleanUserData = [];

rawData.forEach((jsonString, index) => {
    const lineNumber = index + 1; // 1-based indexing for line reporting
    try {
        // Parse JSON safely
        const parsed = JSON.parse(jsonString);

        // Validate required keys
        if (!parsed.hasOwnProperty("user") || !parsed.hasOwnProperty("age")) {
            throw new Error(`Missing required keys ('user' or 'age')`);
        }

        // Bonus: Convert age to Number and validate
        const numericAge = Number(parsed.age);
        if (isNaN(numericAge)) {
            throw new Error(`Invalid age value: ${parsed.age}`);
        }

        parsed.age = numericAge;

        // Filter under-18 users
        if (parsed.age < 18) {
            console.warn(`[Line ${lineNumber}] User '${parsed.user}' filtered out (Under 18: ${parsed.age})`);
            return;
        }

        cleanUserData.push(parsed);

    } catch (err) {
        console.error(`[Line ${lineNumber} Error] Parsing failed: ${err.message} | Input: "${jsonString}"`);
    }
});

console.log("\nFinal Clean Adults Data Array:", cleanUserData);


// ==========================================================================
// Q10 - NESTED HOISTING AND CLOSURES
// ==========================================================================
console.log("\n==================== Q10: Nested Hoisting and Closures ====================");

/*
Original Code Analysis:
function outer() {
    console.log(count); // Output 1
    var count = 5;
    function inner() {
        console.log(count); // Output 2
        var count = 10;
    }
    inner();
}
outer();

Step-by-Step Execution & Output Prediction:
1. When outer() is called:
   - Variable `var count` in outer scope is hoisted to the top of outer() with value `undefined`.
   - First `console.log(count)` prints: `undefined`.
   - `count` is then assigned the value `5`.

2. When inner() is called:
   - A new Execution Context is created for inner().
   - Variable `var count` inside inner() is hoisted to the top of inner()'s local scope with value `undefined`.
   - Second `console.log(count)` looks at inner()'s local scope first (shadowing outer scope), so it prints: `undefined`.
   - `count` inside inner() is then assigned the value `10`.

Final Output:
undefined
undefined
*/

// Demonstration of Original Behavior:
console.log("--- Original Behavior Execution ---");
function outerOriginal() {
    console.log("Outer count before declaration:", count); // undefined
    var count = 5;
    function inner() {
        console.log("Inner count before declaration:", count); // undefined
        var count = 10;
    }
    inner();
}
outerOriginal();

// Refactoring inner function to an Arrow Function and lexical scoping analysis:
console.log("\n--- Arrow Function Scoping Comparison ---");
function outerRefactored() {
    let count = 5;

    // Arrow function inheriting lexical scope without re-declaring local count
    const innerArrow = () => {
        console.log("Inner arrow function sees outer count:", count); // 5
    };

    innerArrow();
}
outerRefactored();

/*
Call Stack and Debug Session Steps:
1. Entry point -> Global Execution Context.
2. Call `outer()` -> `outer` frame added to Call Stack. Local variable `count` initialized (`undefined` -> `5`).
3. Call `inner()` -> `inner` frame added on top of `outer` frame on Call Stack.
4. `inner` creates its own scope. Its local `count` shadows `outer`'s `count`.
5. `inner()` finishes -> popped off stack.
6. `outer()` finishes -> popped off stack.
*/