const encoder = new TextEncoder();

export const AUTH_COOKIE_NAME = "atlas_session";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
export const PASSWORD_HASH_PREFIX = "pbkdf2-sha256";
export const PASSWORD_HASH_ITERATIONS = 210000;

function bytesToBase64Url(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function timingSafeEqual(left, right) {
  const a = left instanceof Uint8Array ? left : new Uint8Array(left);
  const b = right instanceof Uint8Array ? right : new Uint8Array(right);
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createSessionToken(email, secret, now = Date.now()) {
  const payload = bytesToBase64Url(encoder.encode(JSON.stringify({
    sub: String(email || "").trim().toLocaleLowerCase("en-US"),
    exp: Math.floor(now / 1000) + SESSION_MAX_AGE_SECONDS,
    v: 1,
  })));
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token, secret, expectedEmail, now = Date.now()) {
  try {
    if (!token || !secret || !expectedEmail) return false;
    const [payload, signature, extra] = String(token).split(".");
    if (!payload || !signature || extra) return false;

    const key = await importHmacKey(secret);
    const isSigned = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signature),
      encoder.encode(payload),
    );
    if (!isSigned) return false;

    const claims = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload)));
    const normalizedEmail = String(expectedEmail).trim().toLocaleLowerCase("en-US");
    return claims.v === 1
      && claims.sub === normalizedEmail
      && Number.isFinite(claims.exp)
      && claims.exp > Math.floor(now / 1000);
  } catch {
    return false;
  }
}

export function readCookie(cookieHeader, name = AUTH_COOKIE_NAME) {
  const prefix = `${name}=`;
  return String(cookieHeader || "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length) || "";
}

export function buildSessionCookie(token) {
  return `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}`;
}

export function clearSessionCookie() {
  return `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

async function derivePasswordBytes(password, salt, iterations) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const digest = await derivePasswordBytes(password, salt, PASSWORD_HASH_ITERATIONS);
  return [
    PASSWORD_HASH_PREFIX,
    PASSWORD_HASH_ITERATIONS,
    bytesToBase64Url(salt),
    bytesToBase64Url(digest),
  ].join("$");
}

export async function verifyPassword(password, encodedHash) {
  try {
    const [prefix, iterationText, saltText, digestText, extra] = String(encodedHash || "").split("$");
    const iterations = Number(iterationText);
    if (prefix !== PASSWORD_HASH_PREFIX || extra || !Number.isInteger(iterations) || iterations < 100000) return false;
    const salt = base64UrlToBytes(saltText);
    const expected = base64UrlToBytes(digestText);
    const actual = await derivePasswordBytes(String(password || ""), salt, iterations);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

