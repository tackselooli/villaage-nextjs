// Generates deterministic SVG avatars locally — no external API needed.
// Used for agent profile pictures so the site works offline / behind filtered ISPs.

const HUES = [
  { bg: "#E60023", fg: "#FFFFFF" }, // Pinterest red
  { bg: "#0EA5E9", fg: "#FFFFFF" }, // sky
  { bg: "#10B981", fg: "#FFFFFF" }, // emerald
  { bg: "#F59E0B", fg: "#FFFFFF" }, // amber
  { bg: "#8B5CF6", fg: "#FFFFFF" }, // violet
  { bg: "#EC4899", fg: "#FFFFFF" }, // pink
  { bg: "#14B8A6", fg: "#FFFFFF" }, // teal
  { bg: "#6366F1", fg: "#FFFFFF" }, // indigo
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function buildSvg(name: string): string {
  const h = hashStr(name);
  const color = HUES[h % HUES.length];
  const ini = initials(name);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" rx="100" fill="${color.bg}"/><text x="100" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" fill="${color.fg}" text-anchor="middle">${ini}</text></svg>`;
}

/** Node-side (for seed.ts) — returns a data: URI using Buffer. */
export function localAvatar(name: string): string {
  const svg = buildSvg(name);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Client-side (for React components) — returns a data: URI using btoa. */
export function localAvatarUrl(name: string): string {
  const svg = buildSvg(name);
  // encodeURIComponent + unescape handles Unicode (Persian) chars safely
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}
