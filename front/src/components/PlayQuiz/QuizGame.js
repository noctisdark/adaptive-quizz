import { useEffect, useState } from "react";
import { Flex, SlideFade } from "@chakra-ui/react";

import QuestionCard from "./QuestionCard";
import {
  answerQuestion,
  completeQuizSession,
  getNextQuestion,
} from "api/quizSessions";
import { throttle } from "../../utils/promise";
import Timer from "./Timer";
import { toast } from "providers/ToastProvider";

const QuizGame = ({ quizSession, quiz, onFinish }) => {
  const [question, setQuestion] = useState();
  const [isOpen, setIsOpen] = useState(true);

  const transition = {
    enter: { duration: 0.3, delay: 0.1 },
    exit: { duration: 0.3 },
  };

  const display = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  const onAnswer = async (answer) => {
    hide();

    try {
      const {
        data: { nextQuestion, quizSession: finishedQuizSession },
      } = await throttle(answerQuestion(quizSession.id, answer), 500);
      if (finishedQuizSession) onFinish(finishedQuizSession);
      else setQuestion(nextQuestion);

      display();
    } catch (error) {
      console.log(error);
    }
  };

  const onTimeout = async () => {
    toast({
      status: "info",
      description: "The Quiz is over, redirecting to results...",
      duration: 3000,
    });

    // it's very likely that it's finished on the server side as well, but just in case
    const { data: completedQuiz } = await completeQuizSession(quizSession.id);
    onFinish(completedQuiz);
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { nextQuestion, quizSession: finishedQuizSession },
        } = await getNextQuestion(quizSession.id);

        if (finishedQuizSession) {
          toast({
            status: "success",
            description:
              "Congratulations, you have finished a quiz on time 🥳.",
            duration: 3000,
          });
          onFinish(finishedQuizSession);
        } else setQuestion(nextQuestion);
        display();
      } catch (error) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizSession.id]);

  if (!question) return null;

  return (
    <Flex direction="column" alignItems="center" gap={8}>
      <Timer quizSession={quizSession} onTimeout={onTimeout} />
      <SlideFade offsetX={15} offsetY={0} in={isOpen} transition={transition}>
        <QuestionCard quiz={quiz} question={question} onAnswer={onAnswer} />
      </SlideFade>
    </Flex>
  );
};

export default QuizGame;
