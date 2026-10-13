"use client";

import * as React from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  ADVERT_TYPES,
  PROPERTY_TYPES,
  SORT_VALUES,
  fmtPriceRangeValue,
} from "@/lib/format";
import type { AdvertType, PropertyType } from "@/types";
import { useI18n } from "@/lib/i18n/provider";
import {
  advertLabel,
  propertyTypeLabel,
  sortLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";

export interface FilterState {
  q: string;
  advertType?: AdvertType;
  propertyType?: PropertyType;
  priceRange: [number, number];
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  sort: (typeof SORT_VALUES)[number];
}

export const DEFAULT_FILTERS: FilterState = {
  q: "",
  priceRange: [0, 100_000_000_000],
  sort: "featured",
};

export function FiltersBar({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const { t, locale } = useI18n();
  const [open, setOpen] = React.useState(false);
  const draftRef = React.useRef<FilterState>(filters);

  const activeCount = countActive(filters);

  const apply = (next: FilterState) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div className="sticky top-16 z-30 -mx-3 mb-5 border-b border-border/60 bg-background/90 px-3 py-3 backdrop-blur sm:-mx-5 sm:px-5 lg:-mx-8 lg:px-8">
      <div className="flex flex-wrap items-center gap-2">
        {/* Quick filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {ADVERT_TYPES.map((f) => (
            <Chip
              key={f}
              active={filters.advertType === f}
              onClick={() =>
                apply({
                  ...filters,
                  advertType: filters.advertType === f ? undefined : f,
                })
              }
            >
              {advertLabel(f, locale)}
            </Chip>
          ))}

          <Chip
            active={activeCount > 0}
            onClick={() =>
              apply({
                ...DEFAULT_FILTERS,
                q: filters.q,
                sort: filters.sort,
              })
            }
            variant="ghost"
          >
            {t("filter.reset")}
          </Chip>
        </div>

        <div className="ms-auto flex items-center gap-2">
          <select
            value={filters.sort}
            onChange={(e) => apply({ ...filters, sort: e.target.value as FilterState["sort"] })}
            aria-label={t("sort.label")}
            className="h-9 rounded-full border-0 bg-secondary/70 px-3 text-sm font-medium shadow-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {SORT_VALUES.map((o) => (
              <option key={o} value={o}>
                {t("sort.label")} {sortLabel(o, locale)}
              </option>
            ))}
          </select>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                <SlidersHorizontal className="me-2 h-4 w-4 rtl:rotate-180" />
                {t("filter.button")}
                {activeCount > 0 && (
                  <span className="ms-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                    {activeCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md" side="right">
              <SheetHeader className="border-b border-border/60">
                <SheetTitle className="flex items-center justify-between">
                  {t("filter.title")}
                  <button
                    aria-label={t("common.close")}
                    onClick={() => setOpen(false)}
                    className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetTitle>
              </SheetHeader>

              <FiltersBody
                key={JSON.stringify(filters)}
                initial={filters}
                onChange={(next) => (draftRef.current = next)}
                onApply={() => apply(draftRef.current)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

function FiltersBody({
  initial,
  onChange,
  onApply,
}: {
  initial: FilterState;
  onChange: (next: FilterState) => void;
  onApply: () => void;
}) {
  const { t, locale } = useI18n();
  const [draft, setDraft] = React.useState<FilterState>(initial);

  React.useEffect(() => {
    onChange(draft);
  }, [draft, onChange]);

  return (
    <div className="flex flex-1 flex-col gap-6 p-5">
      {/* Advert type */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">{t("filter.listingType")}</h3>
        <div className="flex flex-wrap gap-2">
          {ADVERT_TYPES.map((ty) => (
            <Chip
              key={ty}
              active={draft.advertType === ty}
              onClick={() =>
                setDraft((d) => ({ ...d, advertType: d.advertType === ty ? undefined : ty }))
              }
            >
              {advertLabel(ty, locale)}
            </Chip>
          ))}
        </div>
      </section>

      {/* Property type */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">{t("filter.propertyType")}</h3>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((ty) => (
            <Chip
              key={ty}
              active={draft.propertyType === ty}
              onClick={() =>
                setDraft((d) => ({ ...d, propertyType: d.propertyType === ty ? undefined : ty }))
              }
            >
              {propertyTypeLabel(ty, locale)}
            </Chip>
          ))}
        </div>
      </section>

      {/* Price */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">
          {t("filter.priceRange")}
          <span className="ms-2 text-xs font-normal text-muted-foreground tabular-nums">
            {fmtPriceRangeValue(draft.priceRange[0], locale)} — {fmtPriceRangeValue(draft.priceRange[1], locale)}
          </span>
        </h3>
        <Slider
          min={0}
          max={100_000_000_000}
          step={500_000_000}
          value={draft.priceRange}
          onValueChange={(v) => setDraft((d) => ({ ...d, priceRange: v as [number, number] }))}
        />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">{t("filter.min")}</Label>
            <Input
              type="number"
              name="min-price"
              id="min-price"
              value={draft.priceRange[0]}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  priceRange: [Number(e.target.value) || 0, d.priceRange[1]],
                }))
              }
              className="rounded-lg bg-secondary/60"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">{t("filter.max")}</Label>
            <Input
              type="number"
              name="max-price"
              id="max-price"
              value={draft.priceRange[1]}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  priceRange: [d.priceRange[0], Number(e.target.value) || 100_000_000_000],
                }))
              }
              className="rounded-lg bg-secondary/60"
            />
          </div>
        </div>
      </section>

      {/* Bedrooms / bathrooms */}
      <section className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold">{t("filter.bedrooms")}</h3>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Chip
                key={n}
                active={draft.bedrooms === n}
                onClick={() => setDraft((d) => ({ ...d, bedrooms: d.bedrooms === n ? undefined : n }))}
              >
                {n}{n === 5 ? "+" : ""}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold">{t("filter.bathrooms")}</h3>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <Chip
                key={n}
                active={draft.bathrooms === n}
                onClick={() => setDraft((d) => ({ ...d, bathrooms: d.bathrooms === n ? undefined : n }))}
              >
                {n}{n === 4 ? "+" : ""}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* City */}
      <section>
        <h3 className="mb-2 text-sm font-semibold">{t("filter.city")}</h3>
        <Input
          name="city-filter"
          id="city-filter"
          value={draft.city ?? ""}
          onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value || undefined }))}
          placeholder={t("filter.city.placeholder")}
          className="rounded-lg bg-secondary/60"
        />
      </section>

      <div className="mt-auto pt-4">
        <Button onClick={onApply} className="h-11 w-full rounded-full text-base font-semibold">
          <Check className="me-2 h-4 w-4" /> {t("filter.apply")}
        </Button>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  variant = "default",
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-full px-4 text-sm font-medium transition",
        variant === "ghost"
          ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
          : "border border-border/70 bg-card hover:border-border",
        active && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function countActive(f: FilterState): number {
  let n = 0;
  if (f.advertType) n++;
  if (f.propertyType) n++;
  if (f.bedrooms) n++;
  if (f.bathrooms) n++;
  if (f.city) n++;
  if (f.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] || f.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) n++;
  return n;
}
