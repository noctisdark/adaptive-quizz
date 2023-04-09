import { Box, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const ErrorScreen = ({ title, children }) => (
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
    <WarningIcon color="red" fontSize="40px" />
    <br />
    {children || <Text>{title}</Text>}
  </Box>
);

export default ErrorScreen;
