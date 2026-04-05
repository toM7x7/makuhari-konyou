import { Hono } from "hono";
import { env, getMissingWorkerSecrets } from "../config/env.js";

export const healthRouter = new Hono().get("/", (c) =>
  c.json({
    ok: true,
    service: "worker",
    port: env.PORT,
    missingSecrets: getMissingWorkerSecrets(),
    timestamp: new Date().toISOString(),
  }),
);
