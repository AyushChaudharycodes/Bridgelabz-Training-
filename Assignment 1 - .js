"use strict";

/*
 * ASSIGNMENT 1 — ALL SOLUTIONS
 * Run this complete file in Node.js or paste one section at a time
 * into the browser console. Each question is wrapped in a block so
 * that variables with the same name do not conflict.
 */


// ============================================================
// Q1. Personalized Login Greeting
// ============================================================
{
    const userName = "Aarav";
    const currentHour = new Date().getHours();
    let greeting;

    // Select a greeting according to the current hour (0–23).
    if (currentHour < 12) {
        greeting = `Good Morning ${userName}!`;
    } else if (currentHour >= 12 && currentHour <= 17) {
        greeting = `Good Afternoon ${userName}!`;
    } else {
        greeting = `Good Evening ${userName}!`;
    }

    console.log("Q1. Personalized Login Greeting");
    console.log(greeting);
}


// ============================================================
// Q2. Multi-Type Data Summary
// ============================================================
{
    const userName = "Aarav";
    const userAge = 20;
    const isActive = true;
    const hobbies = ["Reading", "Cycling"];
    const address = { city: "Delhi", country: "India" };
    const middleName = null;
    let phoneNumber;

    // typeof identifies primitive types; Array.isArray distinguishes
    // arrays from objects, and null needs its own explicit check.
    function getDataType(value) {
        if (Array.isArray(value)) {
            return "array";
        }
        if (value === null) {
            return "null";
        }
        return typeof value;
    }

    const dataSummary = [
        { Label: "User name", Value: userName, Type: getDataType(userName) },
        { Label: "User age", Value: userAge, Type: getDataType(userAge) },
        { Label: "Active status", Value: isActive, Type: getDataType(isActive) },
        { Label: "Hobbies", Value: hobbies, Type: getDataType(hobbies) },
        { Label: "Address", Value: address, Type: getDataType(address) },
        { Label: "Middle name", Value: middleName, Type: getDataType(middleName) },
        { Label: "Phone number", Value: phoneNumber, Type: getDataType(phoneNumber) }
    ];

    console.log("\nQ2. Multi-Type Data Summary");
    console.table(dataSummary);
}


// ============================================================
// Q3. Monthly Expense Tracker
// ============================================================
{
    const expenses = [
        { category: "Food", amount: 4500 },
        { category: "Travel", amount: 1800 },
        { category: "Rent", amount: 12000 },
        { category: "Bills", amount: 2500 },
        { category: "Leisure", amount: 1600 }
    ];

    let totalExpenses = 0;

    // += adds each category's expense to the running total.
    for (const expense of expenses) {
        totalExpenses += expense.amount;
    }

    const averageExpense = totalExpenses / expenses.length;
    let finalAmount = totalExpenses;

    // Add 10% tax to the total using arithmetic and assignment operators.
    finalAmount += finalAmount * 0.10;

    console.log("\nQ3. Monthly Expense Tracker");
    console.log(`Total expenses: ₹${totalExpenses.toFixed(2)}`);
    console.log(`Average expense: ₹${averageExpense.toFixed(2)}`);
    console.log(`Final amount after 10% tax: ₹${finalAmount.toFixed(2)}`);
}


// ============================================================
// Q4. Academic Performance Evaluator
// ============================================================
{
    const marks = [78, 85, 91, 88, 82];
    const maximumMarksPerSubject = 100;
    let totalMarks = 0;

    for (const mark of marks) {
        totalMarks += mark;
    }

    const averageMarks = totalMarks / marks.length;
    const overallPercentage =
        (totalMarks / (marks.length * maximumMarksPerSubject)) * 100;

    // A mark below 35 in any subject overrides the average-based result.
    const hasFailedSubject = marks.some((mark) => mark < 35);
    let result;

    if (hasFailedSubject || overallPercentage < 50) {
        result = "Detained";
    } else if (overallPercentage >= 85) {
        result = "Promoted with Distinction";
    } else {
        result = "Promoted";
    }

    console.log("\nQ4. Academic Performance Evaluator");
    console.log(`Average marks: ${averageMarks.toFixed(2)}`);
    console.log(`Overall percentage: ${overallPercentage.toFixed(2)}%`);
    console.log(`Result: ${result}`);
}


// ============================================================
// Q5. Weather Activity Planner
// ============================================================
{
    const temperature = 28;
    const isRaining = false;
    const windSpeed = 12;
    let activityAdvice;

    // || validates the inputs; && combines the cold-and-windy conditions.
    if (windSpeed < 0 || temperature < -100 || temperature > 60) {
        activityAdvice = "Invalid weather data.";
    } else if (isRaining) {
        activityAdvice = "Stay indoors with hot coffee.";
    } else if (temperature > 35) {
        activityAdvice = "Go swimming.";
    } else if (temperature < 15 && windSpeed > 20) {
        activityAdvice = "Too cold and windy — stay home.";
    } else {
        activityAdvice = "Perfect day for a walk.";
    }

    console.log("\nQ5. Weather Activity Planner");
    console.log(activityAdvice);
}


