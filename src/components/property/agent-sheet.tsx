"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, Mail, Phone, Building2, Award, ListChecks } from "lucide-react";
import { RatingStars } from "@/components/rating-stars";
import type { AgentDTO, PropertyDTO } from "@/types";
import { formatNumber } from "@/lib/format";
import { localAvatarUrl } from "@/lib/avatar";
import { useI18n } from "@/lib/i18n/provider";

export function AgentsSheet({
  open,
  onOpenChange,
  onPick,
  agents,
  loading,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPick: (a: AgentDTO) => void;
  agents: AgentDTO[];
  loading: boolean;
}) {
  const { t, locale } = useI18n();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-xl" side="right">
        <SheetHeader className="border-b border-border/60">
          <SheetTitle>{t("agents.title")}</SheetTitle>
          <SheetDescription>{t("agents.subtitle")}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-3 p-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
              ))
            : agents.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onPick(a)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-start ring-1 ring-border/60 transition hover:ring-primary/40"
                >
                  { }
                  <img
                    src={a.avatarUrl ?? localAvatarUrl(a.name)}
                    alt={a.name}
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-border"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="truncate font-semibold">{a.name}</span>
                      {a.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">{a.agency}</div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> {t("agents.listings", { n: a._count?.properties ?? 0 })}
                      </span>
                      <RatingStars value={a.rating} showValue />
                    </div>
                  </div>
                </button>
              ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function AgentProfileSheet({
  agent,
  open,
  onOpenChange,
  onOpenProperty,
}: {
  agent: AgentDTO | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onOpenProperty: (p: PropertyDTO) => void;
}) {
  const { t, locale } = useI18n();
  const [data, setData] = React.useState<{ agent: AgentDTO; properties: PropertyDTO[] } | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!agent) return;
    setLoading(true);
    setData(null);
    fetch(`/api/agents/${agent.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .finally(() => setLoading(false));
  }, [agent]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md">
        {agent && (
          <>
            <SheetHeader className="border-b border-border/60">
              <SheetTitle className="flex items-center gap-2 pe-6">
                <span>{t("agent.profile")}</span>
              </SheetTitle>
              <SheetDescription className="sr-only">{agent.name}</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col items-center px-6 pt-6 text-center">
              { }
              <img
                src={agent.avatarUrl ?? localAvatarUrl(agent.name)}
                alt={agent.name}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-background shadow-md"
              />
              <h2 className="mt-3 flex items-center gap-1 text-2xl font-semibold tracking-tight">
                {agent.name}
                {agent.verified && <BadgeCheck className="h-5 w-5 text-primary" />}
              </h2>
              <p className="text-sm text-muted-foreground">{agent.agency}</p>
              <div className="mt-2">
                <RatingStars value={agent.rating} showValue size={16} count={agent._count?.ratings ?? 0} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-5">
              {[
                { icon: ListChecks, label: t("agent.listings"), value: agent._count?.properties ?? 0 },
                { icon: Award, label: t("agent.sales"), value: agent.salesCount },
                { icon: Building2, label: t("agent.enquiries"), value: agent._count?.enquiries ?? 0 },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-secondary/60 p-3 text-center">
                  <s.icon className="mx-auto h-4 w-4 text-muted-foreground" />
                  <div className="mt-1 text-lg font-semibold tabular-nums">{formatNumber(s.value, locale)}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="px-5">
              <p className="text-[15px] leading-relaxed text-foreground/85">{agent.bio}</p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${agent.email}`}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Mail className="h-4 w-4" /> {t("agent.email")}
                </a>
                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-medium hover:bg-secondary"
                  >
                    <Phone className="h-4 w-4" /> {t("agent.call")}
                  </a>
                )}
              </div>
            </div>

            <div className="border-t border-border/60 p-5">
              <h3 className="mb-3 text-sm font-semibold">{t("agent.portfolio")}</h3>
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-2xl" />)}
                </div>
              ) : data && data.properties.length > 0 ? (
                <div className="space-y-2">
                  {data.properties.slice(0, 8).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onOpenProperty(p)}
                      className="flex w-full items-center gap-3 rounded-2xl bg-card p-2 text-start ring-1 ring-border/60 transition hover:ring-primary/40"
                    >
                      { }
                      <img src={p.coverPhoto} alt={p.title} className="h-14 w-20 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-1 text-sm font-medium">{p.title}</div>
                        <div className="text-xs text-muted-foreground">{p.city}, {p.country}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t("agent.noListings")}</p>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
