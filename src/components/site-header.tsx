"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Heart, Moon, Sun, X, LayoutGrid, Users } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wordmark } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n/provider";
import { useFavStore } from "@/lib/fav-store";
import { cn } from "@/lib/utils";

export function SiteHeader({
  onSearch,
  initialQuery,
  onOpenSaved,
  onOpenAgents,
}: {
  onSearch: (q: string) => void;
  initialQuery?: string;
  onOpenSaved: () => void;
  onOpenAgents: () => void;
}) {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [q, setQ] = React.useState(initialQuery ?? "");
  const favCount = useFavStore((s) => s.items.length);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => setMounted(true), []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch(q.trim());
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 items-center gap-3 px-3 sm:px-5 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Villaage home">
          <Wordmark />
        </Link>

        {/* Desktop search */}
        <form
          onSubmit={submit}
          className="relative mx-2 hidden flex-1 max-w-2xl md:block"
          role="search"
        >
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            name="header-search"
            id="header-search"
            type="search"
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("nav.search.placeholder")}
            className="h-11 rounded-full border-0 bg-secondary/70 ps-11 pe-10 text-[15px] shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={t("nav.search.placeholder")}
          />
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                onSearch("");
              }}
              className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
              aria-label={t("nav.search.clear")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          {/* Mobile search trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => inputRef.current?.focus()}
            aria-label={t("nav.search.placeholder")}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              const el = document.getElementById("explore");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex gap-1.5"
            aria-label={t("nav.explore")}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden lg:inline">{t("nav.explore")}</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onOpenAgents}
            className="inline-flex gap-1.5"
            aria-label={t("nav.agents")}
          >
            <Users className="h-4 w-4" />
            <span className="hidden lg:inline">{t("nav.agents")}</span>
          </Button>

          <LanguageSwitcher />

          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSaved}
            aria-label={t("nav.saved")}
            className="relative"
          >
            <Heart className="h-5 w-5" />
            <AnimatePresence>
              {favCount > 0 && (
                <motion.span
                  key={favCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -end-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground"
                >
                  {favCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t("nav.theme.toggle")}
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile search row */}
      <form onSubmit={submit} className="border-t border-border/60 px-3 py-2 md:hidden" role="search">
        <div className="relative">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="mobile-search"
            id="mobile-search"
            type="search"
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("nav.search.placeholder")}
            className="h-11 rounded-full border-0 bg-secondary/70 ps-11 pe-10 text-[15px] shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={t("nav.search.placeholder")}
          />
        </div>
      </form>
    </header>
  );
}

export function SiteFooter() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto grid gap-10 px-5 py-12 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {t("footer.about")}
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-foreground">{t("footer.exploreTitle")}</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><a className="hover:text-foreground" href="#explore">{t("footer.allListings")}</a></li>
            <li><a className="hover:text-foreground" href="#featured">{t("footer.featured")}</a></li>
            <li><a className="hover:text-foreground" href="#agents">{t("footer.topAgents")}</a></li>
            <li><a className="hover:text-foreground" href="#about">{t("footer.aboutLink")}</a></li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-foreground">{t("footer.categoriesTitle")}</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>{t("filter.forSale")}</li>
            <li>{t("filter.forRent")}</li>
            <li>{t("filter.auction")}</li>
            <li>{t("footer.vacationRentals")}</li>
            <li>{t("footer.commercial")}</li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-foreground">{t("footer.newsletterTitle")}</h3>
          <p className="mb-3 text-muted-foreground">
            {t("footer.newsletterBody")}
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              name="newsletter-email"
              id="newsletter-email"
              autoComplete="email"
              placeholder={t("footer.email.placeholder")}
              className="h-10 rounded-full bg-secondary/60 text-sm"
              aria-label={t("footer.email.placeholder")}
            />
            <Button type="submit" size="sm" className="rounded-full px-4">
              {t("footer.join")}
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        {t("footer.copyright", { year })}
      </div>
    </footer>
  );
}
