// 🔍 **Check ngrok Status**
// Script ini akan mengecek status ngrok dan mendapatkan public URL

const http = require("http");

// 📊 **Check ngrok API**
async function checkNgrokStatus() {
  console.log("🔍 Checking ngrok status...");

  try {
    // Ngrok menyediakan API di port 4040
    const response = await fetch("http://localhost:4040/api/tunnels");

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Ngrok berjalan!");

      if (data.tunnels && data.tunnels.length > 0) {
        const tunnel = data.tunnels[0];
        console.log(`🌐 Public URL: ${tunnel.public_url}`);
        console.log(`📊 Metrics URL: ${tunnel.public_url}/api/metrics`);

        // Test metrics endpoint
        await testMetricsEndpoint(tunnel.public_url);

        return tunnel.public_url;
      } else {
        console.log("❌ Tidak ada tunnel yang aktif");
      }
    } else {
      console.log("❌ Ngrok tidak berjalan atau tidak bisa diakses");
    }
  } catch (error) {
    console.log("❌ Error checking ngrok:", error.message);
    console.log("");
    console.log("💡 **Solusi:**");
    console.log("1. Pastikan ngrok berjalan: ngrok http 3000");
    console.log("2. Tunggu beberapa detik");
    console.log("3. Jalankan script ini lagi");
  }
}

// 🧪 **Test metrics endpoint**
async function testMetricsEndpoint(baseURL) {
  console.log("\n🧪 Testing metrics endpoint...");

  try {
    const response = await fetch(`${baseURL}/api/metrics`);

    if (response.ok) {
      const metrics = await response.text();
      console.log("✅ Public metrics endpoint berfungsi!");
      console.log(`📊 Metrics length: ${metrics.length} characters`);
      console.log("");
      console.log("🎉 **Success!**");
      console.log("==============");
      console.log(
        `📊 Gunakan URL ini di Grafana Cloud: ${baseURL}/api/metrics`
      );
      console.log("");
      console.log("**Setup Grafana Cloud:**");
      console.log("1. Login ke https://grafana.com");
      console.log("2. Buka Data Sources → Prometheus");
      console.log(`3. Set URL: ${baseURL}/api/metrics`);
      console.log('4. Klik "Save & Test"');
      console.log('5. Harus muncul: "Data source is working"');
    } else {
      console.log("❌ Public metrics endpoint tidak berfungsi");
      console.log(`Status: ${response.status}`);
    }
  } catch (error) {
    console.log("❌ Error testing public metrics:", error.message);
  }
}

// 🚀 **Main function**
async function main() {
  console.log("🚀 **Ngrok Status Checker**");
  console.log("==========================");

  const publicURL = await checkNgrokStatus();

  if (publicURL) {
    console.log("\n📋 **Next Steps:**");
    console.log("==================");
    console.log("1. Update Grafana Cloud data source URL");
    console.log("2. Test connection di Grafana Cloud");
    console.log("3. Buat dashboard dengan queries yang sudah disediakan");
    console.log("4. Jalankan load test untuk melihat metrics berubah");
  }
}

// Jalankan script
main().catch(console.error);
