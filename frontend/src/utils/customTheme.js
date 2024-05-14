// src/utils/customTheme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    primary: {
      100: "#E5FCF1",
      200: "#27EF96",
      300: "#10DE82",
      400: "#0EBE6F",
      500: "#0CA25F",
      600: "#0A864F",
      700: "#086F42",
      800: "#075C37",
      900: "#06452C"
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      },
      a: {
        color: "primary.500",
        _hover: {
          color: "primary.600",
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
        _focus: { boxShadow: "none" },
      },
      variants: {
        solid: {
          bg: "primary.500",
          _hover: { bg: "primary.600" },
        },
        outline: {
          borderColor: "primary.500",
          color: "primary.500",
          _hover: {
            bg: "primary.100",
          },
        },
      },
    },
  },
});

export default customTheme;