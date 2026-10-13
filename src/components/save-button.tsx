"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFavStore } from "@/lib/fav-store";
import type { PropertyDTO } from "@/types";

export function SaveButton({
  property,
  className,
  size = 22,
}: {
  property: PropertyDTO;
  className?: string;
  size?: number;
}) {
  const isSaved = useFavStore((s) => s.isSaved(property.id));
  const toggle = useFavStore((s) => s.toggle);

  return (
    <button
      type="button"
      aria-label={isSaved ? "Remove from saved" : "Save"}
      aria-pressed={isSaved}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggle(property);
      }}
      className={cn(
        "relative grid place-items-center rounded-full bg-white/95 hover:bg-white text-foreground shadow-md backdrop-blur transition",
        "h-9 w-9",
        className
      )}
    >
      <motion.span
        key={isSaved ? "saved" : "unsaved"}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        className="grid place-items-center"
      >
        <Heart
          style={{ width: size, height: size }}
          className={isSaved ? "fill-primary text-primary" : "text-foreground/70"}
        />
      </motion.span>
    </button>
  );
}
