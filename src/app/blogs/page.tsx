import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export const metadata: Metadata = {
  title: "Blogs",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function BlogsPage() {
  return (
    <ComingSoonPage
      eyebrow="Blogs"
      title="Notes, thinking, and useful opinions will live here."
      description="The publishing system is ready. What comes next is the editorial layer: ideas on growth, design, websites, branding, and the work behind them."
    />
  );
}
