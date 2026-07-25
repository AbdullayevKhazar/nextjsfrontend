"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useCustomer } from "@/hooks/use-customer";

import { Transaction } from "@/types/customer";
import {
  CustomerBalanceCard,
  CustomerBalanceCardSkeleton,
  CustomerHeader,
  CustomerInfoCard,
  CustomerInfoCardSkeleton,
  DeleteCustomerModal,
  EmptyTransactions,
  TransactionCardSkeleton,
  TransactionList,
  TransactionModal,
  UpdateCustomerSheet,
} from "@/components/customers";
import CustomerActions from "@/components/customers/CustomerAction";
import { Delete, Edit, Trash } from "lucide-react";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: customer,
    isLoading: isCustomerLoading,
    refetch,
  } = useCustomer(id);

  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState<{
    open: boolean;
    type: "debt" | "payment";
    transaction?: Transaction;
  }>({ open: false, type: "debt" });

  if (isCustomerLoading) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-28">
        <CustomerHeader />
        <CustomerBalanceCardSkeleton />
        <CustomerInfoCardSkeleton />
        <div className="mx-auto max-w-md px-5 pt-6">
          <h2 className="mb-4 text-lg font-bold">Transactions</h2>
          <div className="space-y-3">
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
          </div>
        </div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">Customer not found.</p>
      </main>
    );
  }

  const customerData = customer?.customer;
  const transactions = customer?.transactions ?? [];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-28 px-3">
      <CustomerHeader
        rightSlot={
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditSheet(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 transition hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 transition hover:bg-red-100 dark:hover:bg-red-500/20"
            >
              <Trash size={14} />
            </button>
          </div>
        }
      />

      <CustomerBalanceCard balance={customerData?.balance ?? 0} />

      <CustomerInfoCard
        fullName={customerData?.fullName ?? ""}
        phone={customerData?.phone ?? ""}
        location={customerData?.location}
        publicToken={customerData?.publicToken ?? ""}
        lastReminderSentAt={customerData?.lastReminderSentAt ?? null}
      />

      <div className="mx-auto max-w-md px-5 pt-6">
        <CustomerActions
          onBorrow={() => setTransactionModal({ open: true, type: "debt" })}
          onPayment={() => setTransactionModal({ open: true, type: "payment" })}
        />
      </div>

      <div className="mx-auto max-w-md px-5 pt-6">
        {transactions.length === 0 ? (
          <EmptyTransactions />
        ) : (
          <TransactionList
            transactions={transactions}
            onEdit={(tx) =>
              setTransactionModal({
                open: true,
                type: tx.type,
                transaction: tx,
              })
            }
            onRefresh={refetch}
          />
        )}
      </div>

      <TransactionModal
        open={transactionModal.open}
        onClose={() => setTransactionModal({ open: false, type: "debt" })}
        type={transactionModal.type}
        customerId={id}
        transaction={transactionModal.transaction}
      />

      <UpdateCustomerSheet
        open={showEditSheet}
        onClose={() => setShowEditSheet(false)}
        customer={customer.customer}
      />

      <DeleteCustomerModal
        open={showDeleteModal}
        customerId={id}
        onClose={() => setShowDeleteModal(false)}
        onSuccess={() => router.replace("/")}
      />
    </main>
  );
}
