import { type Request, type Response, type NextFunction } from "express";

// Define a type for Express route handlers
export type ExpressFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;
