import type { Request, Response } from "express";
import { ok } from "./http-response";

export async function getFoobar(req: Request, res: Response) {
  ok(res, { foo: "bar" });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getFoobarError(req: Request, res: Response) {
  throw new Error("Foobar error");
}
