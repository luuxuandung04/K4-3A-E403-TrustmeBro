"use strict";

const http = require("node:http");
const path = require("node:path");
const { readFile, writeFile, mkdir } = require("node:fs/promises");
const { existsSync } = require("node:fs");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "mes.json");
const PORT = Number(process.env.DEADLINE_DEMO_PORT || 4173);
const HOST = "127.0.0.1";
const MAX_BODY_BYTES = 16 * 1024;
const MAX_MESSAGES_PER_CHANNEL = 300;
let writeQueue = Promise.resolve();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  if (!existsSync(DATA_FILE)) {
    await writeFile(DATA_FILE, JSON.stringify({ version: 1, channels: {} }, null, 2) + "\n", "utf8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || !parsed.channels || typeof parsed.channels !== "object") {
    throw new Error("mes.json không đúng schema");
  }
  return parsed;
}

function queueMessageAppend(message) {
  writeQueue = writeQueue.then(async () => {
    const store = await readStore();
    const channelMessages = Array.isArray(store.channels[message.channel]) ? store.channels[message.channel] : [];
    channelMessages.push(message);
    store.channels[message.channel] = channelMessages.slice(-MAX_MESSAGES_PER_CHANNEL);
    await writeFile(DATA_FILE, JSON.stringify(store, null, 2) + "\n", "utf8");
  });
  return writeQueue;
}

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(data));
}

function validChannel(value) {
  return typeof value === "string" && /^[a-z0-9-]{1,64}$/.test(value);
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES) {
        reject(new Error("PAYLOAD_TOO_LARGE"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function handleMessagesApi(request, response, requestUrl) {
  if (request.method === "GET") {
    const channel = requestUrl.searchParams.get("channel") || "deadline-hub";
    if (!validChannel(channel)) return sendJson(response, 400, { error: "Tên channel không hợp lệ" });
    const store = await readStore();
    return sendJson(response, 200, { channel, messages: store.channels[channel] || [] });
  }

  if (request.method === "POST") {
    let payload;
    try {
      payload = JSON.parse(await readRequestBody(request));
    } catch (error) {
      return sendJson(response, error.message === "PAYLOAD_TOO_LARGE" ? 413 : 400, { error: "Payload JSON không hợp lệ" });
    }

    const channel = payload.channel || "deadline-hub";
    const content = typeof payload.content === "string" ? payload.content.trim() : "";
    const allowedKinds = new Set(["message", "command", "bot", "system"]);
    if (!validChannel(channel)) return sendJson(response, 400, { error: "Tên channel không hợp lệ" });
    if (!content || content.length > 500) return sendJson(response, 400, { error: "Tin nhắn phải có 1–500 ký tự" });
    if (!allowedKinds.has(payload.kind)) return sendJson(response, 400, { error: "Loại tin nhắn không hợp lệ" });

    const isBot = payload.kind === "bot" || payload.kind === "system";
    const message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      channel,
      author: isBot
        ? { id: "deadline-bot", name: "Deadline Bot", initials: "D", role: "bot" }
        : { id: "user-lan-anh", name: "Lan Anh", initials: "LA", role: "member" },
      kind: payload.kind,
      content,
      createdAt: new Date().toISOString(),
    };

    await queueMessageAppend(message);
    return sendJson(response, 201, { message });
  }

  return sendJson(response, 405, { error: "Method không được hỗ trợ" });
}

async function serveStatic(response, pathname) {
  const relativePath = pathname === "/" ? "index.html" : decodeURIComponent(pathname.slice(1));
  const resolvedPath = path.resolve(ROOT, relativePath);
  if (resolvedPath !== ROOT && !resolvedPath.startsWith(`${ROOT}${path.sep}`)) {
    response.writeHead(403); response.end("Forbidden"); return;
  }
  try {
    const body = await readFile(resolvedPath);
    response.writeHead(200, { "Content-Type": MIME_TYPES[path.extname(resolvedPath).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    response.end(body);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error.code === "ENOENT" ? "Not found" : "Server error");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`);
    if (requestUrl.pathname === "/api/messages") return await handleMessagesApi(request, response, requestUrl);
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405); response.end("Method not allowed"); return;
    }
    return await serveStatic(response, requestUrl.pathname);
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, { error: "Không thể xử lý yêu cầu" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Deadline Bot demo: http://${HOST}:${PORT}`);
  console.log(`Chat history file: ${DATA_FILE}`);
});
