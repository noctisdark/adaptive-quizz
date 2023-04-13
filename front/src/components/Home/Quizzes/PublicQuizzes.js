import { useQuiz } from "providers/QuizProvider";

import QuizzesContainer from "./QuizzesContainer";

const PublicQuizzes = () => {
  const { othersQuizzes } = useQuiz();

  return (
    <QuizzesContainer
      id="public-quizzes"
      title="Public Quizzes"
      quizzes={othersQuizzes}
      ifEmpty="Sorry, there are no publicly available quizzes right now."
    />
  );
};

export default PublicQuizzes;
