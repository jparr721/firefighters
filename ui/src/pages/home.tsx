import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import {
  Box,
  SimpleGrid,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Position } from "./game";
import { GameBoard } from "./game/game-board";
import MonacoEditor from "react-monaco-editor";
import Game, { GRID_SIZE } from "./game/game";

const Home: React.FC = () => {
  const [code, setCode] = useState(`
// firefighter.flexState lets you persist state between moves. It's an empty object by default.
// public flexState: Record<string, any> = {};
// Feel free to use that to store any state you want between moves.

async function customMove(firefighter, gameBoard) {
    const position = firefighter.position;
    const closestFire = gameBoard.getClosestFire(position);
    const currentDistanceToFire = gameBoard.distance(position, closestFire.position);

    const moves = [
      [position[0] + 1, position[1]],
      [position[0] - 1, position[1]],
      [position[0], position[1] + 1],
      [position[0], position[1] - 1],
    ].filter((move) => gameBoard.isValidMove(move));

    if (moves.length === 0) {
      console.error("no moves available");
      return position;
    }

    let bestMove = position;
    let bestDistance = currentDistanceToFire;

    for (const move of moves) {
      const distanceToFire = gameBoard.distance(move, closestFire.position);
      if (distanceToFire < bestDistance) {
        bestMove = move;
        bestDistance = distanceToFire;
      }
    }

    return bestMove;
}
`);

  const { onClose } = useDisclosure();
  const cancelRef = useRef();

  const [customMoveFunction, setCustomMoveFunction] = useState<
    | ((firefighter: Firefighter, gameBoard: GameBoard) => Promise<Position>)
    | null
  >(null);

  const [error, setError] = useState<string | null>(null);

  const handleRunCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(
        "firefighter",
        "gameBoard",
        `
        return (${code})
      `
      )();
      setCustomMoveFunction(() => fn);
    } catch (error) {
      console.error("Error in custom code:", error);
      setError(`${error}`);
    }
  };

  const handleCloseError = () => {
    setError(null);
    onClose();
  };

  return (
    <SimpleGrid columns={2} spacing={4}>
      <Box width="1024px" height="1024px" tabIndex={0}>
        <Canvas>
          <OrthographicCamera
            makeDefault
            zoom={1024 / GRID_SIZE}
            position={[GRID_SIZE / 2, GRID_SIZE / 2, 1]}
          />
          <color attach="background" args={["#1a0933"]} />
          <ambientLight intensity={0.5} />
          <Game customMoveFunction={customMoveFunction} />
        </Canvas>
      </Box>
      <Box>
        <MonacoEditor
          language="typescript"
          theme="vs-dark"
          value={code}
          options={{ selectOnLineNumbers: true }}
          onChange={setCode}
        />
        <Button onClick={handleRunCode} mt={4}>
          Run Code
        </Button>
        <AlertDialog
          isOpen={error !== null}
          leastDestructiveRef={cancelRef}
          onClose={handleCloseError}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                You made a fucky wucky!
              </AlertDialogHeader>

              <AlertDialogBody>{error}</AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="red" onClick={handleCloseError} ml={3}>
                  SHIT!
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </SimpleGrid>
  );
};

export default Home;
