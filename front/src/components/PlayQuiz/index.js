import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorScreen from "components/basics/ErrorScreen";
import { useQuiz } from "providers/QuizProvider";
import { completeQuizSession, createQuizSession } from "api/quizSessions";

import QuizPresentation from "./QuizPresentation";
import { confirmNavigation } from "hooks/navigation";
import { Flex } from "@chakra-ui/react";
import { toast } from "providers/ToastProvider";
import QuizGame from "./QuizGame";
import QuizResults from "./QuizResults";

const Center = (props) => (
  <Flex
    h="calc(100vh - 120px)"
    padding="20px"
    justifyContent="center"
    alignItems="center"
    {...props}
  />
);

const PlayQuiz = () => {
  const id = +useParams().id;
  const { getQuizById } = useQuiz();
  const quiz = getQuizById(id);

  const [playStarted, setPlayStarted] = useState(false);
  const [playEnded, setPlayEnded] = useState(false);
  const [quizSession, setQuizSession] = useState(null);

  const startQuiz = async () => {
    try {
      const { data: quizSession } = await createQuizSession(quiz.id);
      setPlayStarted(true);
      setQuizSession(quizSession);
    } catch (error) {}
  };

  useEffect(() => {
    if (!playStarted || playEnded) return;

    return () => {};
  }, [playStarted, playEnded]);

  const onQuizEnd = async () => {
    toast({
      status: "info",
      description: "You have left the quiz unfinished.",
      duration: 3000,
    });
    try {
      const { data: finishedQuizSession } = await completeQuizSession(
        quizSession.id
      );
      setQuizSession(finishedQuizSession);
      setPlayEnded(true);
      setPlayStarted(false);
    } catch (error) {}
  };

  const onQuizFinish = (quizSession) => {
    setPlayEnded(true);
    setQuizSession(quizSession);
  };

  useEffect(() => {
    return confirmNavigation(
      playStarted && !playEnded,
      "Do you really want to leave before finishing the quiz ?",
      onQuizEnd
    );
    // ignore missing dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playStarted, playEnded]);

  if (!quiz) return <ErrorScreen>No quiz</ErrorScreen>;

  //if ( playEnded )
  //  return <QuizResults quizSession={quizSession} />

  return (
    <Center>
      {!playStarted ? (
        <QuizPresentation quiz={quiz} onPlayStart={startQuiz} />
      ) : playEnded ? (
        <QuizResults quiz={quiz} quizSession={quizSession} />
      ) : (
        <QuizGame
          quizSession={quizSession}
          quiz={quiz}
          onFinish={onQuizFinish}
        />
      )}
    </Center>
  );
};

export default PlayQuiz;
