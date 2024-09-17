import React from 'react';
import { Center, Spinner, Box, Text } from '@chakra-ui/react';

const LoadingScreen: React.FC<{ what: string }> = ({ what }: { what?: string }) => {
    return (
        <Center height="100vh">
            <Box textAlign="center">
                <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
                <Text mt={4} fontSize="xl" color="gray.500">Loading {what ? what : '...'}</Text>
            </Box>
        </Center>
    );
};

export default LoadingScreen;