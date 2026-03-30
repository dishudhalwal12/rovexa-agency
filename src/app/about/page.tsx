import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export const metadata: Metadata = {
  title: "About",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function AboutPage() {
  return (
    <ComingSoonPage
      eyebrow="About Rovexa"
      title="The story behind the work is coming next."
      description="This page is reserved for the Rovexa point of view, the team’s philosophy, and the quieter details that make the brand feel human."
    />
  );
}
