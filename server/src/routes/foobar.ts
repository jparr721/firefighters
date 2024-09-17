import { Router } from "express";
import { getFoobar, getFoobarError } from "../controllers/foobar";
import unrollError from "../middleware/unroll-error";

export default (): Router => {
  const router = Router();
  router.get("/", unrollError(getFoobar));
  router.get("/error", unrollError(getFoobarError));
  return router;
};
