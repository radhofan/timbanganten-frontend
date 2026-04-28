import jwt from "jsonwebtoken";
import { jwtVerify, JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { CurrentUser } from "./types";

// JWT secret must be set in production. In dev a fallback keeps local builds working
// but we log a warning so the misconfiguration is visible.
function loadJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET environment variable is required in production");
    }
    console.warn("[auth] JWT_SECRET not set, falling back to dev default");
    return "super-secret-dev";
  }
  return secret;
}

const JWT_SECRET = loadJwtSecret();
const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "token";

// Issue a 7-day signed token containing the user identity payload.
export function signToken(user: CurrentUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

// Verify token signature and shape. Returns null on any failure (expired, tampered, malformed).
export async function verifyToken(token: string): Promise<CurrentUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_BUFFER);

    const { id, name, email, role } = payload as JWTPayload & Partial<CurrentUser>;

    if (
      typeof id === "number" &&
      typeof name === "string" &&
      typeof email === "string" &&
      typeof role === "string"
    ) {
      return { id, name, email, role };
    }

    return null;
  } catch {
    return null;
  }
}

// Set the auth cookie on a response. httpOnly + secure-in-prod prevents XSS theft and
// MITM read; sameSite=lax stops simple CSRF on cross-site GETs.
export function setAuthCookie(res: NextResponse, token: string): void {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

// Expire the auth cookie immediately.
export function clearAuthCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// Read token from a NextRequest (used in middleware).
export function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value || null;
}

// Read token from the Cookie header on a plain Request (used in route handlers).
export function getTokenFromHeaders(req: Request): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === COOKIE_NAME) return decodeURIComponent(v.join("="));
  }
  return null;
}

// Resolve the current user from the request cookie, or null if absent/invalid.
export async function getCurrentUser(req: Request): Promise<CurrentUser | null> {
  const token = getTokenFromHeaders(req);
  if (!token) return null;
  return verifyToken(token);
}

export type AuthGuard =
  | { ok: true; user: CurrentUser }
  | { ok: false; response: NextResponse };

// Route-handler guard. Returns { ok: true, user } if the request is authenticated and
// (optionally) carries one of the allowed roles, otherwise an error response to return.
//
// Usage:
//   const guard = await requireRole(req, ["admin"]);
//   if (!guard.ok) return guard.response;
//   const user = guard.user;
export async function requireRole(
  req: Request,
  roles?: readonly string[]
): Promise<AuthGuard> {
  const user = await getCurrentUser(req);
  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { ok: true, user };
}
