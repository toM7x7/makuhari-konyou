import { z } from "zod";

const workerEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8080),
  WORKER_BASE_URL: z.url().default("http://localhost:8080"),
  INTERNAL_WORKER_TOKEN: z.string().min(1).optional(),
  GCP_PROJECT_ID: z.string().optional(),
  VERTEX_LOCATION: z.string().default("asia-northeast1"),
  VERTEX_IMAGE_PREVIEW_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  VERTEX_SERVICE_ACCOUNT_EMAIL: z.string().optional(),
  SUPABASE_URL: z.url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

export const env = workerEnvSchema.parse({
  PORT: process.env.PORT,
  WORKER_BASE_URL: process.env.WORKER_BASE_URL,
  INTERNAL_WORKER_TOKEN: process.env.INTERNAL_WORKER_TOKEN,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  VERTEX_LOCATION: process.env.VERTEX_LOCATION,
  VERTEX_IMAGE_PREVIEW_ENABLED: process.env.VERTEX_IMAGE_PREVIEW_ENABLED,
  VERTEX_SERVICE_ACCOUNT_EMAIL: process.env.VERTEX_SERVICE_ACCOUNT_EMAIL,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
});

export function getMissingWorkerSecrets() {
  return [
    !env.INTERNAL_WORKER_TOKEN ? "INTERNAL_WORKER_TOKEN" : null,
    !env.GCP_PROJECT_ID ? "GCP_PROJECT_ID" : null,
    !env.SUPABASE_URL ? "SUPABASE_URL" : null,
    !env.SUPABASE_SERVICE_ROLE_KEY ? "SUPABASE_SERVICE_ROLE_KEY" : null,
  ].filter(Boolean) as string[];
}
