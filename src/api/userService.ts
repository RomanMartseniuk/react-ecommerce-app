import type { Category } from "../types/Category";
import type { User } from "../types/User";
import { tokenStorage } from "../utils/tokenStorage";
import { api } from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export const userService = {
  async getUser(id: number): Promise<Category[]> {
    const response = await api.get<Category[]>(`users/${id}`);
    return response.data;
  },

  async login(payload: LoginPayload): Promise<User> {
    const { data } = await api.post<AuthResponse>("auth/login", payload);

    tokenStorage.setAccessToken(data.access_token);
    tokenStorage.setRefreshToken(data.refresh_token);

    return this.getProfile();
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>("auth/profile");
    return data;
  },

  async refreshToken(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await api.post<AuthResponse>("auth/refresh-token", {
      refreshToken,
    });

    tokenStorage.setAccessToken(data.access_token);
    tokenStorage.setRefreshToken(data.refresh_token);
  },

  logout() {
    tokenStorage.clear();
  },

  isAuthenticated(): boolean {
    return Boolean(tokenStorage.getAccessToken());
  },
};