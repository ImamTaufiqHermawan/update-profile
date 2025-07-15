// Prometheus-style metrics collection
interface MetricData {
  name: string;
  value: number;
  labels: Record<string, string>;
  timestamp: number;
}

class PrometheusMetrics {
  private metrics: MetricData[] = [];
  private counters: Map<string, number> = new Map();
  private histograms: Map<string, number[]> = new Map();

  // Database Query Metrics
  recordDatabaseQuery(
    queryName: string,
    executionTime: number,
    rowCount: number,
    status: "success" | "error",
    queryType: "before" | "after" = "before"
  ) {
    const metric: MetricData = {
      name: "database_query_duration_seconds",
      value: executionTime / 1000, // Convert to seconds
      labels: {
        query_name: queryName,
        query_type: queryType,
        status: status,
        row_count: rowCount.toString(),
      },
      timestamp: Date.now(),
    };
    this.metrics.push(metric);

    // Increment counter
    const counterKey = `database_queries_total{query_name="${queryName}",status="${status}"}`;
    this.counters.set(counterKey, (this.counters.get(counterKey) || 0) + 1);

    // Record histogram
    const histogramKey = `database_query_duration_histogram{query_name="${queryName}"}`;
    if (!this.histograms.has(histogramKey)) {
      this.histograms.set(histogramKey, []);
    }
    this.histograms.get(histogramKey)!.push(executionTime);
  }

  // API Endpoint Metrics
  recordAPIRequest(
    endpoint: string,
    method: string,
    executionTime: number,
    statusCode: number,
    responseSize: number,
    userAgent: string
  ) {
    const metric: MetricData = {
      name: "api_request_duration_seconds",
      value: executionTime / 1000,
      labels: {
        endpoint: endpoint,
        method: method,
        status_code: statusCode.toString(),
        response_size: responseSize.toString(),
        user_agent: userAgent,
      },
      timestamp: Date.now(),
    };
    this.metrics.push(metric);

    // Increment counter
    const counterKey = `api_requests_total{endpoint="${endpoint}",method="${method}",status_code="${statusCode}"}`;
    this.counters.set(counterKey, (this.counters.get(counterKey) || 0) + 1);
  }

  // Frontend Component Metrics
  recordComponentRender(
    componentName: string,
    renderTime: number,
    operationType: string
  ) {
    const metric: MetricData = {
      name: "component_render_duration_seconds",
      value: renderTime / 1000,
      labels: {
        component_name: componentName,
        operation_type: operationType,
      },
      timestamp: Date.now(),
    };
    this.metrics.push(metric);
  }

  // User Interaction Metrics
  recordUserInteraction(
    interactionName: string,
    duration: number,
    success: boolean
  ) {
    const metric: MetricData = {
      name: "user_interaction_duration_seconds",
      value: duration / 1000,
      labels: {
        interaction_name: interactionName,
        success: success.toString(),
      },
      timestamp: Date.now(),
    };
    this.metrics.push(metric);
  }

  // Memory Usage Metrics
  recordMemoryUsage(component: string, memoryUsage: number) {
    const metric: MetricData = {
      name: "memory_usage_bytes",
      value: memoryUsage,
      labels: {
        component: component,
      },
      timestamp: Date.now(),
    };
    this.metrics.push(metric);
  }

  // Get metrics in Prometheus format
  getPrometheusFormat(): string {
    let output = "";

    // Counters
    for (const [key, value] of this.counters) {
      output += `# HELP ${key} Total count\n`;
      output += `# TYPE ${key} counter\n`;
      output += `${key} ${value}\n`;
    }

    // Histograms
    for (const [key, values] of this.histograms) {
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const count = values.length;
        const avg = sum / count;

        output += `# HELP ${key}_sum Sum of values\n`;
        output += `# TYPE ${key}_sum counter\n`;
        output += `${key}_sum ${sum}\n`;

        output += `# HELP ${key}_count Total count\n`;
        output += `# TYPE ${key}_count counter\n`;
        output += `${key}_count ${count}\n`;

        output += `# HELP ${key}_avg Average value\n`;
        output += `# TYPE ${key}_avg gauge\n`;
        output += `${key}_avg ${avg}\n`;
      }
    }

    // Current metrics
    for (const metric of this.metrics.slice(-100)) {
      // Keep last 100 metrics
      const labels = Object.entries(metric.labels)
        .map(([k, v]) => `${k}="${v}"`)
        .join(",");

      output += `${metric.name}{${labels}} ${metric.value} ${metric.timestamp}\n`;
    }

    return output;
  }

  // Get metrics as JSON for Grafana
  getJSONMetrics() {
    return {
      metrics: this.metrics.slice(-1000), // Keep last 1000 metrics
      counters: Object.fromEntries(this.counters),
      histograms: Object.fromEntries(this.histograms),
      summary: {
        totalMetrics: this.metrics.length,
        totalCounters: this.counters.size,
        totalHistograms: this.histograms.size,
      },
    };
  }

  // Clear old metrics (keep last 1000)
  cleanup() {
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }
}

export const prometheusMetrics = new PrometheusMetrics();
