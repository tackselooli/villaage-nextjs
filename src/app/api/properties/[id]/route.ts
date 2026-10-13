import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { AdvertType, PropertyDTO, PropertyType } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const p = await db.property.findFirst({
    where: { OR: [{ id }, { slug: id }, { refCode: id }] },
    include: {
      agent: true,
      ratings: { orderBy: { createdAt: "desc" }, take: 12 },
      _count: { select: { ratings: true, enquiries: true } },
    },
  });
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Increment view count + log
  await db.property.update({ where: { id: p.id }, data: { views: { increment: 1 } } }).catch(() => null);

  const dto: PropertyDTO = {
    id: p.id,
    refCode: p.refCode,
    slug: p.slug,
    title: p.title,
    description: p.description,
    advertType: p.advertType as AdvertType,
    propertyType: p.propertyType as PropertyType,
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
    views: p.views + 1,
    savedCount: p.savedCount,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    agent: {
      id: p.agent.id,
      name: p.agent.name,
      email: p.agent.email,
      phone: p.agent.phone,
      agency: p.agent.agency,
      bio: p.agent.bio,
      avatarUrl: p.agent.avatarUrl,
      verified: p.agent.verified,
      rating: p.agent.rating,
      salesCount: p.agent.salesCount,
      joinedAt: p.agent.joinedAt.toISOString(),
    },
    _count: { ratings: p._count.ratings, enquiries: p._count.enquiries },
    ratings: p.ratings.map((r) => ({
      id: r.id,
      propertyId: r.propertyId,
      agentId: r.agentId,
      reviewerName: r.reviewerName,
      reviewerEmail: r.reviewerEmail,
      score: r.score,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
    })),
    finalPrice: Math.round((p.price + (p.price * p.taxPercent) / 100) * 100) / 100,
  };

  return NextResponse.json(dto);
}
