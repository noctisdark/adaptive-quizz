import { Box, Spinner } from "@chakra-ui/react";

import styled from "@emotion/styled";

const CoverParent = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = ({ children, using, when = true, ...props }) => (
  <Box position="relative">
    {children}
    {(typeof when == "function" ? when() : when) && (
      <CoverParent {...props}>{using}</CoverParent>
    )}
  </Box>
);

export const LoadingOverlay = ({ children, when, ...props }) => (
  <Overlay
    using={<Spinner />}
    when={when}
    backgroundColor="gray.300"
    opacity={1}
    alignItems="center"
    justifyContent="center"
    display="flex"
    {...props}
  >
    {children}
  </Overlay>
);

export default Overlay;
