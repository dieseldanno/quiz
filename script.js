const quizData = {
  "Swedish Royalty": [
    {
      question:
        "What learning disability has King Carl XVI Gustaf spoken openly about?",
      options: ["Dyslexia", "ADHD", "Autism"],
      correct: 0,
    },
    {
      question: "Who is next in line to the Swedish throne?",
      options: [
        "Prince Carl Philip",
        "Crown Princess Victoria",
        "Princess Madeleine",
      ],
      correct: 1,
    },
    {
      question: "What’s the official royal residence of the Swedish monarch?",
      options: [
        "Drottningholm Palace",
        "The Royal Palace in Stockholm",
        "Gripsholm Castle",
      ],
      correct: 1,
    },
    {
      question: "What was Prince Daniel’s job before becoming royalty?",
      options: ["Personal trainer", "Banker", "Journalist"],
      correct: 0,
    },
    {
      question: "What is the name of Sweden’s royal house?",
      options: ["House of Silvia", "House of Bernadotte", "House of Vasa"],
      correct: 1,
    },
  ],
  JavaScript: [
    {
      question: "What is JavaScript mainly used for?",
      options: [
        "Styling web pages",
        "Making web pages interactive",
        "Managing databases",
      ],
      correct: 1,
    },
    {
      question: "Which of these variables cannot be reassigned once declared?",
      options: ["let", "const", "var"],
      correct: 1,
    },
    {
      question: "What is a callback function?",
      options: [
        "A function that calls itself",
        "A function passed as an argument to another function",
        "A function that returns an object",
      ],
      correct: 1,
    },
    {
      question: 'What does the "this" keyword refer to in a method?',
      options: [
        "The global object",
        "The object that owns the method",
        "The parent class",
      ],
      correct: 1,
    },
    {
      question: "What’s the main difference between == and ===?",
      options: [
        "== checks type and value strictly",
        "=== performs type coercion",
        "=== checks both type and value, while == does type conversion",
      ],
      correct: 2,
    },
  ],
};

// state variables
let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// get quiz container
const quiz = document.getElementById("quiz");

// render welcome section
function renderWelcome() {
  quiz.innerHTML = `
    <div class="welcome">
    <h2>Welcome to the Quiz!</h2>
    <p>Select a category to start. Each quiz have 5 questions.</p>
    <button class="category-btn" onclick="startQuiz('Swedish Royalty')">Swedish Royalty</button>
    <button class="category-btn" onclick="startQuiz('JavaScript')">JavaScript</button>
    </div>
    `;
}

// start quiz with selected category
function startQuiz(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  score = 0;
  selectedOption = null;
  renderQuestion();
}

// render current question
function renderQuestion() {
  const questions = quizData[currentCategory];
  const question = questions[currentQuestionIndex];
  quiz.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1}: ${question.question}</h3>
            ${question.options
              .map(
                (option, index) => `
                <div class="option" onclick="selectOption(${index})">${option}</div>
            `
              )
              .join("")}
            <button id="next-btn" disabled>Next</button>
        </div>
    `;
}

// handle option selection
function selectOption(index) {
  selectedOption = index;
  const options = document.querySelectorAll(".option");
  options.forEach((opt, i) => {
    opt.classList.toggle("selected", i === index);
  });
  document.getElementById("next-btn").disabled = false;
}

// handle next button
quiz.addEventListener("click", (e) => {
  if (e.target.id === "next-btn" && !e.target.disabled) {
    const questions = quizData[currentCategory];
    if (selectedOption === questions[currentQuestionIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    selectedOption = null;
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      renderResults();
    }
  }
});

// render results
function renderResults() {
  quiz.innerHTML = `
        <div class="results">
            <h2>Results</h2>
            <p>You got ${score} out of ${quizData[currentCategory].length} right!</p>
            <button class="category-btn" onclick="renderWelcome()">Back to start</button>
        </div>
    `;
}

// initialize
renderWelcome();
