import { Flex, Heading, Text, Button, Tooltip } from "@chakra-ui/react";

import QuizQuestionForm from "./QuizQuestionForm";
import { AddIcon } from "@chakra-ui/icons";
import { replaceByIndex } from "utils/immutableArray";

const QuizQuestions = ({ quiz, setQuiz }) => {
  const { questions } = quiz;
  const hasNoQuestion = questions.length === 0;

  const onAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...questions,
        {
          id: -1, // this means this isn't saved on
          statement: "",
          difficulty: 0,
          option_1: "",
          option_2: "",
          option_3: "",
          option_4: "",
          answer: 0,
        },
      ],
    });
  };

  const setQuestion = (idx, newQuestion) =>
    setQuiz({
      ...quiz,
      questions: replaceByIndex(questions, idx, newQuestion),
    });

  return (
    <Flex padding="20px" direction="column" alignItems="center">
      <Heading as="h4" size="md" mb={8}>
        Questions
      </Heading>

      <Flex direction="column" gap={8}>
        {hasNoQuestion ? (
          <Text color="gray">
            Sorry, this quiz doesn't have any questions yet.
          </Text>
        ) : (
          questions.map((question, index) => (
            <QuizQuestionForm
              key={index}
              quiz={quiz}
              index={index}
              question={question}
              setQuestion={(newQuestion) => setQuestion(index, newQuestion)}
              onDelete={() => console.log("delete")}
              onSave={() => console.log("save")}
            />
          ))
        )}
      </Flex>

      <Flex mt="20px">
        {quiz.id === -1 ? (
          <Tooltip label="Please save the quiz first">
            <Button leftIcon={<AddIcon />} onClick={onAddQuestion} isDisabled>
              Add a new question
            </Button>
          </Tooltip>
        ) : (
          <Button leftIcon={<AddIcon />} onClick={onAddQuestion}>
            Add a new question
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default QuizQuestions;