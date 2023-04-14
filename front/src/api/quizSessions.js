import api from "api";

export const createQuizSession = (quizId) =>
  api.post("/quiz_sessions", { quizId });

export const completeQuizSession = (quizSessionId) =>
  api.patch("/quiz_sessions/complete", { quizSessionId });

export const getNextQuestion = (quizSessionId) =>
  api.post("/quiz_sessions/next", { quizSessionId });

export const answerQuestion = (quizSessionId, answer) =>
  api.post("/quiz_sessions/answer", { quizSessionId, answer });
