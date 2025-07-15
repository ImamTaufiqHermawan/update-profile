# 🚀 **Panduan Lengkap Setup Grafana Cloud Monitoring**

## 📋 **Daftar Isi**

1. [Persiapan Grafana Cloud](#persiapan-grafana-cloud)
2. [Setup Data Source](#setup-data-source)
3. [Konfigurasi Prometheus](#konfigurasi-prometheus)
4. [Buat Dashboard](#buat-dashboard)
5. [Setup Alerting](#setup-alerting)
6. [Testing & Monitoring](#testing--monitoring)

---

## 🎯 **1. Persiapan Grafana Cloud**

### **Step 1.1: Login ke Grafana Cloud**

```bash
# Buka browser dan kunjungi:
https://grafana.com/auth/sign-in

# Login dengan akun Anda
# Setelah login, Anda akan diarahkan ke Grafana Cloud dashboard
```

### **Step 1.2: Pilih Stack**

```bash
# Di dashboard Grafana Cloud:
1. Klik "Select Stack" atau pilih stack yang sudah ada
2. Pilih "Prometheus" sebagai data source
3. Catat URL dan credentials yang diberikan
```

### **Step 1.3: Dapatkan Credentials**

```bash
# Di Grafana Cloud dashboard:
1. Klik "Configuration" → "Data Sources"
2. Pilih "Prometheus"
3. Catat:
   - URL: https://prometheus-prod-XX-XXXXX.grafana.net
   - Username: biasanya angka
   - Password: token yang diberikan
```

---

## 🔧 **2. Setup Data Source**

### **Step 2.1: Tambahkan Prometheus Data Source**

```bash
# Di Grafana Cloud:
1. Buka "Configuration" → "Data Sources"
2. Klik "Add data source"
3. Pilih "Prometheus"
4. Isi konfigurasi:
   - Name: "Prometheus Cloud"
   - URL: URL dari step 1.3
   - Access: "Server (default)"
   - Auth: "Basic auth"
   - Username: dari step 1.3
   - Password: dari step 1.3
5. Klik "Save & Test"
```

### **Step 2.2: Verifikasi Koneksi**

```bash
# Pastikan muncul pesan:
✅ "Data source is working"
```

---

## 📊 **3. Konfigurasi Prometheus**

### **Step 3.1: Setup Prometheus Configuration**

```bash
# Di Grafana Cloud:
1. Buka "Configuration" → "Prometheus"
2. Klik "Configuration"
3. Tambahkan job baru untuk aplikasi Anda:
```

```yaml
# Prometheus Configuration
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "update-profile-app"
    static_configs:
      - targets: ["localhost:3000"]
    metrics_path: "/api/metrics"
    scrape_interval: 15s
    honor_labels: true
    labels:
      application: "update-profile-app"
      environment: "development"
```

### **Step 3.2: Restart Prometheus**

```bash
# Setelah update konfigurasi:
1. Klik "Save"
2. Prometheus akan restart otomatis
3. Tunggu beberapa menit untuk metrics mulai muncul
```

---

## 🎨 **4. Buat Dashboard**

### **Step 4.1: Buat Dashboard Baru**

```bash
# Di Grafana Cloud:
1. Klik "+" → "Dashboard"
2. Klik "Add new panel"
3. Pilih data source "Prometheus Cloud"
```

### **Step 4.2: Tambahkan Panel HTTP Metrics**

```bash
# Panel 1: HTTP Request Rate
Query: rate(http_requests_total[5m])
Title: "HTTP Request Rate"
Unit: "req/sec"

# Panel 2: Response Time
Query: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
Title: "95th Percentile Response Time"
Unit: "seconds"
```

### **Step 4.3: Tambahkan Panel Database Metrics**

```bash
# Panel 3: Database Query Rate
Query: rate(database_queries_total[5m])
Title: "Database Query Rate"
Unit: "queries/sec"

# Panel 4: Database Query Duration
Query: histogram_quantile(0.95, rate(database_query_duration_seconds_bucket[5m]))
Title: "95th Percentile Database Query Time"
Unit: "seconds"
```

### **Step 4.4: Tambahkan Panel Authentication**

```bash
# Panel 5: Authentication Attempts
Query: rate(authentication_attempts_total[5m])
Title: "Authentication Attempts"
Unit: "attempts/sec"

# Panel 6: Active Users
Query: active_users
Title: "Active Users"
Unit: "users"
```

### **Step 4.5: Tambahkan Panel System Metrics**

```bash
# Panel 7: Memory Usage
Query: nodejs_memory_usage_bytes{type="heapUsed"}
Title: "Memory Usage"
Unit: "bytes"

# Panel 8: CPU Usage
Query: rate(process_cpu_seconds_total[5m])
Title: "CPU Usage"
Unit: "cpu/sec"
```

---

## 🔔 **5. Setup Alerting**

### **Step 5.1: Buat Alert Rules**

```bash
# Di Grafana Cloud:
1. Buka "Alerting" → "Alert Rules"
2. Klik "New rule"
```

### **Step 5.2: High Response Time Alert**

```bash
# Rule 1: High Response Time
Name: "High Response Time Alert"
Query: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
Duration: 5m
Severity: Warning
Message: "Response time is above 2 seconds"
```

### **Step 5.3: High Error Rate Alert**

```bash
# Rule 2: High Error Rate
Name: "High Error Rate Alert"
Query: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
Duration: 5m
Severity: Critical
Message: "Error rate is above 10%"
```

### **Step 5.4: High Memory Usage Alert**

```bash
# Rule 3: High Memory Usage
Name: "High Memory Usage Alert"
Query: nodejs_memory_usage_bytes{type="heapUsed"} > 500000000
Duration: 5m
Severity: Warning
Message: "Memory usage is above 500MB"
```

---

## 🧪 **6. Testing & Monitoring**

### **Step 6.1: Test Aplikasi**

```bash
# Jalankan aplikasi:
npm run dev

# Test endpoint metrics:
curl http://localhost:3000/api/metrics
```

### **Step 6.2: Generate Load**

```bash
# Buat file test-load.js:
```

```javascript
// test-load.js
const fetch = require("node-fetch");

async function generateLoad() {
  for (let i = 0; i < 100; i++) {
    try {
      // Test login
      await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      // Test profile
      await fetch("http://localhost:3000/api/profile");

      console.log(`Request ${i + 1} completed`);

      // Wait 1 second between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Request ${i + 1} failed:`, error.message);
    }
  }
}

generateLoad();
```

### **Step 6.3: Monitor Dashboard**

```bash
# Di Grafana Cloud:
1. Buka dashboard yang sudah dibuat
2. Jalankan test-load.js
3. Amati metrics yang berubah:
   - HTTP request rate akan naik
   - Response time akan terlihat
   - Authentication attempts akan bertambah
   - Memory usage akan berubah
```

---

## 📈 **7. Metrics yang Tersedia**

### **HTTP Metrics**

- `http_requests_total` - Total HTTP requests
- `http_request_duration_seconds` - Request duration

### **Database Metrics**

- `database_queries_total` - Total database queries
- `database_query_duration_seconds` - Query duration

### **Authentication Metrics**

- `authentication_attempts_total` - Login attempts
- `active_users` - Current active users

### **System Metrics**

- `nodejs_memory_usage_bytes` - Memory usage
- `nodejs_process_uptime_seconds` - Process uptime
- `process_cpu_seconds_total` - CPU usage

---

## 🎯 **8. Best Practices**

### **Monitoring Best Practices**

1. **Set Thresholds** - Tentukan batas normal untuk setiap metric
2. **Use Percentiles** - Gunakan 95th percentile untuk response time
3. **Monitor Trends** - Perhatikan tren jangka panjang
4. **Set Alerts** - Setup alerting untuk kondisi abnormal
5. **Regular Review** - Review dashboard secara berkala

### **Performance Best Practices**

1. **Optimize Queries** - Optimasi database queries
2. **Cache Responses** - Implement caching untuk response yang sering diakses
3. **Monitor Memory** - Perhatikan memory usage
4. **Error Handling** - Implement proper error handling
5. **Load Testing** - Lakukan load testing secara berkala

---

## 🚀 **9. Troubleshooting**

### **Common Issues**

1. **Metrics tidak muncul**

   - Cek endpoint `/api/metrics` berfungsi
   - Pastikan Prometheus bisa akses endpoint
   - Cek network connectivity

2. **Dashboard kosong**

   - Pastikan data source terkonfigurasi dengan benar
   - Cek query syntax
   - Pastikan metrics sudah ada data

3. **Alerts tidak bekerja**
   - Cek alert rule syntax
   - Pastikan threshold sesuai
   - Cek notification channel

### **Debug Commands**

```bash
# Test metrics endpoint
curl http://localhost:3000/api/metrics

# Check Prometheus targets
# Di Grafana Cloud: Configuration → Prometheus → Targets

# Check metrics di Prometheus
# Di Grafana Cloud: Explore → Prometheus → Query metrics
```

---

## 📚 **10. Resources**

### **Documentation**

- [Grafana Cloud Documentation](https://grafana.com/docs/grafana-cloud/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Node.js Metrics](https://github.com/siimon/prom-client)

### **Community**

- [Grafana Community](https://community.grafana.com/)
- [Prometheus Community](https://prometheus.io/community/)

---

## 🎉 **Selamat!**

Anda telah berhasil setup monitoring system dengan Grafana Cloud!

**Next Steps:**

1. Monitor aplikasi secara real-time
2. Setup alerting untuk production
3. Optimize berdasarkan metrics
4. Scale berdasarkan performance data

**Happy Monitoring! 🚀**
