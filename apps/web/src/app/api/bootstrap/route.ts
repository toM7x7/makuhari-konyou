import { NextResponse } from "next/server";
import { createBootstrapPayload } from "@makuhari/preset-engine";

export function GET() {
  return NextResponse.json(createBootstrapPayload());
}
