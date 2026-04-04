import { NextResponse } from "next/server";

import { getPlaces } from "@/lib/notion";

export async function GET() {
  const payload = await getPlaces();

  return NextResponse.json(payload);
}
