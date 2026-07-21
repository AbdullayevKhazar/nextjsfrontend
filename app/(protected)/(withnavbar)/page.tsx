"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import AddCustomerSheet from "@/components/customers/AddCustomerSheet";
import DeleteCustomerModal from "@/components/customers/DeleteCustomerModal";

import CustomerCard from "@/components/home/CustomerCard";
import FilterButton from "@/components/home/FilterButton";
import FilterSheet from "@/components/home/FilterSheet";
import LocationPills from "@/components/home/LocationPills";
import SearchInput from "@/components/home/SearchInput";
import TotalDebtCard from "@/components/home/TotalDebtCard";

import { FloatingButton } from "@/components/shared/FloatingButton";

import { useCustomers } from "@/hooks/use-customers";
import { useCustomerFilters } from "@/hooks/use-customer-filters";
import { useLocations } from "@/hooks/use-locations";

import type { Customer, CustomerFilters, CustomerSort } from "@/types/customer";

export default function Home() {
  const { t } = useTranslation(["customers", "auth"]);
  const [addOpen, setAddOpen] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const {
    filters,

    search,
    setSearch,

    location,
    setLocation,

    sort,
    setSort,

  } = useCustomerFilters();

  const { data, isLoading, isFetching } = useCustomers(
    filters as CustomerFilters,
  );

  const { data: locations } = useLocations();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        {t("loading", { ns: "auth" })}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5 px-5 pb-[200px] pt-6">
        <TotalDebtCard amount={data?.summary.totalDebt ?? 0} />

        <div className="flex items-center gap-3">
          <SearchInput value={search} onChange={setSearch} />

          <FilterButton onClick={() => setFilterOpen(true)} />
        </div>

        <LocationPills
          selected={location}
          onChange={setLocation}
          locations={locations ?? []}
        />

        {isFetching && (
          <p className="text-xs text-zinc-400">
            {t("searching", { ns: "customers" })}
          </p>
        )}

        <div className="flex flex-col gap-3">
          {data?.items.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-400">
              {t("noCustomersMessage", { ns: "customers" })}
            </p>
          ) : (
            data?.items.map((customer: Customer) => (
              <CustomerCard
                key={customer._id}
                id={customer._id}
                fullName={customer.fullName}
                location={customer.location}
                balance={customer.balance}
                onDelete={() => {
                  setSelectedCustomer(customer);
                  setDeleteOpen(true);
                }}
                overdue={customer.overdue}
              />
            ))
          )}
        </div>
      </section>

      <FloatingButton onClick={() => setAddOpen(true)} />

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        sort={sort as CustomerSort}
        onSortChange={setSort}
      />

      <AddCustomerSheet open={addOpen} onClose={() => setAddOpen(false)} />

      <DeleteCustomerModal
        open={deleteOpen}
        customerId={selectedCustomer?._id ?? null}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCustomer(null);
        }}
      />
    </main>
  );
}
