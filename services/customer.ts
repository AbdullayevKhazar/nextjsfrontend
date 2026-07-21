import { CreateCustomerDto, Location } from "@/types/customer";
import { api } from "./api";
import { CreateCustomerSchema } from "@/lib/validations/customer";
import { normalizeAzerbaijaniPhone } from "@/lib/phone";
export async function getCustomers(params: {
  search?: string;
  location?: string;
  overdue?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const { data } = await api.get("/customers", {
    params,
  });

  return data.data;
}

export async function getLocations() {
  const { data } = await api.get("/customers/locations");

  return data.data as Location[];
}

export async function createCustomer(dto: CreateCustomerDto) {
  const { data } = await api.post("/customers", {
    ...dto,
    phone: normalizeAzerbaijaniPhone(dto.phone),
  });

  return data.data;
}
export async function deleteCustomer(id: string) {
  const { data } = await api.delete(`/customers/${id}`);

  return data.data;
}

export async function getCustomer(id: string) {
  const { data } = await api.get(`/customers/${id}`);

  return data.data;
}

export async function updateCustomer(id: string, body: CreateCustomerSchema) {
  const { data } = await api.patch(`/customers/${id}`, {
    ...body,
    phone: normalizeAzerbaijaniPhone(body.phone),
  });

  return data.data;
}