// ============================================================
// Q6. Progressive Discount System
// ============================================================
{
    const originalTotal = 7500;
    let discountPercentage;

    // Test the highest tiers first so only the correct discount is used.
    if (originalTotal >= 10000) {
        discountPercentage = 25;
    } else if (originalTotal >= 5000) {
        discountPercentage = 15;
    } else if (originalTotal >= 2000) {
        discountPercentage = 5;
    } else {
        discountPercentage = 0;
    }

    const discountAmount = originalTotal * (discountPercentage / 100);
    const finalPrice = Math.round(originalTotal - discountAmount);

    console.log("\nQ6. Progressive Discount System");
    console.log(`Original total: ₹${Math.round(originalTotal)}`);
    console.log(`Discount percentage: ${discountPercentage}%`);
    console.log(`Final price after discount: ₹${finalPrice}`);
}


// ============================================================
// Q7. Smart Guessing Game (Number Range)
// ============================================================
{
    const secretNumber = Math.floor(Math.random() * 50) + 1;
    const userGuess = 25;

    console.log("\nQ7. Smart Guessing Game (Number Range)");
    console.log(`Secret number (shown for testing): ${secretNumber}`);
    console.log(`Your guess: ${userGuess}`);

    // Nested conditions first check equality, then the ±3 close range.
    if (userGuess === secretNumber) {
        console.log("Correct guess!");
    } else {
        if (userGuess >= secretNumber - 3 && userGuess <= secretNumber + 3) {
            console.log("Very close!");
        } else if (userGuess > secretNumber) {
            console.log("Too high");
        } else {
            console.log("Too low");
        }
    }
}


// ============================================================
// Q8. Employee Salary Projection
// ============================================================
{
    const annualIncrementRate = 10;
    let currentSalary = 300000;
    const salaryProjection = [];

    // Calculate the salary at the end of each year for five years.
    for (let year = 1; year <= 5; year++) {
        currentSalary += currentSalary * (annualIncrementRate / 100);
        currentSalary = Math.round(currentSalary);

        salaryProjection.push({
            Year: year,
            "Projected Salary (₹)": currentSalary
        });
    }

    console.log("\nQ8. Employee Salary Projection");
    console.table(salaryProjection);
}


// ============================================================
// Q9. Random Math Quiz Generator
// ============================================================
{
    const firstNumber = Math.floor(Math.random() * 20) + 1;
    const secondNumber = Math.floor(Math.random() * 20) + 1;
    const operators = ["+", "-", "*", "/"];
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    let correctAnswer;

    // Select the arithmetic operation with a switch statement.
    switch (randomOperator) {
        case "+":
            correctAnswer = firstNumber + secondNumber;
            break;
        case "-":
            correctAnswer = firstNumber - secondNumber;
            break;
        case "*":
            correctAnswer = firstNumber * secondNumber;
            break;
        case "/":
            correctAnswer = (firstNumber / secondNumber).toFixed(2);
            break;
        default:
            correctAnswer = "Invalid operator";
    }

    // Change this test value to check different user answers.
    const userAnswer = 10;
    const isAnswerCorrect = Number(userAnswer) === Number(correctAnswer);

    console.log("\nQ9. Random Math Quiz Generator");
    console.log(`Question: ${firstNumber} ${randomOperator} ${secondNumber} = ?`);
    console.log(`Your answer: ${userAnswer}`);
    console.log(`Correct answer: ${correctAnswer}`);
    console.log(isAnswerCorrect ? "Your answer is correct!" : "Your answer is incorrect.");
}


// ============================================================
// Q10. Citizen Eligibility Validator
// ============================================================
{
    const age = 19;
    const isCitizen = true;
    let eligibilityMessage;

    /*
     * The supplied rules overlap for citizens aged 18–20. To preserve both
     * outcomes, this solution uses age 21+ for all services and ages 18–20
     * for vote-only eligibility. Driving/passport ages vary by jurisdiction,
     * so this threshold can be changed to match the applicable local rules.
     */
    if (isCitizen) {
        if (age >= 21) {
            eligibilityMessage = "Eligible for all services.";
        } else if (age >= 18 && age <= 20) {
            eligibilityMessage = "Eligible to vote only.";
        } else {
            eligibilityMessage = "Not eligible yet.";
        }
    } else {
        if (age >= 18) {
            eligibilityMessage = "Only age criteria met.";
        } else {
            eligibilityMessage = "Not eligible yet.";
        }
    }

    console.log("\nQ10. Citizen Eligibility Validator");
    console.log(eligibilityMessage);
}
