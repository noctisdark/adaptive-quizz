import styled from "@emotion/styled";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import PlayIcon from "components/icons/PlayIcon";

const QuizImage = styled(Image)`
  border-top-right-radius: ${({ theme }) => theme.radii.sm};
  border-top-left-radius: 5px;
`;

const QuizCard = ({ quiz }) => {
  const {
    title = "Quiz title",
    author = "Quiz author",
    description = "Quiz description",
    image = "https://images.radio-canada.ca/v1/audio/emission/16x9/oh-le-quiz-visuel-moteur.jpg",
  } = (quiz || {});

  return (
    <Card maxW="sm" variant="elevated">
      <CardBody padding={0}>
        <QuizImage
          objectFit="cover"
          src={image}
          alt={`Quiz "${title} by ${author}"`}
        />
      </CardBody>

      <CardFooter flexDirection="column">
        <Text as="b" fontSize="1.2em">
          {title}
        </Text>{" "}
        <Text>{description}</Text>
        <Text as="i" color="gray">
          By {author}
        </Text>
        <Flex gap={4} marginLeft={-2}>
          <Button variant="ghost" leftIcon={<PlayIcon />}>
            Play
          </Button>
          <Button variant="ghost" leftIcon={<EditIcon />}>
            Edit
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
