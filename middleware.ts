import { AUTH_COOKIE_NAME, readCookie, verifySessionToken } from "./auth-core.mjs";

declare const process: { env: Record<string, string | undefined> };

const PUBLIC_PATHS = new Set([
  "/login.html",
  "/api/login",
  "/api/logout",
  "/favicon.ico",
]);

function loginRedirect(request: Request) {
  const current = new URL(request.url);
  const login = new URL("/login.html", current.origin);
  const destination = `${current.pathname}${current.search}`;
  if (destination !== "/") login.searchParams.set("next", destination);
  return Response.redirect(login, 302);
}

export default async function middleware(request: Request) {
  const pathname = new URL(request.url).pathname;
  if (PUBLIC_PATHS.has(pathname)) return;

  const secret = process.env.ATLAS_SESSION_SECRET || "";
  const email = process.env.ATLAS_AUTH_EMAIL || "";
  if (!secret || !email) return loginRedirect(request);

  const token = readCookie(request.headers.get("cookie"), AUTH_COOKIE_NAME);
  const isAuthenticated = await verifySessionToken(token, secret, email);
  if (!isAuthenticated) return loginRedirect(request);
}

export const config = {
  matcher: "/:path*",
};
