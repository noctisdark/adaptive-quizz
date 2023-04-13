import { Box, Heading } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useQuiz } from "providers/QuizProvider";

import QuizForm from "./QuizForm";
import QuizQuestionsForm from "./QuizQuestionsForm";

// This component creates update drafts that sync with the QuizProvider when something is saved online
// This component doesn't support changing the quiz.id
// doing so will discard all the current data

const QuizBuiler = ({
  initialQuiz = {
    id: -1,
    title: "",
    description: "",
    backgroundURL:
      "https://images.radio-canada.ca/v1/audio/emission/16x9/oh-le-quiz-visuel-moteur.jpg",
    questions: [],
  },
}) => {
  const { getQuizById } = useQuiz();
  const params = useParams();
  const savedQuiz = params.id && getQuizById(+params.id);
  const quiz = savedQuiz || initialQuiz;
  const isNew = quiz.id === -1;

  return (
    <Box key={quiz.id} padding="20px">
      <Heading as="h3">
        Qwizard: {isNew ? "Create a new Quiz" : "Edit your quiz"}
      </Heading>
      <QuizForm quiz={quiz} />
      <QuizQuestionsForm quiz={quiz} />
    </Box>
  );
};

export default QuizBuiler;
