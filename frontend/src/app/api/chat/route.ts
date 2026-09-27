const backendUrl = (process.env.BACKEND_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

function backendUnavailable() {
  return Response.json(
    {
      code: "backend_unavailable",
      message: `FastAPI backend is unavailable at ${backendUrl}.`,
      endpoint: backendUrl,
    },
    { status: 503, headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET() {
  try {
    const healthResponse = await fetch(`${backendUrl}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    if (!healthResponse.ok) {
      console.error("[Chatbot] FastAPI health check failed", {
        status: healthResponse.status,
        endpoint: `${backendUrl}/health`,
      });
      return backendUnavailable();
    }

    const providerResponse = await fetch(`${backendUrl}/api/chat/status`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const providerStatus = await providerResponse.json().catch(() => ({}));

    return Response.json(
      { ...providerStatus, backendUrl },
      {
        status: providerResponse.status,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[Chatbot] FastAPI backend is unavailable", {
      endpoint: backendUrl,
      error: error instanceof Error ? error.message : String(error),
    });
    return backendUnavailable();
  }
}

export async function POST(request: Request) {
  try {
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("content-type") || "application/json",
      },
      body: await request.arrayBuffer(),
      cache: "no-store",
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
      endpoint: `${backendUrl}/api/chat`,
      error: error instanceof Error ? error.message : String(error),
    });
    return backendUnavailable();
  }
}
