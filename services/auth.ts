import type { ApiResponse } from "@/types/api";
import type { LoginDto } from "@/types/auth";
import { api } from "./api";

interface LoginResponse {
  id: string;
  fullName: string;
  email: string;
}

export const login = async (body: LoginDto) => {
  const { data } = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    body,
  );

  return data.data;
};

export async function logout() {
  await api.post("/auth/logout");
}

export async function me() {
  const { data } = await api.get("/auth/me");

  return data.data;
}
export const refresh = async () => {
  await api.post("/auth/refresh");
};
