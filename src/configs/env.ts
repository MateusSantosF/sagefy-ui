export const env = {
	api: {
		base_url: process.env.NEXT_PUBLIC_API_BASE_URL!,
		access_token: process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!,
		refresh_token: process.env.NEXT_PUBLIC_API_REFRESH_TOKEN!,
	},
	app: {
		environment: process.env.NEXT_PUBLIC_APP_ENV!,
		cookie_domain: process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN!,
	}
};
