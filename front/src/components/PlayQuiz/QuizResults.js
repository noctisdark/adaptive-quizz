import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useUser } from "providers/UserProvider";

const QuizResults = ({ quiz, quizSession }) => {
  const { user } = useUser();

  return (
    <Card variant="elevated" w="xl">
      <CardBody padding={0} maxW="100%">
        <Box
          backgroundImage={quiz.backgroundURL}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundSize="cover"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          maxW="100%"
          minH="100px"
        >
          <Text as="p" p={1} backgroundColor="#ffffff9f" color="gray.900">
            <Text as="b">{quiz.title}</Text> By{" "}
            <Text as="i">@{quiz.author}</Text>
          </Text>
        </Box>
      </CardBody>

      <CardFooter flexDirection="column" gap={4}>
        <Heading as="h6" fontSize="1.25em">
          Results for user `{user.username}`:
        </Heading>
        <Flex direction="column">
          <Text>Final score: {quizSession.score} </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
