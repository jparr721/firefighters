import { Position } from ".";

export function distance(a: Position, b: Position): number {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}
