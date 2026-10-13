"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/dict";

const WELCOME_SEEN_KEY = "villaage-welcome-seen";

export function LanguagePicker({ forceOpen = false }: { forceOpen?: boolean }) {
  const { setLocale } = useI18n();
  const [open, setOpen] = React.useState(false);

  // Check on mount (client-only) whether this is the first visit
  React.useEffect(() => {
    // If cookie already set, skip
    const hasCookie = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${LOCALE_COOKIE}=`));

    // If forced open (e.g. user clicked "change language"), show
    if (forceOpen) {
      setOpen(true);
      return;
    }

    // If already seen the welcome, skip
    const seen = localStorage.getItem(WELCOME_SEEN_KEY);
    if (seen || hasCookie) return;

    // First visit — show the picker
    setOpen(true);
  }, [forceOpen]);

  const pick = (locale: Locale) => {
    setLocale(locale);
    try {
      localStorage.setItem(WELCOME_SEEN_KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-border/50"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary/15">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Welcome to Villaage
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose your language to continue
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground" dir="rtl">
                برای ادامه، زبان خود را انتخاب کنید
              </p>
            </div>

            {/* Language choices */}
            <div className="grid grid-cols-2 gap-3 p-6">
              <button
                onClick={() => pick("en")}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-secondary/50 p-6 ring-1 ring-border/50 transition hover:bg-secondary hover:ring-primary/40"
              >
                <span className="text-5xl" role="img" aria-label="English">
                  🇬🇧
                </span>
                <span className="text-lg font-semibold">English</span>
                <span className="text-xs text-muted-foreground">Continue in English</span>
              </button>

              <button
                onClick={() => pick("fa")}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-secondary/50 p-6 ring-1 ring-border/50 transition hover:bg-secondary hover:ring-primary/40"
              >
                <span className="text-5xl" role="img" aria-label="فارسی">
                  🇮🇷
                </span>
                <span className="text-lg font-semibold">فارسی</span>
                <span className="text-xs text-muted-foreground" dir="rtl">ادامه به فارسی</span>
              </button>
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 px-6 py-4 text-center">
              <button
                onClick={() => pick("en")}
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Skip for now — I'll pick later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
