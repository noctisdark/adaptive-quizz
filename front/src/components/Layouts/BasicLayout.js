import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const BasicLayout = styled(Box)`
  max-width: ${({theme}) => theme.breakpoints.lg};
  margin: 0 auto;
  padding: 20px;
`

export default BasicLayout;
