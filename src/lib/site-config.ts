const productionSiteUrl = "https://rovexa.agency";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

function getSiteUrl() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
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
