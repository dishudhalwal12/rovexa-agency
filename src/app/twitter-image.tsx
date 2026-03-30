import { siteConfig } from "@/lib/site-config";
import { createSocialImage } from "./social-image";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";
export const alt = siteConfig.title;
export const runtime = "nodejs";

export default async function TwitterImage() {
  return createSocialImage({ size });
}
