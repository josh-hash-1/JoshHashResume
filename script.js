/**********************
 * CST8285 Lab 5: Interactive JavaScript Portfolio with GSAP Animations
 * Student: Your Name
 * All JavaScript code contained in this external file
 **********************/

/**********************
 * Step 1: JavaScript Setup and Console Basics
 **********************/

// Variables and data types
let studentName = "Your Name";          // string: your name
let age = 21;                           // number: your age
const favoriteLanguage = "JavaScript";  // string: favorite language

// Log to console for debugging
console.log("Name:", studentName);
console.log("Age:", age);
console.log("Favorite Language:", favoriteLanguage);

// Object with array property
const student = {
  name: studentName,
  major: "Computer Science",
  gradYear: 2026,
  hobbies: ["Animation", "Web dev", "Gaming", "Sim racing"]
};
console.log("Student object:", student);

// Wait for DOM to be ready before running any code
document.addEventListener("DOMContentLoaded", () => {
  
  /**********************
   * GSAP Animation Setup - Page Entrance
   **********************/
  
  // Master timeline for coordinated page entrance animations
  const masterTimeline = gsap.timeline();

  // Staggered entrance animations for different element groups
  masterTimeline
    .from(".animate-fade", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: "power2.out"
    })
    .from(".animate-slide", {
      duration: 0.6,
      x: -50,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.out"
    }, "-=0.4")
    .from(".stagger-item", {
      duration: 0.7,
      y: 30,
      opacity: 0,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.2");

  /**********************
   * Step 2: DOM Manipulation and Element Selection
   **********************/
  
  const welcomeDiv = document.getElementById("welcome-message");
  const currentTimeDiv = document.getElementById("current-time");
  const changeColorBtn = document.getElementById("change-color-btn");
  const colorBox = document.getElementById("color-box");

  // Personalized welcome message with animation
  function showWelcomeMessage() {
    welcomeDiv.textContent = `Welcome, ${studentName}! Explore the interactive features below.`;
    
    // GSAP animation for welcome message
    gsap.from(welcomeDiv, {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.7)"
    });
  }

  // Display and update current date/time with smooth transitions
  function updateClock() {
    const now = new Date();
    const oldText = currentTimeDiv.textContent;
    const newText = `Current Date/Time: ${now.toLocaleString()}`;
    
    // Only animate if text actually changed
    if (oldText !== newText && oldText !== "Time will appear here.") {
      gsap.to(currentTimeDiv, {
        duration: 0.3,
        opacity: 0,
        y: -10,
        ease: "power2.in",
        onComplete: () => {
          currentTimeDiv.textContent = newText;
          gsap.to(currentTimeDiv, {
            duration: 0.3,
            opacity: 1,
            y: 0,
            ease: "power2.out"
          });
        }
      });
    } else {
      currentTimeDiv.textContent = newText;
    }
  }

  // Function to change background color with GSAP animation
  function changeBackgroundColor() {
    const colors = ["#ffeb3b", "#e91e63", "#9c27b0", "#3f51b5", "#009688", "#ff5722"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Animated color change with rotation and scale
    gsap.to(colorBox, {
      duration: 0.6,
      backgroundColor: randomColor,
      scale: 1.1,
      rotation: "+=180",
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
    
    // Add highlight class dynamically
    welcomeDiv.classList.toggle("highlight");
  }

  // Initialize welcome and clock
  showWelcomeMessage();
  updateClock();
  setInterval(updateClock, 1000);

  /**********************
   * Step 3: Functions and Event Handling
   **********************/
  
  const greetBtn = document.getElementById("greet-btn");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const clickCounterBtn = document.getElementById("click-counter-btn");
  const clickCountText = document.getElementById("click-count");
  const hoverTarget = document.getElementById("hover-target");
  const hoverStatus = document.getElementById("hover-status");

  // Greet user function with button animation
  function greetUser() {
    // Animate button before showing alert
    gsap.to(greetBtn, {
      duration: 0.3,
      scale: 1.2,
      rotation: 360,
      ease: "power2.out",
      onComplete: () => {
        alert(`Hello, ${studentName}! Thanks for visiting your interactive portfolio.`);
        gsap.to(greetBtn, { duration: 0.2, scale: 1, rotation: 0 });
      }
    });
  }

  // Toggle between light and dark theme
  function toggleTheme() {
    const isDark = document.body.classList.contains("dark");
    
    // Smooth background color transition
    gsap.to(document.body, {
      duration: 0.5,
      backgroundColor: isDark ? "#ffffff" : "#111111",
      color: isDark ? "#000000" : "#f7f7f7",
      ease: "power2.inOut"
    });
    
    document.body.classList.toggle("dark");
  }

  // Click counter with animation
  let clickCount = 0;
  function incrementClickCount() {
    clickCount++;
    
    // Animate the counter text
    gsap.to(clickCountText, {
      duration: 0.3,
      scale: 1.3,
      color: "#e91e63",
      ease: "back.out(1.7)",
      onStart: () => {
        clickCountText.textContent = `Clicks: ${clickCount}`;
      },
      onComplete: () => {
        gsap.to(clickCountText, {
          duration: 0.2,
          scale: 1,
          color: "inherit"
        });
      }
    });
    
    // Button bounce effect
    gsap.to(clickCounterBtn, {
      duration: 0.1,
      scale: 0.95,
      yoyo: true,
      repeat: 1
    });
  }

  // Enhanced hover effects with GSAP
  hoverTarget.addEventListener("mouseenter", () => {
    gsap.to(hoverTarget, {
      duration: 0.3,
      backgroundColor: "#e3f2fd",
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      ease: "power2.out"
    });
    
    gsap.to(hoverStatus, {
      duration: 0.3,
      opacity: 1,
      x: 10,
      color: "#2196f3",
      onStart: () => hoverStatus.textContent = "Mouse entered!"
    });
  });

  hoverTarget.addEventListener("mouseleave", () => {
    gsap.to(hoverTarget, {
      duration: 0.3,
      backgroundColor: "transparent",
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      ease: "power2.out"
    });
    
    gsap.to(hoverStatus, {
      duration: 0.3,
      opacity: 0.7,
      x: 0,
      color: "inherit",
      onStart: () => hoverStatus.textContent = "Mouse left."
    });
  });

  /**********************
   * Step 4: Conditionals and Decision Making
   **********************/
  
  const timeGreetingBtn = document.getElementById("time-greeting-btn");
  const timeGreeting = document.getElementById("time-greeting");
  const ageInput = document.getElementById("age-input");
  const checkAgeBtn = document.getElementById("check-age-btn");
  const ageResult = document.getElementById("age-result");
  const gradeInput = document.getElementById("grade-input");
  const checkGradeBtn = document.getElementById("check-grade-btn");
  const gradeResult = document.getElementById("grade-result");
  const evenOddInput = document.getElementById("even-odd-input");
  const evenOddBtn = document.getElementById("even-odd-btn");
  const evenOddResult = document.getElementById("even-odd-result");
  const passwordInput = document.getElementById("password-input");
  const passwordCheckBtn = document.getElementById("password-check-btn");
  const passwordStrength = document.getElementById("password-strength");

  // Helper function to animate result messages
  function animateResult(element, message, isSuccess = true) {
    element.textContent = message;
    
    gsap.fromTo(element, 
      { opacity: 0, y: 20, scale: 0.8 },
      { 
        duration: 0.5,
        opacity: 1,
        y: 0,
        scale: 1,
        color: isSuccess ? "#4caf50" : "#f44336",
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(element, {
            duration: 0.3,
            color: "inherit",
            delay: 1
          });
        }
      }
    );
  }

  // Time-based greeting function
  function timeBasedGreeting() {
    const hour = new Date().getHours();
    let msg = "";
    if (hour < 12) {
      msg = "Good Morning! ☀️";
    } else if (hour < 18) {
      msg = "Good Afternoon! 🌤️";
    } else {
      msg = "Good Evening! 🌙";
    }
    animateResult(timeGreeting, msg);
  }

  // Age category checker
  function checkAgeCategory() {
    const val = Number(ageInput.value);
    if (Number.isNaN(val) || val < 0) {
      animateResult(ageResult, "Please enter a valid age.", false);
      return;
    }
    let category = "";
    if (val < 18) {
      category = "Minor";
    } else if (val < 65) {
      category = "Adult";
    } else {
      category = "Senior";
    }
    animateResult(ageResult, `You are categorized as: ${category}`);
  }

  // Grade to letter converter
  function numberToLetterGrade(n) {
    if (n >= 90) return "A";
    if (n >= 80) return "B";
    if (n >= 70) return "C";
    if (n >= 60) return "D";
    return "F";
  }

  function checkGrade() {
    const n = Number(gradeInput.value);
    if (Number.isNaN(n) || n < 0 || n > 100) {
      animateResult(gradeResult, "Enter a grade between 0 and 100.", false);
      return;
    }
    const letter = numberToLetterGrade(n);
    animateResult(gradeResult, `Letter grade: ${letter}`, letter !== "F");
  }

  // Even or odd checker
  function evenOrOdd() {
    const n = Number(evenOddInput.value);
    if (Number.isNaN(n)) {
      animateResult(evenOddResult, "Enter a valid number.", false);
      return;
    }
    const result = n % 2 === 0 ? "Even" : "Odd";
    animateResult(evenOddResult, `${n} is ${result}`);
  }

  // Password strength checker
  function passwordStrengthChecker(pw) {
    if (!pw || pw.length < 6) return "Weak";
    const hasNum = /\d/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasSym = /[^A-Za-z0-9]/.test(pw);
    const score = [hasNum, hasUpper, hasLower, hasSym].filter(Boolean).length + (pw.length >= 10 ? 1 : 0);
    
    if (score >= 4) return "Strong";
    if (score >= 3) return "Medium";
    return "Weak";
  }

  function checkPasswordStrength() {
    const pw = passwordInput.value;
    const strength = passwordStrengthChecker(pw);
    const isStrong = strength === "Strong" || strength === "Medium";
    animateResult(passwordStrength, `Password strength: ${strength}`, isStrong);
  }

  /**********************
   * Step 5: Loops and Iteration
   **********************/
  
  const showSkillsBtn = document.getElementById("show-skills-btn");
  const skillsList = document.getElementById("skills-list");
  const timesTableInput = document.getElementById("times-table-input");
  const generateTableBtn = document.getElementById("generate-table-btn");
  const timesTableResult = document.getElementById("times-table-result");
  const countdownBtn = document.getElementById("countdown-btn");
  const countdownDisplay = document.getElementById("countdown-display");
  const evenListBtn = document.getElementById("even-list-btn");
  const evenList = document.getElementById("even-list");

  // Skills array (also used in Step 6)
  let skills = ["HTML", "CSS", "JavaScript", "GSAP"];

  // Display skills with numbering and animations
  function renderSkillsWithNumbers() {
    skillsList.innerHTML = "";
    
    // for loop to display skills with numbers
    for (let i = 0; i < skills.length; i++) {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${skills[i]}`;
      li.className = "skill-item";
      skillsList.appendChild(li);
      
      // Staggered entrance animation
      gsap.from(li, {
        duration: 0.5,
        opacity: 0,
        x: -30,
        delay: i * 0.1,
        ease: "power2.out"
      });
    }
  }

  // Generate times table using for loop
  function generateTimesTable(n) {
    if (Number.isNaN(n) || n < 1 || n > 12) {
      timesTableResult.textContent = "Enter a number between 1 and 12.";
      return;
    }
    
    let html = "<table><tbody>";
    // for loop to generate multiplication table
    for (let i = 1; i <= 10; i++) {
      html += `<tr><td>${n} × ${i}</td><td>=</td><td>${n * i}</td></tr>`;
    }
    html += "</tbody></table>";
    timesTableResult.innerHTML = html;
    
    // Animate table appearance
    gsap.from(timesTableResult.querySelector("table"), {
      duration: 0.6,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    });
  }

  // Countdown using while loop logic
  function startCountdown(seconds = 5) {
    let remaining = seconds;
    countdownDisplay.textContent = `Countdown: ${remaining}`;
    
    const countdownInterval = setInterval(() => {
      remaining--;
      countdownDisplay.textContent = `Countdown: ${remaining}`;
      
      // Animate each number change
      gsap.from(countdownDisplay, {
        duration: 0.3,
        scale: 1.2,
        ease: "power2.out"
      });
      
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "Done! 🎉";
        gsap.to(countdownDisplay, {
          duration: 0.5,
          color: "#4caf50",
          scale: 1.3,
          ease: "back.out(1.7)"
        });
      }
    }, 1000);
  }

  // Generate even numbers using for loop
  function generateEvenNumbers() {
    const evens = [];
    // for loop to find even numbers
    for (let i = 1; i <= 20; i++) {
      if (i % 2 === 0) {
        evens.push(i);
      }
    }
    evenList.textContent = `Even numbers (1-20): ${evens.join(", ")}`;
    
    // Animate the result
    gsap.from(evenList, {
      duration: 0.5,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    });
  }

  /**********************
   * Step 6: Arrays and Array Methods
   **********************/
  
  const newSkillInput = document.getElementById("new-skill");
  const addSkillBtn = document.getElementById("add-skill-btn");
  const skillsDisplay = document.getElementById("skills-display");
  const skillsCount = document.getElementById("skills-count");
  const searchSkillInput = document.getElementById("search-skill");
  const searchBtn = document.getElementById("search-btn");
  const searchResults = document.getElementById("search-results");
  const projectsList = document.getElementById("projects-list");
  const sortByNameBtn = document.getElementById("sort-projects-name");
  const sortByDateBtn = document.getElementById("sort-projects-date");

  // Example projects array
  let projects = [
    { name: "Portfolio Website", date: "2025-09-10" },
    { name: "Grid Gallery", date: "2025-08-01" },
    { name: "Flexbox Layout", date: "2025-07-20" },
    { name: "Interactive Features", date: "2025-10-17" }
  ];

  // Todo list array
  const todoInput = document.getElementById("todo-input");
  const todoAddBtn = document.getElementById("todo-add-btn");
  const todoList = document.getElementById("todo-list");
  let todos = [];

  // Render skills collection with array methods
  function renderSkillsCollection() {
    skillsDisplay.innerHTML = "";
    
    // forEach method to display each skill
    skills.forEach((skill, index) => {
      const li = document.createElement("li");
      li.textContent = skill;
      li.className = "skill-item";
      skillsDisplay.appendChild(li);
      
      // Staggered animation
      gsap.from(li, {
        duration: 0.4,
        opacity: 0,
        x: -20,
        delay: index * 0.05,
        ease: "power2.out"
      });
    });
    
    // Update count using array.length
    skillsCount.textContent = `Total Skills: ${skills.length}`;
  }

  // Add new skill using push() method
  function addSkill() {
    const skill = newSkillInput.value.trim();
    if (!skill) return;
    
    // array.push() to add new skill
    skills.push(skill);
    
    const li = document.createElement("li");
    li.textContent = skill;
    li.className = "skill-item";
    skillsDisplay.appendChild(li);

    // Entrance animation for new skill
    gsap.from(li, {
      duration: 0.6,
      opacity: 0,
      x: 100,
      scale: 0.8,
      ease: "back.out(1.7)"
    });

    // Success feedback animation
    gsap.to(addSkillBtn, {
      duration: 0.2,
      backgroundColor: "#4caf50",
      scale: 1.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.set(addSkillBtn, { backgroundColor: "", scale: 1 });
      }
    });

    // Update count
    skillsCount.textContent = `Total Skills: ${skills.length}`;
    newSkillInput.value = "";
  }

  // Search skills using filter() method
  function searchSkills() {
    const term = searchSkillInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";
    
    if (!term) return;

    // array.filter() to find matching skills
    const matches = skills.filter(skill => 
      skill.toLowerCase().includes(term)
    );
    
    if (matches.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No matches found.";
      searchResults.appendChild(li);
      return;
    }
    
    // Display matches with animation
    matches.forEach((match, index) => {
      const li = document.createElement("li");
      li.textContent = match;
      searchResults.appendChild(li);
      
      gsap.from(li, {
        duration: 0.3,
        opacity: 0,
        y: 10,
        delay: index * 0.05,
        ease: "power2.out"
      });
    });
  }

  // Render projects list
  function renderProjects(projectsArray = projects) {
    projectsList.innerHTML = "";
    
    // forEach to display projects
    projectsArray.forEach((project, index) => {
      const li = document.createElement("li");
      li.textContent = `${project.name} — ${project.date}`;
      li.className = "project-item";
      projectsList.appendChild(li);
      
      // Staggered animation
      gsap.from(li, {
        duration: 0.4,
        opacity: 0,
        y: 15,
        delay: index * 0.05,
        ease: "power2.out"
      });
    });
  }

  // Sort projects by name using array.sort()
  function sortProjectsByName() {
    const sorted = [...projects].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    renderProjects(sorted);
  }

  // Sort projects by date using array.sort()
  function sortProjectsByDate() {
    const sorted = [...projects].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    renderProjects(sorted);
  }

  // Todo list functions with array methods
  function renderTodos() {
    todoList.innerHTML = "";
    
    // forEach to display todos
    todos.forEach((item, index) => {
      const todoDiv = document.createElement("div");
      todoDiv.className = "todo-item";
      todoDiv.innerHTML = `
        <span>${item}</span>
        <button onclick="window.removeTodo(${index})">Remove</button>
      `;
      
      todoList.appendChild(todoDiv);
      
      // Entrance animation
      gsap.from(todoDiv, {
        duration: 0.4,
        opacity: 0,
        x: -30,
        delay: index * 0.05,
        ease: "power2.out"
      });
    });
  }

  // Add todo using push() method
  function addTodo() {
    const todo = todoInput.value.trim();
    if (!todo) return;

    // array.push() to add new todo
    todos.push(todo);
    
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";
    todoDiv.innerHTML = `
      <span>${todo}</span>
      <button onclick="window.removeTodo(${todos.length - 1})">Remove</button>
    `;
    
    todoList.appendChild(todoDiv);

    // Smooth entrance animation
    gsap.from(todoDiv, {
      duration: 0.5,
      opacity: 0,
      y: 30,
      ease: "power2.out"
    });

    todoInput.value = "";
  }

  // Remove todo using splice() method - make globally accessible
  window.removeTodo = function(index) {
    const todoItems = document.querySelectorAll(".todo-item");
    const item = todoItems[index];
    
    // Exit animation before removal
    gsap.to(item, {
      duration: 0.3,
      opacity: 0,
      x: 100,
      ease: "power2.in",
      onComplete: () => {
        // array.splice() to remove item
        todos.splice(index, 1);
        renderTodos(); // Re-render to fix indices
      }
    });
  };

  // Initial renders
  renderSkillsCollection();
  renderProjects();
  renderTodos();

  /**********************
   * Event Listeners - All Steps
   **********************/
  
  // Step 2 & 3 event listeners
  greetBtn.addEventListener("click", greetUser);
  themeToggleBtn.addEventListener("click", toggleTheme);
  clickCounterBtn.addEventListener("click", incrementClickCount);
  changeColorBtn.addEventListener("click", changeBackgroundColor);

  // Step 4 event listeners
  timeGreetingBtn.addEventListener("click", timeBasedGreeting);
  checkAgeBtn.addEventListener("click", checkAgeCategory);
  checkGradeBtn.addEventListener("click", checkGrade);
  evenOddBtn.addEventListener("click", evenOrOdd);
  passwordCheckBtn.addEventListener("click", checkPasswordStrength);

  // Step 5 event listeners
  showSkillsBtn.addEventListener("click", renderSkillsWithNumbers);
  generateTableBtn.addEventListener("click", () => {
    const n = Number(timesTableInput.value);
    generateTimesTable(n);
  });
  countdownBtn.addEventListener("click", () => startCountdown(5));
  evenListBtn.addEventListener("click", generateEvenNumbers);

  // Step 6 event listeners
  addSkillBtn.addEventListener("click", addSkill);
  searchBtn.addEventListener("click", searchSkills);
  sortByNameBtn.addEventListener("click", sortProjectsByName);
  sortByDateBtn.addEventListener("click", sortProjectsByDate);
  todoAddBtn.addEventListener("click", addTodo);

  // Enhanced button hover animations for all buttons
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { 
        duration: 0.2, 
        y: -2, 
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        ease: "power2.out" 
      });
    });
    
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { 
        duration: 0.2, 
        y: 0, 
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        ease: "power2.out" 
      });
    });
  });

  // Allow Enter key for inputs
  [newSkillInput, searchSkillInput, todoInput, timesTableInput, ageInput, gradeInput, evenOddInput, passwordInput]
    .forEach(input => {
      if (!input) return;
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          switch (input.id) {
            case "new-skill": addSkill(); break;
            case "search-skill": searchSkills(); break;
            case "todo-input": addTodo(); break;
            case "times-table-input": generateTimesTable(Number(timesTableInput.value)); break;
            case "age-input": checkAgeCategory(); break;
            case "grade-input": checkGrade(); break;
            case "even-odd-input": evenOrOdd(); break;
            case "password-input": checkPasswordStrength(); break;
          }
        }
      });
    });

}); // End of DOMContentLoaded
