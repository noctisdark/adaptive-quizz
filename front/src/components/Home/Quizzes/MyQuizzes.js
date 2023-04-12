import { useUser } from "providers/UserProvider";

import QuizzesContainer from "./QuizzesContainer";

const MyQuizzes = () => {
  const { quizzes = [] } = useUser();

  return (
    <QuizzesContainer
      id="my-quizzes"
      title="My Quizzes"
      quizzes={quizzes}
      ifEmpty="Sorry, you don't have any quiz yet. maybe create one !"
    />
  );
};

export default MyQuizzes;
