import type { Metadata } from "next";
import { HomeHero } from "@/components/home/home-hero";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/lib/site-config";

const homeUrl = new URL("/", siteConfig.url).toString();

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${homeUrl}#organization`,
      name: siteConfig.name,
      url: homeUrl,
      logo: {
        "@type": "ImageObject",
        url: `${homeUrl}images/logo.png`
      },
      description: siteConfig.description
    },
    {
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      url: homeUrl,
      name: siteConfig.name,
      publisher: {
        "@id": `${homeUrl}#organization`
      },
      inLanguage: "en"
    },
    {
      "@type": "WebPage",
      "@id": `${homeUrl}#webpage`,
      url: homeUrl,
      name: siteConfig.title,
      description: siteConfig.description,
      isPartOf: {
        "@id": `${homeUrl}#website`
      },
      about: {
        "@id": `${homeUrl}#organization`
      }
    }
  ]
};

export default function HomePage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomeHero />
    </PageShell>
  );
}
