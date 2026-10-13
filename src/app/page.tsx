"use client";

import * as React from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Hero } from "@/components/property/hero";
import {
  FiltersBar,
  DEFAULT_FILTERS,
  type FilterState,
} from "@/components/property/filters-bar";
import { MasonryGrid } from "@/components/property/masonry-grid";
import { PropertyDetailDialog } from "@/components/property/property-detail-dialog";
import { SavedBoardSheet } from "@/components/property/saved-board-sheet";
import {
  AgentsSheet,
  AgentProfileSheet,
} from "@/components/property/agent-sheet";
import { Testimonials } from "@/components/property/testimonials";
import { LanguagePicker } from "@/components/language-picker";
import type { AgentDTO, PropertyDTO } from "@/types";
import { useI18n } from "@/lib/i18n/provider";
import {
  advertLabel,
  propertyTypeLabel,
} from "@/lib/format";

export default function HomePage() {
  const { t, locale } = useI18n();
  // -------- state --------
  const [properties, setProperties] = React.useState<PropertyDTO[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);
  const [selected, setSelected] = React.useState<PropertyDTO | null>(null);
  const [savedOpen, setSavedOpen] = React.useState(false);
  const [agentsOpen, setAgentsOpen] = React.useState(false);
  const [agents, setAgents] = React.useState<AgentDTO[]>([]);
  const [agentsLoading, setAgentsLoading] = React.useState(false);
  const [pickedAgent, setPickedAgent] = React.useState<AgentDTO | null>(null);
  const [agentOpen, setAgentOpen] = React.useState(false);

  // -------- fetch properties whenever filters change --------
  const fetchProperties = React.useCallback(async (f: FilterState) => {
    setLoading(true);
    const sp = new URLSearchParams();
    if (f.q) sp.set("q", f.q);
    if (f.advertType) sp.set("advertType", f.advertType);
    if (f.propertyType) sp.set("propertyType", f.propertyType);
    if (f.bedrooms) sp.set("bedrooms", String(f.bedrooms));
    if (f.bathrooms) sp.set("bathrooms", String(f.bathrooms));
    if (f.city) sp.set("city", f.city);
    if (f.priceRange[0] > 0) sp.set("minPrice", String(f.priceRange[0]));
    if (f.priceRange[1] < 100_000_000_000) sp.set("maxPrice", String(f.priceRange[1]));
    if (f.sort) sp.set("sort", f.sort);
    try {
      const r = await fetch(`/api/properties?${sp.toString()}`);
      const data = await r.json();
      setProperties(data.results ?? []);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // debounce filter changes
  React.useEffect(() => {
    const t = setTimeout(() => fetchProperties(filters), 250);
    return () => clearTimeout(t);
  }, [filters, fetchProperties]);

  // -------- initial agent list (lazy) --------
  const ensureAgents = React.useCallback(async () => {
    if (agents.length || agentsLoading) return;
    setAgentsLoading(true);
    try {
      const r = await fetch("/api/agents");
      const data = await r.json();
      setAgents(data.results ?? []);
    } catch {
      // ignore
    } finally {
      setAgentsLoading(false);
    }
  }, [agents.length, agentsLoading]);

  // -------- deep link: ?p=<id> opens a property --------
  React.useEffect(() => {
    const url = new URL(window.location.href);
    const pid = url.searchParams.get("p");
    if (!pid) return;
    fetch(`/api/properties/${pid}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((p: PropertyDTO | null) => p && setSelected(p))
      .catch(() => null);
  }, []);

  // -------- handlers --------
  const onSearch = (q: string) => setFilters((f) => ({ ...f, q }));
  const onExplore = () => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openAgents = () => {
    setAgentsOpen(true);
    ensureAgents();
  };

  const pickAgent = (a: AgentDTO) => {
    setAgentsOpen(false);
    setPickedAgent(a);
    setAgentOpen(true);
  };

  const openSavedProperty = async (id: string) => {
    setSavedOpen(false);
    const r = await fetch(`/api/properties/${id}`);
    if (r.ok) setSelected(await r.json());
  };

  const feedTitle = filters.q ? t("feed.title.search", { q: filters.q }) : t("feed.title.default");
  const feedSubtitle = loading
    ? t("feed.loading")
    : t("feed.count", {
        n: properties.length,
        type: filters.advertType ? advertLabel(filters.advertType, locale) : t("feed.allTypes"),
        category: filters.propertyType ? propertyTypeLabel(filters.propertyType, locale) : t("feed.allCategories"),
      });

  const aboutBlocks = [
    { title: t("about.title1"), body: t("about.body1") },
    { title: t("about.title2"), body: t("about.body2") },
    { title: t("about.title3"), body: t("about.body3") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LanguagePicker />
      <SiteHeader
        onSearch={onSearch}
        onOpenSaved={() => setSavedOpen(true)}
        onOpenAgents={openAgents}
      />

      <main className="flex-1">
        <Hero onSearch={onSearch} onExplore={onExplore} />

        <section id="explore" className="mx-auto px-3 py-8 sm:px-5 lg:px-8 lg:py-10">
          <header className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {feedTitle}
              </h2>
              <p className="text-sm text-muted-foreground">{feedSubtitle}</p>
            </div>
          </header>

          <FiltersBar filters={filters} onChange={setFilters} />

          <MasonryGrid
            properties={properties}
            loading={loading}
            onOpen={setSelected}
          />

          {!loading && properties.length > 0 && (
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                {t("feed.footer", { n: properties.length })}
              </p>
            </div>
          )}
        </section>

        {/* About / value-prop strip */}
        <section id="about" className="border-t border-border/60 bg-secondary/40 py-12">
          <div className="mx-auto grid gap-6 px-5 md:grid-cols-3 lg:px-8">
            {aboutBlocks.map((b) => (
              <div key={b.title} className="rounded-2xl bg-card p-6 ring-1 ring-border/50">
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder note */}
        <section className="border-t border-border/60 bg-gradient-to-b from-background to-secondary/30 py-14">
          <div className="mx-auto max-w-2xl px-5 lg:px-8">
            <div className="rounded-3xl bg-card p-8 ring-1 ring-border/50 sm:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                {t("founder.tag")}
              </div>
              <p className="font-display text-lg leading-relaxed text-foreground/90 sm:text-xl">
                {t("founder.body")}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{t("founder.name")}</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>

      <SiteFooter />

      {/* Overlays */}
      <PropertyDetailDialog
        property={selected}
        onClose={() => setSelected(null)}
        onOpenAgent={(a) => {
          setSelected(null);
          setPickedAgent(a);
          setAgentOpen(true);
        }}
      />

      <SavedBoardSheet
        open={savedOpen}
        onOpenChange={setSavedOpen}
        onOpenProperty={openSavedProperty}
      />

      <AgentsSheet
        open={agentsOpen}
        onOpenChange={setAgentsOpen}
        onPick={pickAgent}
        agents={agents}
        loading={agentsLoading}
      />

      <AgentProfileSheet
        agent={pickedAgent}
        open={agentOpen}
        onOpenChange={setAgentOpen}
        onOpenProperty={(p) => {
          setAgentOpen(false);
          setSelected(p);
        }}
      />
    </div>
  );
}
