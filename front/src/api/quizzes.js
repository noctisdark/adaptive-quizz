import api from "api";

export const getPublicQuizzes = async () => await api.get("/quizzes");
