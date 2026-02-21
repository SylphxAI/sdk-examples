# Sylphx Platform

**19 production services + deployment. One TypeScript SDK.**

Replace Vercel, Supabase, Clerk, Firebase — and 6 more tools — with a single platform. Get auth, database, AI, billing, analytics, and CI/CD deployment out of the box.

🌐 **[sylphx.com](https://sylphx.com)** · 📖 **[docs](https://sylphx.com/docs)** · 🚀 **[get started free](https://sylphx.com/sign-up)**

---

## Quick Start

```bash
npx create-sylphx-app my-saas
cd my-saas
# Fill in your credentials from https://sylphx.com/dashboard
cp .env.example .env.local
npm run dev
```

Or add to an existing project:

```bash
npm install @sylphx/sdk
```

```typescript
import { createConfig, track, signIn, getPlans } from '@sylphx/sdk'

const config = createConfig({
  secretKey: process.env.SYLPHX_APP_SECRET!,
})

// Analytics
await track(config, { event: 'signup' })

// Auth
const session = await signIn(config, { email, password })

// Billing
const plans = await getPlans(config)
```

---

## 19 Production Services

| Service | What it replaces |
|---------|-----------------|
| 🤖 **AI Gateway** (200+ models) | OpenAI API, Anthropic |
| 🗄️ **Database** (Postgres) | Supabase, Neon, PlanetScale |
| 📦 **Storage** (S3-compatible) | AWS S3, Vercel Blob |
| 🔐 **Auth** (OAuth, magic links, 2FA) | Clerk, Auth0 |
| 📧 **Email** (transactional + newsletters) | Resend, Mailchimp |
| ⚡ **Background Jobs + Cron** | Trigger.dev, Inngest |
| 💳 **Billing** (subscriptions) | Stripe (we integrate it) |
| 📊 **Analytics** (events, funnels) | Mixpanel, PostHog |
| 🔔 **Push Notifications** | OneSignal, Firebase FCM |
| 🔗 **Webhooks** | Svix, webhook.site |
| 🔭 **Monitoring** (errors + perf) | Sentry, Datadog |
| 🚩 **Feature Flags** | LaunchDarkly, Unleash |
| 🍪 **Consent Management** | Cookiebot, OneTrust |
| 🎯 **Referrals** | ReferralHero, Viral Loops |
| 🏆 **Engagement** (streaks, achievements) | Custom builds |
| 🔍 **Search** (full-text + semantic) | Algolia, Typesense |
| 🗃️ **Key-Value Store** | Upstash, Redis Cloud |
| ⚡ **Realtime** (pub/sub) | Pusher, Ably |
| 🚀 **Deploy** (CI/CD, hosting) | Vercel, Railway, Render |

---

## Deployment

Every app deployed on Sylphx gets:

- **Automatic deploys** on every push to `main`
- **Preview deployments** for pull requests
- **Zero cold starts** — always-on containers
- **Custom domains** with automatic SSL
- **Rollbacks** with one click
- **Build logs** and deployment history

### Connect Your Repo

1. Sign up at [sylphx.com](https://sylphx.com/sign-up)
2. Create an app in the console
3. Connect your GitHub repo
4. Push to deploy

### Bring Your Own CI (Advanced)

If you have an existing CI pipeline, use the GitHub Actions workflow from [`examples/`](./examples):

```yaml
# .github/workflows/deploy.yml
name: Deploy to Sylphx
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Sylphx
        run: |
          curl -X POST "https://sylphx.com/api/v1/deploy" \
            -H "Authorization: Bearer ${{ secrets.SYLPHX_APP_SECRET }}" \
            -H "Content-Type: application/json" \
            -d '{"ref": "${{ github.sha }}"}'
```

---

## Why Sylphx?

| | Vercel + Supabase + Clerk | Sylphx |
|--|--------------------------|--------|
| Vendors to manage | 3–10 | **1** |
| SDKs to learn | 3–10 | **1** |
| Dashboards | 3–10 | **1** |
| Monthly baseline cost | $100–600+ | **Pay per use** |
| Type safety across services | No | **100% TypeScript** |
| Self-host option | No | **Yes** |

---

## Pricing

Usage-based pricing. Generous free tiers. No cold starts. No idle fees.

→ [Full pricing breakdown](https://sylphx.com/pricing)

---

## Documentation

- [Getting Started](https://sylphx.com/docs/quickstart)
- [SDK Reference](https://sylphx.com/docs/api-reference)
- [All Services](https://sylphx.com/services)
- [Comparisons](https://sylphx.com/alternatives)

---

*Built by [Sylphx](https://sylphx.com) · [kyle@sylphx.com](mailto:kyle@sylphx.com)*
