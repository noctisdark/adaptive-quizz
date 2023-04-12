import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

import QuizForm from "./QuizForm";
import QuizQuestions from "./QuizQuestions";

const QuizBuiler = () => {
  const [quiz, setQuiz] = useState({
    id: -1,
    title: "",
    description: "",
    backgroundImageData:
      "https://images.radio-canada.ca/v1/audio/emission/16x9/oh-le-quiz-visuel-moteur.jpg",
    questions: [],
  });

  console.log(quiz);

  // const uplaod = async () => {
  //   const form = new FormData();
  //   form.set("image", quiz.backgroundFile);
  //   const { data: backgroundURL } = await uploadFile(form);
  //   setQuiz({ ...quiz, backgroundURL });
  //   setPreviewImageData(null);
  // };

  return (
    <Box padding="20px">
      <Heading as="h3">Create a new quiz</Heading>
      <QuizForm quiz={quiz} setQuiz={setQuiz} />
      <QuizQuestions quiz={quiz} setQuiz={setQuiz} />
    </Box>
  );
};

export default QuizBuiler;
