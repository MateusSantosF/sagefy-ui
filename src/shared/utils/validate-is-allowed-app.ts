import { allowedOrigins, IAllowedApplication } from "@/configs/allowedApplications";


const applicationsUrl = allowedOrigins.map(
  (app: IAllowedApplication) => app.applicationURI
);

const allowedAppsRegex = new RegExp(
  applicationsUrl
    .map((appUrl: string) => appUrl.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
    .join("|")
);

export function validateIsAllowedApp(origin: string) {
  const isOriginAllowed = allowedAppsRegex.test(origin);
  if (!isOriginAllowed) {
    console.error("Origin not allowed", origin);
    return false;
  }

  return true;
}
