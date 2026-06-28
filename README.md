# Energy Future

A front-end React memory card game themed around energy sources, built from the original HTML prototype.

## Features

- **Authentication** — Sign in or create an account (Firestore `Users` collection)
- **Memory game** — Match pairs of 8 energy source cards on a 4×4 grid
- **Live scoring** — `max(0, 10,000 − Moves × 100 − Seconds × 10)`
- **Leaderboard** — Season-filtered rankings from Firestore `Scores`
- **Admin panel** — Manage Firestore season and users (admin accounts only)

## Demo credentials

| Name | Password |
|------|----------|
| Admin User | admin123 |
| Dr. Sarah Chen | password |

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Firebase values (already set for this project)
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Firebase

Firebase is initialized at startup via `src/firebase/config.js`. Configuration is loaded from environment variables (Vite requires the `VITE_` prefix):

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain |
| `VITE_FIREBASE_DATABASE_URL` | Realtime Database URL |
| `VITE_FIREBASE_PROJECT_ID` | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |

Copy `.env.example` to `.env` for local development. `.env` is gitignored — do not commit secrets.

Import Firebase services elsewhere as needed:

```js
import { auth, database, app } from './firebase/config';
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and deploy to Firebase Hosting |

### Deploying to Firebase Hosting

Hosting serves the Vite build output from `dist/` (not `public/`). Always build before deploying:

```bash
npm run deploy
```

Or manually: `npm run build` then `firebase deploy --only hosting`.

## Tech stack

- React 19 (JavaScript)
- Vite 6
- Firebase 12 (Firestore — `Users`, `Scores`, `season`)
- sessionStorage for login session

## Project structure

```
src/
  components/   # UI components (Auth, Game, Leaderboard, Admin)
  context/      # App-wide auth state
  data/         # Game constants (energy sources)
  firebase/     # Firebase app initialization
  services/     # Firestore services (users, scores, season)
  utils/        # Helpers (shuffle, scoring, formatting)
```

The original HTML reference is kept as `deepseek_html_20260627_f4246b.html`.
