import styled from "@emotion/styled";

import { Box, Stack, useColorMode } from "@chakra-ui/react";
import theme from "providers/UIProvider/theme";

import Banner from "./Banner";
import Links from "./Links";

const StickyContainer = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 999;
`;

const NavigationBar = styled(Stack)`
  height: 100%;
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  & > * {
    height: 100%;
  }
`;

const Navigation = () => {
  const { colorMode } = useColorMode();

  return (
    <StickyContainer
      height="80px"
      backgroundColor={
        colorMode === "light" ? theme.colors.white : theme.colors.gray[800]
      }
      boxShadow={`0 2px 4px 0 ${
        colorMode === "light" ? theme.colors.gray[300] : theme.colors.gray[900]
      }`}
    >
      <NavigationBar justifyContent="space-between">
        <Banner />
        <Links />
      </NavigationBar>
    </StickyContainer>
  );
};

export default Navigation;
