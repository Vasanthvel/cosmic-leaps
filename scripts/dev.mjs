import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendDir = path.join(rootDir, "frontend");
const backendDir = path.join(rootDir, "backend");

function readEnvFile(filePath) {
  if (!existsSync(filePath)) return {};

  return Object.fromEntries(
    readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .flatMap((line) => {
        const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
        if (!match || match[2].startsWith("#")) return [];

        let value = match[2];
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        return [[match[1], value]];
      })
  );
}

const backendConfig = {
  ...readEnvFile(path.join(backendDir, ".env.example")),
  ...readEnvFile(path.join(backendDir, ".env")),
  ...process.env,
};
const frontendConfig = {
  ...readEnvFile(path.join(frontendDir, ".env.example")),
  ...readEnvFile(path.join(frontendDir, ".env.local")),
  ...process.env,
};
const ollamaUrl = (backendConfig.OLLAMA_BASE_URL || "http://127.0.0.1:11434").replace(/\/+$/, "");
const ollamaModel = backendConfig.OLLAMA_MODEL || "llama3.2:3b";
const backendUrl = frontendConfig.BACKEND_URL || "http://127.0.0.1:8000";

async function checkOllama() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(`${ollamaUrl}/api/tags`, { signal: controller.signal });
    if (!response.ok) {
      console.warn(`Ollama is not responding at ${ollamaUrl}. Start Ollama and try again.`);
      return;
    }

    const data = await response.json();
    const models = (data.models || []).map((model) => model.name);
    if (models.includes(ollamaModel)) {
      console.log(`Ollama is reachable; configured model ${ollamaModel} is available.`);
    } else {
      console.warn(`Ollama is reachable, but model ${ollamaModel} is not installed. Run: ollama pull ${ollamaModel}`);
    }
  } catch {
    console.warn("Ollama is not running. Start Ollama and try again.");
  } finally {
    clearTimeout(timeout);
  }
}

await checkOllama();

const nextCli = path.join(frontendDir, "node_modules", "next", "dist", "bin", "next");
const virtualenvPython = path.join(backendDir, ".venv", "Scripts", "python.exe");
const frontendUrl = "http://127.0.0.1:3000";
const pythonCommand = existsSync(virtualenvPython)
  ? virtualenvPython
  : process.platform === "win32"
    ? "py"
    : "python3";
const pythonArgs = pythonCommand === "py" ? ["-3", "-m", "uvicorn"] : ["-m", "uvicorn"];

let stopping = false;
let backendProcess;
let frontendProcess;

async function isNextRunning() {
  try {
    const response = await fetch(`${frontendUrl}/api/chat`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2000),
    });
    return response.headers.get("content-type")?.includes("application/json") === true && response.status !== 404;
  } catch {
    return false;
  }
}

async function isBackendRunning() {
  try {
    const response = await fetch(`${backendUrl}/health`, { signal: AbortSignal.timeout(2000) });
    return response.ok;
  } catch {
    return false;
  }
}

function stopServices() {
  if (stopping) return;
  stopping = true;
  backendProcess?.kill("SIGTERM");
  frontendProcess?.kill("SIGTERM");
}

process.on("SIGINT", stopServices);
process.on("SIGTERM", stopServices);

const [reuseNext, reuseBackend] = await Promise.all([isNextRunning(), isBackendRunning()]);

if (reuseNext) {
  console.log(`Reusing Next.js at ${frontendUrl}.`);
} else {
  frontendProcess = spawn(
    process.execPath,
    [nextCli, "dev", "--hostname", "127.0.0.1", "--port", "3000"],
    {
      cwd: frontendDir,
      env: { ...frontendConfig, BACKEND_URL: backendUrl },
      stdio: "inherit",
    }
  );

  frontendProcess.on("error", (error) => {
    console.error(`[dev] Could not start Next.js: ${error.message}`);
    stopServices();
  });
  frontendProcess.on("exit", (code) => {
    if (!stopping) {
      console.error(`[dev] Next.js exited with code ${code ?? "unknown"}.`);
      stopServices();
    }
  });
}

if (reuseBackend) {
  console.log(`Reusing FastAPI at ${backendUrl}.`);
} else {
  backendProcess = spawn(
    pythonCommand,
    [...pythonArgs, "app.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"],
    {
      cwd: backendDir,
      env: {
        ...backendConfig,
        OLLAMA_BASE_URL: ollamaUrl,
        OLLAMA_MODEL: ollamaModel,
      },
      stdio: "inherit",
    }
  );

  backendProcess.on("error", (error) => {
    console.error(`[dev] Could not start FastAPI: ${error.message}. Next.js will keep running; chatbot requests will report the backend as unavailable.`);
  });
  backendProcess.on("exit", (code) => {
    if (!stopping) {
      console.error(`[dev] FastAPI exited with code ${code ?? "unknown"}. Next.js will keep running; chatbot requests will report the backend as unavailable.`);
    }
  });
}

if (frontendProcess) console.log(`Next.js: ${frontendUrl} (pid ${frontendProcess.pid})`);
if (backendProcess) console.log(`FastAPI: ${backendUrl} (pid ${backendProcess.pid})`);
