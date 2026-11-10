import { NextResponse, type NextRequest } from "next/server";
import { families, products } from "@/content/products";

/**
 * Returns a real 404 status for unknown /products/<slug> URLs.
 *
 * With Cache Components, an unknown slug starts streaming before the page's
 * notFound() runs, so it would otherwise be served as a 200 "soft 404".
 * Checking the slug here, before rendering, fixes the status code.
 */
const validSlugs = new Set<string>([...products.map((p) => p.slug), ...Object.keys(families)]);

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !validSlugs.has(decodeURIComponent(slug))) {
    // Rewriting to an unmatched path renders the site's not-found page with a 404 status.
    return NextResponse.rewrite(new URL("/_unknown-product", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/products/:slug",
};
