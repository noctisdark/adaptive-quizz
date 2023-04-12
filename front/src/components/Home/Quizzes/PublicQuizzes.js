import { useQuiz } from "providers/QuizProvider";

import QuizzesContainer from "./QuizzesContainer";

const PublicQuizzes = () => {
  const { quizzes } = useQuiz();
  return (
    <QuizzesContainer
      title="Public Quizzes"
      quizzes={[{},{},{}]}
      ifEmpty="Sorry, there are no publicly available quizzes right now."
    />
  );
};

export default PublicQuizzes;
