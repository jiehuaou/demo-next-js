//@ts-check
import { NextResponse } from 'next/server';
import { useSession, signIn, signOut } from "next-auth/react"
import { getToken } from 'next-auth/jwt';

/**
 * This function will run before every page, API route, and file on your website. 
 * If NextResponse.next() is returned, or if there is no return value, 
 * pages will load as expected, as if there's no middleware:
 * 
 * here we use getToken({req, secret}) to check the session and apply security rule.
 * 
 * @param {import('next/server').NextRequest} request 
 * @returns 
 */
export async function middleware(request) {
    
    const session = await getToken({req:request, secret: process.env.SECRET_TEXT});
    // console.log("middleware .....", request.nextUrl.pathname);
    // console.log("middleware ..... session", session?.email);
    if (!session) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/sign-in';
        return NextResponse.rewrite(url);
    }
    
    return NextResponse.next();
}
 
// Only Matching Paths will apply the rule
export const config = {
  matcher: '/protect/:path*',
}
