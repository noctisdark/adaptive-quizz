import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useQuiz } from "providers/QuizProvider";

import QuizForm from "./QuizForm";
import QuizQuestions from "./QuizQuestions";

// !TODO!: Very important but after the end
// Split the state, updating a tree is killing performance
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
  const [quiz, setQuiz] = useState(savedQuiz || initialQuiz);

  return (
    <Box padding="20px">
      <Heading as="h3">Qwizard: Create a new Quiz</Heading>
      <QuizForm quiz={quiz} setQuiz={setQuiz} />
      <QuizQuestions quiz={quiz} setQuiz={setQuiz} />
    </Box>
  );
};

export default QuizBuiler;
