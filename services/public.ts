import { api } from "./api";

export async function getPublicCustomer(token: string) {
  const { data } = await api.get(`/public/customer/${token}`);

  return data.data;
}
