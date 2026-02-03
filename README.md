# Farmer Against Potatoes Idle Planner (Gameplay Planner)

Gameplay Planner is a community gameplay planner for **Farmer Against Potatoes Idle (FAPI)**.

Live site: https://www.gameplayplanner.com

## What it includes
- Expedition team planner and token/time efficiency helpers (`/expeditions`)
- Expedition zones planning (`/zones`)
- Pets/team builder with bonus filtering and presets (`/pets`)
- Cards/charges planning (`/cards`)
- Farming optimizer (`/farming`) + contagion helper (`/contagion`)
- Protein assembly planning (`/protein`) and residue/milk planning (`/residue`)
- Outposts and Infinity Corner helpers (`/outposts`, `/infinity_corner`)
- Guides (`/guides`)

Docs pages for crawlers/LLMs (no UI changes required): `/docs`, `/faq`, `/glossary`

## Development
Install dependencies:
```bash
npm install
```

Run the dev server (configured on port 3002):
```bash
npm run dev
```

Open http://localhost:3002

## Repo structure
- Next.js App Router pages live under `src/app`
- Static public assets are under `public`

## Support / issues
- Discord: https://discord.gg/pt8a9Y3mSv
- GitHub issues: https://github.com/DenysAshikhin/gameplay-planner/issues
