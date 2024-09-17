import type { Express } from "express";
import HealthRouter from "./routes/healthz";
import logger from "./logger";

function logRoutes(app: Express) {
  const routes: { method: string; path: string }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function processStack(stack: any, basePath = "") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stack.forEach((middleware: any) => {
      if (middleware.route) {
        // Direct route
        const path = basePath + middleware.route.path;
        const methods = middleware.route.methods;
        Object.keys(methods).forEach((method) => {
          if (methods[method]) {
            routes.push({ method: method.toUpperCase(), path });
          }
        });
      } else if (
        middleware.name === "router" ||
        middleware.name === "bound dispatch"
      ) {
        // Router
        let newPath = basePath;
        if (middleware.regexp.source !== "^\\/?$") {
          newPath += "/" + middleware.regexp.source;
        }
        processStack(middleware.handle.stack, newPath);
      }
    });
  }

  processStack(app._router.stack);

  routes.forEach((route) => logger.info(route));
}

export default function makeApiRouter(app: Express) {
  app.use("/healthz", HealthRouter());
  app.use("/readyz", HealthRouter());

  logRoutes(app);
  return app;
}
