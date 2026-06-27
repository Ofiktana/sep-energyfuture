# Energy Future

A front-end React memory card game themed around energy sources, built from the original HTML prototype.

## Features

- **Authentication** — Sign in or create an account (localStorage + sessionStorage)
- **Memory game** — Match pairs of 8 energy source cards on a 4×4 grid
- **Live scoring** — `max(0, 10,000 − Moves × 100 − Seconds × 10)`
- **Leaderboard** — Season-filtered rankings stored in localStorage
- **Admin panel** — Manage seasons and users (admin accounts only)

## Demo credentials

| Name | Password |
|------|----------|
| Admin User | admin123 |
| Dr. Sarah Chen | password |

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

## Tech stack

- React 19 (JavaScript)
- Vite 6
- localStorage for persistent data
- sessionStorage for login session

## Project structure

```
src/
  components/   # UI components (Auth, Game, Leaderboard, Admin)
  context/      # App-wide auth state
  data/         # Seed data and constants
  services/     # localStorage database layer
  utils/        # Helpers (shuffle, scoring, formatting)
```

The original HTML reference is kept as `deepseek_html_20260627_f4246b.html`.
