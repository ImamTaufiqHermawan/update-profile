// 🧪 **Load Testing Script untuk Grafana Cloud**
// Script ini akan generate traffic dan Anda bisa lihat metrics berubah di Grafana Cloud

const fetch = require("node-fetch");

// 📊 **Fungsi untuk test API Performance**
async function testAPIPerformance() {
  console.log("🚀 Starting API Performance Test...");

  const results = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalTime: 0,
    averageResponseTime: 0,
  };

  // Test login API
  for (let i = 0; i < 50; i++) {
    const startTime = Date.now();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const duration = Date.now() - startTime;
      results.totalTime += duration;
      results.totalRequests++;

      if (response.ok) {
        results.successfulRequests++;
        console.log(`✅ Request ${i + 1}: ${duration}ms - SUCCESS`);
      } else {
        results.failedRequests++;
        console.log(
          `❌ Request ${i + 1}: ${duration}ms - FAILED (${response.status})`
        );
      }

      // Wait 500ms between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      results.failedRequests++;
      console.log(`💥 Request ${i + 1}: ERROR - ${error.message}`);
    }
  }

  results.averageResponseTime = results.totalTime / results.totalRequests;

  console.log("\n📊 **API Performance Results:**");
  console.log(`Total Requests: ${results.totalRequests}`);
  console.log(`Successful: ${results.successfulRequests}`);
  console.log(`Failed: ${results.failedRequests}`);
  console.log(
    `Average Response Time: ${results.averageResponseTime.toFixed(2)}ms`
  );

  return results;
}

// 🗄️ **Fungsi untuk test Database Performance**
async function testDatabasePerformance() {
  console.log("\n🗄️ Testing Database Performance...");

  try {
    // Test profile API (akan hit database)
    const startTime = Date.now();
    const response = await fetch("http://localhost:3000/api/profile");
    const duration = Date.now() - startTime;

    console.log(`📊 Database Query Time: ${duration}ms`);
    console.log(`📊 Response Status: ${response.status}`);
  } catch (error) {
    console.log(`❌ Database test failed: ${error.message}`);
  }
}

// 💾 **Fungsi untuk test Memory Usage**
function testMemoryUsage() {
  console.log("\n💾 Current Memory Usage:");

  if (typeof process !== "undefined" && process.memoryUsage) {
    const memUsage = process.memoryUsage();
    console.log(
      `Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
      `Heap Total: ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
  }
}

// 🎯 **Main function**
async function runPerformanceTest() {
  console.log("🎯 **Grafana Cloud Performance Test**");
  console.log("=====================================");

  // Test 1: API Performance
  await testAPIPerformance();

  // Test 2: Database Performance
  await testDatabasePerformance();

  // Test 3: Memory Usage
  testMemoryUsage();

  console.log("\n🎉 **Test selesai!**");
  console.log("📊 Sekarang buka Grafana Cloud untuk lihat metrics:");
  console.log("1. Login ke https://grafana.com");
  console.log("2. Buka dashboard Anda");
  console.log("3. Lihat metrics yang berubah real-time!");
}

// 🚀 **Jalankan test**
runPerformanceTest().catch(console.error);
