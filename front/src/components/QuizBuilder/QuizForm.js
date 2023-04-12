import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Button,
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
} from "@chakra-ui/react";

import { LoadingOverlay } from "components/basics/Overlay";

import { WarningIcon } from "@chakra-ui/icons";
import readFile from "utils/readFile";
import PlayIcon from "components/icons/PlayIcon";
import { useUser } from "providers/UserProvider";

// complete the quizzes today
const QuizForm = ({ quiz, setQuiz }) => {
  const { title, description, backgroundImageData } = quiz || {};

  const { user } = useUser();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      if (file.path === previewImageFile?.path) return;

      setPreviewImageFile(file);

      try {
        setIsLoading(true);
        const data = await readFile(file);
        setQuiz({ ...quiz, backgroundImageData: data });
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setIsLoading(false);
        setError("Image loading failed.");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previewImageFile, quiz]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  const onTitleChange = (title) => setQuiz({ ...quiz, title });
  const onDescriptionChange = (description) =>
    setQuiz({ ...quiz, description });

  let formError = !title
    ? "The quiz needs a title."
    : !description
    ? "The quiz needs a description."
    : "";

  return (
    <Flex padding="20px" direction="column" alignItems="center">
      <Heading as="h4" size="md" mb={8}>
        Quiz description
      </Heading>
      <Card variant="elevated">
        <CardBody padding={0} {...getRootProps()}>
          <input {...getInputProps()} />
          <LoadingOverlay when={isLoading} opacity={1}>
            <Box
              backgroundImage={backgroundImageData}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundSize="cover"
              display="flex"
              alignItems="flex-end"
              justifyContent="center"
              w="xl"
              minH="sm"
            >
              <Text background="gray.100" opacity={0.5}>
                {error ? (
                  <Text color="red">
                    <WarningIcon /> {error}
                  </Text>
                ) : isDragActive ? (
                  "Release to change your quiz background image"
                ) : (
                  "To change your quiz background image, drop a new image here or click to pick."
                )}
              </Text>
            </Box>
          </LoadingOverlay>
        </CardBody>

        <CardFooter flexDirection="column" gap={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Quiz title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter a short description of your quiz."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </FormControl>
          <Text as="i" color="gray">
            By {user.username}
          </Text>
          {formError && (
            <Text color="red">
              <WarningIcon /> {formError}
            </Text>
          )}
          <Flex gap={4} marginLeft={-2}>
            <Button variant="ghost" leftIcon={<PlayIcon />} isDisabled>
              Play
            </Button>
          </Flex>
          <Flex justifyContent="flex-end" gap={4}>
            <Button colorScheme="green" onClick={() => console.log("save all")} isDisabled={formError}>
              {quiz.id === -1 ? "Create quiz" : "Save quiz"}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default QuizForm;
