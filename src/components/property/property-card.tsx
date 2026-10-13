"use client";

import * as React from "react";
import { BedDouble, Bath, Maximize, MapPin, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { PropertyDTO } from "@/types";
import { ADVERT_COLORS, formatPrice, formatNumber, advertLabel, propertyTypeLabel } from "@/lib/format";
import { SaveButton } from "@/components/save-button";
import { RatingStars } from "@/components/rating-stars";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

// Deterministic pseudo-random aspect ratio based on the property id.
// Gives the masonry layout visual rhythm without flickering on re-render.
function pickAspect(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const pool = [1, 1.05, 1.15, 1.25, 1.33, 1.4, 0.85, 0.95];
  return pool[h % pool.length];
}

export function PropertyCard({
  property,
  onOpen,
}: {
  property: PropertyDTO;
  onOpen: (p: PropertyDTO) => void;
}) {
  const { t, locale } = useI18n();
  const ar = pickAspect(property.id);
  const photos = [property.coverPhoto, property.photo1, property.photo2, property.photo3, property.photo4].filter(
    (x): x is string => !!x
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-border/50 transition-all hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.18)] hover:ring-border"
      onClick={() => onOpen(property)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(property);
        }
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: `1 / ${ar}` }}>
        <SmartImage src={photos[0]} alt={property.title} t={t} />
        {/* Advert pill */}
        <div
          className={cn(
            "absolute start-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur",
            ADVERT_COLORS[property.advertType]
          )}
        >
          {advertLabel(property.advertType, locale)}
        </div>

        {/* Featured pill */}
        {property.featured && (
          <div className="absolute end-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
            {t("property.featured")}
          </div>
        )}

        {/* Save button — always visible, bottom-end, above the gradient */}
        <div className="absolute end-3 bottom-3 z-10">
          <SaveButton property={property} />
        </div>

        {/* Gradient + price on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-base font-semibold text-white">{formatPrice(property, locale)}</p>
              <p className="text-[11px] text-white/80">
                {t("property.tax", { n: property.taxPercent })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        <h3 className="line-clamp-1 font-semibold leading-tight">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {property.city}, {property.country}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" />
            {formatNumber(property.bedrooms, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" />
            {formatNumber(property.bathrooms, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" />
            {formatNumber(property.plotArea, locale)} m²
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <RatingStars value={property.agent.rating} count={property._count?.ratings ?? 0} showValue />
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" /> {formatNumber(property.views, locale)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3 w-3" /> {formatNumber(property.savedCount, locale)}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-base font-semibold tabular-nums">{formatPrice(property, locale)}</span>
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {propertyTypeLabel(property.propertyType, locale)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function SmartImage({
  src,
  alt,
  t,
}: {
  src: string;
  alt: string;
  t: (k: string, p?: Record<string, string | number>) => string;
}) {
  // Simple loading + error state. All property images are now served locally
  // from /public/images/, so no external fallback is needed.
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  React.useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [src]);

  return (
    <>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
      )}
      {!errored && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "img-fade absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
            loaded && "loaded"
          )}
        />
      )}
      {errored && (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-muted to-secondary text-xs text-muted-foreground">
          {t("common.imageError")}
        </div>
      )}
    </>
  );
}
