# BIG MOVE 🎬

A cinematic movie discovery starter built with **Next.js, React and TypeScript**, featuring warm orange accents, charcoal surfaces and deep black shadows.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Included
- Responsive cinematic homepage and movie poster grid.
- Featured title, search and saved-title interactions.
- BIG AI recommendation demo.
- `/admin` settings UI for TMDB, AI provider and brand preferences.
- Optional TMDB trending/search integration when a key is configured.

## Before production
This is an initial UI foundation, not a finished streaming service. Admin settings currently use browser `localStorage` for demonstration and are **not secure for production**. API keys must be moved to server-side secret storage and an authenticated backend. BIG AI is currently a demo and does not call a provider. Actual playback needs an authorized video source; TMDB provides metadata and artwork, not movie streams. This product uses the TMDB API but is not endorsed or certified by TMDB. See https://www.themoviedb.org/terms-of-use.
