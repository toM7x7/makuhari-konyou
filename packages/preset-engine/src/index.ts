import type {
  BootstrapPayload,
  FeatureFlag,
  HeroAsset,
  SpotPreset,
  StylePreset,
} from "@makuhari/shared-types";

export const heroAssets: HeroAsset[] = [
  {
    id: "hero_aoki_konyo_v1",
    version: "aoki-konyo-v1",
    name: "青木昆陽メインビジュアル v1",
    assetType: "image",
    storagePath: "admin-assets/hero/aoki-konyo-v1.png",
    thumbnailPath: null,
    isActive: true,
    metadata: {
      silhouette: "standing",
      source: "placeholder",
    },
  },
];

export const spotPresets: SpotPreset[] = [
  {
    id: "spot_makuhari_bay",
    slug: "makuhari-bay",
    name: "幕張ベイサイド",
    description: "海辺と広い空を活かした開放的な観光ポスター向け。",
    promptTemplate:
      "幕張の海辺らしい風景。風通しのよい余白と、観光ポスターとして映える構図。",
    defaultArMode: "world",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "spot_kaihin_makuhari",
    slug: "kaihin-makuhari",
    name: "海浜幕張駅前",
    description: "都市感とイベント感が混ざる入口体験。",
    promptTemplate:
      "海浜幕張の駅前らしい都市景観。イベントの入口に立つようなワクワク感。",
    defaultArMode: "target",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "spot_satsumaimo_fair",
    slug: "satsumaimo-fair",
    name: "さつまいも祭",
    description: "芋モチーフを前面に出すイベント特化の世界観。",
    promptTemplate:
      "さつまいも祭の祝祭感。提灯、屋台、にぎわい、少しレトロな熱気。",
    defaultArMode: "face",
    isActive: true,
    sortOrder: 3,
  },
];

export const stylePresets: StylePreset[] = [
  {
    id: "style_tourism_poster",
    slug: "tourism-poster",
    name: "幕張観光ポスター風",
    description: "明るく読みやすい、地域PR向けのメインプリセット。",
    promptTemplate:
      "地域観光ポスターのように、明快で華やか。視認性が高く、記念写真映えする。",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "style_edo_scroll",
    slug: "edo-scroll",
    name: "江戸絵巻風",
    description: "青木昆陽の時代感を寄せた絵巻スタイル。",
    promptTemplate:
      "江戸絵巻のような筆致と色面。歴史的でありつつ親しみやすい。",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "style_satsumaimo_festival",
    slug: "satsumaimo-festival",
    name: "さつまいも祭風",
    description: "芋モチーフを押し出した遊びのある祭ビジュアル。",
    promptTemplate:
      "さつまいも祭のポスターのように、食欲と祭の高揚感が伝わる画面。",
    isActive: true,
    sortOrder: 3,
  },
];

export const featureFlags: FeatureFlag[] = [
  {
    key: "vertex-preview-model",
    enabled: false,
    description: "Gemini 3.1 Flash Image Preview を管理者向けに解放する。",
  },
  {
    key: "public-share-pages",
    enabled: true,
    description: "生成結果の公開共有ページを有効化する。",
  },
  {
    key: "mypage-history",
    enabled: false,
    description: "任意機能の /mypage を先に露出するかどうか。",
  },
];

export function createBootstrapPayload(): BootstrapPayload {
  const activeHeroAsset = heroAssets.find((asset) => asset.isActive);

  if (!activeHeroAsset) {
    throw new Error("An active hero asset is required.");
  }

  return {
    activeHeroAssetVersion: activeHeroAsset.version,
    heroAssets,
    spotPresets: [...spotPresets].sort((a, b) => a.sortOrder - b.sortOrder),
    stylePresets: [...stylePresets].sort((a, b) => a.sortOrder - b.sortOrder),
    featureFlags,
  };
}
