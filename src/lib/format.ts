import type { PropertyDTO } from "@/types";
import type { Locale } from "@/lib/i18n/dict";
import { translate } from "@/lib/i18n/dict";

const CURRENCY_SYMBOL: Record<Locale, string> = { en: "Toman", fa: "تومان" };

/** Compact Toman formatter: 50,000,000,000 → "50B Toman" (en) / "۵۰ میلیارد تومان" (fa) */
function compactToman(n: number, locale: Locale): string {
  const numLocale = locale === "fa" ? "fa-IR" : "en-US";
  const nf = new Intl.NumberFormat(numLocale);
  if (n >= 1_000_000_000) {
    const v = n / 1_000_000_000;
    const s = locale === "fa" ? v.toLocaleString("fa-IR", { maximumFractionDigits: 1 }) : v.toFixed(v % 1 ? 1 : 0);
    return locale === "fa" ? `${s} میلیارد ${CURRENCY_SYMBOL.fa}` : `${s}B ${CURRENCY_SYMBOL.en}`;
  }
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    const s = locale === "fa" ? v.toLocaleString("fa-IR", { maximumFractionDigits: 1 }) : v.toFixed(v % 1 ? 1 : 0);
    return locale === "fa" ? `${s} میلیون ${CURRENCY_SYMBOL.fa}` : `${s}M ${CURRENCY_SYMBOL.en}`;
  }
  return locale === "fa" ? `${nf.format(n)} ${CURRENCY_SYMBOL.fa}` : `${nf.format(n)} ${CURRENCY_SYMBOL.en}`;
}

/** Full Toman formatter with thousand separators */
function fullToman(n: number, locale: Locale): string {
  const numLocale = locale === "fa" ? "fa-IR" : "en-US";
  const nf = new Intl.NumberFormat(numLocale);
  return locale === "fa" ? `${nf.format(n)} ${CURRENCY_SYMBOL.fa}` : `${nf.format(n)} ${CURRENCY_SYMBOL.en}`;
}

/** Returns formatted price in Toman (compact for cards, full for detail). Adds /mo suffix for rentals. */
export function formatPrice(p: PropertyDTO, locale: Locale = "en", opts?: { compact?: boolean }): string {
  const compact = opts?.compact ?? true;
  const s = compact ? compactToman(p.price, locale) : fullToman(p.price, locale);
  if (p.advertType === "For Rent") {
    const suffix = translate(locale, "common.perMonth");
    return locale === "fa" ? `${s} ${suffix}` : `${s}${suffix}`;
  }
  return s;
}

/** Final price (price + tax%) in full Toman. */
export function formatFinalPrice(p: PropertyDTO, locale: Locale = "en"): string {
  const v = p.finalPrice ?? p.price + (p.price * p.taxPercent) / 100;
  return fullToman(v, locale);
}

/** Locale-aware number formatting (Persian digits in fa mode). */
export function formatNumber(n: number, locale: Locale = "en"): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);
}

/** Compact price for filter range display (Toman). */
function fmtPriceCompact(n: number, locale: Locale): string {
  if (n >= 1_000_000_000) {
    const v = n / 1_000_000_000;
    const s = locale === "fa" ? v.toLocaleString("fa-IR", { maximumFractionDigits: 1 }) : v.toFixed(v % 1 ? 1 : 0);
    return locale === "fa" ? `${s} میلیارد` : `${s}B`;
  }
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    const s = locale === "fa" ? v.toLocaleString("fa-IR", { maximumFractionDigits: 1 }) : v.toFixed(v % 1 ? 1 : 0);
    return locale === "fa" ? `${s} میلیون` : `${s}M`;
  }
  if (n >= 1_000) return locale === "fa" ? `${Math.round(n / 1000).toLocaleString("fa-IR")}K` : `${Math.round(n / 1000)}K`;
  return locale === "fa" ? n.toLocaleString("fa-IR") : `${n}`;
}

export function fmtPriceRangeValue(n: number, locale: Locale = "en"): string {
  return fmtPriceCompact(n, locale);
}

/** Locale-aware time-ago formatting. */
export function timeAgo(iso: string, locale: Locale = "en"): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(1, Math.floor((now - then) / 1000));

  if (locale === "fa") {
    const u = { s: "ثانیه", m: "دقیقه", h: "ساعت", d: "روز", ago: "پیش" };
    if (diff < 60) return `${diff} ${u.s} ${u.ago}`;
    if (diff < 3600) return `${Math.floor(diff / 60)} ${u.m} ${u.ago}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ${u.h} ${u.ago}`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} ${u.d} ${u.ago}`;
    return new Date(iso).toLocaleDateString("fa-IR");
  }

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US");
}

/** Translate advert type label. */
export function advertLabel(advert: string, locale: Locale): string {
  const key = `filter.${advert === "For Sale" ? "forSale" : advert === "For Rent" ? "forRent" : "auction"}`;
  return translate(locale, key);
}

/** Translate property type label. */
export function propertyTypeLabel(ptype: string, locale: Locale): string {
  return translate(locale, `ptype.${ptype}`);
}

/** Translate sort option label. */
export function sortLabel(sort: string, locale: Locale): string {
  const map: Record<string, string> = {
    featured: "sort.featured",
    newest: "sort.newest",
    price_asc: "sort.priceAsc",
    price_desc: "sort.priceDesc",
    popular: "sort.popular",
  };
  return translate(locale, map[sort] ?? "sort.featured");
}

export const ADVERT_TYPES = ["For Sale", "For Rent", "Auction"] as const;
export const PROPERTY_TYPES = ["House", "Apartment", "Office", "Warehouse", "Commercial", "Other"] as const;

export const SORT_VALUES = ["featured", "newest", "price_asc", "price_desc", "popular"] as const;

export const ADVERT_COLORS: Record<string, string> = {
  "For Sale": "bg-emerald-600/95 text-white",
  "For Rent": "bg-rose-500/95 text-white",
  Auction: "bg-amber-500/95 text-white",
};

export const ADVERT_PIN: Record<string, string> = {
  "For Sale": "from-emerald-600 to-teal-600",
  "For Rent": "from-rose-500 to-pink-600",
  Auction: "from-amber-500 to-orange-500",
};
