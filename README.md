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
- `/admin/login` sign-in screen and `/admin` settings page protected by a signed, HTTP-only session cookie.
- Server-side TMDB trending and search routes at `/api/movies/trending` and `/api/movies/search`.
- GitHub Actions build workflow.

## Required server environment variables

Set these in your hosting provider's **server-side environment settings**, not in browser code and not in a committed `.env` file:

- `TMDB_API_KEY`: your TMDB API key.
- `ADMIN_PASSWORD`: a strong, unique admin password.
- `ADMIN_SESSION_SECRET`: a random secret of at least 32 characters, used to sign admin sessions.

For local development, you can place them in an uncommitted `.env.local` file at the project root. Never share that file or commit it. Restart the dev server after changing environment variables.

The admin login route is `/admin/login`. Until the environment variables are configured, login will return a setup error. The session expires after eight hours. This is an initial password-based gate; add rate limiting and further operational hardening before production use.

## Important limitations

This is still an early foundation, not a finished streaming service. Appearance preferences are currently stored in browser storage. The BIG AI chat is a demo and does not call a provider yet. Do not enter AI provider keys until its server endpoint and secure configuration are implemented. Actual playback needs an authorized video source; TMDB provides metadata and artwork, not movie streams. This product uses the TMDB API but is not endorsed or certified by TMDB. See https://www.themoviedb.org/terms-of-use.
