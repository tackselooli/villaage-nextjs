# 🚀 Villaage — Quick Start

## What's in this zip

This is the **complete source code** for Villaage — a Pinterest-inspired
real-estate marketplace for Iranian properties. Bilingual (English + Persian),
dark mode default, fully responsive, works without VPN (all images bundled locally).

## Requirements

You need **ONE** of these installed on your computer:

### Option A — Node.js (recommended for most people)
1. Download from https://nodejs.org/ (pick the "LTS" version)
2. Install it — that's it, npm comes bundled

### Option B — Bun (faster, what the project was built with)
1. Install from https://bun.sh/
2. Follow the one-line install command for your OS

## How to run

### If you installed Node.js

```bash
# 1. Extract this zip somewhere — e.g. Desktop/villaage
#    On Windows: right-click the zip → "Extract All"
#    On Mac: double-click the zip
#    On Linux: unzip villaage-source.zip -d villaage

# 2. Open a terminal in the extracted folder
#    Windows: open the folder, type "cmd" in the address bar, press Enter
#    Mac: open Terminal, drag the folder in, press Enter
#    Linux: cd into the folder

# 3. Install dependencies (first time only, takes 1-2 minutes)
npm install

# 4. Create the database
npm run db:push

# 5. Load sample data (8 agents, 18 properties, 60 ratings)
npm run scripts/seed.ts
#    or: npx tsx scripts/seed.ts

# 6. Start the dev server
npm run dev

# 7. Open your browser to http://localhost:3000
```

### If you installed Bun

```bash
# Same steps, replace "npm" with "bun":
bun install
bun run db:push
bun run scripts/seed.ts
bun run dev

# Open http://localhost:3000
```

## First visit

The first time you open http://localhost:3000, you'll see a **language picker**
modal. Pick English 🇬🇧 or Persian 🇮🇷 — it saves your choice in a cookie so
you never see it again.

## Features to try

1. **Browse the feed** — Pinterest-style masonry grid of Iranian properties
2. **Save properties** — click the heart on any card
3. **Open a property** — click any card to see gallery, agent, reviews, enquiry form
4. **Switch language** — globe icon in the header (EN / فارسی)
5. **Toggle theme** — moon/sun icon (dark mode is the default)
6. **Open saved board** — heart icon in the header
7. **Browse agents** — click "Agents" in the header

## Deploying online

See the "Hosting" section in README.md for how to deploy to Vercel (free).

## Troubleshooting

### "command not found: npm" or "command not found: bun"
→ Node.js / Bun is not installed or not in your PATH. Reinstall and restart your terminal.

### Port 3000 is already in use
→ Another app is using port 3000. Either close it, or start with: `npm run dev -- -p 3001`

### Images don't load
→ All images are in `public/images/` — they should always load. If they don't, make sure you're running from the project root (the folder containing `package.json`), not a subfolder.

### Database errors
→ Delete the `db/` folder and run `npm run db:push` again, then `npm run scripts/seed.ts`.

## Need help?

Open an issue on GitHub: https://github.com/YOUR_USERNAME/villaage/issues
