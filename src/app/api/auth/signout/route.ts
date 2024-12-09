import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/configs/env";


export async function POST() {
	try {
		const parsedCookies = await cookies();
		parsedCookies.delete(env.api.access_token);
		parsedCookies.delete(env.api.refresh_token);

		return NextResponse.json({ ok: true });
	} catch (err: unknown) {
		return NextResponse.json({ error: "Unexpected error", errors: err }, { status: 500 });
	}
}
