import theme from "./theme";

import { ChakraProvider } from '@chakra-ui/react'


const UIProvider = (props) => (
  <ChakraProvider theme={theme} {...props} />
);

export default UIProvider;