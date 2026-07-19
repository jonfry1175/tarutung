import { NextResponse } from "next/server";

import { subangPlaces } from "@/lib/subang-data";

export function GET() {
  return NextResponse.json({
    places: subangPlaces,
    source: "curated" as const,
  });
}
