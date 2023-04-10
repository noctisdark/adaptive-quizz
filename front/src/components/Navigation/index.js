import styled from "@emotion/styled";

import { Box, Stack } from "@chakra-ui/react";

import Banner from "./Banner";
import Links from "./Links";

const StickyContainer = styled(Box)`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 0 ${({ theme }) => theme.colors.gray[300]};
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

const Navigation = () => (
  <StickyContainer height="80px">
    <NavigationBar justifyContent="space-between">
      <Banner />
      <Links />
    </NavigationBar>
  </StickyContainer>
);

export default Navigation;
