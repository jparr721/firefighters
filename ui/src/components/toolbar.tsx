import { Box, Icon, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import styles from "../styles";

interface ToolbarProps {
  children: ReactNode;
}

interface ToolbarButtonProps {
  icon: React.ElementType;
  onClick: () => void;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  onClick,
}) => (
  <Box p={10} _hover={{ bg: styles.colors.accent }} onClick={onClick}>
    <Icon
      as={icon}
      fontSize={25}
      fontWeight="bold"
      color={styles.colors.text.primary}
    />
  </Box>
);

const Toolbar: React.FC<ToolbarProps> = (props) => (
  <VStack align="center" background={styles.colors.primary}>
    {props.children}
  </VStack>
);

export default Toolbar;
