import {
  buildSessionCookie,
  createSessionToken,
  verifyPassword,
} from "../auth-core.mjs";

const JSON_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response(null, {
        status: 405,
        headers: { ...JSON_HEADERS, Allow: "POST" },
      });
    }

    const configuredEmail = String(process.env.ATLAS_AUTH_EMAIL || "").trim().toLocaleLowerCase("en-US");
    const passwordHash = process.env.ATLAS_AUTH_PASSWORD_HASH || "";
    const sessionSecret = process.env.ATLAS_SESSION_SECRET || "";
    if (!configuredEmail || !passwordHash || !sessionSecret) {
      return jsonResponse({ ok: false, message: "Hệ thống đăng nhập chưa được cấu hình." }, 503);
    }

    let credentials;
    try {
      credentials = await request.json();
    } catch {
      return jsonResponse({ ok: false, message: "Yêu cầu đăng nhập không hợp lệ." }, 400);
    }

    const email = String(credentials?.email || "").trim().toLocaleLowerCase("en-US");
    const password = String(credentials?.password || "");
    const [passwordMatches, emailMatches] = await Promise.all([
      verifyPassword(password, passwordHash),
      Promise.resolve(email === configuredEmail),
    ]);

    if (!passwordMatches || !emailMatches) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return jsonResponse({ ok: false, message: "Email hoặc mật khẩu không đúng." }, 401);
    }

    const token = await createSessionToken(configuredEmail, sessionSecret);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        ...JSON_HEADERS,
        "Set-Cookie": buildSessionCookie(token),
      },
    });
  },
};

