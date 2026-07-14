import { CreateTransactionDto } from "@/types/customer";
import { api } from "./api";

export interface TransactionsQuery {
  page?: number;
  limit?: number;
  customerId?: string;
  type?: "debt" | "payment";
}

export interface TransactionGroupItem {
  _id: string;
  fullName: string;
  phone: string;
  balance: number;
  hasDebt: boolean;
  transactions: {
    _id: string;
    type: "debt" | "payment";
    amount: number;
    note: string;
    date: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface TransactionsResponse {
  items: TransactionGroupItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TransactionDetail {
  _id: string;
  type: "debt" | "payment";
  amount: number;
  note: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  customerId: {
    _id: string;
    fullName: string;
    phone: string;
    balance: number;
  };
}

export async function getTransactions(query: TransactionsQuery) {
  const { data } = await api.get("/transactions", { params: query });
  return data.data as TransactionsResponse;
}

export async function getTransaction(id: string) {
  const { data } = await api.get(`/transactions/${id}`);
  return data.data as TransactionDetail;
}

export async function createTransaction(payload: CreateTransactionDto) {
  const { data } = await api.post("/transactions", payload);
  return data.data;
}

export async function updateTransaction(
  id: string,
  payload: Partial<CreateTransactionDto>,
) {
  const { data } = await api.patch(`/transactions/${id}`, payload);
  return data.data;
}

export async function deleteTransaction(id: string) {
  const { data } = await api.delete(`/transactions/${id}`);
  return data.data;
}
