// src/middleware.js
import { NextResponse } from 'next/server';

/**
 * middleware provides the core implementation for the middleware routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by middleware.
 */
export function middleware(request) {
  if (request.nextUrl.pathname === '/ads.txt') {
    return NextResponse.redirect('https://monu.delivery/adstxt/a/5/892ed4-6227-41b8-95d2-9c7cb4ffe471.txt', 301);
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}
