import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { env } from "@/configs/env";
import { TToken } from "../interfaces/TToken";
import { decodeJwt } from "./decode-jwt";

export const buildCookie = {
	accessToken: (accessToken: string): ResponseCookie => {
		const { exp: accessTokenExp } = decodeJwt<TToken>(accessToken);

		return {
			name: env.api.access_token,
			value: accessToken,
			path: "/",
			secure: true,
			sameSite: "none",
			expires: new Date(accessTokenExp),
			maxAge: 1000 * 60 * 60, // 1 hour
			domain: env.app.environment === "development" ? "localhost" : env.app.cookie_domain,
		};
	},
	refreshToken: (refreshToken: string): ResponseCookie => {
		const { exp: refreshTokenExp } = decodeJwt<TToken>(refreshToken);

		return {
			name: env.api.refresh_token,
			value: refreshToken,

			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: "none",
			expires: new Date(refreshTokenExp),
			maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
			domain: env.app.environment === "development" ? "localhost" : env.app.cookie_domain,
		};
	},
};
