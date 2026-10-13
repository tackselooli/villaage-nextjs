"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PropertyDTO } from "@/types";

interface SavedItem {
  id: string;
  title: string;
  coverPhoto: string;
  price: number;
  city: string;
  country: string;
  advertType: string;
  savedAt: string;
}

interface FavState {
  items: SavedItem[];
  isSaved: (id: string) => boolean;
  toggle: (p: PropertyDTO) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useFavStore = create<FavState>()(
  persist(
    (set, get) => ({
      items: [],
      isSaved: (id) => get().items.some((i) => i.id === id),
      toggle: (p) =>
        set((s) => {
          const exists = s.items.some((i) => i.id === p.id);
          if (exists) return { items: s.items.filter((i) => i.id !== p.id) };
          return {
            items: [
              {
                id: p.id,
                title: p.title,
                coverPhoto: p.coverPhoto,
                price: p.price,
                city: p.city,
                country: p.country,
                advertType: p.advertType,
                savedAt: new Date().toISOString(),
              },
              ...s.items,
            ],
          };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "villaage-saved" }
  )
);
