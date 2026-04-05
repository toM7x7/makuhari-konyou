insert into public.hero_assets (
  version,
  name,
  asset_type,
  storage_path,
  thumbnail_path,
  is_active,
  metadata_json
)
values (
  'aoki-konyo-v1',
  '青木昆陽メインビジュアル v1',
  'image',
  'admin-assets/hero/aoki-konyo-v1.png',
  null,
  true,
  '{"source":"seed"}'::jsonb
)
on conflict (version) do update
set
  name = excluded.name,
  storage_path = excluded.storage_path,
  is_active = excluded.is_active;

insert into public.spot_presets (
  slug,
  name,
  description,
  prompt_template,
  default_ar_mode,
  is_active,
  sort_order
)
values
  (
    'makuhari-bay',
    '幕張ベイサイド',
    '海辺の開放感を主役にした観光ポスター向けプリセット。',
    '幕張の海辺らしい風景。風通しのよい余白と、観光ポスターとして映える構図。',
    'world',
    true,
    1
  ),
  (
    'kaihin-makuhari',
    '海浜幕張駅前',
    '都市感とイベント感を持つ幕張の入口体験向け。',
    '海浜幕張の駅前らしい都市景観。イベントの入口に立つようなワクワク感。',
    'target',
    true,
    2
  ),
  (
    'satsumaimo-fair',
    'さつまいも祭',
    '芋モチーフを前面に出した祝祭プリセット。',
    'さつまいも祭の祝祭感。提灯、屋台、にぎわい、少しレトロな熱気。',
    'face',
    true,
    3
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  prompt_template = excluded.prompt_template,
  default_ar_mode = excluded.default_ar_mode,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

insert into public.style_presets (
  slug,
  name,
  description,
  prompt_template,
  is_active,
  sort_order
)
values
  (
    'tourism-poster',
    '幕張観光ポスター風',
    '明るく読みやすい、地域 PR 向けのメインプリセット。',
    '地域観光ポスターのように、明快で華やか。視認性が高く、記念写真映えする。',
    true,
    1
  ),
  (
    'edo-scroll',
    '江戸絵巻風',
    '青木昆陽の時代感を寄せた絵巻スタイル。',
    '江戸絵巻のような筆致と色面。歴史的でありつつ親しみやすい。',
    true,
    2
  ),
  (
    'satsumaimo-festival',
    'さつまいも祭風',
    '芋モチーフを押し出した祭向けビジュアル。',
    'さつまいも祭のポスターのように、食欲と祭の高揚感が伝わる画面。',
    true,
    3
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  prompt_template = excluded.prompt_template,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;
