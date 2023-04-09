import { extendTheme } from "@chakra-ui/react"

const breakpoints = {
  base: '0',
  xs: '320px',
  sm: '768px',
  md: '1024px',
  lg: '1366px',
  'xl': '1920px',
  '2xl': '2560'
};

const theme = extendTheme({
  breakpoints
  /* here goes nothing */
});

export default theme;