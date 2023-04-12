import { Box, Spinner, Text } from "@chakra-ui/react";

const LoadingScreen = ({ title, children, ...props }) => (
  <Box
    position="fixed"
    width="100%"
    height="100%"
    left={0}
    top={0}
    zIndex={9}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    {...props}
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
