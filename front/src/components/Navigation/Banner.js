import styled from "@emotion/styled";
import { Stack, Text } from "@chakra-ui/react";

import history from "providers/RouterProvider/history";

const Logo = styled.img`
  max-height: 75%;
`;

const Banner = () => (
  <Stack
    height="100%"
    direction="row"
    alignItems="center"
    cursor="pointer"
    onClick={() => history.push("/home")}
  >
    <Logo src="/logo.svg" alt="Apdative Quiz's logo" />
    <Text as="b">Adaptive Quiz</Text>
  </Stack>
);

export default Banner;
