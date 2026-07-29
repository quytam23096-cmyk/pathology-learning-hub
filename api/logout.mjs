import { clearSessionCookie } from "../auth-core.mjs";

export default {
  fetch(request) {
    if (request.method !== "POST") {
      return new Response(null, {
        status: 405,
        headers: { Allow: "POST", "Cache-Control": "no-store" },
      });
    }

    return new Response(null, {
      status: 303,
      headers: {
        "Cache-Control": "no-store",
        Location: "/login.html",
        "Set-Cookie": clearSessionCookie(),
      },
    });
  },
};

