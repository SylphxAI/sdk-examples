/**
 * Jobs Example — @sylphx/sdk
 *
 * Background jobs and cron scheduling.
 * No timeouts. Reliable execution. Built-in retries.
 *
 * Docs: https://sylphx.com/docs/jobs
 */

import {
  createConfig,
  scheduleJob,
  createCron,
  cancelJob,
  getJobStatus,
} from "@sylphx/sdk";

const config = createConfig({
  secretKey: process.env.SYLPHX_APP_SECRET!,
});

// ──────────────────────────────────────────────
// Schedule a one-time background job
// ──────────────────────────────────────────────

async function sendWelcomeEmail(userId: string) {
  const job = await scheduleJob(config, {
    type: "send-welcome-email",
    payload: { userId },
    // runAt: new Date(Date.now() + 60_000), // delay 1 minute (optional)
    // retries: 3,                           // max retry count (optional)
  });

  console.log("Scheduled job:", job.id);
  return job;
}

// ──────────────────────────────────────────────
// Check job status
// ──────────────────────────────────────────────

async function checkStatus(jobId: string) {
  const status = await getJobStatus(config, { jobId });
  console.log("Status:", status.state); // 'queued' | 'running' | 'completed' | 'failed'
  return status;
}

// ──────────────────────────────────────────────
// Cancel a scheduled job
// ──────────────────────────────────────────────

async function cancel(jobId: string) {
  await cancelJob(config, { jobId });
  console.log("Cancelled:", jobId);
}

// ──────────────────────────────────────────────
// Create a recurring cron job
// ──────────────────────────────────────────────

async function createWeeklyReport() {
  const cron = await createCron(config, {
    type: "weekly-report",
    schedule: "0 9 * * MON", // every Monday at 9am UTC
    payload: { reportType: "weekly" },
    timezone: "UTC",
  });

  console.log("Created cron:", cron.id);
  return cron;
}

// ──────────────────────────────────────────────
// Job handler (register on your server)
// ──────────────────────────────────────────────

// In your API route or server file:
//
// import { createJobHandler } from '@sylphx/sdk/server'
//
// export const { handler } = createJobHandler({
//   'send-welcome-email': async (payload) => {
//     await sendEmail({ to: payload.userId, template: 'welcome' })
//   },
//
//   'weekly-report': async (payload) => {
//     const report = await generateReport(payload.reportType)
//     await emailReport(report)
//   },
// })
