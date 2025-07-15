import { NextResponse } from "next/server";
import { prometheusMetrics } from "@/lib/prometheus-metrics";

export async function GET() {
  try {
    // Clean up old metrics
    prometheusMetrics.cleanup();

    // Get metrics as JSON for Grafana
    const metrics = prometheusMetrics.getJSONMetrics();

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error generating JSON metrics:", error);
    return NextResponse.json(
      { error: "Failed to generate metrics" },
      { status: 500 }
    );
  }
}
