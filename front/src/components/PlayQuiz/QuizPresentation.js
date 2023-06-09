import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";

import PlayIcon from "components/icons/PlayIcon";

const QuizPresentation = ({ quiz, onPlayStart }) => (
  <Card variant="elevated" w="lg">
    <CardBody padding={0}>
      <Box
        backgroundImage={quiz.backgroundURL}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        maxW="100%"
        minH="md"
      ></Box>
    </CardBody>

    <CardFooter flexDirection="column" gap={4}>
      <Text as="b">{quiz.title}</Text>
      <Text>{quiz.description}</Text>
      <Text as="i" color="gray">
        By @{quiz.author}
      </Text>
      <Flex justifyContent="flex-end">
        <Button
          colorScheme="green"
          leftIcon={<PlayIcon />}
          onClick={onPlayStart}
        >
          Play
        </Button>
      </Flex>
    </CardFooter>
  </Card>
);

export default QuizPresentation;
