"use server";

import { api } from "@/configs/axios";
import { buildCookie } from "@shared/utils/build-cookies";
import { cookies } from "next/headers";
import { AuthRequest, AuthResponse } from "../interfaces/AuthRequest";

export async function staftAuth(dto: AuthRequest) {
  try {
    const parsedCookies = await cookies();

    const response = await api.post<AuthResponse>("/authenticate/managers", dto);

    const { accessToken, refreshToken } = response.data;
    parsedCookies.set(buildCookie.accessToken(accessToken));
    parsedCookies.set(buildCookie.refreshToken(refreshToken));
  } catch (err) {
    console.log(err);
  }
}
