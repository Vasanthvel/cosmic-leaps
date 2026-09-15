# Analytics Lab Backend

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

## Run

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
`OLLAMA_MODEL`, and `AI_REQUEST_TIMEOUT_SECONDS`. The frontend can point at the API
with `NEXT_PUBLIC_ANALYTICS_API_URL` (default: `http://127.0.0.1:8000`).