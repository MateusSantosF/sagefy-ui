import { env } from "@/configs/env";
import { TToken } from "@shared/interfaces/TToken";
import { decodeJwt } from "@shared/utils/decode-jwt";
import { NextRequest, NextResponse } from "next/server";
import { renewSessionTokens} from "@modules/auth/actions/renewSessionTokens";
import { clearCookies } from "@modules/auth/actions/clearCookies";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  const token = request.cookies.get(env.api.access_token)?.value;
  const refreshToken = request.cookies.get(env.api.refresh_token)?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    console.log("Token expired, but refresh token is valid. Renewing tokens...");
    await renewSessionTokens()
    return NextResponse.next();
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
  const isTokenExpired = decodedToken.exp * 1000 < now;
  const isRefreshTokenExpired = decodedRefreshToken.exp * 1000 < now;

  if(isTokenExpired && !isRefreshTokenExpired) {
    console.log("Token expired, but refresh token is valid. Renewing tokens...");
    await renewSessionTokens()
    return NextResponse.next();
  }

  if (isRefreshTokenExpired) {
    console.error("Token expired");
    clearCookies();
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/classes/:path*", "/dashboard/:path*", "/chat/:path*", "/teachers/:path*"],
};
