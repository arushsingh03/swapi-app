import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({

});

export function Chakra({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
