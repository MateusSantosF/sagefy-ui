import { env } from "@/configs/env";
import { TToken } from "@shared/interfaces/TToken";
import { decodeJwt } from "@shared/utils/decode-jwt";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware: ", request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  const token = request.cookies.get(env.api.access_token)?.value;
  const refreshToken = request.cookies.get(env.api.refresh_token)?.value;

  // Se faltar qualquer token, redireciona para a página de login
  if (!token || !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  let decodedToken;
  let decodedRefreshToken;

  try {
    decodedToken = decodeJwt<TToken>(token);
    decodedRefreshToken = decodeJwt<TToken>(refreshToken);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  const now = Date.now();
  // Verifica se os tokens estão expirados (supondo que a propriedade "exp" esteja em segundos)
  if (
    !decodedToken ||
    now > decodedToken.exp * 1000 ||
    !decodedRefreshToken ||
    now > decodedRefreshToken.exp * 1000
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/classes/:path*', '/dashboard/:path*', "/chat/:path*"],
}