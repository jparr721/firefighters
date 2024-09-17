import React, { useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, Text } from "@react-three/drei";
import { Box } from "@chakra-ui/react";
import { Position } from "./game";
import { GameBoard } from "./game/game-board";
import { Firefighter } from "./game/firefighter";

const GRID_SIZE = 64;

const FirefighterIcon: React.FC<{ position: Position }> = ({ position }) => (
  <Text
    position={[position[0] + 0.5, position[1] + 0.5, 0]}
    fontSize={1}
    anchorX="center"
    anchorY="middle"
  >
    🚒
  </Text>
);

const FireIcon: React.FC<{ position: Position }> = ({ position }) => (
  <Text
    position={[position[0] + 0.5, position[1] + 0.5, 0]}
    fontSize={1}
    anchorX="center"
    anchorY="middle"
  >
    🔥
  </Text>
);

const Game: React.FC = () => {
  const [gameBoard] = useState(() => new GameBoard(GRID_SIZE, GRID_SIZE));
  const [firefighter] = useState(
    () => new Firefighter([GRID_SIZE / 4, GRID_SIZE / 4], gameBoard)
  );
  const [firefighterPosition, setFirefighterPosition] = useState<Position>(
    firefighter.position
  );
  const [fires, setFires] = useState<Position[]>(
    gameBoard.getFires().map((fire) => fire.position)
  );

  const updateGame = useCallback(async () => {
    await firefighter.submitMove();
    setFirefighterPosition([...firefighter.position]);
    setFires(gameBoard.getFires().map((fire) => fire.position));
  }, [firefighter, gameBoard]);

  useFrame((state, delta) => {
    state.clock.elapsedTime += delta;
    if (state.clock.elapsedTime > 0.1) {
      updateGame();
      state.clock.elapsedTime = 0;
    }
  });

  return (
    <>
      <FirefighterIcon position={firefighterPosition} />
      {fires.map((firePosition, index) => (
        <FireIcon key={index} position={firePosition} />
      ))}
    </>
  );
};

const Home: React.FC = () => {
  return (
    <Box width="1024px" height="1024px" tabIndex={0}>
      <Canvas>
        <OrthographicCamera
          makeDefault
          zoom={1024 / GRID_SIZE}
          position={[GRID_SIZE / 2, GRID_SIZE / 2, 1]}
        />
        <color attach="background" args={["#1a0933"]} />
        <ambientLight intensity={0.5} />
        <Game />
      </Canvas>
    </Box>
  );
};

export default Home;
