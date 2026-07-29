import assert from "node:assert/strict";
import {
  AUTH_COOKIE_NAME,
  buildSessionCookie,
  clearSessionCookie,
  createSessionToken,
  hashPassword,
  readCookie,
  verifyPassword,
  verifySessionToken,
} from "../auth-core.mjs";

const email = "doctor@example.com";
const password = "local-test-password";
const secret = "local-test-session-secret-with-more-than-32-bytes";
const now = Date.now();

const passwordHash = await hashPassword(password, new Uint8Array(16).fill(7));
assert.equal(await verifyPassword(password, passwordHash), true);
assert.equal(await verifyPassword(`${password}!`, passwordHash), false);

const token = await createSessionToken(email, secret, now);
assert.equal(await verifySessionToken(token, secret, email, now + 1000), true);
assert.equal(await verifySessionToken(`${token}x`, secret, email, now + 1000), false);
assert.equal(await verifySessionToken(token, secret, "other@example.com", now + 1000), false);
assert.equal(await verifySessionToken(token, secret, email, now + 9 * 60 * 60 * 1000), false);

const cookie = buildSessionCookie(token);
assert.equal(readCookie(`theme=dark; ${cookie}`, AUTH_COOKIE_NAME), token);
assert.match(cookie, /HttpOnly/);
assert.match(cookie, /Secure/);
assert.match(cookie, /SameSite=Lax/);
assert.match(clearSessionCookie(), /Max-Age=0/);

process.env.ATLAS_AUTH_EMAIL = email;
process.env.ATLAS_AUTH_PASSWORD_HASH = passwordHash;
process.env.ATLAS_SESSION_SECRET = secret;

const login = (await import("../api/login.mjs")).default;
const logout = (await import("../api/logout.mjs")).default;

const failedLogin = await login.fetch(new Request("https://atlas.example/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password: "wrong-password" }),
}));
assert.equal(failedLogin.status, 401);
assert.equal(failedLogin.headers.get("set-cookie"), null);

const successfulLogin = await login.fetch(new Request("https://atlas.example/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
}));
assert.equal(successfulLogin.status, 200);
assert.match(successfulLogin.headers.get("set-cookie") || "", new RegExp(`^${AUTH_COOKIE_NAME}=`));

const logoutResponse = logout.fetch(new Request("https://atlas.example/api/logout", { method: "POST" }));
assert.equal(logoutResponse.status, 303);
assert.match(logoutResponse.headers.get("set-cookie") || "", /Max-Age=0/);

console.log("Auth audit passed: password hash, signed session, login and logout.");
