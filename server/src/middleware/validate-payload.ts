import { type Request, type Response, type NextFunction } from "express";
import { type ClassConstructor, plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import type { ExpressFn } from "./express-fn";

const validatePayload =
  <Schema extends ClassConstructor<any>>(schema: Schema): ExpressFn =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return Promise.resolve(validateOrReject(plainToInstance(schema, req.body)))
      .then(() => next())
      .catch((err) => next(err));
  };

export default validatePayload;
