"use client";

import * as React from "react";
import {
  type Locale,
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  translate,
} from "./dict";

type TFn = (key: string, params?: Record<string, string | number>) => string;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TFn;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);

  // Keep <html lang dir> in sync when locale changes client-side.
  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    // Persist in a cookie so the server can read it on next visit (SSR-correct lang/dir).
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
      document.documentElement.dir = l === "fa" ? "rtl" : "ltr";
    }
  }, []);

  const t = React.useCallback<TFn>(
    (key, params) => translate(locale, key, params),
    [locale]
  );

  const value = React.useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    // Safe fallback if used outside provider (shouldn't happen, but defensive)
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key, params) => translate(DEFAULT_LOCALE, key, params),
    };
  }
  return ctx;
}

export function useLocale(): Locale {
  return useI18n().locale;
}

export function useT(): TFn {
  return useI18n().t;
}
