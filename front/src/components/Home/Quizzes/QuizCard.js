import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import PlayIcon from "components/icons/PlayIcon";

const QuizCard = ({ quiz, canEdit }) => {
  const {
    title = "Quiz title",
    author = "Quiz author",
    description = "Quiz description",
    backgroundURL = "https://images.radio-canada.ca/v1/audio/emission/16x9/oh-le-quiz-visuel-moteur.jpg",
  } = quiz || {};

  return (
    <Card maxW="sm" variant="elevated">
      <CardBody
        padding={0}
        backgroundImage={backgroundURL}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        w="sm"
        minH="xs"
      ></CardBody>

      <CardFooter flexDirection="column">
        <Text as="b" fontSize="1.2em">
          {title}
        </Text>{" "}
        <Text>{description}</Text>
        <Text as="i" color="gray">
          By @{author}
        </Text>
        <Flex gap={4} marginLeft={-2}>
          <Button variant="ghost" leftIcon={<PlayIcon />}>
            Play
          </Button>
          {canEdit && (
            <Button
              as={RouterLink}
              to={`/home/edit/${quiz.id}`}
              variant="ghost"
              leftIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
