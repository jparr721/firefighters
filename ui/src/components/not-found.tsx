import { Box, Heading, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "../styles";

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        backgroundClip="text"
        color={styles.colors.text.primary}
      >
        404
      </Heading>
      <Text fontSize="lg" mt={3} mb={2} color={styles.colors.text.primary}>
        Nothing to see here!
      </Text>
      <Text color={styles.colors.text.primary} mb={6}>
        The page you're looking for does not seem to exist.
      </Text>
      <Button
        backgroundColor={styles.colors.accent}
        variant="solid"
        as={Link}
        to="/"
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
