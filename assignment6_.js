/**
 ==============================================================================
                          ASSIGNMENT 6 SOLUTIONS
 ==============================================================================
 Instructions: All solutions are consolidated into this single JavaScript file.
 Uses core JavaScript (ES6+) with Promises, async/await, callbacks, and error
 handling.
 ==============================================================================
*/

console.log("==================================================================");
console.log("                 ASSIGNMENT 6 COMPLETE SOLUTIONS                   ");
console.log("==================================================================\n");

// ============================================================================
// Helper utility to pause execution between questions during single-file run
// ============================================================================
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================================
// Q1 - The Startup Morning: Async Coffee Maker
// ============================================================================
async function runQ1() {
  console.log("--- Q1: Async Coffee Maker ---");

  function boilWater() {
    return new Promise((resolve, reject) => {
      console.log("Step 1: Boiling water...");
      setTimeout(() => {
        if (Math.random() < 0.1) { // 10% chance to fail for demo stability
          reject("Error: Water heater tripped!");
        } else {
          resolve("Water boiled");
        }
      }, 1000);
    });
  }

  function brewCoffee(water) {
    return new Promise((resolve, reject) => {
      console.log(`Step 2: Brewing coffee with ${water}...`);
      setTimeout(() => {
        if (Math.random() < 0.1) {
          reject("Error: Coffee beans jammed in grinder!");
        } else {
          resolve("Coffee brewed");
        }
      }, 1200);
    });
  }

  function pourInCup(coffee) {
    return new Promise((resolve, reject) => {
      console.log(`Step 3: Pouring ${coffee} into cup...`);
      setTimeout(() => {
        if (Math.random() < 0.1) {
          reject("Error: Coffee mug spilled!");
        } else {
          resolve("Coffee poured into cup");
        }
      }, 1000);
    });
  }

  // Promise chaining flow with .then() and .catch()
  await boilWater()
    .then((result) => brewCoffee(result))
    .then((result) => pourInCup(result))
    .then(() => {
      console.log("-> Coffee ready for the team!
");
    })
    .catch((error) => {
      console.error(`-> Process Failed: ${error}
`);
    });
}

// ============================================================================
// Q2 - Task Scheduler: Micro vs Macro Challenge
// ============================================================================
function runQ2() {
  return new Promise((resolve) => {
    console.log("--- Q2: Micro vs Macro Task Order ---");

    console.log("Start");

    // Macrotask
    setTimeout(() => {
      console.log("Macrotask: setTimeout callback");
      console.log("--------------------------------------------------
");
      resolve();
    }, 0);

    // Microtask
    Promise.resolve().then(() => {
      console.log("Microtask: Promise.then callback");
    });

    // Synchronous execution
    console.log("Synchronous middle log");

    console.log("End");

    /*
      EXPLANATION OF TASK ORDER:
      1. Synchronous code ("Start", "Synchronous middle log", "End") runs first on the main thread Call Stack.
      2. The Promise callback is placed in the Microtask Queue.
      3. The setTimeout callback is placed in the Macrotask (Task) Queue.
      4. When the Call Stack clears, the Event Loop empties the Microtask Queue BEFORE taking any task from the Macrotask Queue.
      5. Therefore, Promise.then() runs before setTimeout().
    */
  });
}

// ============================================================================
// Q3 - Bug Tracker: Callback to Promise Migration
// ============================================================================
async function runQ3() {
  console.log("--- Q3: Bug Tracker (Callback -> Promise) ---");

  // Modernized Promise-based bug fetcher
  function getBugs() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isApiSuccessful = Math.random() > 0.2; // 80% success rate
        if (isApiSuccessful) {
          const bugs = [
            { id: 101, bug: "UI glitch", severity: "Low" },
            { id: 102, bug: "API timeout", severity: "High" },
            { id: 103, bug: "Login failure", severity: "Critical" }
          ];
          resolve(bugs);
        } else {
          reject("Failed to fetch bugs from server (500 Internal Server Error)");
        }
      }, 1000);
    });
  }

  await getBugs()
    .then((bugs) => {
      console.log("Bugs Fetched Successfully:");
      console.table(bugs);
      console.log();
    })
    .catch((err) => {
      console.error(`Bug Tracker Error: ${err}
`);
    });
}

