# Cosmic Leaps Chat Backend

## Activate Environment

### Windows

```bash
.venv\Scripts\activate
```

From PowerShell, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` once per terminal, then `\.venv\Scripts\Activate.ps1` from this `backend` directory. Verify the active shell with `where.exe python`; it should show `backend\.venv\Scripts\python.exe` first. This changes only the current PowerShell process. You can always bypass shell activation with `\.venv\Scripts\python.exe -m pip ...` and `\.venv\Scripts\python.exe -m uvicorn ...`.

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run the Full Development Stack

From the repository root, run:

```bash
npm run dev
```

This starts Next.js and FastAPI together and checks whether Ollama and the configured model are available. It does not start Ollama; start Ollama separately if the development command reports it is unavailable.

## Run the Backend Alone

Set `AI_PROVIDER=ollama` and `ENVIRONMENT=development` in the process environment
when running FastAPI directly. The root `npm run dev` command loads these local
defaults from `backend/.env.example`.

```bash
uvicorn app.main:app --reload
```

## Local AI

The chat uses Ollama by default so no paid provider is required. Install Ollama from
https://ollama.com/download, then download and start the lightweight model:

```bash
ollama pull llama3.2:3b
ollama serve
```

Run the API from the `backend` directory. The API calls Ollama locally at
`http://127.0.0.1:11434`. Optional environment variables are `OLLAMA_BASE_URL`,
`OLLAMA_MODEL`, and `AI_REQUEST_TIMEOUT_SECONDS`. The Next.js chat proxy uses
`BACKEND_URL` (default: `http://127.0.0.1:8000`).

## Production Deployment

The Vercel frontend cannot reach a developer's localhost. Deploy the FastAPI
backend to a publicly reachable HTTPS service and set `BACKEND_URL` in Vercel
to that service's base URL. Do not set it to a localhost address.

Configure the backend deployment with `ENVIRONMENT=production`,
`AI_PROVIDER=openai-compatible`, `AI_API_URL` set to the provider's
OpenAI-compatible chat-completions endpoint, and `AI_MODEL` set to the deployed
model name. Set `AI_API_KEY` as a server-side secret when the provider requires
authentication. These settings belong to the backend environment, never to
`NEXT_PUBLIC_*` variables or frontend source. In production, missing hosted
provider configuration fails closed instead of falling back to local Ollama.