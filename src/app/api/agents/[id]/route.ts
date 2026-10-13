import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { PropertyDTO } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const agent = await db.agent.findUnique({
    where: { id },
    include: {
      properties: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 24,
        include: { _count: { select: { ratings: true } } },
      },
      _count: { select: { properties: true, ratings: true, enquiries: true } },
    },
  });
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const properties: PropertyDTO[] = agent.properties.map((p) => ({
    id: p.id,
    refCode: p.refCode,
    slug: p.slug,
    title: p.title,
    description: p.description,
    advertType: p.advertType as PropertyDTO["advertType"],
    propertyType: p.propertyType as PropertyDTO["propertyType"],
    price: p.price,
    taxPercent: p.taxPercent,
    country: p.country,
    city: p.city,
    postalCode: p.postalCode,
    streetAddress: p.streetAddress,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    totalFloors: p.totalFloors,
    plotArea: p.plotArea,
    coverPhoto: p.coverPhoto,
    photo1: p.photo1,
    photo2: p.photo2,
    photo3: p.photo3,
    photo4: p.photo4,
    featured: p.featured,
    published: p.published,
    views: p.views,
    savedCount: p.savedCount,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    agent: {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      agency: agent.agency,
      bio: agent.bio,
      avatarUrl: agent.avatarUrl,
      verified: agent.verified,
      rating: agent.rating,
      salesCount: agent.salesCount,
      joinedAt: agent.joinedAt.toISOString(),
    },
    _count: { ratings: p._count.ratings, enquiries: 0 },
    finalPrice: Math.round((p.price + (p.price * p.taxPercent) / 100) * 100) / 100,
  }));

  return NextResponse.json({
    agent: {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      agency: agent.agency,
      bio: agent.bio,
      avatarUrl: agent.avatarUrl,
      verified: agent.verified,
      rating: agent.rating,
      salesCount: agent.salesCount,
      joinedAt: agent.joinedAt.toISOString(),
      _count: {
        properties: agent._count.properties,
        ratings: agent._count.ratings,
        enquiries: agent._count.enquiries,
      },
    },
    properties,
  });
}
