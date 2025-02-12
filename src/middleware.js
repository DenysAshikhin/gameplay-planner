// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname === '/ads.txt') {
    return NextResponse.redirect('https://monu.delivery/adstxt/a/5/892ed4-6227-41b8-95d2-9c7cb4ffe471.txt', 301);
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}