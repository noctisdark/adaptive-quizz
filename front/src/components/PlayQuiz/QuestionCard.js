import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  Card,
  CardBody,
  CardFooter,
  Box,
  Text,
  Grid,
  Button,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import {
  idxToLetter,
  difficultyLevels,
  TagDifficulty,
} from "components/QuizBuilder/QuizQuestionForm";
import theme from "providers/UIProvider/theme";

const ButtonWithLeftEdges = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  white-space: normal;
  word-break: break-word !important;
  height: 100%;
`;

const LabelAddon = styled(Box)`
  border-top-left-radius: ${({ theme }) => theme.radii.md};
  border-bottom-left-radius: ${({ theme }) => theme.radii.md};
  border-right: none;
  border-width: 1px;

  font-weight: bold;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionButton = ({ name, isActive, ...props }) => {
  return (
    <Flex direction="row" alignItems="center">
      <LabelAddon
        backgroundColor={isActive ? "green" : "gray.500"}
        color="gray.100"
      >
        {name}
      </LabelAddon>
      <ButtonWithLeftEdges
        height="80px"
        flex={1}
        colorScheme={isActive ? "green" : "gray"}
        variant="outline"
        fontWeight={isActive ? "medium" : "normal"}
        {...props}
      />
    </Flex>
  );
};

const QuestionCard = ({ quiz, question, onAnswer, ...props }) => {
  const [answer, setAnswer] = useState(0);

  const difficulty = useMemo(
    () =>
      difficultyLevels.find(
        (difficulty) => question.difficulty === difficulty.value
      ),
    [question.difficulty]
  );

  useEffect(() => {
    setAnswer(0);
  }, [question.id]);

  const hasAnswered = answer >= 1 && answer <= 4;

  return (
    <Card variant="elevated" w="xl" {...props}>
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

      <CardFooter flexDirection="column" gap={4} minH="md" maxW="xl">
        <Box>
          <TagDifficulty difficulty={difficulty} isActive={true} />
        </Box>
        <Box
          flex={1}
          backgroundColor={useColorModeValue(
            theme.colors.gray[50],
            theme.colors.gray[800]
          )}
          borderColor="gray.300"
          borderWidth={2}
          borderRadius="md"
          padding={2}
        >
          <Text as="b">Question 📜:</Text>
          <Text as="p"> {question.statement}</Text>
        </Box>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 60px)"
          gap={4}
        >
          {[1, 2, 3, 4].map((idx) => (
            <OptionButton
              key={idx}
              name={<Text>{idxToLetter[idx]}</Text>}
              onClick={() => setAnswer(idx)}
              isActive={answer === idx}
            >
              {question[`option_${idx}`]}
            </OptionButton>
          ))}
        </Grid>
        <Flex justifyContent="flex-end">
          <Tooltip label={hasAnswered ? "" : "Please answer before continuing"}>
            <Button
              colorScheme="green"
              variant="ghost"
              isDisabled={!hasAnswered}
              leftIcon={<CheckIcon />}
              onClick={() => onAnswer?.(answer)}
            >
              Continue
            </Button>
          </Tooltip>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
