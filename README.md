# Sylphx Platform

**Connect your GitHub repo — we handle the rest.**

A full-stack hosting platform for teams who've outgrown Vercel. Always-on containers, no cold starts, flat rate pricing.

---

## What You Get

| Service | What It Replaces |
|---------|-----------------|
| 🚀 **App Hosting** | Vercel / Railway / Render |
| 🗄️ **PostgreSQL & Redis** | PlanetScale / Upstash |
| 📦 **Object Storage (S3-compatible)** | Vercel Blob / AWS S3 |
| ⚡ **Background Jobs & Cron** | Vercel Cron / Inngest / Quirrel |
| 🔒 **SSL + Custom Domains** | Included, automatic |

Everything runs on dedicated infrastructure. Not shared. Not serverless. **Yours.**

---

## Two Deployment Paths

Choose the setup that fits your team.

---

### Path 1 — Simple: Coolify Native Build

> **"Connect your GitHub repo. We detect your Dockerfile and build + deploy automatically on every push."**

**No GitHub Actions needed. No CI configuration. Zero DevOps.**

**Best for:** Teams without a dedicated DevOps engineer, early-stage projects, rapid iteration.

**How it works:**

1. Add a `Dockerfile` to your repo (see below)
2. Send us your repo URL + domain + env vars
3. We connect it to our build system — every push to `main` triggers a build and deploy automatically

That's it. We handle build + deploy end to end.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["node", "server.js"]
```

Any language. Any framework. If it runs in Docker, it runs here.

**What to send us on onboarding:**
- GitHub repo URL (public, or invite `claw-sylphx` as collaborator)
- App name + desired domain
- List of environment variables your app needs

---

### Path 2 — Advanced: Bring Your Own CI

> **"Build your own image, we run it."**

**Best for:** Engineering teams with existing CI pipelines, teams that need custom build environments, monorepos, or fine-grained release control.

**How it works:**

Your pipeline builds the image and pushes to GHCR. We pull and run it.

```
GitHub push → GitHub Actions → build → push to GHCR → Coolify pulls & deploys
```

#### Step 1: Add a `Dockerfile`

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["node", "server.js"]
```

#### Step 2: Copy the deploy workflow

Add `.github/workflows/deploy.yml` from this repo into your project.

Set these secrets in your GitHub repo (`Settings → Secrets → Actions`):

| Secret | Value |
|--------|-------|
| `COOLIFY_TOKEN` | Provided by Sylphx on onboarding |
| `COOLIFY_APP_UUID` | Provided by Sylphx on onboarding |
| `COOLIFY_BASE_URL` | `https://coolify.sylphx.com` |
| `GHCR_TOKEN` | GitHub PAT with `write:packages` scope |

#### Step 3: Push to deploy

```bash
git push origin main   # → auto-deploys to staging
```

Production deploy: trigger manually from GitHub Actions → `Deploy Production`.

---

## Partner Onboarding Flow

**Simple onboarding, handled by us:**

1. **You send us:** repo URL + desired domain + list of env vars
2. **We set up:** app in Coolify, generate a scoped deploy token, provision your services
3. **You get back:** GitHub secrets (via secure channel) + a live URL

For Path 2 teams: copy the workflow file, paste the secrets, push — done.

**Contact:** [kyle@sylphx.com](mailto:kyle@sylphx.com)

---

## Services

### Object Storage (MinIO)

S3-compatible. Drop-in replacement for AWS S3 or Vercel Blob.

```js
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT, // provided on onboarding
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});
```

Use your existing `@aws-sdk/client-s3` code unchanged.

> Full example: [examples/storage.ts](./examples/storage.ts)

### Background Jobs (Trigger.dev)

Durable background tasks, scheduled cron, event-driven workflows — no timeout limits.

```ts
import { task, schedules } from "@trigger.dev/sdk/v3";

export const myTask = task({
  id: "send-weekly-report",
  run: async (payload) => {
    // runs reliably in the background, no timeouts
  },
});

export const weekly = schedules.task({
  id: "weekly-cron",
  cron: "0 9 * * MON",
  run: async () => { /* ... */ },
});
```

Dashboard: `https://trigger.sylphx.com`

> Full example: [examples/jobs.ts](./examples/jobs.ts)

### Database (PostgreSQL)

Dedicated Postgres instance per project. Connection string provided on onboarding.

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

### Redis

For caching, queues, pub/sub.

```
REDIS_URL=redis://:pass@host:6379
```

---

## Why Not Vercel?

| | Vercel | Sylphx Platform |
|--|--------|-----------------|
| Cold starts | Yes (serverless) | **No** (always-on containers) |
| Long-running processes | No | **Yes** |
| WebSockets | Limited | **Yes** |
| Object storage | Vercel Blob (expensive) | **MinIO** (S3-compatible, cheap) |
| Background jobs | Cron only (60s limit) | **Trigger.dev** (unlimited duration) |
| Database | Third-party only | **Included** |
| Pricing model | Per-request / per-GB | **Flat rate** |
| CI required | No (managed) | **Optional** (your choice) |
| Vendor lock-in | High | **None** (standard Docker) |

---

## Tech Stack

- **Runtime:** Docker containers on bare metal
- **Orchestration:** [Coolify](https://coolify.io)
- **Proxy:** Traefik + Cloudflare (SSL, DDoS protection)
- **Storage:** MinIO (S3-compatible)
- **Jobs:** [Trigger.dev](https://trigger.dev) (self-hosted)
- **CI/CD:** Optional — native Coolify builds or GitHub Actions → GHCR

---

## Build Infrastructure

Builds run on our own **Hetzner AX162-R** bare-metal server (48C/96T AMD EPYC, 256 GB RAM).

- **GitHub Actions minutes:** Free for all partners — we eat the cost, you pay nothing
- **Build speed:** Image build + push to GHCR happens at LAN speed (builder and registry are on the same machine)
- **Path 2 (advanced) partners:** If you'd like to run builds on our runners instead of GitHub's, just change `runs-on: ubuntu-latest` → `runs-on: [self-hosted, sylphx]` in your workflow file. Completely optional — you can use your own GitHub runners too.

---

## Pricing

Flat monthly rate. No per-function pricing. No egress fees. No cold starts.

[Contact us](mailto:kyle@sylphx.com) for pricing based on your resource requirements.

---

*Built by [Sylphx](https://sylphx.com)*
