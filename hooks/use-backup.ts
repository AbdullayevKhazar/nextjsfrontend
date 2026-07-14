import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { exportBackup, importBackup } from "@/services/backup";

export function useExportBackup() {
  return useMutation({
    mutationFn: exportBackup,

    onSuccess: () => {
      toast.success("Backup exported successfully.");
    },

    onError: () => {
      toast.error("Failed to export backup.");
    },
  });
}

export function useImportBackup() {
  return useMutation({
    mutationFn: importBackup,

    onSuccess: () => {
      toast.success("Backup imported successfully.");
    },

    onError: () => {
      toast.error("Failed to import backup.");
    },
  });
}
