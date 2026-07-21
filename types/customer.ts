export interface Customer {
  _id: string;
  fullName: string;
  phone: string;
  location: string;
  note: string | null;

  balance: number;
  totalDebt: number;
  totalPaid: number;

  overdue: boolean;
  isPublic: boolean;
  isDeleted: boolean;

  publicToken: string;

  lastTransactionAt: string | null;
  lastPaymentAt: string | null;

  reminderEnabled: boolean;
  lastReminderSentAt: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CustomerSummary {
  totalDebt: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CustomersResponse {
  summary: CustomerSummary;
  items: Customer[];
  meta: PaginationMeta;
}

export interface Location {
  name: string;
  count: number;
}

export type CustomerSort =
  | "created_desc"
  | "created_asc"
  | "name_asc"
  | "name_desc"
  | "balance_desc"
  | "balance_asc";

export interface CustomerFilters {
  search: string;
  location: string;
  sort: CustomerSort;
  page: number;
  limit: number;
}

export interface CreateCustomerDto {
  fullName: string;
  phone: string;
  location?: string;
  note?: string;
}

export interface CustomerDetailsResponse {
  customer: Customer;
  transactions: Transaction[];
}

export interface Transaction {
  _id: string;

  type: "debt" | "payment";

  amount: number;

  note?: string;

  createdAt: string;
}

export type TransactionType = "debt" | "payment";

export interface CreateTransactionDto {
  customerId: string;
  type: TransactionType;
  amount: number;
  date: string;
  note?: string;
}

export interface ReminderLog {
  _id: string;
  customerId: string;
  status: "sent" | "failed" | "skipped";
  providerResponse: string | null;
  error: string | null;
  messageContent: string | null;
  isFirstReminder: boolean;
  createdAt: string;
  updatedAt: string;
}
