import type { AspectRatio } from "@makuhari/shared-types";

export type ImageModelId =
  | "gemini-2.5-flash-image"
  | "gemini-3.1-flash-image-preview"
  | "gemini-3-pro-image-preview";

export type ImageProviderOptions = {
  previewEnabled?: boolean;
  adminMode?: boolean;
};

export type PromptBuildInput = {
  aspectRatio: AspectRatio;
  freeText?: string;
  heroAssetName: string;
  sceneDirective?: string;
  spotPromptTemplate?: string;
  stylePromptTemplate?: string;
};

export interface ImageProvider {
  readonly name: string;
  readonly defaultModelId: ImageModelId;
  generate(input: {
    modelId: ImageModelId;
    prompt: string;
  }): Promise<{
    requestId: string;
    modelId: ImageModelId;
  }>;
}

export function resolveModelId(options: ImageProviderOptions = {}): ImageModelId {
  if (options.adminMode) {
    return "gemini-3-pro-image-preview";
  }

  if (options.previewEnabled) {
    return "gemini-3.1-flash-image-preview";
  }

  return "gemini-2.5-flash-image";
}

export function buildPrompt(input: PromptBuildInput): string {
  const segments = [
    `必須要素: ${input.heroAssetName} を毎回自然に登場させる。`,
    input.sceneDirective ? `情景: ${input.sceneDirective}` : null,
    input.spotPromptTemplate ? `スポット文脈: ${input.spotPromptTemplate}` : null,
    input.stylePromptTemplate ? `画風: ${input.stylePromptTemplate}` : null,
    input.freeText ? `追加要望: ${input.freeText}` : null,
    `出力比率: ${input.aspectRatio}`,
    "NG: 暴力・差別・露骨表現・公序良俗違反。",
  ];

  return segments.filter(Boolean).join("\n");
}
