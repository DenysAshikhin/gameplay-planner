// src/middleware.js
import { NextResponse } from 'next/server';

/**
 * Redirects requests for the site's ads.txt file to the hosted Monu delivery
 * location while letting all other requests continue through the default Next
 * middleware flow.
 *
 * @param {import('next/server').NextRequest} request - Incoming request object.
 * @returns {import('next/server').NextResponse} Redirect response or continuation token.
 */
export function middleware(request) {
  if (request.nextUrl.pathname === '/ads.txt') {
    return NextResponse.redirect('https://monu.delivery/adstxt/a/5/892ed4-6227-41b8-95d2-9c7cb4ffe471.txt', 301);
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}
