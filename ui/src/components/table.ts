import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import styles from "../styles";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const baseStyle = definePartsStyle({
  thead: {
    tr: {
      th: {
        borderColor: styles.colors.border,
      },
    },
  },
  tbody: {
    tr: {
      color: styles.colors.text.primary,
      _hover: { bg: styles.colors.accent },
      "th, td": {
        borderColor: styles.colors.border,
      },
    },
  },
});

export const tableTheme = defineMultiStyleConfig({ baseStyle });
