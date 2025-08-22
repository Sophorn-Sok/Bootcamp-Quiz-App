import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  username: varchar("username", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizzes = pgTable("quizzes", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  category: varchar("category", { length: 255 }),
  difficulty: varchar("difficulty", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey(),
  quizId: uuid("quiz_id").references(() => quizzes.id),
  text: text("text"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const options = pgTable("options", {
  id: uuid("id").primaryKey(),
  questionId: uuid("question_id").references(() => questions.id),
  text: text("text"),
});

export const answers = pgTable("answers", {
  id: uuid("id").primaryKey(),
  questionId: uuid("question_id").references(() => questions.id),
  optionId: uuid("option_id").references(() => options.id),
});

export const userQuizAttempts = pgTable("user_quiz_attempts", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  quizId: uuid("quiz_id").references(() => quizzes.id),
  score: integer("score"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const userAnswers = pgTable("user_answers", {
  id: uuid("id").primaryKey(),
  attemptId: uuid("attempt_id").references(() => userQuizAttempts.id),
  questionId: uuid("question_id").references(() => questions.id),
  selectedOptionId: uuid("selected_option_id").references(() => options.id),
  isCorrect: boolean("is_correct"),
});

export const achievements = pgTable("achievements", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  achievementName: varchar("achievement_name", { length: 255 }),
  description: text("description"),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const leaderboard = pgTable("leaderboard", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  quizId: uuid("quiz_id").references(() => quizzes.id),
  score: integer("score"),
  rank: integer("rank"),
});
