import { db } from "@/server/db";
import type { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }
  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}
