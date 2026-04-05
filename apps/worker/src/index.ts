import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { buildPrompt, resolveModelId } from "@makuhari/prompt-builder";
import { processJobRequestSchema } from "@makuhari/shared-types";
import { env, getMissingWorkerSecrets } from "./config/env.js";
import { healthRouter } from "./routes/health.js";

const app = new Hono();

app.route("/healthz", healthRouter);

app.post("/internal/process-job", async (c) => {
  const authHeader = c.req.header("authorization");
  const expectedToken = env.INTERNAL_WORKER_TOKEN;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return c.json({ error: "unauthorized" }, 401);
  }

  const payload = await c.req.json().catch(() => null);
  const parsed = processJobRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return c.json(
      {
        error: "invalid_request",
        issues: parsed.error.flatten(),
      },
      400,
    );
  }

  const missingSecrets = getMissingWorkerSecrets();
  const modelId = resolveModelId({
    previewEnabled: env.VERTEX_IMAGE_PREVIEW_ENABLED,
  });
  const promptPreview = buildPrompt({
    aspectRatio: "4:5",
    heroAssetName: "青木昆陽メインビジュアル v1",
    sceneDirective: "ジョブ実処理前のワーカー疎通確認用プレビュー",
    stylePromptTemplate: "観光ポスターとして明るく視認性高く見せる",
  });

  if (missingSecrets.length > 0) {
    return c.json(
      {
        status: "blocked",
        jobId: parsed.data.jobId,
        reason: "missing_worker_config",
        missingSecrets,
        modelId,
        promptPreview,
      },
      503,
    );
  }

  return c.json(
    {
      status: "accepted",
      jobId: parsed.data.jobId,
      modelId,
      promptPreview,
      note: "Vertex AI / Supabase 接続はこれから実装する前提の雛形レスポンスです。",
    },
    202,
  );
});

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`worker listening on http://localhost:${info.port}`);
  },
);
