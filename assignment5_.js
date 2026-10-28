/**
 ==============================================================================
                          ASSIGNMENT 5 SOLUTIONS
 ==============================================================================
 Instructions: All solutions are consolidated into this single file.
 Core JavaScript (ES6+) is used throughout with descriptive variable names,
 structured execution blocks, and detailed comments explaining logic, closure,
 prototype chains, and 'this' binding.
 ==============================================================================
*/

console.log("==================================================================");
console.log("                 ASSIGNMENT 5 COMPLETE SOLUTIONS                   ");
console.log("==================================================================\n");

// ============================================================================
// Q1: Callback Flow - greetUser
// ============================================================================
console.log("--- Q1: Callback Flow ---");

/**
 * Executes a main greeting and then triggers a callback.
 * @param {string} name - The user's name.
 * @param {Function} callback - The callback function to execute after greeting.
 */
function greetUser(name, callback) {
    console.log(`Hello ${name}`);
    if (typeof callback === "function") {
        callback(); // Invoking the callback function
    }
}

function showEndMessage() {
    console.log("Welcome to the course!");
}

// Demonstration of callback execution flow:
// greetUser receives showEndMessage as a reference and calls it after log.
greetUser("Alice", showEndMessage);
console.log();

// ============================================================================
// Q2: Higher-Order Functions & Callbacks - applyOperation
// ============================================================================
console.log("--- Q2: applyOperation ---");

/**
 * Applies a custom callback operation on each element of an array.
 * @param {number[]} numbers - Array of numbers to transform.
 * @param {Function} operation - Callback defining transformation for a single element.
 * @returns {number[]} New array with transformed values.
 */
function applyOperation(numbers, operation) {
    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(operation(numbers[i]));
    }
    return result;
}

const inputNumbers = [1, 2, 3, 4];

// Doubling numbers using callback
const doubledNumbers = applyOperation(inputNumbers, function (num) {
    return num * 2;
});

// Squaring numbers using arrow function callback
const squaredNumbers = applyOperation(inputNumbers, num => num * num);

console.log("Original Numbers:", inputNumbers);
console.log("Doubled Numbers: ", doubledNumbers);
console.log("Squared Numbers: ", squaredNumbers);
console.log();

// ============================================================================
// Q3: Object 'this' Context with Arrow vs Normal Functions
// ============================================================================
console.log("--- Q3: Arrow Function vs Normal Function 'this' Binding ---");

// Broken Version using Arrow Function
const userWithArrow = {
    name: "Rahul",
    showName: () => {
        // Arrow functions do NOT have their own 'this' context.
        // They lexically bind 'this' from the enclosing (outer/global) scope,
        // where 'this.name' is undefined in strict mode or global window scope.
        console.log("Arrow Function output - this.name:", this ? this.name : undefined);
    }
};

userWithArrow.showName(); // Logs: undefined

// Fixed Version using Normal Function
const userWithNormalFunction = {
    name: "Rahul",
    showName: function () {
        // Normal functions bind 'this' dynamically to the object calling the method (userWithNormalFunction).
        console.log("Normal Function output - this.name:", this.name);
    }
};

userWithNormalFunction.showName(); // Logs: Rahul
console.log();

// ============================================================================
// Q4: Constructor Function & Prototype Method Sharing
// ============================================================================
console.log("--- Q4: Constructor Function & Prototype Sharing ---");

/**
 * Car constructor function.
 * @param {string} brand - Car manufacturer.
 * @param {string} model - Car model name.
 */
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// Adding getDetails method to Car's prototype so it is shared across all instances
Car.prototype.getDetails = function () {
    return `Car: ${this.brand} ${this.model}`;
};

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Tesla", "Model 3");

console.log(car1.getDetails());
console.log(car2.getDetails());

// Proof that both instances share the exact same method instance in memory
console.log("Do both instances share the exact same getDetails method reference?", car1.getDetails === car2.getDetails);
console.log();

// ============================================================================
// Q5: Prototype Inheritance (Person -> Student)
// ============================================================================
console.log("--- Q5: Person -> Student Prototype Inheritance ---");

// Base Constructor: Person
function Person(name) {
    this.name = name;
}

Person.prototype.printName = function () {
    console.log(`Person Name: ${this.name}`);
};

// Derived Constructor: Student
function Student(name, branch) {
    // Call super constructor to initialize base properties
    Person.call(this, name);
    this.branch = branch;
}

// Link prototypes: Student.prototype inherits from Person.prototype
Student.prototype = Object.create(Person.prototype);

// Restore constructor property back to Student
Student.prototype.constructor = Student;

