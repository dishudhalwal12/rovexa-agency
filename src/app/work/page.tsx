import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export const metadata: Metadata = {
  title: "Work",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function WorkPage() {
  return (
    <ComingSoonPage
      eyebrow="Work"
      title="The proof will live here."
      description="Case studies, before-and-after thinking, and the kind of work that makes the brand promise feel real are lined up for this space."
    />
  );
}
