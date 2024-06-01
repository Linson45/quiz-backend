const express = require("express");
const app = express();
const port = 3001;

// Dummy quiz questions data
const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    text: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Jane Austen",
      "F. Scott Fitzgerald",
      "Ernest Hemingway",
    ],
    correctAnswer: "Harper Lee",
  },
];

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to retrieve quiz questions
app.get("/api/quiz", (req, res) => {
  res.json({ questions });
});

// API endpoint to submit user answers
app.post("/api/submit", (req, res) => {
  try {
    const { answers } = req.body;

    // Calculate the score
    let score = 0;
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && answer.selectedOption === question.correctAnswer) {
        score++;
      }
    });

    // Get the total number of questions
    const totalQuestions = questions.length;

    // Return the response
    res.json({ score, totalQuestions });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ error: "Failed to submit answers" });
  }
});

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client domain
    credentials: true, // If you're using cookies, set credentials to true
  })
);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
