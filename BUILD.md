# Installation and deployment

## Prerequisites

- **Node.js** 20.x or newer (matches CI and `@livekit/agents` expectations)
- **npm** 9+ (ships with Node)

## Installation

From the repository root (`Advisor-AI/`):

```bash
npm install
npm install --prefix livekit-voice-agent
```

The `livekit-voice-agent` package runs a **postinstall** script that patches `@livekit/agents` for LiveKit inference + OpenAI client compatibility. If you delete `node_modules` under `livekit-voice-agent`, run `npm install --prefix livekit-voice-agent` again.

## Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env.local
```

Never commit `.env.local` (it is gitignored).

| Variable | Required for | Notes |
|----------|----------------|--------|
| `VITE_SUPABASE_URL` | Auth (login/signup) | Supabase **Project URL** (`https://<ref>.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Auth | Supabase **anon public** key (safe for browser; protect with RLS) |
| `LIVEKIT_URL` | Voice | WebSocket URL, e.g. `wss://<project>.livekit.cloud` |
| `LIVEKIT_API_KEY` | Voice + token API | LiveKit API key |
| `LIVEKIT_API_SECRET` | Voice + token API | LiveKit API secret |
| `LIVEKIT_ROOM_NAME` | Voice | Optional; default `roomName` |
| `LIVEKIT_AGENT_NAME` | Voice | Must match worker registration; default `advisor-voice` |
| `LIVEKIT_SKIP_AGENT_DISPATCH` | Voice | Set to `1` to skip explicit agent dispatch (testing) |
| `LIVEKIT_AGENT_DISPATCH_DEDUP` | Token API | Set to `0` to disable removing prior dispatches before each token |
| `ADVISOR_API_PORT` | Token API | Optional; default **8787** |
| `OPENAI_API_KEY` | Voice worker | Optional placeholder for inference gateway; see `livekit-voice-agent` postinstall patch |

The token server (`server/connection-details-server.js`) normalizes `LIVEKIT_URL` from `wss://` to `https://` for LiveKit **server** SDK calls only; the browser still receives `wss://` in the JSON response.

Restart services after changing `VITE_*` or server-side env vars.

## Deployment

### Frontend build

```bash
npm run build
```

Runs TypeScript project references (`tsc -b`) then `vite build`. Output is under `dist/`.

To verify the static output locally before uploading:

```bash
npm run preview
```

### What to deploy

The project has **three** deployable concerns:

1. **Static frontend** (`dist/` after `npm run build`) — host on any static host (Netlify, Vercel, S3+CloudFront, GitHub Pages with adapter caveats, etc.). Set `VITE_*` variables **at build time** for the target environment.

2. **Connection-details API** (`server/connection-details-server.js`) — a small **Node** service that mints LiveKit participant tokens and manages room/agent dispatch. Run it behind HTTPS (or same-origin) and point the frontend to it via `VITE_CONN_DETAILS_ENDPOINT` if it is not same-origin `/api/connection-details`.

3. **LiveKit voice worker** (`livekit-voice-agent/`) — long-running worker that registers with LiveKit Cloud (or self-hosted) using `LIVEKIT_*` env. Deploy on a VM, container, or LiveKit’s recommended agent hosting; it is **not** the same process as Vite.

### Deployment checklist

- [ ] Build the frontend with the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for the target environment.
- [ ] Run the token API with `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, and matching `LIVEKIT_AGENT_NAME` / room settings.
- [ ] Run `livekit-voice-agent` with the same LiveKit credentials and `LIVEKIT_AGENT_NAME` as the token API.
- [ ] CORS / same-origin: the browser must be allowed to call your token API and connect to `LIVEKIT_URL`.
- [ ] Install `livekit-voice-agent` dependencies in the worker environment so **postinstall** runs once.
