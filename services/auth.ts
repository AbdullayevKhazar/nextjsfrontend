import type { ApiResponse } from "@/types/api";
import type { LoginDto, RegisterDto } from "@/types/auth";
import { api } from "./api";
import { setTokens, removeTokens } from "@/lib/cookies";

interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const login = async (body: LoginDto) => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    body,
  );

  const authData = data.data;
  if (authData.accessToken && authData.refreshToken) {
    setTokens(authData.accessToken, authData.refreshToken);
  }

  return authData;
};

export const register = async (body: RegisterDto) => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    body,
  );

  const authData = data.data;
  if (authData.accessToken && authData.refreshToken) {
    setTokens(authData.accessToken, authData.refreshToken);
  }

  return authData;
};

export async function logout() {
  await api.post("/auth/logout");
  removeTokens();
}

export async function me() {
  const { data } = await api.get("/auth/me");

  return data.data;
}

export const refresh = async () => {
  await api.post("/auth/refresh");
};
