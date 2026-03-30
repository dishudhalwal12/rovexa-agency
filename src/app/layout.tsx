import type { Metadata } from "next";
import "./globals.css";
import { caveat, dmSans, inter, migra } from "@/lib/fonts";
import { AppBootstrap } from "@/components/layout/app-bootstrap";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: "%s | Rovexa"
  },
  description: siteConfig.description,
  keywords: [
    "Rovexa",
    "Rovexa agency",
    "creative growth agency",
    "branding",
    "website design",
    "marketing systems",
    "operational systems"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.socialDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.title
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.socialDescription,
    images: ["/twitter-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSans.variable} ${caveat.variable} ${migra.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <AppBootstrap>{children}</AppBootstrap>
      </body>
    </html>
  );
}
