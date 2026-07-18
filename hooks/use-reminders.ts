import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendFirstReminder, getReminderLogs, updateReminderSettings } from "@/services/reminder";

export function useSendFirstReminder(customerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sendFirstReminder(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
      queryClient.invalidateQueries({ queryKey: ["reminder-logs", customerId] });
    },
  });
}

export function useReminderLogs(customerId: string) {
  return useQuery({
    queryKey: ["reminder-logs", customerId],
    queryFn: () => getReminderLogs(customerId),
    enabled: !!customerId,
  });
}

export function useUpdateReminderSettings(customerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reminderEnabled: boolean) =>
      updateReminderSettings(customerId, reminderEnabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
    },
  });
}
