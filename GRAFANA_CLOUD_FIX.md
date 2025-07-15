# 🔧 **Fix Grafana Cloud Access Denied**

## 🚨 **Masalah: Access Denied**

Grafana Cloud tidak bisa akses `localhost:3000` karena:

- Grafana Cloud berada di internet
- Aplikasi Anda berjalan di localhost
- Tidak ada koneksi dari internet ke localhost

## ✅ **Solusi: Expose Aplikasi ke Internet**

### **Option 1: Menggunakan localtunnel (Paling Mudah)**

```bash
# 1. Install localtunnel
npm install -g localtunnel

# 2. Jalankan aplikasi Anda
npm run dev

# 3. Di terminal baru, jalankan localtunnel
lt --port 3000

# 4. Catat URL yang muncul, contoh:
# https://abc123.loca.lt
```

### **Option 2: Menggunakan ngrok**

```bash
# 1. Download ngrok dari https://ngrok.com
# 2. Extract dan jalankan:
ngrok http 3000

# 3. Catat URL yang muncul, contoh:
# https://abc123.ngrok.io
```

### **Option 3: Port Forwarding**

```bash
# 1. Cek IP komputer Anda
ipconfig

# 2. Setup port forwarding di router
# Forward port 3000 ke IP komputer Anda

# 3. Gunakan URL: http://[PUBLIC_IP]:3000/api/metrics
```

## 🔧 **Setup Grafana Cloud**

### **Step 1: Update Data Source**

1. **Login ke Grafana Cloud:**

   ```
   https://grafana.com/auth/sign-in
   ```

2. **Buka Data Sources:**

   ```
   Configuration → Data Sources → Prometheus
   ```

3. **Update URL:**

   ```
   URL: [URL_DARI_LOCALTUNNEL]/api/metrics

   Contoh:
   - localtunnel: https://abc123.loca.lt/api/metrics
   - ngrok: https://abc123.ngrok.io/api/metrics
   - Port forwarding: http://[PUBLIC_IP]:3000/api/metrics
   ```

4. **Test Connection:**
   ```
   Klik "Save & Test"
   Harus muncul: "Data source is working"
   ```

## 🧪 **Test Setup**

### **Step 1: Test Metrics Endpoint**

```bash
# Test local
curl http://localhost:3000/api/metrics

# Test public URL (ganti dengan URL Anda)
curl https://abc123.loca.lt/api/metrics
```

### **Step 2: Generate Load**

```bash
# Jalankan load test
node test-load.js
```

### **Step 3: Monitor di Grafana Cloud**

```
1. Buka dashboard Anda
2. Lihat metrics berubah real-time
3. Pastikan data muncul
```

## 📊 **Dashboard Queries**

### **HTTP Metrics**

```
# Request Rate
rate(http_requests_total[5m])

# Response Time (95th percentile)
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Error Rate
rate(http_requests_total{status_code=~"4..|5.."}[5m])
```

### **Database Metrics**

```
# Query Rate
rate(database_queries_total[5m])

# Query Duration
histogram_quantile(0.95, rate(database_query_duration_seconds_bucket[5m]))
```

### **Authentication Metrics**

```
# Login Attempts
rate(authentication_attempts_total[5m])

# Success vs Failed
rate(authentication_attempts_total{status="success"}[5m])
rate(authentication_attempts_total{status="failed"}[5m])
```

### **System Metrics**

```
# Memory Usage
nodejs_memory_usage_bytes{type="heapUsed"}

# CPU Usage
rate(process_cpu_seconds_total[5m])
```

## 🔔 **Troubleshooting**

### **Masalah: Still Access Denied**

```bash
# 1. Cek aplikasi berjalan
curl http://localhost:3000/api/metrics

# 2. Cek public URL
curl [PUBLIC_URL]/api/metrics

# 3. Cek firewall
# Pastikan port 3000 tidak diblokir

# 4. Cek URL format
# Pastikan URL berakhir dengan /api/metrics
```

### **Masalah: No Data in Dashboard**

```bash
# 1. Generate traffic
node test-load.js

# 2. Cek metrics endpoint
curl [PUBLIC_URL]/api/metrics

# 3. Cek query syntax
# Pastikan query benar di dashboard
```

### **Masalah: Slow Response**

```bash
# 1. Cek network latency
ping [PUBLIC_URL]

# 2. Cek localtunnel/ngrok status
# Restart jika perlu

# 3. Cek aplikasi performance
# Monitor memory dan CPU usage
```

## 🎯 **Quick Test**

### **Test Script**

```javascript
// quick-test.js
const fetch = require("node-fetch");

async function testPublicURL() {
  const publicURL = "https://abc123.loca.lt"; // Ganti dengan URL Anda

  try {
    const response = await fetch(`${publicURL}/api/metrics`);
    console.log("Status:", response.status);
    console.log("OK:", response.ok);

    if (response.ok) {
      const metrics = await response.text();
      console.log("Metrics length:", metrics.length);
      console.log("✅ Public URL berfungsi!");
    } else {
      console.log("❌ Public URL tidak berfungsi");
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

testPublicURL();
```

## 🎉 **Success Checklist**

- [ ] Aplikasi berjalan di localhost:3000
- [ ] Metrics endpoint berfungsi
- [ ] Public URL berfungsi
- [ ] Grafana Cloud bisa akses public URL
- [ ] Data source test berhasil
- [ ] Dashboard menampilkan data
- [ ] Load test berhasil
- [ ] Metrics berubah real-time

**Selamat! Monitoring system Anda siap! 🚀**
