"use server";

import { cookies } from "next/headers";
import { env } from "@/configs/env";

export async function clearCookies() {
  try {
    const parsedCookies = await cookies();
    parsedCookies.delete(env.api.access_token);
    parsedCookies.delete(env.api.refresh_token);
  } catch (err) {
    console.error(`[Erro ao excluir tokens]: ${err}`);
    throw new Error("[Erro ao excluir tokens");
  }
}
