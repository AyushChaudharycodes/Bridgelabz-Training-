"use strict";

/*
 * ASSIGNMENT 2 — ALL SOLUTIONS
 * Run this complete file in Node.js or paste one section at a time
 * into the browser console. No external libraries are required.
 */


// ============================================================
// Q1. Scope Conflict Resolver
// ============================================================

// This variable has global scope and can be accessed inside functions.
var bonus = 5000;

function calculateSalary(isPermanent) {
    // salary and the isPermanent parameter have local function scope.
    const salary = 40000;
    let totalSalary = salary;

    if (isPermanent) {
        totalSalary += bonus;
    }

    console.log(`Is permanent: ${isPermanent}`);
    console.log(`Total salary: ₹${totalSalary}`);
}

console.log("Q1. Scope Conflict Resolver");
calculateSalary(true);
calculateSalary(false);

// Changing the local isPermanent value does not change the global bonus.
console.log(`Global bonus remains unchanged: ₹${bonus}`);


// ============================================================
// Q2. String Manipulation Report
// ============================================================
{
    const productName = " wireless headphones PRO ";

    // Trim and lowercase the input, then capitalize each word using map().
    const titleCasedName = productName
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // The case-insensitive expression also matches the original uppercase PRO.
    const cleanedTitle = titleCasedName.replace(/\bpro\b/i, "Pro Edition");

    console.log("\nQ2. String Manipulation Report");
    console.log(`Cleaned title: ${cleanedTitle}`);
    console.log(`Title length: ${cleanedTitle.length}`);
}


// ============================================================
// Q3. Math Utility Dashboard
// ============================================================
{
    const x = 16.75;
    const roundedValue = Math.round(x);
    const squareRoot = Math.sqrt(x);
    const cubedValue = Math.pow(x, 3);
    const randomNumber = Math.floor(Math.random() * 41) + 10;

    console.log("\nQ3. Math Utility Dashboard");
    console.log(`Original number: ${x}`);
    console.log(`Rounded value: ${roundedValue}`);
    console.log(`Square root: ${squareRoot.toFixed(4)}`);
    console.log(`Power (x^3): ${cubedValue.toFixed(4)}`);
    console.log(`Random number between 10 and 50: ${randomNumber}`);
}


// ============================================================
// Q4. Array Performance Analyzer
// ============================================================
{
    // Generate eight random integer scores from 30 through 100.
    const scores = Array.from(
        { length: 8 },
        () => Math.floor(Math.random() * 71) + 30
    );

    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    const totalScore = scores.reduce((total, score) => total + score, 0);
    const averageScore = totalScore / scores.length;
    const passedStudents = scores.filter((score) => score >= 50).length;

    // map() creates a formatted report for every student.
    const studentReport = scores.map((score, index) => ({
        Student: `Student ${index + 1}`,
        Score: score,
        Result: score >= 50 ? "Pass" : "Fail"
    }));

    console.log("\nQ4. Array Performance Analyzer");
    console.table(studentReport);
    console.log(`Highest score: ${highestScore}`);
    console.log(`Lowest score: ${lowestScore}`);
    console.log(`Average score: ${averageScore.toFixed(2)}`);
    console.log(`Students who passed: ${passedStudents} out of ${scores.length}`);
}


// ============================================================
// Q5. Boolean Logic Access System
// ============================================================
{
    function checkSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
        // && checks both entry points together.
        const areEntryPointsSecure = isDoorLocked && isWindowClosed;

        // || and ! identify whether any required condition is false.
        if (!isAlarmOn || !areEntryPointsSecure || !isOwnerInside) {
            return "Unsafe";
        }

        return "Secure";
    }

    const securityTests = [
        {
            isDoorLocked: true,
            isWindowClosed: true,
            isAlarmOn: true,
            isOwnerInside: true
        },
        {
            isDoorLocked: false,
            isWindowClosed: true,
            isAlarmOn: true,
            isOwnerInside: true
        },
        {
            isDoorLocked: true,
            isWindowClosed: true,
            isAlarmOn: false,
            isOwnerInside: true
        },
        {
            isDoorLocked: true,
            isWindowClosed: false,
            isAlarmOn: true,
            isOwnerInside: false
        }
    ];

    const securityReport = securityTests.map((test, index) => ({
        Test: index + 1,
        "Door Locked": test.isDoorLocked,
        "Window Closed": test.isWindowClosed,
        "Alarm On": test.isAlarmOn,
        "Owner Inside": test.isOwnerInside,
        Status: checkSecurity(
            test.isDoorLocked,
            test.isWindowClosed,
            test.isAlarmOn,
            test.isOwnerInside
        )
    }));

    console.log("\nQ5. Boolean Logic Access System");
    console.table(securityReport);
}


