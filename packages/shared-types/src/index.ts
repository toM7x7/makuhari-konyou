import { z } from "zod";

export const aspectRatios = ["1:1", "4:5", "9:16"] as const;
export type AspectRatio = (typeof aspectRatios)[number];

export const arModes = ["world", "target", "face"] as const;
export type ArMode = (typeof arModes)[number];

export const generationModes = [
  "ar_capture_generate",
  "photo_generate",
  "target_generate",
] as const;
export type GenerationMode = (typeof generationModes)[number];

export const generationJobStatuses = [
  "queued",
  "preprocessing",
  "prompt_built",
  "generating",
  "storing",
  "completed",
  "failed",
  "blocked",
] as const;
export type GenerationJobStatus = (typeof generationJobStatuses)[number];

export const analyticsEventNames = [
  "app_opened",
  "ar_opened",
  "ar_mode_selected",
  "placement_completed",
  "target_detected",
  "capture_saved",
  "generate_started",
  "generate_completed",
  "generate_failed",
  "share_created",
  "share_opened",
  "report_submitted",
] as const;
export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export const spotPresetSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  promptTemplate: z.string(),
  defaultArMode: z.enum(arModes),
  isActive: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});
export type SpotPreset = z.infer<typeof spotPresetSchema>;

export const stylePresetSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  promptTemplate: z.string(),
  isActive: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});
export type StylePreset = z.infer<typeof stylePresetSchema>;

export const heroAssetSchema = z.object({
  id: z.string(),
  version: z.string(),
  name: z.string(),
  assetType: z.enum(["image", "sprite", "3d"]),
  storagePath: z.string(),
  thumbnailPath: z.string().nullable(),
  isActive: z.boolean(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type HeroAsset = z.infer<typeof heroAssetSchema>;

export const featureFlagSchema = z.object({
  key: z.string(),
  enabled: z.boolean(),
  description: z.string(),
});
export type FeatureFlag = z.infer<typeof featureFlagSchema>;

export const bootstrapPayloadSchema = z.object({
  activeHeroAssetVersion: z.string(),
  heroAssets: z.array(heroAssetSchema),
  spotPresets: z.array(spotPresetSchema),
  stylePresets: z.array(stylePresetSchema),
  featureFlags: z.array(featureFlagSchema),
});
export type BootstrapPayload = z.infer<typeof bootstrapPayloadSchema>;

export const arCaptureSchema = z.object({
  sessionId: z.string().min(1),
  mode: z.enum(arModes),
  captureUploadId: z.string().min(1),
  targetId: z.string().nullable().optional(),
  poseJson: z.record(z.string(), z.unknown()).optional(),
  scale: z.number().positive().optional(),
  rotation: z.number().optional(),
});
export type ArCaptureInput = z.infer<typeof arCaptureSchema>;

export const generationJobInputSchema = z.object({
  sourceType: z.enum(generationModes),
  captureId: z.string().nullable().optional(),
  sceneUploadId: z.string().nullable().optional(),
  styleUploadId: z.string().nullable().optional(),
  spotPresetId: z.string().nullable().optional(),
  stylePresetId: z.string().nullable().optional(),
  freeText: z.string().trim().max(80).default(""),
  aspectRatio: z.enum(aspectRatios).default("4:5"),
});
export type GenerationJobInput = z.infer<typeof generationJobInputSchema>;

export const generationJobResponseSchema = z.object({
  jobId: z.string(),
  status: z.enum(generationJobStatuses),
});
export type GenerationJobResponse = z.infer<typeof generationJobResponseSchema>;

export const processJobRequestSchema = z.object({
  jobId: z.string().min(1),
});
export type ProcessJobRequest = z.infer<typeof processJobRequestSchema>;

export type IntegrationStatus = {
  name: string;
  ready: boolean;
  missing: string[];
};
