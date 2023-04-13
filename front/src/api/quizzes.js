import api from "api";

export const getPublicQuizzes = () => api.get("/quizzes");

export const createQuiz = (quiz) => api.post("/quizzes", quiz);

export const updateQuiz = (quiz) => api.patch("/quizzes", quiz);

export const createOrUpdateQuiz = (quiz) =>
  quiz.id === -1 ? createQuiz(quiz) : updateQuiz(quiz);

export const deleteQuiz = ({ id }) => api.delete(`/quizzes/${id}`);

export const createQuestion = (question) => api.post("/questions", question);

export const updateQuestion = (question) => api.patch("/questions", question);

export const createOrUpdateQuestion = (question) =>
  question.id === -1 ? createQuestion(question) : updateQuestion(question);

export const deleteQuestion = ({ id }) => api.delete(`/questions/${id}`);
