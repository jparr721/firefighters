import { Router } from "express";
import { getHealth } from "../controllers/healthz";

export default (): Router => {
  const router = Router();
  router.get("/", getHealth);
  return router;
};
