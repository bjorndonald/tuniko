import { getOgImage } from "@/components/Common/og/response";

export const runtime = "edge";

export async function GET() {
  return getOgImage("404");
}
