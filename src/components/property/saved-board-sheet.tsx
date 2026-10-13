"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavStore } from "@/lib/fav-store";
import { formatPrice } from "@/lib/format";
import { useI18n } from "@/lib/i18n/provider";
import type { AdvertType } from "@/types";

export function SavedBoardSheet({
  open,
  onOpenChange,
  onOpenProperty,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onOpenProperty: (id: string) => void;
}) {
  const { t, locale } = useI18n();
  const items = useFavStore((s) => s.items);
  const remove = useFavStore((s) => s.remove);
  const clear = useFavStore((s) => s.clear);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-2xl" side="right">
        <SheetHeader className="border-b border-border/60">
          <SheetTitle className="flex items-center justify-between pe-6">
            <span className="inline-flex items-center gap-2">
              <Heart className="h-5 w-5 fill-primary text-primary" />
              {t("saved.title")}
            </span>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(t("saved.clearConfirm"))) clear();
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="me-1.5 h-3.5 w-3.5" />
                {t("saved.clear")}
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? t("saved.helper.empty")
              : t("saved.count", { n: items.length })}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 p-5">
          {items.length === 0 ? (
            <div className="grid place-items-center py-20 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary">
                <Heart className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="mt-4 font-medium">{t("saved.empty.title")}</p>
              <p className="text-sm text-muted-foreground">
                {t("saved.empty.body")}
              </p>
            </div>
          ) : (
            <div className="masonry">
              <AnimatePresence initial={false}>
                {items.map((it) => (
                  <motion.div
                    layout
                    key={it.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative overflow-hidden rounded-2xl bg-card ring-1 ring-border/50"
                  >
                    { }
                    <img src={it.coverPhoto} alt={it.title} className="aspect-[3/4] w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                    <button
                      onClick={() => remove(it.id)}
                      aria-label={t("saved.removeFromSaved")}
                      className="absolute end-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-foreground shadow backdrop-blur transition hover:bg-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onOpenProperty(it.id)}
                      className="absolute inset-0"
                      aria-label={t("saved.open", { title: it.title })}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-start">
                      <p className="line-clamp-1 text-sm font-semibold text-white">{it.title}</p>
                      <p className="flex items-center gap-1 text-[11px] text-white/80">
                        <MapPin className="h-3 w-3" /> {it.city}, {it.country}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-white">
                        {formatPrice({ ...it, advertType: it.advertType as AdvertType, taxPercent: 0, finalPrice: 0 } as never, locale, { compact: true })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
