export interface Category {
  id: string
  name: string
  description: string
}

export interface Question {
  id: string
  categoryId: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: "A" | "B" | "C" | "D"
  difficulty: "easy" | "medium" | "hard"
}

export interface User {
  id: string
  username: string
  fullName: string
  isAdmin: boolean
}

export interface QuizAttempt {
  id: string
  userId: string
  categoryId: string
  score: number
  totalQuestions: number
  timeTaken: number
  completedAt: string
  username: string
  categoryName: string
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "General Knowledge",
    description: "Questions about various topics",
  },
  {
    id: "2",
    name: "Science",
    description: "Physics, Chemistry, Biology questions",
  },
  {
    id: "3",
    name: "History",
    description: "Historical events and figures",
  },
  {
    id: "4",
    name: "Sports",
    description: "Sports and athletics questions",
  },
  {
    id: "5",
    name: "Technology",
    description: "Computer science and technology questions",
  },
]

export const mockQuestions: Question[] = [
  // General Knowledge
  {
    id: "1",
    categoryId: "1",
    question: "What is the capital of France?",
    optionA: "London",
    optionB: "Berlin",
    optionC: "Paris",
    optionD: "Madrid",
    correctAnswer: "C",
    difficulty: "easy",
  },
  {
    id: "2",
    categoryId: "1",
    question: "Which continent is the largest by area?",
    optionA: "Africa",
    optionB: "Asia",
    optionC: "North America",
    optionD: "Europe",
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: "3",
    categoryId: "1",
    question: "What is the smallest country in the world?",
    optionA: "Monaco",
    optionB: "Vatican City",
    optionC: "San Marino",
    optionD: "Liechtenstein",
    correctAnswer: "B",
    difficulty: "medium",
  },

  // Science
  {
    id: "4",
    categoryId: "2",
    question: "Which planet is known as the Red Planet?",
    optionA: "Venus",
    optionB: "Mars",
    optionC: "Jupiter",
    optionD: "Saturn",
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: "5",
    categoryId: "2",
    question: "What is the chemical symbol for gold?",
    optionA: "Go",
    optionB: "Gd",
    optionC: "Au",
    optionD: "Ag",
    correctAnswer: "C",
    difficulty: "medium",
  },
  {
    id: "6",
    categoryId: "2",
    question: "What is the speed of light in vacuum?",
    optionA: "299,792,458 m/s",
    optionB: "300,000,000 m/s",
    optionC: "299,000,000 m/s",
    optionD: "298,792,458 m/s",
    correctAnswer: "A",
    difficulty: "hard",
  },

  // History
  {
    id: "7",
    categoryId: "3",
    question: "In which year did World War II end?",
    optionA: "1944",
    optionB: "1945",
    optionC: "1946",
    optionD: "1947",
    correctAnswer: "B",
    difficulty: "medium",
  },
  {
    id: "8",
    categoryId: "3",
    question: "Who was the first President of the United States?",
    optionA: "Thomas Jefferson",
    optionB: "John Adams",
    optionC: "George Washington",
    optionD: "Benjamin Franklin",
    correctAnswer: "C",
    difficulty: "easy",
  },

  // Sports
  {
    id: "9",
    categoryId: "4",
    question: "How many players are there in a basketball team on the court?",
    optionA: "4",
    optionB: "5",
    optionC: "6",
    optionD: "7",
    correctAnswer: "B",
    difficulty: "easy",
  },
  {
    id: "10",
    categoryId: "4",
    question: "Which country won the FIFA World Cup in 2018?",
    optionA: "Brazil",
    optionB: "Germany",
    optionC: "France",
    optionD: "Argentina",
    correctAnswer: "C",
    difficulty: "medium",
  },

  // Technology
  {
    id: "11",
    categoryId: "5",
    question: "What does HTML stand for?",
    optionA: "Hyper Text Markup Language",
    optionB: "High Tech Modern Language",
    optionC: "Home Tool Markup Language",
    optionD: "Hyperlink and Text Markup Language",
    correctAnswer: "A",
    difficulty: "medium",
  },
  {
    id: "12",
    categoryId: "5",
    question: "Who founded Microsoft?",
    optionA: "Steve Jobs",
    optionB: "Bill Gates",
    optionC: "Mark Zuckerberg",
    optionD: "Larry Page",
    correctAnswer: "B",
    difficulty: "easy",
  },
]

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    fullName: "Admin User",
    isAdmin: true,
  },
  {
    id: "2",
    username: "john_doe",
    fullName: "John Doe",
    isAdmin: false,
  },
  {
    id: "3",
    username: "jane_smith",
    fullName: "Jane Smith",
    isAdmin: false,
  },
]

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: "1",
    userId: "2",
    categoryId: "1",
    score: 8,
    totalQuestions: 10,
    timeTaken: 180,
    completedAt: "2024-01-15T10:30:00Z",
    username: "john_doe",
    categoryName: "General Knowledge",
  },
  {
    id: "2",
    userId: "3",
    categoryId: "2",
    score: 9,
    totalQuestions: 10,
    timeTaken: 165,
    completedAt: "2024-01-15T11:15:00Z",
    username: "jane_smith",
    categoryName: "Science",
  },
  {
    id: "3",
    userId: "2",
    categoryId: "3",
    score: 7,
    totalQuestions: 10,
    timeTaken: 200,
    completedAt: "2024-01-15T14:20:00Z",
    username: "john_doe",
    categoryName: "History",
  },
  {
    id: "4",
    userId: "3",
    categoryId: "1",
    score: 10,
    totalQuestions: 10,
    timeTaken: 150,
    completedAt: "2024-01-15T16:45:00Z",
    username: "Sok Sophorn",
    categoryName: "General Knowledge",
  },
]
