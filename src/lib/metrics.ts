import {
  register,
  collectDefaultMetrics,
  Counter,
  Histogram,
  Gauge,
} from "prom-client";

// 🔧 **Penjelasan: Ini adalah sistem metrics collection**
// - register: Untuk menyimpan semua metrics
// - collectDefaultMetrics: Mengumpulkan metrics default Node.js (CPU, memory, dll)
// - Counter: Untuk menghitung jumlah request, error, dll
// - Histogram: Untuk mengukur durasi request, response time, dll
// - Gauge: Untuk nilai yang bisa naik turun (memory usage, active connections, dll)

// 📈 **HTTP Request Metrics**
export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

export const httpRequestTotal = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// 🗄️ **Database Metrics**
export const dbQueryDuration = new Histogram({
  name: "database_query_duration_seconds",
  help: "Duration of database queries in seconds",
  labelNames: ["operation", "table"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

export const dbQueryTotal = new Counter({
  name: "database_queries_total",
  help: "Total number of database queries",
  labelNames: ["operation", "table", "status"],
});

// 🔐 **Authentication Metrics**
export const authAttempts = new Counter({
  name: "authentication_attempts_total",
  help: "Total number of authentication attempts",
  labelNames: ["status", "method"],
});

export const activeUsers = new Gauge({
  name: "active_users",
  help: "Number of currently active users",
});

// 💾 **Memory & Performance Metrics**
export const memoryUsage = new Gauge({
  name: "nodejs_memory_usage_bytes",
  help: "Memory usage in bytes",
  labelNames: ["type"], // heapTotal, heapUsed, external, rss
});

export const processUptime = new Gauge({
  name: "nodejs_process_uptime_seconds",
  help: "Process uptime in seconds",
});

// 🚀 **Initialize Default Metrics**
// Ini akan mengumpulkan metrics default seperti:
// - CPU usage
// - Memory usage
// - Event loop lag
// - Active handles
collectDefaultMetrics({ register });

// 📊 **Function untuk update memory metrics**
export function updateMemoryMetrics() {
  if (typeof process !== "undefined" && process.memoryUsage) {
    const memUsage = process.memoryUsage();
    memoryUsage.set({ type: "heapTotal" }, memUsage.heapTotal);
    memoryUsage.set({ type: "heapUsed" }, memUsage.heapUsed);
    memoryUsage.set({ type: "external" }, memUsage.external);
    memoryUsage.set({ type: "rss" }, memUsage.rss);
  }

  if (typeof process !== "undefined" && process.uptime) {
    processUptime.set(process.uptime());
  }
}

// 🔄 **Function untuk mendapatkan metrics dalam format Prometheus**
export async function getMetrics() {
  updateMemoryMetrics();
  return await register.metrics();
}

// 📝 **Helper function untuk tracking database queries**
export function trackDatabaseQuery(
  operation: string,
  table: string,
  duration: number,
  status: "success" | "error"
) {
  dbQueryDuration.observe({ operation, table }, duration);
  dbQueryTotal.inc({ operation, table, status });
}

// 🔐 **Helper function untuk tracking authentication**
export function trackAuthAttempt(
  status: "success" | "failed",
  method: "login" | "logout" | "register"
) {
  authAttempts.inc({ status, method });
}

// 👥 **Helper function untuk tracking active users**
export function setActiveUsers(count: number) {
  activeUsers.set(count);
}

// 🌐 **HTTP Request tracking helper**
export function trackHttpRequest(
  method: string,
  route: string,
  statusCode: number,
  duration: number
) {
  httpRequestDuration.observe(
    { method, route, status_code: statusCode.toString() },
    duration
  );
  httpRequestTotal.inc({ method, route, status_code: statusCode.toString() });
}

console.log("✅ Metrics system initialized successfully!");
console.log("📊 Available metrics:");
console.log("   - HTTP Request Duration & Count");
console.log("   - Database Query Duration & Count");
console.log("   - Authentication Attempts");
console.log("   - Active Users");
console.log("   - Memory Usage");
console.log("   - Process Uptime");
console.log("   - Default Node.js Metrics (CPU, Memory, etc.)");
