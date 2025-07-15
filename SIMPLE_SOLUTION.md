# 🔧 **Solusi Sederhana untuk Antivirus Issue**

## 🚨 **Masalah:**

Antivirus memblokir ngrok dan SSL connections.

## ✅ **Solusi Paling Sederhana:**

### **Option 1: Port Forwarding (Paling Mudah)**

```bash
# 1. Cek IP komputer Anda
ipconfig

# 2. Setup port forwarding di router
# Forward port 3000 ke IP komputer Anda (192.168.1.4)

# 3. Cek public IP
curl https://api.ipify.org

# 4. Gunakan public IP di Grafana Cloud
# URL: http://[PUBLIC_IP]:3000/api/metrics
```

### **Option 2: Disable Antivirus Sementara**

```bash
# 1. Disable antivirus sementara (5 menit)
# 2. Jalankan ngrok
ngrok http 3000
# 3. Catat URL
# 4. Enable antivirus kembali
```

### **Option 3: Add ngrok ke Whitelist**

```bash
# 1. Buka antivirus settings
# 2. Add ngrok.exe ke whitelist/exclusions
# 3. Add folder project ke whitelist
# 4. Jalankan ngrok
```

### **Option 4: Use Different Port**

```bash
# 1. Jalankan aplikasi di port lain
npm run dev -- -p 8080

# 2. Jalankan ngrok di port 8080
ngrok http 8080

# 3. Update Grafana Cloud
# URL: https://abc123.ngrok.io/api/metrics
```

## 🧪 **Test Setup**

### **Test 1: Check Public IP**

```bash
curl https://api.ipify.org
```

### **Test 2: Test Port Forwarding**

```bash
# Jika port forwarding berhasil
curl http://[PUBLIC_IP]:3000/api/metrics
```

### **Test 3: Test ngrok dengan Whitelist**

```bash
# Setelah add ke whitelist
ngrok http 3000
```

## 📊 **Grafana Cloud Setup**

### **Step 1: Update Data Source**

```
1. Login ke https://grafana.com
2. Buka Data Sources → Prometheus
3. Set URL sesuai option yang dipilih:
   - Port forwarding: http://[PUBLIC_IP]:3000/api/metrics
   - ngrok: https://abc123.ngrok.io/api/metrics
4. Klik "Save & Test"
```

## 🎯 **Recommended: Port Forwarding**

**Kenapa Port Forwarding?**

- ✅ Tidak perlu disable antivirus
- ✅ Tidak perlu install software tambahan
- ✅ Reliable dan stabil
- ✅ Mudah setup

**Steps:**

1. Setup port forwarding di router
2. Forward port 3000 ke 192.168.1.4
3. Gunakan public IP di Grafana Cloud
4. Test connection

## 🔔 **Troubleshooting**

### **Masalah: Port forwarding tidak berfungsi**

```bash
# 1. Cek router settings
# 2. Pastikan port 3000 di-forward
# 3. Test dari internet
curl http://[PUBLIC_IP]:3000/api/metrics
```

### **Masalah: Antivirus masih blokir**

```bash
# 1. Add ngrok ke whitelist
# 2. Disable real-time protection sementara
# 3. Test ngrok
# 4. Enable kembali
```

## 🎉 **Quick Test**

```bash
# Test 1: Local
curl http://localhost:3000/api/metrics

# Test 2: Network IP
curl http://192.168.1.4:3000/api/metrics

# Test 3: Public IP (setelah port forwarding)
curl http://[PUBLIC_IP]:3000/api/metrics
```

**Pilih option yang paling sesuai dengan setup Anda! 🚀**
