import { Flex } from "@chakra-ui/react";

import PublicQuizzes from "./PublicQuizzes";
import MyQuizzes from "./MyQuizzes";

const Quizzes = () => {
  return <Flex gap={12} direction="column">
    <PublicQuizzes/>
    <MyQuizzes />
  </Flex>
};

export default Quizzes;