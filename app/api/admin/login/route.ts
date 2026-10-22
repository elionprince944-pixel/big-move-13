import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
const COOKIE_NAME = "bigmove_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}

export async function POST(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret || secret.length < 32) {
    return NextResponse.json({ error: "Admin login is not configured. Set ADMIN_PASSWORD and a 32+ character ADMIN_SESSION_SECRET on the server." }, { status: 503 });
  }

  let supplied = "";
  try {
    const body = await request.json();
    supplied = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (supplied.length > 1024 || !safeEqual(supplied, password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = `admin:${expires}`;
  const token = `${payload}.${sign(payload, secret)}`;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return response;
}
