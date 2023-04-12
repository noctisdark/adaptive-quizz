import { createContext, useEffect, useContext, useState } from "react";

import LoadingScreen from "components/basics/LoadingScreen";
import ErrorScreen from "components/basics/ErrorScreen";

import { getPublicQuizzes } from "api/quizzes";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [quizzes, setQuizzes] = useState(null);

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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);

export default QuizProvider;
