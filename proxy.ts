import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ponytail: single env flag flips the whole site into maintenance mode.
export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === "/maintenance") return NextResponse.next();

  return NextResponse.rewrite(new URL("/maintenance", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|logo).*)",
  ],
};
