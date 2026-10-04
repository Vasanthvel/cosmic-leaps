function getBackendUrl() {
  const configuredUrl = process.env.BACKEND_URL?.trim();
  if (configuredUrl) {
    const normalizedUrl = configuredUrl.replace(/\/+$/, "");
    if (process.env.NODE_ENV !== "production") return normalizedUrl;

    try {
      const { hostname, protocol } = new URL(normalizedUrl);
      const isLocalhost =
        hostname === "localhost" ||
        hostname.endsWith(".localhost") ||
        hostname.startsWith("127.") ||
        hostname === "::1" ||
        hostname === "[::1]";
      return protocol === "https:" && !isLocalhost ? normalizedUrl : null;
    } catch {
      return null;
    }
  }
  if (process.env.NODE_ENV === "development") return "http://127.0.0.1:8000";
  return null;
}

function backendUnavailable(code = "backend_unavailable") {
  return Response.json(
    {
      code,
      message: "The Cosmic Leaps assistant is temporarily unavailable.",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET() {
  const backendUrl = getBackendUrl();
  if (!backendUrl) return backendUnavailable("backend_not_configured");

  try {
    const healthResponse = await fetch(`${backendUrl}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    if (!healthResponse.ok) {
      console.error("[Chatbot] FastAPI health check failed", {
        status: healthResponse.status,
      });
      return backendUnavailable();
    }

    const providerResponse = await fetch(`${backendUrl}/api/chat/status`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const providerStatus = await providerResponse.json().catch(() => ({}));

    return Response.json(
      {
        status: providerStatus.status,
        code: providerStatus.code,
        message: providerStatus.message,
        provider: providerStatus.provider,
      },
      { status: providerResponse.status, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[Chatbot] FastAPI backend is unavailable", {
      error: error instanceof Error ? error.message : String(error),
    });
    return backendUnavailable();
  }
}

export async function POST(request: Request) {
  const backendUrl = getBackendUrl();
  if (!backendUrl) return backendUnavailable("backend_not_configured");

  try {
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("content-type") || "application/json",
      },
      body: await request.arrayBuffer(),
      cache: "no-store",
      signal: AbortSignal.timeout(55_000),
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[Chatbot] FastAPI chat request failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return backendUnavailable();
  }
}