// ============================================================================
// Q4 - DevOps Delay: Async Timeout Race
// ============================================================================
async function runQ4() {
  console.log("--- Q4: Concurrent Server Responses (Promise.all & Promise.race) ---");

  const serverA = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) reject("Server A crashed");
      else resolve("Server A responded in 2s");
    }, 2000);
  });

  const serverB = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) reject("Server B crashed");
      else resolve("Server B responded in 3s");
    }, 3000);
  });

  // Testing Promise.race()
  try {
    const fastest = await Promise.race([serverA, serverB]);
    console.log(`Fastest response: ${fastest}`);
  } catch (err) {
    console.error(`Race failed: ${err}`);
  }

  // Testing Promise.all()
  try {
    const allResponses = await Promise.all([serverA, serverB]);
    console.log("Deployment completed for all servers:", allResponses);
    console.log();
  } catch (err) {
    console.error(`Deployment failed: ${err}
`);
  }
}

// ============================================================================
// Q5 - Frontend Rush: Avoiding Callback Hell
// ============================================================================
async function runQ5() {
  console.log("--- Q5: Callback Hell vs Async/Await Refactoring ---");

  // --------------------------------------------------------------------------
  // Demonstration Part 1: Nested Callbacks (Callback Hell)
  // --------------------------------------------------------------------------
  function stageCallback(stageName, callback) {
    setTimeout(() => {
      console.log(`[Callback Version] Completed: ${stageName}`);
      callback();
    }, 400);
  }

  console.log("Starting Callback Hell Pipeline...");
  await new Promise((resolve) => {
    stageCallback("design", () => {
      stageCallback("build", () => {
        stageCallback("test", () => {
          stageCallback("deploy", () => {
            stageCallback("celebrate", () => {
              console.log("Callback Hell pipeline finished!
");
              resolve();
            });
          });
        });
      });
    });
  });

  // --------------------------------------------------------------------------
  // Demonstration Part 2: Refactored using Async / Await
  // --------------------------------------------------------------------------
  function runStageAsync(stageName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[Async/Await Version] Completed: ${stageName}`);
        resolve();
      }, 400);
    });
  }

  /*
    REASON WHY ASYNC/AWAIT IMPROVES READABILITY:
    1. Eliminates deep pyramid indentation ("Pyramid of Doom").
    2. Allows asynchronous code to be written sequentially like synchronous code.
    3. Simplifies error handling by wrapping multiple steps in a single try/catch block.
  */
  console.log("Starting Async/Await Clean Pipeline...");
  try {
    await runStageAsync("design");
    await runStageAsync("build");
    await runStageAsync("test");
    await runStageAsync("deploy");
    await runStageAsync("celebrate");
    console.log("Async/Await pipeline finished cleanly!
");
  } catch (err) {
    console.error("Pipeline error:", err);
  }
}

// ============================================================================
// Q6 - E-Commerce Dashboard: Product Card Fetcher
// ============================================================================
async function runQ6() {
  console.log("--- Q6: Product Card Fetcher ---");

  async function fetchProducts() {
    try {
      // Using native fetch API
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const products = await response.json();

      console.log(`Fetched ${products.length} products successfully. Sample display (first 3):`);
      // Displaying formatted product list as specified in problem statement
      products.slice(0, 3).forEach((item) => {
        console.log(`Product: ${item.title}`);
        console.log(`Price: $${item.price}`);
        console.log(`Image: ${item.image}`);
        console.log("------------------------------------");
      });

      // Bonus Note (for Browser environments):
      /*
        if (typeof document !== 'undefined') {
          const container = document.getElementById('dashboard') || document.body;
          products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
              <img src="${p.image}" alt="${p.title}" />
              <h3>${p.title}</h3>
              <p>$${p.price}</p>
            `;
            container.appendChild(card);
          });
        }
      */
      console.log();
    } catch (error) {
      console.log("Failed to load products. Please try again.");
      console.error("Debug details:", error.message, "
");
    }
  }

  await fetchProducts();
}

// ============================================================================
// Q7 - The Lazy Loader: Promise Combinator Practice
// ============================================================================
async function runQ7() {
  console.log("--- Q7: Lazy Loader with Promise.allSettled ---");

  function loadProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.3) reject("Profile Service Unavailable");
        else resolve("Profile Loaded");
      }, 1000);
    });
  }

  function loadPosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.3) reject("Posts Database Timeout");
        else resolve("Posts Loaded");
      }, 800);
    });
  }

  function loadMessages() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.3) reject("Messages Socket Error");
        else resolve("Messages Loaded");
      }, 500);
    });
  }

  const startTime = Date.now();

  const results = await Promise.allSettled([
    loadProfile(),
    loadPosts(),
    loadMessages()
  ]);

  const totalTimeTaken = Date.now() - startTime;
  const moduleNames = ["Profile Module", "Posts Module", "Messages Module"];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`[SUCCESS] ${moduleNames[index]}: ${result.value}`);
    } else {
      console.log(`[FAILED]  ${moduleNames[index]}: ${result.reason}`);
    }
  });

  console.log(`Total dashboard loading time: ${totalTimeTaken} ms
`);
}

