//@ts-check
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import tk from "./data/access-token";
import { useSession, signIn, signOut } from "next-auth/react";

// const secret = process.env.SECRET_TEXT;

/**
 * deny access page
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

  console.log("middleware .....", request.nextUrl.pathname);
  console.log("middleware ..... session", session);
  if (!session) {
    if (request.nextUrl.pathname.startsWith('/protect/')) {
      return loginHandler(request, session);
    } else if (request.nextUrl.pathname.startsWith('/api/protect/')) {
      return apiDenyHandler(request, session);
    }
  }

  try {
    const accessToken = '' + session?.accessToken;
    console.log("middleware accessToken ==> ", accessToken);
    const result = await tk.verifyToken(accessToken);
    console.log("middleware verifyToken(accessToken) ==> ", result);
    if(!result) {
      //await signOut();
      console.log("middleware verifyToken ====> signout");
      throw new Error("middleware verifyToken(accessToken) ==> failed ");
    }
  } catch (error) {
    console.log("middleware verifyToken(accessToken) ==> ", error.toString());
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
