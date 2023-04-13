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
import { WarningIcon } from "@chakra-ui/icons";

import { LoadingOverlay } from "components/basics/Overlay";

import readFile from "utils/readFile";
import PlayIcon from "components/icons/PlayIcon";
import { useUser } from "providers/UserProvider";
import { useQuiz } from "providers/QuizProvider";
import { createOrUpdateQuiz } from "api/quizzes";
import { uploadFile } from "api/uploads";

const QuizForm = ({ quiz, setQuiz }) => {
  const { title, description, backgroundURL } = quiz || {};
  const isNew = quiz.id === -1;

  const { user } = useUser();
  const { addQuiz, replaceQuiz } = useQuiz();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState(null);

  // !TODO!: Make a component that does this
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      if (file.path === previewImageFile?.path) return;

      setPreviewImageFile(file);

      try {
        setIsLoading(true);
        const data = await readFile(file);
        setQuiz({ ...quiz, backgroundURL: data });
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

  // step 1: implement creating quizzes, no delete so far
  // step 2: implement building answers
  // step 3: make sure these are edit compatible
  // step 4: implement delete
  const onSaveQuiz = async () => {
    try {
      let { backgroundURL } = quiz;
      // upload the image
      if (previewImageFile) {
        const uploadForm = new FormData();
        uploadForm.set("image", previewImageFile);
        backgroundURL = (await uploadFile(uploadForm)).data;
      }

      const { data: newQuiz } = await createOrUpdateQuiz({
        ...quiz,
        backgroundURL,
        questions: [],
      });

      if (isNew) addQuiz(newQuiz);
      else replaceQuiz(newQuiz);

      // update the form to continue editing
      setQuiz(newQuiz);
    } catch (error) {}
  };

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
              backgroundImage={backgroundURL}
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
            By @{user.username}
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
            <Button
              colorScheme="green"
              onClick={onSaveQuiz}
              isDisabled={formError}
            >
              {isNew ? "Create quiz" : "Save quiz"}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default QuizForm;
