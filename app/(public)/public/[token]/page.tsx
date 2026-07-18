"use client";

import { useParams } from "next/navigation";

import CustomerInfoCard from "@/components/customers/CustomerInfoCard";
import CustomerBalanceCard from "@/components/customers/CustomerBalanceCard";
import TransactionCard from "@/components/customers/TransactionCard";
import EmptyTransactions from "@/components/customers/EmptyTransactions";
import CustomerInfoCardSkeleton from "@/components/customers/CustomerInfoCardSkeleton";
import CustomerBalanceCardSkeleton from "@/components/customers/CustomerBalanceCardSkeleton";
import TransactionCardSkeleton from "@/components/customers/TransactionCardSkeleton";

import { usePublicCustomer } from "@/hooks/use-public-customer";

export default function PublicCustomerPage() {
  const params = useParams();
  const token = params.token as string;

  const { data, isLoading, isError } = usePublicCustomer(token);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] pb-10">
        <CustomerBalanceCardSkeleton />
        <CustomerInfoCardSkeleton />
        <div className="mx-auto max-w-md px-5 pt-6">
          <h2 className="mb-4 text-lg font-bold">Transactions</h2>
          <div className="space-y-3">
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
        <p className="text-sm text-zinc-500">
          Customer not found or link expired.
        </p>
      </main>
    );
  }

  const customer = data.customer;
  const transactions = data.transactions ?? [];

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-10">
      <CustomerBalanceCard balance={customer.balance} />

      <CustomerInfoCard
        fullName={customer.fullName}
        phone={customer.phone}
        location={customer.location}
        publicToken={token}
        readonly
      />

      <div className="mx-auto max-w-md px-5 pt-6">
        <h2 className="mb-4 text-lg font-bold">Transactions</h2>

        {transactions.length === 0 ? (
          <EmptyTransactions />
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction: any) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
