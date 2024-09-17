import { type Request, type Response, type NextFunction } from "express";
import { DotenvVariable, dotenvValue } from "../dotenv";
import initializeApp from "../initialize-app";
import logger from "../logger";
import makeApiRouter from "../make-router";
import { errorResponse } from "../controllers/error-response";

const customErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
) => {
  console.log(JSON.stringify(err, null, 2));
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const debugPayload = {
    err,
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    stackTrace: err.stack,
  };

  errorResponse(statusCode)(res, message, "customErrorHandler", debugPayload);
};

export default async function start() {
  const app = initializeApp();
  const port = dotenvValue(DotenvVariable.NodePort, "8000");
  makeApiRouter(app);
  app.use(customErrorHandler);

  return app.listen(port, () => logger.info(`Running on port ${port}`));
}

start().catch((e) => logger.error(e.message));