// ============================================================
// Q6. Event-Based Counter Simulation
// ============================================================
{
    let count = 0;

    function increment() {
        // This nested function accesses and updates count from the outer scope.
        function addOne() {
            count += 1;
        }

        addOne();
        console.log(`Increment clicked — current count: ${count}`);
    }

    function decrement() {
        // This nested function demonstrates the same function-scope behavior.
        function subtractOne() {
            count -= 1;
        }

        subtractOne();
        console.log(`Decrement clicked — current count: ${count}`);
    }

    console.log("\nQ6. Event-Based Counter Simulation");
    console.log(`Initial count: ${count}`);

    // Manually calling the functions simulates button-click events.
    increment();
    increment();
    increment();
    decrement();
}


// ============================================================
// Q7. Customer Feedback Processor
// ============================================================
{
    const feedback = "Great product! Fast delivery and amazing sound quality!";
    const normalizedFeedback = feedback.trim().toLowerCase();

    // Split on one or more whitespace characters to count the words.
    const wordCount = normalizedFeedback.split(/\s+/).length;
    const containsNegativeWords =
        normalizedFeedback.includes("bad") || normalizedFeedback.includes("poor");

    let feedbackStatus;
    if (!containsNegativeWords) {
        feedbackStatus = "Positive Feedback";
    } else {
        feedbackStatus = "Needs Improvement";
    }

    console.log("\nQ7. Customer Feedback Processor");
    console.log(`Feedback: ${feedback}`);
    console.log(`Word count: ${wordCount}`);
    console.log(feedbackStatus);
}


// ============================================================
// Q8. Dynamic Discount Evaluator
// ============================================================
{
    const cart = [
        { item: "Laptop", category: "electronics", price: 45000 },
        { item: "Shoes", category: "fashion", price: 2500 },
        { item: "Book", category: "education", price: 600 }
    ];

    const discountedItems = [];

    // Apply the category discount to each product using a loop.
    for (const product of cart) {
        let categoryDiscountRate = 0;

        if (product.category === "electronics") {
            categoryDiscountRate = 0.10;
        } else if (product.category === "fashion") {
            categoryDiscountRate = 0.05;
        }

        const discountedPrice = product.price * (1 - categoryDiscountRate);
        discountedItems.push({
            ...product,
            categoryDiscount: categoryDiscountRate,
            discountedPrice: discountedPrice
        });
    }

    const originalTotal = cart.reduce((total, product) => total + product.price, 0);
    const discountedSubtotal = discountedItems.reduce(
        (total, product) => total + product.discountedPrice,
        0
    );

    // The extra discount applies only when the original cart value exceeds 50000.
    const extraDiscountRate = originalTotal > 50000 ? 0.05 : 0;
    const finalTotal = discountedSubtotal * (1 - extraDiscountRate);

    const itemReport = discountedItems.map((product) => ({
        Item: product.item,
        Category: product.category,
        "Original Price (₹)": product.price.toFixed(2),
        "Category Discount": `${product.categoryDiscount * 100}%`,
        "Discounted Price (₹)": product.discountedPrice.toFixed(2)
    }));

    console.log("\nQ8. Dynamic Discount Evaluator");
    console.table(itemReport);
    console.log(`Original cart total: ₹${originalTotal.toFixed(2)}`);
    console.log(`Extra overall discount: ${extraDiscountRate * 100}%`);
    console.log(`Final total: ₹${finalTotal.toFixed(2)}`);
}


// ============================================================
// Q9. Odd–Even Number Analyzer
// ============================================================
{
    const numbers = [];
    const results = [];

    // Fill the array with integers from 1 through 30.
    for (let number = 1; number <= 30; number++) {
        numbers.push(number);
    }

    for (const number of numbers) {
        let classification;

        if (number % 3 === 0 && number % 5 === 0) {
            classification = "FizzBuzz";
        } else if (number % 2 === 0) {
            classification = "Even";
        } else {
            classification = "Odd";
        }

        results.push({ Number: number, Result: classification });
    }

    console.log("\nQ9. Odd–Even Number Analyzer");
    console.table(results);
}


// ============================================================
// Q10. Departmental Employee Evaluator
// ============================================================
{
    const departments = [
        ["HR", 72],
        ["Finance", 88],
        ["Tech", 95],
        ["Support", 63]
    ];

    const evaluationReport = [];

    for (const [department, score] of departments) {
        let evaluation;

        // Nested if-else statements check each performance band in order.
        if (score >= 90) {
            evaluation = "Excellent";
        } else {
            if (score >= 75) {
                evaluation = "Good";
            } else {
                if (score >= 60) {
                    evaluation = "Average";
                } else {
                    evaluation = "Needs Improvement";
                }
            }
        }

        evaluationReport.push({ Department: department, Score: score, Evaluation: evaluation });
    }

    console.log("\nQ10. Departmental Employee Evaluator");
    console.table(evaluationReport);
}
