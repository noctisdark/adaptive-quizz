import { Box, Spinner, Text } from "@chakra-ui/react";

const LoadingScreen = ({ title, children }) => (
  <Box
    position="absolute"
    width="100vw"
    height="100vh"
    zIndex={9}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
    <br />
    {children || <Text>{title}</Text>}
  </Box>
);

export default LoadingScreen;
