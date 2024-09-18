import { Position } from ".";
import { GameBoard } from "./game-board";
import { distance } from "./utils";

abstract class FirefighterBase {
  position: Position;
  public flexState: Record<string, any> = {};
  protected readonly gameBoard: GameBoard;

  constructor(position: Position, gameBoard: GameBoard) {
    this.position = position;
    this.gameBoard = gameBoard;
  }

  public async submitMove(): Promise<void> {
    const TIMEOUT = 10;

    try {
      await Promise.race([
        this.makeMove(),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Move timed out")), TIMEOUT);
        }),
      ]);
    } catch (error) {
      console.error("Move error:", error);
    }
  }

  async move(): Promise<void> {
    const closestFire = this.gameBoard.getClosestFire(this.position);
    const currentDistanceToFire = distance(this.position, closestFire.position);

    const moves: Position[] = [
      [this.position[0] + 1, this.position[1]] as Position,
      [this.position[0] - 1, this.position[1]] as Position,
      [this.position[0], this.position[1] + 1] as Position,
      [this.position[0], this.position[1] - 1] as Position,
    ].filter((move) => this.gameBoard.isValidMove(move));

    if (moves.length === 0) {
      console.error("no moves available");
      return;
    }

    let bestMove = this.position;
    let bestDistance = currentDistanceToFire;

    for (const move of moves) {
      const distanceToFire = distance(move, closestFire.position);
      if (distanceToFire < bestDistance) {
        bestMove = move;
        bestDistance = distanceToFire;
      }
    }

    this.position = bestMove;
  }

  private async makeMove(): Promise<void> {
    await this.move();

    if (this.gameBoard.isCollidingWithFire(this.position)) {
      this.gameBoard.extinguishFire(this.position);
    }

    this.gameBoard.spawnRandomFire();
  }
}

export class Firefighter extends FirefighterBase {
  private customMoveFunction:
    | ((firefighter: Firefighter, gameBoard: GameBoard) => Promise<Position>)
    | null = null;

  constructor(position: Position, gameBoard: GameBoard) {
    super(position, gameBoard);
  }

  setCustomMoveFunction(
    fn: (firefighter: Firefighter, gameBoard: GameBoard) => Promise<Position>
  ) {
    this.customMoveFunction = fn;
  }

  async move(): Promise<void> {
    if (this.customMoveFunction) {
      this.position = await this.customMoveFunction(this, this.gameBoard);
    } else {
      // Fallback to the original move logic
      await super.move();
    }
  }
}
