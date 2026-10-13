"use client";

import * as React from "react";
import { PropertyCard } from "./property-card";
import type { PropertyDTO } from "@/types";
import { PropertyCardSkeleton } from "@/components/property/property-skeleton";
import { useI18n } from "@/lib/i18n/provider";

export function MasonryGrid({
  properties,
  loading,
  onOpen,
}: {
  properties: PropertyDTO[];
  loading?: boolean;
  onOpen: (p: PropertyDTO) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="masonry" role="list">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <PropertyCardSkeleton key={i} index={i} />)
        : properties.map((p) => (
            <div role="listitem" key={p.id}>
              <PropertyCard property={p} onOpen={onOpen} />
            </div>
          ))}
      {!loading && properties.length === 0 && (
        <div className="col-span-full py-16 text-center text-muted-foreground">
          <p className="text-lg font-medium">{t("filter.noResults")}</p>
          <p className="text-sm">{t("filter.noResultsHint")}</p>
        </div>
      )}
    </div>
  );
}
