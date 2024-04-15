import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    let token = request.cookies.get('token')?.value;
    const {pathname} = request.nextUrl;
    const publicRoute = pathname === "/login" || pathname === "/register"; 

    if(!token && !publicRoute){
        return NextResponse.redirect(new URL("/login",request.url))
    }

    if(token && publicRoute){
        return NextResponse.redirect(new URL("/",request.url))

    }

    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/login']
}