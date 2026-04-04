import { z } from "zod";

function emptyToUndefined(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const envSchema = z.object({
  NOTION_TOKEN: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),
  NOTION_DATA_SOURCE_ID: z.string().optional(),
  NEXT_PUBLIC_MAP_TILE_URL: z.string().optional(),
  NEXT_PUBLIC_MAP_ATTRIBUTION: z.string().optional(),
});

const parsedEnv = envSchema.parse({
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_DATA_SOURCE_ID: process.env.NOTION_DATA_SOURCE_ID,
  NEXT_PUBLIC_MAP_TILE_URL: process.env.NEXT_PUBLIC_MAP_TILE_URL,
  NEXT_PUBLIC_MAP_ATTRIBUTION: process.env.NEXT_PUBLIC_MAP_ATTRIBUTION,
});

export const env = {
  notionToken: emptyToUndefined(parsedEnv.NOTION_TOKEN),
  notionDataSourceId:
    emptyToUndefined(parsedEnv.NOTION_DATA_SOURCE_ID) ??
    emptyToUndefined(parsedEnv.NOTION_DATABASE_ID),
  mapTileUrl:
    emptyToUndefined(parsedEnv.NEXT_PUBLIC_MAP_TILE_URL) ??
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  mapAttribution:
    emptyToUndefined(parsedEnv.NEXT_PUBLIC_MAP_ATTRIBUTION) ??
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const notionConfigured = Boolean(
  env.notionToken && env.notionDataSourceId,
);
