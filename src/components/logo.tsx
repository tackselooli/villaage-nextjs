import * as React from "react";

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="villaage-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E60023" />
          <stop offset="100%" stopColor="#B3001A" />
        </linearGradient>
      </defs>
      <path
        fill="url(#villaage-grad)"
        d="M16 2C8.27 2 2 8.27 2 16c0 5.84 3.51 10.86 8.55 13.08-.12-1.11-.22-2.82.04-4.04.24-1.1 1.55-7.01 1.55-7.01s-.4-.79-.4-1.96c0-1.84 1.06-3.21 2.39-3.21 1.13 0 1.67.85 1.67 1.86 0 1.14-.72 2.83-1.09 4.4-.31 1.31.66 2.39 1.95 2.39 2.34 0 4.14-2.47 4.14-6.03 0-3.15-2.27-5.36-5.5-5.36-3.75 0-5.94 2.81-5.94 5.71 0 1.13.43 2.34.98 3 .11.13.12.25.09.38l-.36 1.46c-.06.24-.19.29-.44.18-1.65-.77-2.68-3.18-2.68-5.12 0-4.17 3.03-8 8.74-8 4.59 0 8.16 3.27 8.16 7.65 0 4.56-2.88 8.23-6.87 8.23-1.34 0-2.6-.7-3.03-1.52l-.82 3.15c-.3 1.16-1.11 2.61-1.65 3.5 1.25.39 2.58.6 3.96.6 7.73 0 14-6.27 14-14C30 8.27 23.73 2 16 2z"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Logo className="h-7 w-7" />
      <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-geist-mono), Georgia, serif" }}>
        villaage
      </span>
    </span>
  );
}
