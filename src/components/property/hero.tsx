"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { formatNumber } from "@/lib/format";

export function Hero({
  onSearch,
  onExplore,
}: {
  onSearch: (q: string) => void;
  onExplore: () => void;
}) {
  const { t, locale } = useI18n();
  const [q, setQ] = React.useState("");

  const STATS = [
    { value: formatNumber(1248, locale), label: t("stats.listings") },
    { value: formatNumber(25, locale), label: t("stats.cities") },
    { value: formatNumber(8, locale), label: t("stats.agents") },
    { value: t("stats.owners"), label: "", raw: "12k+" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* soft gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -start-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -end-32 top-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 start-1/3 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      <div className="mx-auto px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border/60">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {t("hero.badge")}
          </div>
          <h1
            className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t("hero.title.before")} <span className="text-primary">{t("hero.title.highlight")}</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(q.trim());
            }}
            className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full bg-card p-2 shadow-lg ring-1 ring-border/60"
          >
            <Search className="ms-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              name="hero-search"
              id="hero-search"
              type="search"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("hero.search.placeholder")}
              className="h-10 flex-1 bg-transparent px-2 text-[15px] outline-none placeholder:text-muted-foreground"
              aria-label={t("hero.search.placeholder")}
            />
            <Button type="submit" className="h-10 rounded-full px-6 font-semibold">
              {t("hero.search.button")}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={onExplore}
              className="rounded-full"
            >
              {t("hero.browse")}
              <ArrowDown className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: formatNumber(1248, locale), label: t("stats.listings") },
            { value: formatNumber(18, locale), label: t("stats.cities") },
            { value: formatNumber(8, locale), label: t("stats.agents") },
            { value: "12k+", label: t("stats.owners") },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
