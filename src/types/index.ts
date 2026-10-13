// Shared API types for villaage
export type AdvertType = "For Sale" | "For Rent" | "Auction";
export type PropertyType = "House" | "Apartment" | "Office" | "Warehouse" | "Commercial" | "Other";

export interface AgentDTO {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  agency: string;
  bio: string;
  avatarUrl: string | null;
  verified: boolean;
  rating: number;
  salesCount: number;
  joinedAt: string;
  _count?: { properties: number };
}

export interface RatingDTO {
  id: string;
  propertyId: string;
  agentId: string | null;
  reviewerName: string;
  reviewerEmail: string | null;
  score: number;
  comment: string;
  createdAt: string;
}

export interface PropertyDTO {
  id: string;
  refCode: string;
  slug: string;
  title: string;
  description: string;
  advertType: AdvertType;
  propertyType: PropertyType;
  price: number;
  taxPercent: number;
  country: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  bedrooms: number;
  bathrooms: number;
  totalFloors: number;
  plotArea: number;
  coverPhoto: string;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  featured: boolean;
  published: boolean;
  views: number;
  savedCount: number;
  createdAt: string;
  updatedAt: string;
  agent: AgentDTO;
  _count?: { ratings: number; enquiries: number };
  ratings?: RatingDTO[];
  finalPrice?: number;
}

export interface PropertyFilters {
  q?: string;
  advertType?: AdvertType;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "popular" | "featured";
}
