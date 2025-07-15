# 🔧 **Setup ngrok untuk Grafana Cloud**

## 🚨 **Masalah:**

Grafana Cloud tidak bisa akses `192.168.1.4:3000` karena itu IP lokal.

## ✅ **Solusi: Gunakan ngrok**

### **Step 1: Install ngrok (Sudah Done)**

```bash
# ngrok sudah terinstall via winget
# Restart terminal jika perlu
```

### **Step 2: Jalankan ngrok**

```bash
# Di terminal baru (bukan yang menjalankan npm run dev)
ngrok http 3000
```

### **Step 3: Catat URL yang Muncul**

Setelah menjalankan `ngrok http 3000`, Anda akan melihat output seperti:

```
Session Status                online
Account                       your-email@example.com
Version                       3.3.1
Region                        United States (us)
Latency                       51ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
```

**Catat URL: `https://abc123.ngrok.io`**

### **Step 4: Test Public URL**

```bash
# Test di browser atau curl
curl https://abc123.ngrok.io/api/metrics
```

### **Step 5: Update Grafana Cloud**

```
1. Login ke https://grafana.com
2. Buka Data Sources → Prometheus
3. Set URL: https://abc123.ngrok.io/api/metrics
4. Klik "Save & Test"
5. Harus muncul: "Data source is working"
```

## 🧪 **Test Setup**

### **Test 1: Local Metrics**

```bash
curl http://localhost:3000/api/metrics
```

### **Test 2: Public Metrics**

```bash
curl https://abc123.ngrok.io/api/metrics
```

### **Test 3: Generate Load**

```bash
node test-load.js
```

### **Test 4: Monitor di Grafana Cloud**

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

# Response Time
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

## 🔔 **Troubleshooting**

### **Masalah: ngrok tidak berjalan**

```bash
# 1. Restart terminal
# 2. Cek ngrok version
ngrok version

# 3. Jalankan ngrok
ngrok http 3000
```

### **Masalah: URL tidak berfungsi**

```bash
# 1. Pastikan aplikasi berjalan
npm run dev

# 2. Test local
curl http://localhost:3000/api/metrics

# 3. Test public
curl https://abc123.ngrok.io/api/metrics
```

### **Masalah: Grafana Cloud masih timeout**

```bash
# 1. Pastikan ngrok berjalan
# 2. Cek URL benar
# 3. Test URL di browser
# 4. Pastikan aplikasi berjalan
```

## 🎯 **Quick Commands**

```bash
# Terminal 1: Jalankan aplikasi
npm run dev

# Terminal 2: Jalankan ngrok
ngrok http 3000

# Terminal 3: Test load
node test-load.js

# Terminal 4: Test metrics
curl https://abc123.ngrok.io/api/metrics
```

## 🎉 **Success Checklist**

- [ ] ngrok berjalan dan memberikan URL
- [ ] Public URL bisa diakses
- [ ] Metrics endpoint berfungsi
- [ ] Grafana Cloud bisa akses URL
- [ ] Data source test berhasil
- [ ] Dashboard menampilkan data
- [ ] Load test berhasil
- [ ] Metrics berubah real-time

**Selamat! Monitoring system Anda siap! 🚀**
