import { api } from "./api";

export async function exportBackup() {
  const response = await api.get("/backup/export", {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  const date = new Date().toISOString().split("T")[0];
  link.href = url;
  link.download = `borc-defteri-backup-${date}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return response.data;
}

export async function importBackup(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/backup/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
}
