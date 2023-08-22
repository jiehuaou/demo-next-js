//@ts-check
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import LoggerFactory from './lib/logger';
// this file can not import "next-auth/react" since it reference dynamic function 
// and cause nextjs build failed.

const logger = LoggerFactory(process.env.LOG_MIDDLEWARE);

/**
 * login page
 * @date 2023-07-02
 * @param {import('next/server').NextRequest} request
 * @param {import('next-auth/jwt').JWT | null} session
 * @returns {Promise<NextResponse<any>>}
 */
const loginHandler = async function (request, session) {

  const url = request.nextUrl.clone();
  const callbackUrl = request.nextUrl.pathname;
  url.pathname = '/auth/sign-in';
  url.searchParams.append('callbackUrl', callbackUrl);
  return NextResponse.redirect(url);
}

/**
 * deny access page
 * @date 2023-07-02
 * @param {import('next/server').NextRequest} request
 * @param {import('next-auth/jwt').JWT | null} session
 * @returns {Promise<NextResponse<any>>}
 */
const pageDenyHandler = async function (request, session) {
  const url = request.nextUrl.clone();
  const callbackUrl = request.nextUrl.pathname;
  url.pathname = '/error/deny';
  url.searchParams.append('callbackUrl', callbackUrl);
  return NextResponse.redirect(url);
}

/**
 * deny access API
 * @date 2023-07-02
 * @param {import('next/server').NextRequest} request
 * @param {import('next-auth/jwt').JWT | null} session
 * @returns {Promise<NextResponse<any>>}
 */
const apiDenyHandler = async function (request, session) {
  return new NextResponse(JSON.stringify({ success: false, message: 'authentication failed' }),
    { status: 401, headers: { 'content-type': 'application/json' } });
}


/**
 * This function will run before every page, API route, and file on your website. 
 * If NextResponse.next() is returned, or if there is no return value, 
 * pages will load as expected, as if there's no middleware:
 * 
 * here we use getToken({req, secret}) to check the session and apply security rule.
 * 
 * @param {import('next/server').NextRequest} request 
 * @returns {Promise<NextResponse<any>>}
 */
export async function middleware(request) {

  const session = await getToken({ req: request, secret: process.env.SECRET_TEXT });

  logger("middleware .....", request.nextUrl.pathname);
  logger("middleware ..... session", session);

  // redirect to login if not authenticated
  if (!session) {
    if (request.nextUrl.pathname.startsWith('/protect/')) {
      return loginHandler(request, session);
    } else if (request.nextUrl.pathname.startsWith('/api/protect/')) {
      return apiDenyHandler(request, session);
    }
  }

  // redirect to deny-access if without admin role.
  const role = '' + session?.role;
  if (role !== 'admin' && request.nextUrl.pathname.includes('/protect/admin/')) {
    if (request.nextUrl.pathname.startsWith('/protect/')) {
      return pageDenyHandler(request, session);
    } else if (request.nextUrl.pathname.startsWith('/api/protect/')) {
      return apiDenyHandler(request, session);
    }
  }

  return NextResponse.next();
  
}
// Only Matching Paths will apply the rule
export const config = {
  matcher: ['/protect/:path*', '/api/protect/:path*']
}
