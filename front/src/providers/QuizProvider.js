import { createContext, useEffect, useContext, useState } from "react";

import LoadingScreen from "components/basics/LoadingScreen";
import ErrorScreen from "components/basics/ErrorScreen";

import { getPublicQuizzes } from "api/quizzes";
import {
  concat,
  deleteById,
  deleteByIndex,
  extractIf,
  replaceById,
} from "utils/immutableArray";
import { useUser } from "./UserProvider";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const { user } = useUser();
  const [error, setError] = useState(false);
  const [quizzes, setQuizzes] = useState(null);
  const [myQuizzes, othersQuizzes] = extractIf(
    quizzes || [],
    (quiz) => quiz.authorId !== user.id
  );

  const addQuiz = (quiz) => setQuizzes(concat(quizzes, quiz));

  const replaceQuiz = (quiz) => setQuizzes(replaceById(quizzes, quiz.id, quiz));

  const removeQuiz = (quiz) => setQuizzes(deleteById(quizzes, quiz.id));

  const addQuizQuestion = (quiz, question) =>
    replaceById(quizzes, quiz.id, {
      ...quiz,
      questions: concat(quiz.questions, question),
    });

  const replaceQuizQuestion = (quiz, question) =>
    replaceById(quizzes, quiz.id, {
      ...quiz,
      questions: replaceById(quiz.questions, question.id, question),
    });

  const removeQuizQuestion = (quiz, index) =>
    replaceById(quizzes, quiz.id, {
      ...quiz,
      questions: deleteByIndex(quiz.questions, index),
    });
  
  const getQuizById = (id) => quizzes.find((quiz) => quiz.id === id);
  
  useEffect(() => {
    (async () => {
      try {
        const { data: quizzes } = await getPublicQuizzes();
        setQuizzes(quizzes);
      } catch (error) {
        setError(error.response?.data || "Unexpected error.");
      }
    })();
  }, []);

  return error ? (
    <ErrorScreen title={error} />
  ) : !quizzes ? (
    <LoadingScreen title="Fetching your data from the server, please wait." />
  ) : (
    <QuizContext.Provider
      value={{
        quizzes,
        othersQuizzes,
        myQuizzes,
        addQuiz,
        replaceQuiz,
        getQuizById,
        addQuizQuestion,
        replaceQuizQuestion,
        removeQuizQuestion,
        removeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);

export default QuizProvider;
