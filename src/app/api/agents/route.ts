import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const agents = await db.agent.findMany({
    orderBy: { rating: "desc" },
    include: { _count: { select: { properties: true } } },
  });
  return NextResponse.json({
    results: agents.map((a) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      phone: a.phone,
      agency: a.agency,
      bio: a.bio,
      avatarUrl: a.avatarUrl,
      verified: a.verified,
      rating: a.rating,
      salesCount: a.salesCount,
      joinedAt: a.joinedAt.toISOString(),
      _count: { properties: a._count.properties },
    })),
  });
}
