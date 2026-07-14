import { api } from "./api";

export interface OverviewResponse {
  totalDebt: number;
  totalBorrowed: number;
  totalPaid: number;
  customerCount: number;
  debtCustomerCount: number;
  todayDebt: number;
  todayPayment: number;
  monthDebt: number;
  monthPayment: number;
}

export interface ReportSummary {
  debt: number;
  payment: number;
  balance: number;
  transactionCount: number;
  customerCount: number;
}

export interface ReportCustomer {
  customerId: string;
  customer: {
    _id: string;
    fullName: string;
    phone: string;
    location: string;
    note: string;
    balance: number;
    totalDebt: number;
    totalPaid: number;
  };
  transactions: ReportTransaction[];
}

export interface ReportTransaction {
  _id: string;
  type: "debt" | "payment";
  amount: number;
  note: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportsResponse {
  from: string;
  to: string;
  summary: ReportSummary;
  customers: ReportCustomer[];
}

export async function getOverview(params: { from?: string; to?: string }) {
  const { data } = await api.get("/reports/overview", { params });

  return data.data as OverviewResponse;
}

export async function getReports(params: { from?: string; to?: string }) {
  const { data } = await api.get("/reports/report", { params });

  return data.data as ReportsResponse;
}
