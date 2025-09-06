import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = "nl" // altijd NL, geen us of detectie meer

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  // strip /nl van urls als iemand die toch intypt
  if (url.pathname.startsWith("/nl")) {
    url.pathname = url.pathname.replace(/^\/nl/, "") || "/"
    return NextResponse.redirect(url, 307)
  }

  // set region cookie altijd op NL
  const response = NextResponse.next()
  response.cookies.set("_medusa_region", DEFAULT_REGION, {
    maxAge: 60 * 60 * 24 * 30, // 30 dagen geldig
  })

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)",
  ],
}
