import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Stack, Avatar, Text, Button } from "@chakra-ui/react";
import { WarningIcon, DownloadIcon } from "@chakra-ui/icons";

import { LoadingOverlay } from "components/basics/Overlay";

import { useUser } from "providers/UserProvider";
import { uploadProfileImage } from "api/users";

const ProfileImageSection = () => {
  const {
    user: { imageURL },
    updateImage,
  } = useUser();

  // clientside error
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImageData, setPreviewImageData] = useState(null);
  const [previewImageFile, setPreviewImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      if (file.path === previewImageFile?.path) return;

      setPreviewImageFile(file);

      // Preview image
      const reader = new FileReader();
      reader.onerror = () => {
        setIsLoading(false);
        setError("Image loading failed.");
      };

      reader.onload = () => {
        setError(null);
        setPreviewImageData(reader.result);
      };

      setIsLoading(true);
      reader.readAsDataURL(file);
    },
    [previewImageFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  const startUpload = async () => {
    if (!previewImageData || error) return;

    setIsUploading(true);
    try {
      const form = new FormData();
      form.set("image", previewImageFile);
      const { data: imageURL } = await uploadProfileImage(form);

      updateImage(imageURL);
      setPreviewImageData(null);
    } catch (error) {}
  };

  return (
    <Stack as="section" padding="10px 0" alignItems="center">
      <Stack alignItems="center" {...getRootProps()}>
        <input {...getInputProps()} />
        <LoadingOverlay
          borderRadius="50%"
          when={isLoading || isUploading}
          opacity={1}
        >
          <Avatar
            onLoad={() =>
              (isLoading && setIsLoading(false)) ||
              (isUploading && setIsUploading(false))
            }
            src={previewImageData || imageURL}
            width="300px"
            height="300px"
          />
        </LoadingOverlay>

        {error ? (
          <Text color="red">
            <WarningIcon /> {error}
          </Text>
        ) : (
          <Text color="gray.500" as="i">
            {isDragActive
              ? "Release to change your profile image"
              : "To change your profile image, drop a new image here or click to pick."}
          </Text>
        )}
      </Stack>
      <Button
        alignSelf="center"
        colorScheme="blue"
        leftIcon={<DownloadIcon />}
        isDisabled={!previewImageData || isUploading || error}
        onClick={startUpload}
      >
        Save
      </Button>
    </Stack>
  );
};

export default ProfileImageSection;