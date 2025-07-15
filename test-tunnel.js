// 🧪 **Test Tunnel Options**
// Script ini akan test berbagai cara untuk expose aplikasi ke internet

const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

// 📊 **Test local metrics**
async function testLocalMetrics() {
  console.log("🧪 Testing local metrics...");

  try {
    const response = await fetch("http://localhost:3000/api/metrics");
    if (response.ok) {
      console.log("✅ Local metrics berfungsi!");
      return true;
    } else {
      console.log("❌ Local metrics tidak berfungsi");
      return false;
    }
  } catch (error) {
    console.log("❌ Error testing local metrics:", error.message);
    return false;
  }
}

// 🌐 **Test public URL**
async function testPublicURL(url) {
  console.log(`🧪 Testing public URL: ${url}`);

  try {
    const response = await fetch(`${url}/api/metrics`);
    if (response.ok) {
      const metrics = await response.text();
      console.log("✅ Public URL berfungsi!");
      console.log(`📊 Metrics length: ${metrics.length} characters`);
      return true;
    } else {
      console.log(`❌ Public URL tidak berfungsi (Status: ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error testing public URL: ${error.message}`);
    return false;
  }
}

// 🔧 **Test different tunnel options**
async function testTunnelOptions() {
  console.log("\n🔧 **Testing Tunnel Options**");
  console.log("============================");

  const options = [
    {
      name: "Localtunnel (npx)",
      command: "npx localtunnel --port 3000",
      testURL: null, // Will be set after running
    },
    {
      name: "Localtunnel with subdomain",
      command: "npx localtunnel --port 3000 --subdomain update-profile-metrics",
      testURL: "https://update-profile-metrics.loca.lt",
    },
    {
      name: "Cloudflare Tunnel",
      command: "npx cloudflared tunnel --url http://localhost:3000",
      testURL: null,
    },
  ];

  for (const option of options) {
    console.log(`\n📋 **Testing: ${option.name}**`);
    console.log("Command:", option.command);

    if (option.testURL) {
      const works = await testPublicURL(option.testURL);
      if (works) {
        console.log(`🎉 **Success!**`);
        console.log(
          `📊 URL untuk Grafana Cloud: ${option.testURL}/api/metrics`
        );
        return option.testURL;
      }
    }
  }

  return null;
}

// 🎯 **Show manual options**
function showManualOptions() {
  console.log("\n💡 **Manual Options**");
  console.log("===================");
  console.log("");
  console.log("**Option 1: Download ngrok manually**");
  console.log("1. Download dari https://ngrok.com/download");
  console.log("2. Extract ke folder project");
  console.log("3. Jalankan: ./ngrok http 3000");
  console.log("");
  console.log("**Option 2: Use Railway/Vercel**");
  console.log("1. Deploy aplikasi ke Railway atau Vercel");
  console.log("2. Gunakan URL production");
  console.log("");
  console.log("**Option 3: Use Heroku**");
  console.log("1. Deploy ke Heroku");
  console.log("2. Gunakan URL Heroku");
  console.log("");
  console.log("**Option 4: Use ngrok with auth token**");
  console.log("1. Sign up di https://ngrok.com");
  console.log("2. Get auth token");
  console.log("3. ngrok config add-authtoken YOUR_TOKEN");
  console.log("4. ngrok http 3000");
}

// 🚀 **Main function**
async function main() {
  console.log("🚀 **Tunnel Test Helper**");
  console.log("========================");

  // Test local metrics first
  const localWorks = await testLocalMetrics();

  if (!localWorks) {
    console.log(
      "❌ Local metrics tidak berfungsi. Pastikan aplikasi berjalan!"
    );
    return;
  }

  // Test tunnel options
  const publicURL = await testTunnelOptions();

  if (publicURL) {
    console.log("\n🎉 **Success!**");
    console.log("==============");
    console.log(
      `📊 Gunakan URL ini di Grafana Cloud: ${publicURL}/api/metrics`
    );
    console.log("");
    console.log("**Setup Grafana Cloud:**");
    console.log("1. Login ke https://grafana.com");
    console.log("2. Buka Data Sources → Prometheus");
    console.log(`3. Set URL: ${publicURL}/api/metrics`);
    console.log('4. Klik "Save & Test"');
  } else {
    console.log("\n❌ **Semua tunnel options gagal**");
    console.log("===============================");
    showManualOptions();
  }
}

// Jalankan test
main().catch(console.error);
