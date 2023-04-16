import { Link as RouterLink } from "react-router-dom";
import { Heading, Text, Image, VStack, Link, Avatar } from "@chakra-ui/react";

import BasicLayout from "./Layouts/BasicLayout";

const AppPresentation = () => (
  <BasicLayout maxW="900px !important">
    <Heading as="h1" fontSize="3xl" mb={16}>
      AdaptiveQuiz <Avatar src="/logo.svg" size="sm" borderRadius="unset" />
    </Heading>
    <VStack gap={8} alignItems="flex-start">
      <Text>
        <strong>Adaptive Quiz</strong> is a web application that helps teachers
        design adaptive quizzes on a given subject, the questions presented to
        students can evolve according to the answers given during the assesment.
      </Text>

      <Heading as="h3" fontSize="lg">
        Create an account
      </Heading>
      <Text>
        Navigate to the{" "}
        <Link color="teal.500" as={RouterLink} to="/auth">
          <strong>authentication</strong>
        </Link>{" "}
        page to login or create an account.
      </Text>
      <Image src="/register.png" alt="Register" alignSelf="center" />

      <Heading as="h3" fontSize="lg">
        Set up your account
      </Heading>
      <Text>
        Once logged in, you can visit your
        <Link color="teal.500" as={RouterLink} to="/home/settings">
          <strong>account settings</strong>
        </Link>{" "}
        to configure your account.
      </Text>
      <Image
        src="/account_settings.png"
        alt="Account settings"
        alignSelf="center"
      />

      <Heading as="h3" fontSize="lg">
        Create a quiz
      </Heading>
      <Text>
        You can use this app to create quizzes. Each quiz has 4 questions, only
        one of which can be correct. Visit the{" "}
        <Link color="teal.500" as={RouterLink} to="/home/new">
          <strong>quiz creation page</strong>
        </Link>{" "}
        to create a new quiz.
      </Text>
      <Image src="/create_quiz.png" alt="Create a quiz" alignSelf="center" />

      <Heading as="h3" fontSize="lg">
        Edit your quizzes
      </Heading>
      <Text>
        There is an edit button on each of of your quizzes that should take you
        to page similar to the quiz creation page. There you can change your
        quiz image, title, description and add new questions. <br />
        Each question must specify a difficulty level and a correct answer among
        the 4 options.
      </Text>
      <Image
        src="/edit_questions.png"
        alt="Edit your quiz"
        alignSelf="center"
      />

      <Heading as="h3" fontSize="lg">
        Play quizzes
      </Heading>
      <Text>
        The{" "}
        <Link color="teal.500" as={RouterLink} to="/home">
          <strong>homepage</strong>
        </Link>{" "}
        contains a list of all publicly available quizzes as well as your own
        quizzes. You can play a quiz by clicking the play button.
      </Text>
      <Image src="/play_quizzes.png" alt="Play Quizzes" alignSelf="center" />
      <Text>
        This will take you to the quiz playing page. Each quiz lasts for 5
        minutes <i>(Next update for configuring this)</i>.
      </Text>
      <Image src="/play_a_quiz.png" alt="Play a Quiz" alignSelf="center" />
      <Text>
        After you finish the quiz, you will receive a result and your answers
        will be transmitted to quiz creator{" "}
        <i>(Next update for the quiz creator page)</i>.
      </Text>
      <Image src="/quiz_evaluation.png" alt="Quiz evaluation" alignSelf="center" />
      <Heading as="h6" fontSize="md">
        But the next update never comes 💀
      </Heading>
    </VStack>
  </BasicLayout>
);

export default AppPresentation;
