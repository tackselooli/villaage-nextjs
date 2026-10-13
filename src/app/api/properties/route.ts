import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { AdvertType, PropertyDTO, PropertyType } from "@/types";

export const dynamic = "force-dynamic";

function parseNum(v: string | null): number | undefined {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const q = sp.get("q")?.trim() || undefined;
  const advertType = (sp.get("advertType") || undefined) as AdvertType | undefined;
  const propertyType = (sp.get("propertyType") || undefined) as PropertyType | undefined;
  const minPrice = parseNum(sp.get("minPrice"));
  const maxPrice = parseNum(sp.get("maxPrice"));
  const bedrooms = parseNum(sp.get("bedrooms"));
  const bathrooms = parseNum(sp.get("bathrooms"));
  const city = sp.get("city")?.trim() || undefined;
  const sort = (sp.get("sort") as "newest" | "price_asc" | "price_desc" | "popular" | "featured") || "featured";
  const limit = Math.min(parseNum(sp.get("limit")) ?? 50, 200);

  const where: Record<string, unknown> = { published: true };
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
      { city: { contains: q } },
      { country: { contains: q } },
      { streetAddress: { contains: q } },
    ];
  }
  if (advertType) where.advertType = advertType;
  if (propertyType) where.propertyType = propertyType;
  if (city) where.city = { contains: city };
  if (typeof minPrice === "number") where.price = { ...(where.price as object), gte: minPrice };
  if (typeof maxPrice === "number") where.price = { ...(where.price as object), lte: maxPrice };
  if (typeof bedrooms === "number") where.bedrooms = { gte: bedrooms };
  if (typeof bathrooms === "number") where.bathrooms = { gte: bathrooms };

  const orderBy: Record<string, "asc" | "desc"> =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
        ? { price: "desc" }
        : sort === "popular"
          ? { views: "desc" }
          : sort === "newest"
            ? { createdAt: "desc" }
            : { featured: "desc" };

  const rows = await db.property.findMany({
    where,
    orderBy,
    take: limit,
    include: {
      agent: true,
      _count: { select: { ratings: true, enquiries: true } },
    },
  });

  const items: PropertyDTO[] = rows.map((p) => ({
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
    views: p.views,
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
    finalPrice: Math.round((p.price + (p.price * p.taxPercent) / 100) * 100) / 100,
  }));

  return NextResponse.json({ results: items, count: items.length });
}
