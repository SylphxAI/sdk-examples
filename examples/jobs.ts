// Trigger.dev background jobs — no timeouts, durable execution
import { task, schedules } from "@trigger.dev/sdk/v3";

// One-off background task
export const processOrder = task({
  id: "process-order",
  run: async (payload: { orderId: string }) => {
    // runs reliably in background — no 60s Vercel limit
    await sendConfirmationEmail(payload.orderId);
    await updateInventory(payload.orderId);
  },
});

// Scheduled cron job
export const dailyReport = schedules.task({
  id: "daily-report",
  cron: "0 9 * * *",  // every day at 9am UTC
  run: async () => {
    await generateAndSendDailyReport();
  },
});

// Trigger from your app:
// await processOrder.trigger({ orderId: "123" });