// Add method specific to Student prototype
Student.prototype.printBranch = function () {
    console.log(`Student Branch: ${this.branch}`);
};

const studentObj = new Student("Ananya", "Computer Science");
studentObj.printName();   // Inherited from Person prototype chain
studentObj.printBranch(); // Defined on Student prototype

console.log("Instance of Student?", studentObj instanceof Student);
console.log("Instance of Person?", studentObj instanceof Person);
console.log();

// ============================================================================
// Q6: Multi-level Prototype Chain (Person -> Faculty -> Professor)
// ============================================================================
console.log("--- Q6: Multi-level Prototype Chain ---");

// Base Level: Person
function BasePerson(name) {
    this.name = name;
}
BasePerson.prototype.describePerson = function () {
    console.log(`[BasePerson] Name: ${this.name}`);
};

// Level 2: Faculty inherits BasePerson
function Faculty(name, department) {
    BasePerson.call(this, name);
    this.department = department;
}
Faculty.prototype = Object.create(BasePerson.prototype);
Faculty.prototype.constructor = Faculty;
Faculty.prototype.describeFaculty = function () {
    console.log(`[Faculty] Department: ${this.department}`);
};

// Level 3: Professor inherits Faculty
function Professor(name, department, researchArea) {
    Faculty.call(this, name, department);
    this.researchArea = researchArea;
}
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.describeProfessor = function () {
    console.log(`[Professor] Research Area: ${this.researchArea}`);
};

const prof = new Professor("Dr. Sharma", "Computer Science", "Artificial Intelligence");

// Calling methods up the prototype chain
prof.describeProfessor(); // Found on Professor.prototype
prof.describeFaculty();   // Found on Faculty.prototype
prof.describePerson();    // Found on BasePerson.prototype
console.log();

// ============================================================================
// Q7: Closures - makeMultiplier
// ============================================================================
console.log("--- Q7: Closure Demonstration ---");

/**
 * Creates a function that multiplies its argument by a preset multiplier.
 * @param {number} multiplier - Value to multiply by.
 * @returns {Function} Inner function capturing 'multiplier' via closure.
 */
function makeMultiplier(multiplier) {
    // The returned inner function forms a closure. It "remembers" and accesses
    // the variable `multiplier` from its outer lexical scope even after makeMultiplier has finished executing.
    return function (number) {
        return number * multiplier;
    };
}

const triple = makeMultiplier(3);
const double = makeMultiplier(2);

console.log("Triple 5:", triple(5)); // Output: 15
console.log("Double 5:", double(5)); // Output: 10
console.log();

// ============================================================================
// Q8: Custom Prototype Method - myMap
// ============================================================================
console.log("--- Q8: Array.prototype.myMap Implementation ---");

/**
 * Polyfill for Array.prototype.map
 * @param {Function} callback - Function executed on each element: (element, index, array)
 * @returns {Array} New transformed array.
 */
Array.prototype.myMap = function (callback) {
    if (typeof callback !== "function") {
        throw new TypeError(`${callback} is not a function`);
    }

    const resultArray = [];
    // 'this' inside custom method points to the array calling myMap
    for (let i = 0; i < this.length; i++) {
        if (i in this) { // Handles sparse arrays correctly
            resultArray.push(callback(this[i], i, this));
        }
    }
    return resultArray;
};

const testArray = [1, 2, 3];
const mappedArray = testArray.myMap(num => num * 2);

console.log("Original Array:", testArray);
console.log("myMap Result:  ", mappedArray);
console.log();

// ============================================================================
// Q9: ES6 Classes Inheritance (Person & Student)
// ============================================================================
console.log("--- Q9: ES6 Class Inheritance ---");

class ClassPerson {
    constructor(name) {
        this.name = name;
    }

    printName() {
        console.log(`Class Person Name: ${this.name}`);
    }
}

class ClassStudent extends ClassPerson {
    constructor(name, branch) {
        super(name); // Invokes ClassPerson's constructor
        this.branch = branch;
    }

    printBranch() {
        console.log(`Class Student Branch: ${this.branch}`);
    }
}

const classStudentObj = new ClassStudent("Siddharth", "Information Technology");

classStudentObj.printName();   // Inherited via class extension
classStudentObj.printBranch(); // Defined on ClassStudent

console.log("Class Instance of ClassStudent?", classStudentObj instanceof ClassStudent);
console.log("Class Instance of ClassPerson?", classStudentObj instanceof ClassPerson);
console.log("Under the hood type of ClassStudent:", typeof ClassStudent); // Outputs "function" (Prototypal under syntactic sugar)
