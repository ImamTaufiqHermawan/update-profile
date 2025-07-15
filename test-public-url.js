// 🧪 **Test Public URL Methods**
// Script ini akan test berbagai cara untuk expose aplikasi ke internet

const http = require("http");
const https = require("https");

// 📊 **Test local metrics endpoint**
async function testLocalMetrics() {
  console.log("🧪 Testing local metrics endpoint...");

  try {
    const response = await fetch("http://localhost:3000/api/metrics");
    if (response.ok) {
      const metrics = await response.text();
      console.log("✅ Local metrics endpoint berfungsi!");
      console.log(`📊 Metrics length: ${metrics.length} characters`);
      console.log("📊 Sample metrics:");
      console.log(metrics.substring(0, 500) + "...");
      return true;
    } else {
      console.log("❌ Local metrics endpoint tidak berfungsi");
      return false;
    }
  } catch (error) {
    console.log("❌ Error testing local metrics:", error.message);
    return false;
  }
}

// 🌐 **Get network info**
function getNetworkInfo() {
  console.log("\n🌐 **Network Information:**");
  console.log("==========================");

  // Get local IP
  const os = require("os");
  const interfaces = os.networkInterfaces();

  console.log("📱 **Local Network IPs:**");
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      if (interface.family === "IPv4" && !interface.internal) {
        console.log(`   ${name}: ${interface.address}`);
      }
    }
  }

  console.log("\n💡 **Alternative Solutions:**");
  console.log("============================");
  console.log("");
  console.log("**Option 1: Use Network IP**");
  console.log("Jika Anda di jaringan yang sama, bisa gunakan:");
  console.log("http://192.168.1.4:3000/api/metrics");
  console.log("");
  console.log("**Option 2: Manual ngrok Setup**");
  console.log("1. Download ngrok dari https://ngrok.com");
  console.log("2. Extract ke folder project");
  console.log("3. Jalankan: ./ngrok http 3000");
  console.log("");
  console.log("**Option 3: Use Cloudflare Tunnel**");
  console.log("1. Install cloudflared");
  console.log("2. Jalankan: cloudflared tunnel --url http://localhost:3000");
  console.log("");
  console.log("**Option 4: Use Railway/Vercel**");
  console.log("Deploy aplikasi ke cloud service");
  console.log("");
}

// 🔧 **Test network IP**
async function testNetworkIP() {
  console.log("\n🔧 **Testing Network IP Access:**");
  console.log("================================");

  const os = require("os");
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      if (interface.family === "IPv4" && !interface.internal) {
        const networkURL = `http://${interface.address}:3000/api/metrics`;
        console.log(`\n🧪 Testing: ${networkURL}`);

        try {
          const response = await fetch(networkURL);
          if (response.ok) {
            console.log(`✅ Network IP berfungsi: ${interface.address}`);
            console.log(`📊 URL untuk Grafana Cloud: ${networkURL}`);
            return networkURL;
          } else {
            console.log(`❌ Network IP tidak berfungsi: ${interface.address}`);
          }
        } catch (error) {
          console.log(
            `❌ Error testing ${interface.address}: ${error.message}`
          );
        }
      }
    }
  }

  return null;
}

// 🎯 **Main function**
async function main() {
  console.log("🚀 **Public URL Test Helper**");
  console.log("============================");

  // Test local metrics
  const localWorks = await testLocalMetrics();

  if (!localWorks) {
    console.log(
      "❌ Local metrics tidak berfungsi. Pastikan aplikasi berjalan!"
    );
    return;
  }

  // Get network info
  getNetworkInfo();

  // Test network IP
  const networkURL = await testNetworkIP();

  if (networkURL) {
    console.log("\n🎉 **Success!**");
    console.log("==============");
    console.log(`📊 Gunakan URL ini di Grafana Cloud: ${networkURL}`);
    console.log("");
    console.log("**Setup Grafana Cloud:**");
    console.log("1. Login ke https://grafana.com");
    console.log("2. Buka Data Sources → Prometheus");
    console.log(`3. Set URL: ${networkURL}`);
    console.log('4. Klik "Save & Test"');
    console.log("");
    console.log("⚠️  **Note:** URL ini hanya berfungsi jika:");
    console.log("   - Grafana Cloud dan komputer Anda di jaringan yang sama");
    console.log("   - Atau menggunakan VPN yang sama");
    console.log("   - Atau menggunakan public IP dengan port forwarding");
  } else {
    console.log("\n❌ **Network IP tidak berfungsi**");
    console.log("===============================");
    console.log("");
    console.log("**Solusi:**");
    console.log("1. Download ngrok dari https://ngrok.com");
    console.log("2. Extract dan jalankan: ngrok http 3000");
    console.log("3. Gunakan URL yang diberikan ngrok");
    console.log("");
    console.log("**Atau:**");
    console.log("1. Setup port forwarding di router");
    console.log("2. Forward port 3000 ke IP komputer Anda");
    console.log("3. Gunakan public IP");
  }
}

// Jalankan test
main().catch(console.error);
