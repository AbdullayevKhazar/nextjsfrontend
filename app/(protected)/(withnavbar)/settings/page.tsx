"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Download, Upload } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { useExportBackup, useImportBackup } from "@/hooks/use-backup";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { mutate: exportBackup, isPending: isExporting } = useExportBackup();
  const { mutate: importBackup, isPending: isImporting } = useImportBackup();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    try {
      await import("@/services/auth").then((m) => m.logout());
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      toast.error("Please select a JSON backup file");
      return;
    }

    importBackup(file, {
      onSuccess: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-28">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5 px-5 pt-6">
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>

        {isAuthenticated && user && (
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-zinc-100">
            <p className="text-sm font-medium text-zinc-500">Signed in as</p>
            <p className="mt-1 text-lg font-semibold text-zinc-900">
              {user.fullName}
            </p>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
        )}

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
            Backup
          </h2>

          <button
            onClick={() => exportBackup()}
            disabled={isExporting}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-zinc-100 transition active:scale-[0.98] disabled:opacity-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Download size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-900">
                {isExporting ? "Exporting..." : "Export Backup"}
              </p>
              <p className="text-xs text-zinc-500">
                Download all your data as JSON
              </p>
            </div>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-zinc-100 transition active:scale-[0.98] disabled:opacity-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Upload size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-900">
                {isImporting ? "Importing..." : "Import Backup"}
              </p>
              <p className="text-xs text-zinc-500">
                Restore data from a JSON file
              </p>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="space-y-3 pt-4">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
            Account
          </h2>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-zinc-100 transition active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
              <LogOut size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-900">Logout</p>
              <p className="text-xs text-zinc-500">Sign out of your account</p>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}
