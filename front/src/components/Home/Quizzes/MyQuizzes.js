import QuizzesContainer from "./QuizzesContainer";

import { useQuiz } from "providers/QuizProvider";

const MyQuizzes = () => {
  const { myQuizzes } = useQuiz();

  return (
    <QuizzesContainer
      id="my-quizzes"
      title="My Quizzes"
      quizzes={myQuizzes}
      ifEmpty="Sorry, you don't have any quiz yet. maybe create one !"
      canEdit
    />
  );
};

export default MyQuizzes;
