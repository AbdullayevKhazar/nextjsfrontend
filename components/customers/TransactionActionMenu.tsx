"use client";

import { useEffect } from "react";
import { Transaction } from "@/types/customer";

interface Props {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  isDeleting?: boolean;
}

export default function TransactionActionMenu({
  transaction,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  isDeleting = false,
}: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Transaction actions"
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900">Transaction</h3>
          <button
            onClick={onClose}
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              onEdit(transaction);
              onClose();
            }}
            className="flex w-full min-h-[52px] items-center gap-4 rounded-2xl bg-zinc-50 p-5 text-left transition-colors hover:bg-zinc-100 active:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
            role="menuitem"
            aria-label="Edit transaction"
          >
            <div className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Edit</p>
              <p className="text-sm text-zinc-500">Modify transaction details</p>
            </div>
          </button>

          <button
            onClick={() => {
              onDelete(transaction);
              onClose();
            }}
            disabled={isDeleting}
            className="flex w-full min-h-[52px] items-center gap-4 rounded-2xl bg-red-50 p-5 text-left transition-colors hover:bg-red-100 active:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            role="menuitem"
            aria-label="Delete transaction"
          >
            <div className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-red-100 text-red-600">
              {isDeleting ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="font-medium text-red-900">
                {isDeleting ? "Deleting..." : "Delete"}
              </p>
              <p className="text-sm text-red-600">Remove this transaction</p>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full min-h-[52px] rounded-2xl bg-zinc-100 py-4 font-semibold text-zinc-700 transition-colors hover:bg-zinc-200 active:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
          role="menuitem"
          aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
