// 🔧 **Setup Grafana Cloud Connection**
// Script ini akan membantu setup koneksi ke Grafana Cloud

const http = require("http");
const https = require("https");

// 📊 **Test metrics endpoint**
async function testMetricsEndpoint() {
  console.log("🧪 Testing metrics endpoint...");

  try {
    const response = await fetch("http://localhost:3000/api/metrics");
    if (response.ok) {
      console.log("✅ Metrics endpoint berfungsi!");
      console.log("📊 Metrics tersedia di: http://localhost:3000/api/metrics");
    } else {
      console.log("❌ Metrics endpoint tidak berfungsi");
    }
  } catch (error) {
    console.log("❌ Error testing metrics:", error.message);
  }
}

// 🌐 **Get public IP (alternative method)**
async function getPublicIP() {
  console.log("🌐 Getting public IP...");

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log(`🌐 Public IP: ${data.ip}`);
    console.log(`📊 Metrics URL: http://${data.ip}:3000/api/metrics`);
    return data.ip;
  } catch (error) {
    console.log("❌ Tidak bisa mendapatkan public IP:", error.message);
    return null;
  }
}

// 🔧 **Setup instructions**
function showSetupInstructions() {
  console.log("\n🎯 **Grafana Cloud Setup Instructions**");
  console.log("=====================================");
  console.log("");
  console.log("📋 **Step 1: Expose Aplikasi ke Internet**");
  console.log("-------------------------------------------");
  console.log("Pilih salah satu cara:");
  console.log("");
  console.log("**Option A: Menggunakan localtunnel**");
  console.log("1. Install localtunnel: npm install -g localtunnel");
  console.log("2. Jalankan: lt --port 3000");
  console.log("3. Catat URL yang diberikan (contoh: https://abc123.loca.lt)");
  console.log("");
  console.log("**Option B: Menggunakan ngrok**");
  console.log("1. Download ngrok dari https://ngrok.com");
  console.log("2. Jalankan: ngrok http 3000");
  console.log("3. Catat URL yang diberikan");
  console.log("");
  console.log("**Option C: Port Forwarding**");
  console.log("1. Setup port forwarding di router");
  console.log("2. Forward port 3000 ke IP komputer Anda");
  console.log("3. Gunakan: http://[PUBLIC_IP]:3000/api/metrics");
  console.log("");
  console.log("📋 **Step 2: Setup Grafana Cloud**");
  console.log("-----------------------------------");
  console.log("1. Login ke https://grafana.com");
  console.log('2. Buka "Configuration" → "Data Sources"');
  console.log('3. Klik "Add data source"');
  console.log('4. Pilih "Prometheus"');
  console.log("5. Isi konfigurasi:");
  console.log('   - Name: "Prometheus Cloud"');
  console.log("   - URL: [URL_DARI_STEP_1]/api/metrics");
  console.log('   - Access: "Server (default)"');
  console.log('   - Auth: "Basic auth" (jika diperlukan)');
  console.log('6. Klik "Save & Test"');
  console.log("");
  console.log("📋 **Step 3: Test Connection**");
  console.log("-------------------------------");
  console.log('1. Di Grafana Cloud, klik "Test"');
  console.log('2. Pastikan muncul "Data source is working"');
  console.log('3. Jika masih "Access denied", cek:');
  console.log("   - URL sudah benar");
  console.log("   - Aplikasi berjalan");
  console.log("   - Firewall tidak memblokir");
  console.log("");
  console.log("📋 **Step 4: Buat Dashboard**");
  console.log("-----------------------------");
  console.log('1. Klik "+" → "Dashboard"');
  console.log('2. Klik "Add new panel"');
  console.log('3. Pilih data source "Prometheus Cloud"');
  console.log("4. Tambahkan query:");
  console.log("   - rate(http_requests_total[5m])");
  console.log(
    "   - histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
  );
  console.log("   - rate(authentication_attempts_total[5m])");
  console.log("");
  console.log("🎉 **Selamat! Dashboard monitoring Anda siap!**");
}

// 🚀 **Main function**
async function main() {
  console.log("🚀 **Grafana Cloud Setup Helper**");
  console.log("================================");

  // Test metrics endpoint
  await testMetricsEndpoint();

  // Get public IP
  const publicIP = await getPublicIP();

  // Show instructions
  showSetupInstructions();

  if (publicIP) {
    console.log("\n💡 **Quick Setup dengan Public IP:**");
    console.log(`URL untuk Grafana Cloud: http://${publicIP}:3000/api/metrics`);
    console.log("⚠️  Pastikan port 3000 di-forward di router Anda!");
  }
}

// Jalankan script
main().catch(console.error);
