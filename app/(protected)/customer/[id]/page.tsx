"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import CustomerHeader from "@/components/customers/CustomerHeader";
import CustomerInfoCard from "@/components/customers/CustomerInfoCard";
import CustomerBalanceCard from "@/components/customers/CustomerBalanceCard";
import CustomerActions from "@/components/customers/CustomerAction";
import TransactionList from "@/components/customers/TransactionList";
import TransactionModal from "@/components/customers/TransactionModal";
import UpdateCustomerSheet from "@/components/customers/UpdateCustomerSheet";
import DeleteCustomerModal from "@/components/customers/DeleteCustomerModal";
import CustomerInfoCardSkeleton from "@/components/customers/CustomerInfoCardSkeleton";
import CustomerBalanceCardSkeleton from "@/components/customers/CustomerBalanceCardSkeleton";
import TransactionCardSkeleton from "@/components/customers/TransactionCardSkeleton";
import EmptyTransactions from "@/components/customers/EmptyTransactions";

import { useCustomer } from "@/hooks/use-customer";
import { Transaction } from "@/types/customer";

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: customer, isLoading: isCustomerLoading } = useCustomer(id);

  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState<{
    open: boolean;
    type: "debt" | "payment";
    transaction?: Transaction;
  }>({ open: false, type: "debt" });

  if (isCustomerLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] pb-28">
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
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
        <p className="text-sm text-zinc-500">Customer not found.</p>
      </main>
    );
  }

  const customerData = customer?.customer;
  const transactions = customer?.transactions ?? [];

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-28">
      <CustomerHeader
        rightSlot={
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditSheet(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition hover:bg-zinc-200"
            >
              <svg
                className="h-5 w-5 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 transition hover:bg-red-100"
            >
              <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
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
      />

      <div className="mx-auto max-w-md px-5 pt-6">
        <CustomerActions
          onBorrow={() =>
            setTransactionModal({ open: true, type: "debt" })
          }
          onPayment={() =>
            setTransactionModal({ open: true, type: "payment" })
          }
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
            onRefresh={() => {}}
          />
        )}
      </div>

      <TransactionModal
        open={transactionModal.open}
        onClose={() =>
          setTransactionModal({ open: false, type: "debt" })
        }
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
      />
    </main>
  );
}
