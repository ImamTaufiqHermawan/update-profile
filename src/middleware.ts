import { NextRequest, NextResponse } from "next/server";

// 🔧 **Penjelasan: Middleware ini akan track semua HTTP requests**
// - Berjalan sebelum setiap request
// - Mengukur response time
// - Menyimpan metrics untuk monitoring

export function middleware(request: NextRequest) {
  const startTime = Date.now();

  // 📊 **Log request untuk monitoring**
  console.log(
    `🌐 ${request.method} ${
      request.nextUrl.pathname
    } - ${new Date().toISOString()}`
  );

  // 🔄 **Process request**
  const response = NextResponse.next();

  // ⏱️ **Calculate response time**
  const duration = (Date.now() - startTime) / 1000;

  // 📈 **Log response time**
  console.log(`⏱️ Response time: ${duration.toFixed(3)}s`);

  // 🏷️ **Add custom headers for monitoring**
  response.headers.set("X-Response-Time", `${duration.toFixed(3)}s`);
  response.headers.set("X-Request-ID", Math.random().toString(36).substring(7));

  return response;
}

// 🎯 **Configure which paths to run middleware on**
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
