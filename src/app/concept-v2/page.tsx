import type { Metadata } from "next";
import { HomeHeroV2 } from "@/components/home/home-hero-v2";

export const metadata: Metadata = {
  title: "Concept V2",
  description:
    "Alternate poster-style homepage exploration for Rovexa with a centered hero composition.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function ConceptV2Page() {
  return <HomeHeroV2 />;
}
