import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "bigmove_admin_session";

async function verifySignature(payload: string, signature: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const bytes = new Uint8Array(signed);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const expected = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (secret && secret.length >= 32 && token) {
    const separator = token.lastIndexOf(".");
    if (separator > 0) {
      const payload = token.slice(0, separator);
      const signature = token.slice(separator + 1);
      const match = /^admin:(\d+)$/.exec(payload);
      if (match && Number(match[1]) > Math.floor(Date.now() / 1000) && await verifySignature(payload, signature, secret)) {
        return NextResponse.next();
      }
    }
  }
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = { matcher: ["/admin/:path*"] };
