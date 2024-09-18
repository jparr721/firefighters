import { Position } from ".";
import { Fire } from "./fire";

export class GameBoard {
  private width: number;
  private height: number;
  private fires: Fire[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.fires = [];
    this.spawnRandomFire();
  }

  public distance(a: Position, b: Position): number {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  public getFires(): Fire[] {
    return this.fires;
  }

  public isValidMove(position: Position): boolean {
    return (
      position[0] >= 0 &&
      position[0] < this.width &&
      position[1] >= 0 &&
      position[1] < this.height
    );
  }

  public isCollidingWithFire(position: Position): boolean {
    return this.fires.some(
      (fire) =>
        fire.position[0] === position[0] && fire.position[1] === position[1]
    );
  }

  public extinguishFire(position: Position): void {
    this.fires = this.fires.filter(
      (fire) =>
        !(fire.position[0] === position[0] && fire.position[1] === position[1])
    );
  }

  public getClosestFire(position: Position): Fire {
    let closestFire = this.fires[0];
    let closestDistance = this.distance(position, closestFire.position);
    for (const fire of this.fires) {
      const distanceToFire = this.distance(position, fire.position);
      if (distanceToFire < closestDistance) {
        closestFire = fire;
        closestDistance = distanceToFire;
      }
    }
    return closestFire;
  }

  public spawnRandomFire(): void {
    // TODO make this spawn a random fire with a diminishing chance the more fires are on the board. If there
    // are < 3 fires, spawn every time.

    if (this.fires.length > 3) {
      return;
    }

    // TODO don't let them spawn on top of each other.

    const position = this.getRandomPosition();
    this.fires.push(new Fire(position));
  }

  private getRandomPosition(): Position {
    return [
      Math.floor(Math.random() * this.width),
      Math.floor(Math.random() * this.height),
    ];
  }
}
