const productionSiteUrl = "https://www.rovexa.agency";
const allowedProductionHosts = new Set(["rovexa.agency", "www.rovexa.agency"]);

function isAllowedSiteHost(hostname: string, allowPreviewHosts: boolean) {
  return (
    allowedProductionHosts.has(hostname) ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    (allowPreviewHosts && hostname.endsWith(".vercel.app"))
  );
}

function normalizeSiteUrl(
  value: string | undefined,
  options?: { allowPreviewHosts?: boolean }
) {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const candidateUrl = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    const parsedUrl = new URL(candidateUrl);
    const hostname = parsedUrl.hostname.toLowerCase();
    const allowPreviewHosts = options?.allowPreviewHosts ?? false;

    if (!isAllowedSiteHost(hostname, allowPreviewHosts)) {
      return null;
    }

    parsedUrl.protocol = "https:";
    parsedUrl.username = "";
    parsedUrl.password = "";
    parsedUrl.pathname = "";
    parsedUrl.search = "";
    parsedUrl.hash = "";

    return parsedUrl.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function getSiteUrl() {
  const allowPreviewHosts = process.env.VERCEL_ENV === "preview";

  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, { allowPreviewHosts }) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL, { allowPreviewHosts }) ??
    normalizeSiteUrl(process.env.VERCEL_URL, { allowPreviewHosts }) ??
    productionSiteUrl
  );
}

export const siteConfig = {
  name: "Rovexa",
  domain: "rovexa.agency",
  url: getSiteUrl(),
  title: "Rovexa | Creative Growth Agency for Modern Brands",
  description:
    "Rovexa is a creative growth agency helping modern brands grow through branding, websites, marketing, and operational systems.",
  socialDescription:
    "Rovexa helps modern brands grow through branding, websites, marketing, and operational systems."
} as const;
