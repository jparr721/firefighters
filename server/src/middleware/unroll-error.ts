import { type Request, type Response, type NextFunction } from "express";
import { type ExpressFn } from "./express-fn";

// Use the ExpressRouteHandler type for the 'fn' parameter
const unrollError =
  (fn: ExpressFn): ExpressFn =>
  (req: Request, res: Response, next: NextFunction): Promise<any> =>
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));

export default unrollError;