// ============================================================================
// Q8 - Order Processing Flow: Async Retry Mechanism
// ============================================================================
async function runQ8() {
  console.log("--- Q8: Async Retry Mechanism ---");

  function submitOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5; // 50% failure rate
        if (isSuccess) resolve("Order #10928 Created");
        else reject("Database connection loss");
      }, 500);
    });
  }

  async function processOrder(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await submitOrder();
        console.log(`Attempt ${attempt}: Success - ${result}`);
        return result;
      } catch (err) {
        console.log(`Attempt ${attempt}: Failed - ${err}`);
        if (attempt === maxRetries) {
          throw new Error("Order could not be processed");
        }
      }
    }
  }

  try {
    await processOrder(3);
    console.log("Order processing workflow finished successfully.
");
  } catch (error) {
    console.error(`Final Status: ${error.message}
`);
  }
}

// ============================================================================
// Q9 - Debugging the Event Loop
// ============================================================================
function runQ9() {
  return new Promise((resolve) => {
    console.log("--- Q9: Event Loop Execution Order Analysis ---");

    /*
      PREDICTED OUTPUT ORDER:
      1. Script start
      2. Script end
      3. Promise callback
      4. Timeout callback

      EXPLANATION:
      - "Script start" and "Script end" are synchronous, executed immediately on the main stack.
      - Promise.resolve().then() schedules its callback into the Microtask Queue.
      - setTimeout(..., 0) schedules its callback into the Macrotask (Task) Queue.
      - The Event Loop checks the Microtask Queue first when call stack empties,
        so "Promise callback" executes before "Timeout callback".
    */

    console.log("Script start");

    setTimeout(() => {
      console.log("Timeout callback");
      console.log("--------------------------------------------------
");
      resolve();
    }, 0);

    Promise.resolve().then(() => {
      console.log("Promise callback");
    });

    console.log("Script end");
  });
}

// ============================================================================
// Q10 - The Final Delivery: Async Pipeline Debugger
// ============================================================================
async function runQ10() {
  console.log("--- Q10: Async Delivery Pipeline ---");

  function createPipelineStep(stepName, logMessage) {
    return new Promise((resolve, reject) => {
      const delayTime = Math.floor(Math.random() * 500) + 500; // 500ms - 1000ms
      setTimeout(() => {
        const isSuccessful = Math.random() > 0.15; // 85% success rate
        if (isSuccessful) {
          console.log(logMessage);
          resolve(`${stepName} passed`);
        } else {
          reject(`Failure at ${stepName}`);
        }
      }, delayTime);
    });
  }

  async function runPipeline() {
    console.log("Start Pipeline");
    try {
      await createPipelineStep("takeOrder", "Step 1: Order taken");
      await createPipelineStep("prepare", "Step 2: Food prepared");
      await createPipelineStep("pack", "Step 3: Package ready");
      await createPipelineStep("dispatch", "Step 4: Out for delivery");
      await createPipelineStep("deliver", "Delivery completed!");
      console.log("Pipeline Status: ALL STEPS SUCCESSFUL!
");
    } catch (error) {
      console.error(`Pipeline failed! Details: ${error}
`);
    }
  }

  /*
    EVENT LOOP & ASYNC BEHAVIOR COMMENTARY:
    - Each pipeline step returns a Promise that halts execution of runPipeline at 'await'.
    - While waiting for the timer to elapse in Web APIs / Node C++ bindings, the JS main thread is NOT blocked.
    - Other pending microtasks or I/O callbacks can execute during this wait window.
    - When the timer completes, the resolution callback enters the Microtask queue, resuming execution of runPipeline.
  */

  await runPipeline();
}

// ============================================================================
// MAIN EXECUTION SEQUENCER
// ============================================================================
async function executeAll() {
  await runQ1();
  await runQ2();
  await runQ3();
  await runQ4();
  await runQ5();
  await runQ6();
  await runQ7();
  await runQ8();
  await runQ9();
  await runQ10();
  console.log("==================================================================");
  console.log("             ALL ASSIGNMENT 6 TASKS COMPLETED!                    ");
  console.log("==================================================================");
}

executeAll();
