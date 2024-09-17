import type { Request, Response } from "express";
import { ok } from "./http-response";

export async function getHealth(req: Request, res: Response) {
  ok(res, { status: "OK" });
}
