import { api } from "./api";

export async function sendFirstReminder(customerId: string) {
  const { data } = await api.post(`/reminders/send-first/${customerId}`);
  return data;
}

export async function getReminderLogs(customerId: string) {
  const { data } = await api.get(`/reminders/logs/${customerId}`);
  return data.data as import("@/types/customer").ReminderLog[];
}

export async function updateReminderSettings(
  customerId: string,
  reminderEnabled: boolean,
) {
  const { data } = await api.patch(`/customers/${customerId}/reminder-settings`, {
    reminderEnabled,
  });
  return data.data;
}
