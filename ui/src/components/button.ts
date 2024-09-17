import { defineStyleConfig } from "@chakra-ui/react";
import styles from "../styles";

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "base",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
  },
  variants: {
    outline: {
      color: styles.colors.accent,
    },
    solid: {
      bg: styles.colors.accent,
      color: styles.colors.text.primary,
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});
