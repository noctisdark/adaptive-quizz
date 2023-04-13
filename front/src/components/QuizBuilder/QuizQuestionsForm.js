import { useState } from "react";
import { Flex, Heading, Text, Button, Tooltip } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { deleteByIndex, replaceByIndex } from "utils/immutableArray";
import { createOrUpdateQuestion, deleteQuestion } from "api/quizzes";
import { useQuiz } from "providers/QuizProvider";

import QuizQuestionForm from "./QuizQuestionForm";

const QuizQuestionsForm = ({ quiz }) => {
  const [questionsDrafts, setQuestionsDrafts] = useState(quiz.questions);
  const { addQuizQuestion, replaceQuizQuestion, removeQuizQuestion } =
    useQuiz();

  const hasNoQuestion = questionsDrafts.length === 0;

  const onAddQuestion = () => {
    setQuestionsDrafts([
      ...questionsDrafts,
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
    ]);
  };

  const setQuestionDraft = (idx, newQuestion) =>
    setQuestionsDrafts(replaceByIndex(questionsDrafts, idx, newQuestion));

  const deleteQuestionDraft = (idx) =>
    setQuestionsDrafts(deleteByIndex(questionsDrafts, idx));

  const onSaveQuestion = async (index, question) => {
    try {
      const isNew = question.id === -1,
        { data: newQuestion } = await createOrUpdateQuestion({
          ...question,
          quizId: quiz.id,
        });

      setQuestionDraft(index, newQuestion);

      if (isNew) addQuizQuestion(quiz, newQuestion);
      else replaceQuizQuestion(quiz, newQuestion);
      return newQuestion;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onDeleteQuestion = async (index, question) => {
    const isNew = question.id === -1;
    let success = true;
    if (!isNew) {
      try {
        await deleteQuestion(question);
      } catch (error) {
        success = false;
      }
    }

    if (success) {
      removeQuizQuestion(quiz, index);
      deleteQuestionDraft(index);
    }
  };

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
          questionsDrafts.map((questionDraft, index) => (
            <QuizQuestionForm
              key={index + "_" + questionDraft.id}
              index={index}
              quiz={quiz}
              initialQuestion={questionDraft}
              onDelete={onDeleteQuestion}
              onSave={onSaveQuestion}
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

export default QuizQuestionsForm;
