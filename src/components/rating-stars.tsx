"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  size = 14,
  showValue = false,
  count,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}) {
  const v = Math.round(value * 2) / 2;
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, v - (i - 1)));
          return (
            <span key={i} className="relative" style={{ width: size, height: size }}>
              <Star className="absolute inset-0 text-amber-400/30" style={{ width: size, height: size }} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="text-amber-500 fill-amber-500" style={{ width: size, height: size }} />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-foreground/80 tabular-nums">
          {value.toFixed(1)}
          {typeof count === "number" && (
            <span className="ml-1 text-muted-foreground">({count})</span>
          )}
        </span>
      )}
    </div>
  );
}

export function StarInput({
  value,
  onChange,
  size = 28,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  const [hover, setHover] = React.useState(0);
  const display = hover || value;
  return (
    <div className="inline-flex items-center" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`Rate ${i} of 5`}
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            style={{ width: size, height: size }}
            className={i <= display ? "text-amber-500 fill-amber-500" : "text-muted-foreground/40"}
          />
        </button>
      ))}
    </div>
  );
}
