import { Box, HStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styles from "../styles";

export interface NavBarItem {
  name: string;
  href: string;
}

export interface NavBarProps {
  items: NavBarItem[];
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  return (
    <HStack
      align="center"
      gap={0}
      borderWidth={1}
      borderColor={styles.colors.border}
    >
      {props.items.map((item) => (
        <ChakraLink
          key={item.name}
          as={NavLink}
          to={item.href}
          color={styles.colors.text.primary}
          textDecoration="none"
          _activeLink={{
            color: styles.colors.text.secondary,
          }}
          _hover={{
            textDecoration: "none",
            color: styles.colors.text.primary,
          }}
        >
          <Box
            key={item.name}
            _hover={{ bg: styles.colors.accent }}
            textDecoration="none"
            p={4}
            borderColor={styles.colors.border}
            borderLeftWidth={1}
            borderRightWidth={1}
          >
            <Text>{item.name}</Text>
          </Box>
        </ChakraLink>
      ))}
    </HStack>
  );
};

export default NavBar;
