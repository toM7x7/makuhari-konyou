import type { IntegrationStatus } from "@makuhari/shared-types";
import { z } from "zod";

const webEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_XR_BASE_URL: z.url().default("http://localhost:8081"),
  NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  INTERNAL_WORKER_URL: z.url().default("http://localhost:8080"),
  INTERNAL_WORKER_TOKEN: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.url().default("https://app.posthog.com"),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

export const env = webEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_XR_BASE_URL: process.env.NEXT_PUBLIC_XR_BASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  INTERNAL_WORKER_URL: process.env.INTERNAL_WORKER_URL,
  INTERNAL_WORKER_TOKEN: process.env.INTERNAL_WORKER_TOKEN,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

export function getWebIntegrationStatus(): IntegrationStatus[] {
  return [
    {
      name: "Supabase client",
      ready: Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      missing: [
        !env.NEXT_PUBLIC_SUPABASE_URL ? "NEXT_PUBLIC_SUPABASE_URL" : null,
        !env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null,
      ].filter(Boolean) as string[],
    },
    {
      name: "Supabase service role",
      ready: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
      missing: !env.SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : [],
    },
    {
      name: "Worker bridge",
      ready: Boolean(env.INTERNAL_WORKER_URL && env.INTERNAL_WORKER_TOKEN),
      missing: [
        !env.INTERNAL_WORKER_URL ? "INTERNAL_WORKER_URL" : null,
        !env.INTERNAL_WORKER_TOKEN ? "INTERNAL_WORKER_TOKEN" : null,
      ].filter(Boolean) as string[],
    },
    {
      name: "Observability",
      ready: Boolean(env.NEXT_PUBLIC_POSTHOG_KEY && env.NEXT_PUBLIC_SENTRY_DSN),
      missing: [
        !env.NEXT_PUBLIC_POSTHOG_KEY ? "NEXT_PUBLIC_POSTHOG_KEY" : null,
        !env.NEXT_PUBLIC_SENTRY_DSN ? "NEXT_PUBLIC_SENTRY_DSN" : null,
      ].filter(Boolean) as string[],
    },
  ];
}
