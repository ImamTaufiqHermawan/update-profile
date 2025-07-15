# 🚀 **Quick Fix untuk Grafana Cloud**

## 🚨 **Masalah:**

Grafana Cloud tidak bisa akses aplikasi lokal Anda.

## ✅ **Solusi Paling Mudah:**

### **Option 1: Deploy ke Vercel (Paling Mudah)**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy aplikasi
vercel

# 3. Catat URL yang diberikan
# Contoh: https://update-profile-abc123.vercel.app

# 4. Update Grafana Cloud
# URL: https://update-profile-abc123.vercel.app/api/metrics
```

### **Option 2: Deploy ke Railway**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login ke Railway
railway login

# 3. Deploy aplikasi
railway up

# 4. Catat URL yang diberikan
# Contoh: https://update-profile-production.up.railway.app

# 5. Update Grafana Cloud
# URL: https://update-profile-production.up.railway.app/api/metrics
```

### **Option 3: Manual ngrok Setup**

```bash
# 1. Download ngrok dari https://ngrok.com/download
# 2. Extract ngrok.exe ke folder project
# 3. Jalankan: ./ngrok http 3000
# 4. Catat URL yang muncul
# 5. Update Grafana Cloud dengan URL tersebut
```

## 🧪 **Test Setup**

### **Test 1: Local Metrics**

```bash
curl http://localhost:3000/api/metrics
```

### **Test 2: Production Metrics**

```bash
curl https://your-app-url.vercel.app/api/metrics
```

### **Test 3: Generate Load**

```bash
node test-load.js
```

## 📊 **Grafana Cloud Setup**

### **Step 1: Update Data Source**

```
1. Login ke https://grafana.com
2. Buka Data Sources → Prometheus
3. Set URL: https://your-app-url.vercel.app/api/metrics
4. Klik "Save & Test"
```

### **Step 2: Buat Dashboard**

```
1. Klik "+" → "Dashboard"
2. Klik "Add new panel"
3. Pilih data source "Prometheus Cloud"
4. Tambahkan queries:
```

### **Dashboard Queries**

```
# HTTP Request Rate
rate(http_requests_total[5m])

# Response Time
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Authentication Attempts
rate(authentication_attempts_total[5m])

# Database Query Rate
rate(database_queries_total[5m])

# Memory Usage
nodejs_memory_usage_bytes{type="heapUsed"}
```

## 🎯 **Recommended: Deploy ke Vercel**

**Kenapa Vercel?**

- ✅ Gratis untuk personal use
- ✅ Otomatis HTTPS
- ✅ Mudah deploy
- ✅ Reliable untuk monitoring

**Steps:**

1. Install Vercel CLI
2. Deploy aplikasi
3. Gunakan URL production
4. Update Grafana Cloud
5. Test monitoring

## 🎉 **Success Checklist**

- [ ] Aplikasi deployed ke cloud
- [ ] Production URL berfungsi
- [ ] Metrics endpoint accessible
- [ ] Grafana Cloud bisa akses URL
- [ ] Data source test berhasil
- [ ] Dashboard menampilkan data
- [ ] Load test berhasil
- [ ] Metrics berubah real-time

**Pilih salah satu option di atas dan ikuti step-by-step! 🚀**
