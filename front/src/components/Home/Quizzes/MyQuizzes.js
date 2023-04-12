import { Text } from "@chakra-ui/react";

import { useUser } from "providers/UserProvider";
import QuizzesContainer from "./QuizzesContainer";

const MyQuizzes = () => {
  const { quizzes = [] } = useUser();

  return (
    <QuizzesContainer
      title="My Quizzes"
      quizzes={quizzes}
      ifEmpty="Sorry, you don't have any quizz yet. maybe create one !"
    />
  );
};

export default MyQuizzes;
