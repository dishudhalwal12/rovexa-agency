import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const legacyHosts = new Set(["rovexa.space", "www.rovexa.space"]);
const canonicalHost = "rovexa.agency";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase();

  if (!host || !legacyHosts.has(host)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https";
  redirectUrl.hostname = canonicalHost;
  redirectUrl.port = "";

  return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
  matcher: "/:path*"
};
