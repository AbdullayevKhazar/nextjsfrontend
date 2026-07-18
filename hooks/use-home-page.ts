"use client";

import { useState, useCallback } from "react";
import { useCustomers } from "./use-customers";
import { useCustomerFilters } from "./use-customer-filters";
import { useLocations } from "./use-locations";
import { useDeleteCustomer } from "./use-delete-customer";
import { useAuth } from "./use-auth";
import { CustomerFilters } from "@/types/customer";

export function useHomePage() {
  const { user } = useAuth();

  const {
    filters,
    search,
    setSearch,
    location,
    setLocation,
    sort,
    setSort,
    overdue,
    setOverdue,
    page,
    setPage,
  } = useCustomerFilters();

  const { data, isLoading, isFetching, isError, error } =
    useCustomers(filters as CustomerFilters);

  const { data: locationsData } = useLocations();

  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);

  const customers = data?.items ?? [];
  const summary = data?.summary;
  const meta = data?.meta;

  const hasMore = meta ? page < meta.totalPages : false;

  const activeFilterCount = [
    sort !== "created_desc",
    overdue === true,
  ].filter(Boolean).length;

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isFetching, setPage]);

  const handleDeleteRequest = useCallback((id: string) => {
    setDeleteCustomerId(id);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteCustomerId) {
      deleteCustomer(deleteCustomerId);
      setDeleteCustomerId(null);
    }
  }, [deleteCustomerId, deleteCustomer]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteCustomerId(null);
  }, []);

  const handleLocationChange = useCallback(
    (value: string) => {
      setLocation(value);
      setPage(1);
    },
    [setLocation, setPage]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      setPage(1);
    },
    [setSearch, setPage]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setSort(value);
      setPage(1);
    },
    [setSort, setPage]
  );

  const handleOverdueChange = useCallback(
    (value: boolean | undefined) => {
      setOverdue(value);
      setPage(1);
    },
    [setOverdue, setPage]
  );

  return {
    // User
    user,

    // Customers data
    customers,
    summary,
    meta,
    isLoading,
    isFetching,
    isError,
    error,

    // Locations
    locations: locationsData ?? [],

    // Filters
    search,
    location,
    sort,
    overdue,
    activeFilterCount,

    // Pagination
    page,
    hasMore,
    handleLoadMore,

    // Actions
    handleSearchChange,
    handleLocationChange,
    handleSortChange,
    handleOverdueChange,

    // Add sheet
    showAddSheet,
    setShowAddSheet,

    // Filter sheet
    showFilterSheet,
    setShowFilterSheet,

    // Delete
    deleteCustomerId,
    isDeleting,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}
