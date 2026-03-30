import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rovexa",
    short_name: "Rovexa",
    description:
      "Rovexa is a creative growth agency helping modern brands grow through branding, websites, marketing, and operational systems.",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "3375x3375",
        type: "image/png"
      }
    ],
    background_color: "#050505",
    theme_color: "#050505"
  };
}
