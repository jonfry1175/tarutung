import "server-only";

import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { env, notionConfigured } from "@/lib/env";
import {
  fallbackPlaces,
  type PlaceCategory,
  type TarutungPlace,
} from "@/lib/tarutung-data";

interface PlacesPayload {
  places: TarutungPlace[];
  source: "fallback" | "notion";
  notionConfigured: boolean;
}

let notionClient: Client | null = null;

function getClient() {
  if (!notionConfigured || !env.notionToken) {
    return null;
  }

  notionClient ??= new Client({
    auth: env.notionToken,
  });

  return notionClient;
}

function textFromRichText(items: RichTextItemResponse[]) {
  return items.map((item) => item.plain_text).join("").trim();
}

function readTitle(page: PageObjectResponse, name: string) {
  const property = page.properties[name];
  return property?.type === "title" ? textFromRichText(property.title) : "";
}

function readRichText(page: PageObjectResponse, name: string) {
  const property = page.properties[name];
  return property?.type === "rich_text"
    ? textFromRichText(property.rich_text)
    : "";
}

function readNumber(page: PageObjectResponse, name: string) {
  const property = page.properties[name];
  return property?.type === "number" ? property.number : null;
}

function readCheckbox(page: PageObjectResponse, name: string) {
  const property = page.properties[name];
  return property?.type === "checkbox" ? property.checkbox : null;
}

function readSelect(page: PageObjectResponse, name: string) {
  const property = page.properties[name];
  return property?.type === "select" ? property.select?.name ?? "" : "";
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeCategory(value: string): PlaceCategory {
  switch (value.toLowerCase()) {
    case "history":
    case "culture":
    case "culinary":
    case "nature":
    case "modern":
      return value.toLowerCase() as PlaceCategory;
    default:
      return "history";
  }
}

function mapPageToPlace(page: PageObjectResponse): TarutungPlace | null {
  const title = readTitle(page, "Name") || readTitle(page, "Title");
  const latitude = readNumber(page, "Latitude");
  const longitude = readNumber(page, "Longitude");

  if (!title || latitude === null || longitude === null) {
    return null;
  }

  const summary =
    readRichText(page, "Summary") ||
    readRichText(page, "Excerpt") ||
    "Konten dari Notion belum memiliki ringkasan.";

  const published = readCheckbox(page, "Published");
  if (published === false) {
    return null;
  }

  return {
    id: page.id,
    slug:
      readRichText(page, "Slug") ||
      readRichText(page, "slug") ||
      slugify(title),
    title,
    category: normalizeCategory(readSelect(page, "Category")),
    summary,
    latitude,
    longitude,
    featured: readCheckbox(page, "Featured") ?? false,
    cluster: readSelect(page, "Cluster") || "Pusat Kota & Identitas",
    order: readNumber(page, "Order") ?? 999,
    source: "notion",
  };
}

export async function getPlaces(): Promise<PlacesPayload> {
  const client = getClient();

  if (!client || !env.notionDataSourceId) {
    return {
      places: fallbackPlaces,
      source: "fallback" as const,
      notionConfigured,
    };
  }

  try {
    const response = await client.dataSources.query({
      data_source_id: env.notionDataSourceId,
      page_size: 50,
    });

    const places = response.results
      .filter(
        (result): result is PageObjectResponse =>
          "properties" in result && Boolean(result.properties),
      )
      .map(mapPageToPlace)
      .filter((place): place is TarutungPlace => Boolean(place))
      .sort((left, right) => left.order - right.order);

    if (!places.length) {
      return {
        places: fallbackPlaces,
        source: "fallback" as const,
        notionConfigured,
      };
    }

    return {
      places,
      source: "notion" as const,
      notionConfigured,
    };
  } catch (error) {
    console.error("Failed to read Notion database:", error);

    return {
      places: fallbackPlaces,
      source: "fallback" as const,
      notionConfigured,
    };
  }
}
