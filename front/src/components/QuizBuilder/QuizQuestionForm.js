import styled from "@emotion/styled";
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  CardFooter,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Button,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

import { WarningIcon } from "@chakra-ui/icons";

import { useUser } from "providers/UserProvider";

const difficultyLevels = [
  { value: 10, label: "Easy", colorScheme: "green" },
  { value: 20, label: "Medium", colorScheme: "orange" },
  { value: 30, label: "Hard", colorScheme: "red" },
];

const idxToLetter = [0, "A", "B", "C", "D"];

const AddonButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const TagDifficulty = ({ difficulty, isActive, onDiffucultyChange }) => {
  return (
    <Tag
      colorScheme={difficulty.colorScheme}
      cursor="pointer"
      variant={isActive ? "solid" : "subtle"}
      onClick={() => onDiffucultyChange(difficulty.value)}
    >
      <TagLabel>{difficulty.label}</TagLabel>
    </Tag>
  );
};

const QuizQuestionForm = ({
  index,
  question,
  setQuestion,
  quiz,
  onSave,
  onDelete,
}) => {
  const { user } = useUser();

  const onAnswerChange = (answer) => setQuestion({ ...question, answer });

  const onDiffucultyChange = (difficulty) =>
    setQuestion({ ...question, difficulty });

  const onStatementChange = (statement) =>
    setQuestion({ ...question, statement });

  const onOptionChange = (idx, option) =>
    setQuestion({ ...question, [`option_${idx}`]: option });

  let formError = !question.statement
    ? "The question needs a statement."
    : !question.difficulty
    ? "The question needs a difficulty level."
    : !question.option_1
    ? "The question needs an option A"
    : !question.option_2
    ? "The question needs an option B"
    : !question.option_3
    ? "The question needs an option C"
    : !question.option_4
    ? "The question needs an option D"
    : !question.answer
    ? "The question needs an answer."
    : quiz.id === -1
    ? "Please save the quiz first" : "";

  return (
    <Card variant="elevated">
      <CardBody padding={0}>
        <Box
          backgroundImage={quiz.backgroundImageData}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundSize="cover"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          w="xl"
          minH="100px"
        >
          <Text as="p" p={1}>
            <Text as="b">{quiz.title}</Text>
            <Text as="i">By {user.username}</Text>
          </Text>
        </Box>
      </CardBody>

      <CardFooter flexDirection="column" gap={4} minH="sm">
        <Flex gap={4}>
          {difficultyLevels.map((difficulty) => (
            <TagDifficulty
              key={difficulty.label}
              difficulty={difficulty}
              isActive={question.difficulty === difficulty.value}
              onDiffucultyChange={onDiffucultyChange}
            />
          ))}
        </Flex>
        <FormControl flex={1} isRequired>
          <FormLabel>Question {index + 1}</FormLabel>
          <Textarea
            rows={4}
            type="text"
            value={question.statement}
            onInput={(e) => onStatementChange(e.target.value)}
            placeholder="Enter your question."
          />
        </FormControl>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 80px)"
          gap={2}
        >
          {[1, 2, 3, 4].map((idx) => (
            <FormControl key={idx} isRequired>
              <FormLabel>Option {idxToLetter[idx]}</FormLabel>
              <InputGroup>
                <InputLeftAddon padding={0}>
                  <AddonButton
                    colorScheme={idx === question.answer ? "green" : "red"}
                    onClick={() => onAnswerChange(idx)}
                  >
                    {idxToLetter[idx]}
                  </AddonButton>
                </InputLeftAddon>

                <Input
                  placeholder={`...`}
                  value={question[`option_${idx}`]}
                  onChange={(e) => onOptionChange(idx, e.target.value)}
                />
              </InputGroup>
            </FormControl>
          ))}
        </Grid>
        {formError && (
          <Text color="red">
            <WarningIcon /> {formError}
          </Text>
        )}
        <Flex justifyContent="flex-end" gap={4}>
          <Button colorScheme="red" onClick={() => onDelete(index)}>
            Delete
          </Button>
          <Button colorScheme="green" onClick={() => onSave(index)} isDisabled={formError}>
            Save
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestionForm;