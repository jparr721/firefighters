import { useFrame } from "@react-three/fiber";
import { useState, useRef, useCallback } from "react";
import { Position } from ".";
import { Firefighter } from "./firefighter";
import { GameBoard } from "./game-board";
import { Text } from "@react-three/drei";

export const GRID_SIZE = 64;

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

const Game: React.FC<{
  customMoveFunction: (
    firefighter: Firefighter,
    gameBoard: GameBoard
  ) => Promise<Position> | null;
}> = ({ customMoveFunction }) => {
  const [gameBoard] = useState(() => new GameBoard(GRID_SIZE, GRID_SIZE));
  const firefighterRef = useRef(
    new Firefighter([GRID_SIZE / 4, GRID_SIZE / 4], gameBoard)
  );
  const [firefighterPosition, setFirefighterPosition] = useState<Position>(
    firefighterRef.current.position
  );
  const [fires, setFires] = useState<Position[]>(
    gameBoard.getFires().map((fire) => fire.position)
  );

  const updateGame = useCallback(async () => {
    if (customMoveFunction) {
      firefighterRef.current.setCustomMoveFunction(customMoveFunction);
    }
    await firefighterRef.current.submitMove();
    setFirefighterPosition([...firefighterRef.current.position]);
    setFires(gameBoard.getFires().map((fire) => fire.position));
  }, [customMoveFunction, gameBoard]);

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

export default Game;
