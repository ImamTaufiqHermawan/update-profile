import { NextRequest, NextResponse } from "next/server";
import { getMetrics } from "@/lib/metrics";

// 🔧 **Penjelasan: Endpoint ini akan mengekspos metrics ke Grafana Cloud**
// - Grafana Cloud akan "scrape" endpoint ini secara berkala
// - Format response adalah Prometheus text format
// - Headers diset untuk content-type yang benar

export async function GET(request: NextRequest) {
  try {
    console.log("📊 Metrics endpoint accessed");

    // 📈 **Dapatkan metrics dalam format Prometheus**
    const metrics = await getMetrics();

    // 🎯 **Return metrics dengan headers yang tepat**
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("❌ Error getting metrics:", error);

    return new NextResponse("Error getting metrics", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

// 🔒 **Security: Hanya GET method yang diizinkan**
export async function POST() {
  return new NextResponse("Method not allowed", { status: 405 });
}

export async function PUT() {
  return new NextResponse("Method not allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method not allowed", { status: 405 });
}
