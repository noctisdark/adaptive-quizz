import { useState } from "react";
import { useParams } from "react-router-dom";

import ErrorScreen from "components/basics/ErrorScreen";
import { useQuiz } from "providers/QuizProvider";

import QuizPresentation from "./QuizPresentation";

const PlayQuiz = () => {
  const id = +useParams().id;
  const { getQuizById } = useQuiz();
  const quiz = getQuizById(id);
  
  const [playStarted, setPlayStarted] = useState(false);

  if (!quiz) return <ErrorScreen>No quiz</ErrorScreen>;

  if (!playStarted)
    return (
      <QuizPresentation quiz={quiz} onPlayStart={() => setPlayStarted(true)} />
    );

  return "hello";
};

export default PlayQuiz;
