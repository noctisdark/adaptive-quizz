import { Heading, Box, Text, Flex } from "@chakra-ui/react";

import QuizCard from "./QuizCard";

const QuizzesContainer = ({ title, quizzes, ifEmpty, ...props }) => (
  <Box minH="200px" {...props}>
    <Heading as="h3" fontSize="1.75em">
      {title}
    </Heading>
    <Flex flexFlow="row wrap" gap={8} padding="20px">
      {quizzes.length ? (
        quizzes.map((quiz, index) => (
          <QuizCard quiz={quiz} key={quiz.id || index} />
        ))
      ) : (
        <Text as="i" color="gray">
          {ifEmpty}
        </Text>
      )}
    </Flex>
  </Box>
);

export default QuizzesContainer;
