import { defineStyleConfig } from "@chakra-ui/react";
import styles from "../styles";

export const headingTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    color: styles.colors.text.primary,
    fontSize: "xl",
  },
});
