import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import i18n from "@/i18n/client";
import { exportBackup, importBackup } from "@/services/backup";

export function useExportBackup() {
  return useMutation({
    mutationFn: exportBackup,

    onSuccess: () => {
      toast.success(i18n.t("backupExportedSuccess", { ns: "settings" }));
    },

    onError: () => {
      toast.error(i18n.t("backupExportFailed", { ns: "settings" }));
    },
  });
}

export function useImportBackup() {
  return useMutation({
    mutationFn: importBackup,

    onSuccess: () => {
      toast.success(i18n.t("backupImportedSuccess", { ns: "settings" }));
    },

    onError: () => {
      toast.error(i18n.t("backupImportFailed", { ns: "settings" }));
    },
  });
}
