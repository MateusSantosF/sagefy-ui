"use server";

import { buildCookie } from "@shared/utils/build-cookies";
import { cookies } from "next/headers";
import { env } from "@/configs/env";

export async function renewSessionTokens() {
  try {
    const parsedCookies = await cookies();
    const rtCookie = parsedCookies.get(env.api.refresh_token);
    if (!rtCookie?.value) throw new Error("refresh token not found");

    const res = await fetch(`${env.api.base_url}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: rtCookie.value }),
    });
    const data = await res.json();

    const { accessToken, refreshToken } = data;
    parsedCookies.set(buildCookie.accessToken(accessToken));
    parsedCookies.set(buildCookie.refreshToken(refreshToken));
  } catch (err) {
    console.error(`[Erro ao renovar tokens]: ${err}`);
    throw new Error("Erro ao fazer login");
  }
}
