import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email and message are required" }, { status: 422 });
  }
  const phone = body.phone ? String(body.phone).slice(0, 60) : null;
  const moveDate = body.moveDate ? String(body.moveDate).slice(0, 30) : null;

  const prop = await db.property.findUnique({ where: { id }, select: { id: true, agentId: true } });
  if (!prop) return NextResponse.json({ error: "Property not found" }, { status: 404 });

  const created = await db.enquiry.create({
    data: { propertyId: prop.id, agentId: prop.agentId, name, email, phone, message, moveDate },
  });

  return NextResponse.json(created, { status: 201 });
}
