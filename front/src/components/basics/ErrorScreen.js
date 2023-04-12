import { Box, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const ErrorScreen = ({ title, children }) => (
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
  >
    <WarningIcon color="red" fontSize="40px" />
    <br />
    {children || <Text>{title}</Text>}
  </Box>
);

export default ErrorScreen;
