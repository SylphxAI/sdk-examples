# Sylphx Platform

**Deploy anything. No vendor lock-in. No cold starts. No surprise bills.**

A full-stack hosting platform for teams who've outgrown Vercel.

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

## Deploy in 3 Steps

### 1. Add a `Dockerfile` to your repo

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["node", "server.js"]
```

Any language. Any framework. If it runs in Docker, it runs here.

### 2. Add the deploy workflow

Copy `.github/workflows/deploy.yml` from this repo into your project.

Set these secrets in your GitHub repo (`Settings → Secrets → Actions`):

| Secret | Value |
|--------|-------|
| `COOLIFY_TOKEN` | Provided by Sylphx on onboarding |
| `COOLIFY_APP_UUID` | Provided by Sylphx on onboarding |
| `COOLIFY_BASE_URL` | `https://coolify.sylphx.com` |
| `GHCR_TOKEN` | GitHub PAT with `write:packages` scope |

### 3. Push to deploy

```bash
git push origin main   # → auto-deploys to staging
```

Production deploy: trigger manually from GitHub Actions → `Deploy Production`.

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

### Background Jobs (Trigger.dev)

Durable background tasks, scheduled cron, event-driven workflows.

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

## Onboarding

We handle the setup. You handle the code.

**What we need from you:**

- GitHub repo URL (or invite `claw-sylphx` as collaborator)
- App name + desired domain
- List of environment variables your app needs
- Preferred tech stack (so we can size resources appropriately)

**What we set up:**

- App containers (staging + production)
- Domains + SSL (automatic, no config needed)
- Database + Redis provisioning
- MinIO bucket
- Trigger.dev project
- GitHub secrets (via secure channel)

**Contact:** [platform@sylphx.com](mailto:platform@sylphx.com)

---

## Pricing

Flat monthly rate. No per-function pricing. No egress fees. No cold starts.

Contact us for pricing based on your resource requirements.

---

## vs Vercel

| | Vercel | Sylphx Platform |
|--|--------|-----------------|
| Cold starts | Yes (serverless) | No (always-on containers) |
| Long-running processes | No | Yes |
| Websockets | Limited | Yes |
| Object storage | Vercel Blob (expensive) | MinIO (S3-compatible, cheap) |
| Background jobs | Cron only (60s limit) | Trigger.dev (unlimited duration) |
| Database | Third-party only | Included |
| Pricing model | Per-request / per-GB | Flat rate |
| Vendor lock-in | High | None (standard Docker) |

---

## Tech Stack

- **Runtime:** Docker containers on bare metal
- **Orchestration:** [Coolify](https://coolify.io)
- **Proxy:** Traefik + Cloudflare (SSL, DDoS protection)
- **Storage:** MinIO (S3-compatible)
- **Jobs:** [Trigger.dev](https://trigger.dev) (self-hosted)
- **CI/CD:** GitHub Actions → GHCR → auto-deploy

---

*Built by [Sylphx](https://sylphx.com)*
