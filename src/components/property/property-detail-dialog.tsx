"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Eye,
  Heart,
  Share2,
  Building2,
  Calendar,
  Phone,
  Mail,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AgentDTO, PropertyDTO, RatingDTO } from "@/types";
import {
  ADVERT_COLORS,
  advertLabel,
  propertyTypeLabel,
  formatFinalPrice,
  formatNumber,
  formatPrice,
  timeAgo,
} from "@/lib/format";
import { RatingStars, StarInput } from "@/components/rating-stars";
import { SaveButton } from "@/components/save-button";
import { localAvatarUrl } from "@/lib/avatar";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function PropertyDetailDialog({
  property,
  onClose,
  onOpenAgent,
}: {
  property: PropertyDTO | null;
  onClose: () => void;
  onOpenAgent: (a: AgentDTO) => void;
}) {
  const { t } = useI18n();
  const isDesktop = useIsDesktop();
  const [full, setFull] = React.useState<PropertyDTO | null>(property);

  React.useEffect(() => setFull(property), [property]);

  // Fetch full record (with ratings + agent relations) when opening
  React.useEffect(() => {
    if (!property) return;
    let cancelled = false;
    fetch(`/api/properties/${property.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PropertyDTO | null) => {
        if (!cancelled && data) setFull(data);
      })
      .catch(() => null);
    return () => {
      cancelled = true;
    };
  }, [property]);

  const content = full ? (
    <DetailBody property={full} onOpenAgent={onOpenAgent} />
  ) : (
    <DetailSkeleton />
  );

  if (isDesktop) {
    return (
      <Dialog open={!!property} onOpenChange={(o) => !o && onClose()}>
        <DialogTitle className="sr-only">{full?.title ?? t("detail.tabs.overview")}</DialogTitle>
        <DialogDescription className="sr-only">
          {t("detail.tabs.overview")}, {t("detail.tabs.reviews")}, {t("detail.tabs.contact")}.
        </DialogDescription>
        <DialogContent
          className="max-h-[92vh] w-[min(1100px,96vw)] overflow-hidden rounded-3xl border-border/60 p-0 sm:max-w-[1100px]"
          showCloseButton
        >
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={!!property} onOpenChange={(o) => !o && onClose()}>
      <SheetTitle className="sr-only">{full?.title ?? t("detail.tabs.overview")}</SheetTitle>
      <SheetDescription className="sr-only">
        {t("detail.tabs.overview")}, {t("detail.tabs.reviews")}, {t("detail.tabs.contact")}.
      </SheetDescription>
      <SheetContent
        side="bottom"
        className="max-h-[94vh] overflow-y-auto rounded-t-3xl p-0"
      >
        {content}
      </SheetContent>
    </Sheet>
  );
}

function DetailBody({
  property,
  onOpenAgent,
}: {
  property: PropertyDTO;
  onOpenAgent: (a: AgentDTO) => void;
}) {
  const { t, locale } = useI18n();
  const photos = [property.coverPhoto, property.photo1, property.photo2, property.photo3, property.photo4].filter(
    (x): x is string => !!x
  );
  const [active, setActive] = React.useState(0);

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr]">
      {/* Gallery */}
      <div className="relative bg-muted">
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full">
          { }
          <img
            src={photos[active]}
            alt={property.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className={cn(
              "absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur",
              ADVERT_COLORS[property.advertType]
            )}
          >
            {advertLabel(property.advertType, locale)}
          </div>
          <div className="absolute end-4 top-4 flex gap-2">
            <SaveButton property={property} />
            <ShareButton property={property} />
          </div>

          {photos.length > 1 && (
            <>
              <button
                aria-label={t("detail.prevPhoto")}
                onClick={() => setActive((a) => (a - 1 + photos.length) % photos.length)}
                className="absolute start-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur hover:bg-white rtl:rotate-180"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label={t("detail.nextPhoto")}
                onClick={() => setActive((a) => (a + 1) % photos.length)}
                className="absolute end-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur hover:bg-white rtl:rotate-180"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 start-1/2 flex -translate-x-1/2 gap-1.5 rtl:translate-x-1/2">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    aria-label={t("detail.photo", { n: i + 1 })}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === active ? "w-7 bg-white" : "w-2 bg-white/60"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-border/60 p-2 no-scrollbar">
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition",
                  i === active ? "ring-primary" : "ring-transparent"
                )}
              >
                { }
                <img src={p} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right column */}
      <div className="flex max-h-[92vh] flex-col overflow-y-auto">
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {property.title}
              </h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {property.streetAddress}, {property.city}, {property.country} {property.postalCode}
              </p>
            </div>
          </div>

          {/* Spec row */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            {[
              { icon: BedDouble, label: t("detail.spec.bedrooms"), value: property.bedrooms },
              { icon: Bath, label: t("detail.spec.bathrooms"), value: property.bathrooms },
              { icon: Building2, label: t("detail.spec.floors"), value: property.totalFloors },
              { icon: Maximize, label: t("detail.spec.plot"), value: property.plotArea },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-secondary/60 p-3 text-center">
                <s.icon className="mx-auto h-4 w-4 text-muted-foreground" />
                <div className="mt-1 text-base font-semibold tabular-nums">{formatNumber(s.value, locale)}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 ring-1 ring-primary/15">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-bold tracking-tight">
                  {formatPrice(property, locale, { compact: false })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("detail.tax", { n: property.taxPercent, price: formatFinalPrice(property, locale) })}
                </div>
              </div>
              <Badge variant="outline" className="rounded-full bg-background">
                {propertyTypeLabel(property.propertyType, locale)}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> {t("detail.views", { n: formatNumber(property.views, locale) })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" /> {t("detail.saves", { n: formatNumber(property.savedCount, locale) })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {t("detail.listed", { time: timeAgo(property.createdAt, locale) })}
              </span>
            </div>
          </div>

          {/* Agent card */}
          <button
            type="button"
            onClick={() => onOpenAgent(property.agent)}
            className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-start ring-1 ring-border/60 transition hover:ring-primary/40"
          >
            { }
            <img
              src={property.agent.avatarUrl ?? localAvatarUrl(property.agent.name)}
              alt={property.agent.name}
              className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="truncate font-semibold">{property.agent.name}</span>
                {property.agent.verified && (
                  <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
                )}
              </div>
              <div className="truncate text-xs text-muted-foreground">{property.agent.agency}</div>
            </div>
            <div className="text-end">
              <RatingStars value={property.agent.rating} showValue />
              <div className="text-[11px] text-muted-foreground">{formatNumber(property.agent.salesCount, locale)} {t("agent.sales").toLowerCase()}</div>
            </div>
          </button>

          {/* Tabs: Overview / Reviews / Contact */}
          <Tabs defaultValue="overview" className="mt-5">
            <TabsList className="grid w-full grid-cols-3 rounded-full bg-secondary/60 p-1">
              <TabsTrigger value="overview" className="rounded-full">{t("detail.tabs.overview")}</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-full">{t("detail.tabs.reviews")}</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-full">{t("detail.tabs.contact")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <p className="text-[15px] leading-relaxed text-foreground/90">{property.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <Spec label={t("detail.reference")} value={property.refCode} />
                <Spec label={t("detail.country")} value={property.country} />
                <Spec label={t("detail.city")} value={property.city} />
                <Spec label={t("detail.postal")} value={property.postalCode} />
                <Spec label={t("detail.street")} value={property.streetAddress} />
                <Spec label={t("detail.listedAgo")} value={timeAgo(property.createdAt, locale)} />
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <ReviewsTab property={property} />
            </TabsContent>

            <TabsContent value="contact" className="mt-4">
              <EnquiryForm property={property} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-border/50 py-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}

function ReviewsTab({ property }: { property: PropertyDTO }) {
  const { t } = useI18n();
  const [ratings, setRatings] = React.useState<RatingDTO[]>(property.ratings ?? []);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", score: 5, comment: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      toast.error(t("toast.reviewValidate"));
      return;
    }
    setSubmitting(true);
    try {
      const r = await fetch(`/api/properties/${property.id}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("failed");
      const created: RatingDTO = await r.json();
      setRatings((arr) => [created, ...arr]);
      setForm({ name: "", email: "", score: 5, comment: "" });
      toast.success(t("toast.reviewSent"));
    } catch {
      toast.error(t("toast.reviewFail"));
    } finally {
      setSubmitting(false);
    }
  };

  const avg = ratings.length ? ratings.reduce((s, r) => s + r.score, 0) / ratings.length : 0;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-secondary/60 p-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold tabular-nums">
            {ratings.length ? avg.toFixed(1) : "—"}
          </div>
          <div>
            <RatingStars value={avg} showValue size={16} />
            <div className="text-xs text-muted-foreground">{t("reviews.count", { n: ratings.length })}</div>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-3 rounded-2xl ring-1 ring-border/60 p-4">
        <h3 className="text-sm font-semibold">{t("reviews.leaveTitle")}</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input
            name="reviewer-name"
            id="reviewer-name"
            autoComplete="name"
            placeholder={t("reviews.name")}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-lg bg-secondary/60"
            required
          />
          <Input
            type="email"
            name="reviewer-email"
            id="reviewer-email"
            autoComplete="email"
            placeholder={t("reviews.email")}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="rounded-lg bg-secondary/60"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">{t("reviews.rating")}</Label>
          <StarInput value={form.score} onChange={(v) => setForm((f) => ({ ...f, score: v }))} />
        </div>
        <Textarea
          name="review-comment"
          id="review-comment"
          placeholder={t("reviews.comment.placeholder")}
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          className="min-h-[90px] rounded-lg bg-secondary/60"
          required
        />
        <Button type="submit" disabled={submitting} className="w-full rounded-full">
          {submitting ? t("reviews.submitting") : t("reviews.submit")}
        </Button>
      </form>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {ratings.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl bg-card p-4 ring-1 ring-border/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-sm font-semibold">
                    {r.reviewerName.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{r.reviewerName}</div>
                    <div className="text-[11px] text-muted-foreground">{timeAgo(r.createdAt)}</div>
                  </div>
                </div>
                <RatingStars value={r.score} />
              </div>
              {r.comment && <p className="mt-2 text-sm leading-relaxed text-foreground/85">{r.comment}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
        {ratings.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {t("reviews.empty")}
          </p>
        )}
      </div>
    </div>
  );
}

function EnquiryForm({ property }: { property: PropertyDTO }) {
  const { t } = useI18n();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    moveDate: "",
    message: t("enquiry.message.default", {
      name: property.agent.name.split(" ")[0],
      title: property.title,
    }),
  });
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(t("toast.enquiryValidate"));
      return;
    }
    setSubmitting(true);
    try {
      const r = await fetch(`/api/properties/${property.id}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("failed");
      toast.success(t("toast.enquirySent"));
      setForm((f) => ({ ...f, name: "", email: "", phone: "", message: "" }));
    } catch {
      toast.error(t("toast.enquiryFail"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">{t("enquiry.name")} *</Label>
          <Input name="enquiry-name" id="enquiry-name" autoComplete="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="rounded-lg bg-secondary/60" required />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">{t("enquiry.email")} *</Label>
          <Input type="email" name="enquiry-email" id="enquiry-email" autoComplete="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="rounded-lg bg-secondary/60" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">{t("enquiry.phone")}</Label>
          <Input name="enquiry-phone" id="enquiry-phone" autoComplete="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="rounded-lg bg-secondary/60" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">{t("enquiry.moveDate")}</Label>
          <Input type="date" name="enquiry-move-date" id="enquiry-move-date" value={form.moveDate} onChange={(e) => setForm((f) => ({ ...f, moveDate: e.target.value }))} className="rounded-lg bg-secondary/60" />
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">{t("enquiry.message")} *</Label>
        <Textarea name="enquiry-message" id="enquiry-message" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="min-h-[100px] rounded-lg bg-secondary/60" required />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={submitting} className="flex-1 rounded-full">
          <Send className="me-2 h-4 w-4 rtl:-scale-x-100" />
          {submitting ? t("enquiry.sending") : t("enquiry.send")}
        </Button>
        <Button type="button" variant="outline" className="rounded-full" asChild>
          <a href={`mailto:${property.agent.email}?subject=${encodeURIComponent("Enquiry: " + property.title)}`}>
            <Mail className="me-2 h-4 w-4" /> {t("enquiry.emailAgent")}
          </a>
        </Button>
        {property.agent.phone && (
          <Button type="button" variant="outline" className="rounded-full" asChild>
            <a href={`tel:${property.agent.phone ?? ""}`}>
              <Phone className="me-2 h-4 w-4" /> {t("enquiry.call")}
            </a>
          </Button>
        )}
      </div>
    </form>
  );
}

function ShareButton({ property }: { property: PropertyDTO }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      aria-label={t("detail.share")}
      onClick={async () => {
        const url = `${window.location.origin}/?p=${property.id}`;
        try {
          if (navigator.share) {
            await navigator.share({ title: property.title, url });
          } else {
            await navigator.clipboard.writeText(url);
            toast.success(t("toast.linkCopied"));
          }
        } catch {
          // user dismissed share sheet — ignore
        }
      }}
      className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-foreground shadow-md backdrop-blur transition hover:bg-white"
    >
      <Share2 className="h-[18px] w-[18px]" />
    </button>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr]">
      <Skeleton className="aspect-[4/3] w-full lg:aspect-auto lg:h-[60vh]" />
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
        </div>
        <Skeleton className="h-20" />
        <Skeleton className="h-12" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}

function useIsDesktop() {
  const [is, setIs] = React.useState(true);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => setIs(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return is;
}
