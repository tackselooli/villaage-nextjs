"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import { RatingStars } from "@/components/rating-stars";
import { localAvatarUrl } from "@/lib/avatar";

const TESTIMONIALS = [
  {
    nameKey: "Sahar K.",
    city: "اصفهان",
    text: "We found our dream heritage house in Jolfa through Shirin. She knew every alley, every neighbor. She even helped us find a restoration architect. This is how real estate should feel — like a friend introducing you to a home, not a salesperson pushing a product.",
    score: 5,
  },
  {
    nameKey: "Mehdi A.",
    city: "تهران",
    text: "After two months of dead ends on the big portals, Arash found our villa in Lavasan in eight days. The photos were real. The description was real. The agent was real. Villaage is the only place I'll look from now on.",
    score: 5,
  },
  {
    nameKey: "Narges S.",
    city: "یزد",
    text: "The wind-catcher house we bought is a registered heritage site. Niloofar walked us through the whole process — not just the sale, but the preservation paperwork too. I never felt like a transaction.",
    score: 5,
  },
];

export function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="border-t border-border/60 bg-secondary/30 py-14">
      <div className="mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("testimonials.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((tm, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl bg-card p-6 ring-1 ring-border/50"
            >
              <Quote className="absolute end-4 top-4 h-8 w-8 text-primary/15 rtl:-scale-x-100" />
              <div className="mb-3">
                <RatingStars value={tm.score} size={16} />
              </div>
              <blockquote className="text-[15px] leading-relaxed text-foreground/90">
                “{tm.text}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <img src={localAvatarUrl(tm.nameKey)} alt={tm.nameKey} className="h-10 w-10 rounded-full ring-1 ring-border" />
                <div>
                  <div className="text-sm font-semibold">{tm.nameKey}</div>
                  <div className="text-xs text-muted-foreground">{tm.city}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
