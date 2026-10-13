import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const ratings = await db.rating.findMany({
    where: { propertyId: id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ results: ratings });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const score = Math.min(5, Math.max(1, Number(body.score) || 0));
  if (!score) return NextResponse.json({ error: "score (1-5) required" }, { status: 400 });
  const reviewerName = String(body.reviewerName || "Anonymous").slice(0, 120);
  const reviewerEmail = body.reviewerEmail ? String(body.reviewerEmail).slice(0, 200) : null;
  const comment = String(body.comment || "").slice(0, 2000);

  const prop = await db.property.findUnique({ where: { id }, select: { id: true, agentId: true } });
  if (!prop) return NextResponse.json({ error: "Property not found" }, { status: 404 });

  const created = await db.rating.create({
    data: { propertyId: prop.id, agentId: prop.agentId, reviewerName, reviewerEmail, score, comment },
  });

  // Recompute agent aggregate rating
  const agg = await db.rating.aggregate({ where: { agentId: prop.agentId }, _avg: { score: true } });
  await db.agent.update({
    where: { id: prop.agentId },
    data: { rating: agg._avg.score ? Math.round(agg._avg.score * 10) / 10 : 0 },
  }).catch(() => null);

  return NextResponse.json(created, { status: 201 });
}
