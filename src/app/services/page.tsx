import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export const metadata: Metadata = {
  title: "Services",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function ServicesPage() {
  return (
    <ComingSoonPage
      eyebrow="Services"
      title="Four disciplines. One clear growth point of view."
      description="Marketing, creative branding, tech, and operations are getting their own full section next. For now, this route stays quiet while the homepage is sharpened."
    />
  );
}
