import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon-page";

export const metadata: Metadata = {
  title: "Contact",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function ContactPage() {
  return (
    <ComingSoonPage
      eyebrow="Get an audit"
      title="A sharper inquiry flow is on the way."
      description="This page will become the place where ambitious brands start the conversation, ask for an audit, and step into the right next move."
    />
  );
}
