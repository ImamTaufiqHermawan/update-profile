# Setup Grafana Cloud - Step by Step

## Langkah 1: Daftar Grafana Cloud

1. Buka browser ke: https://grafana.com/auth/sign-up/create-user
2. Isi form pendaftaran:
   - Email: [email Anda]
   - Password: [password yang kuat]
   - Company: [nama perusahaan atau "Workshop"]
3. Klik "Create Account"
4. Verifikasi email jika diminta

## Langkah 2: Setup Prometheus Data Source

1. Login ke Grafana Cloud
2. Klik "Add data source"
3. Pilih "Prometheus"
4. Isi konfigurasi:
   - Name: `workshop-prometheus`
   - URL: `http://localhost:9090` (untuk local Prometheus)
   - Access: `Server (default)`
5. Klik "Save & Test"

## Langkah 3: Setup Remote Write (Opsional)

Jika ingin mengirim metrics langsung ke Grafana Cloud:

1. Di Grafana Cloud, buka "Configuration" > "Data Sources"
2. Pilih Prometheus data source
3. Di tab "Settings", cari "Remote Write"
4. Copy URL dan credentials
5. Update konfigurasi di aplikasi

## Langkah 4: Import Dashboard

1. Di Grafana Cloud, klik "+" > "Import"
2. Upload file `grafana/dashboards/workshop-dashboard.json`
3. Pilih data source: `workshop-prometheus`
4. Klik "Import"

## Langkah 5: Test Monitoring

1. Jalankan aplikasi Next.js:

   ```bash
   npm run dev
   ```

2. Akses beberapa endpoint untuk generate metrics:

   - http://localhost:3000/api/users
   - http://localhost:3000/api/profile
   - http://localhost:3000/api/login

3. Cek metrics di Grafana Cloud dashboard

## Troubleshooting

### Prometheus tidak bisa diakses

- Pastikan Prometheus berjalan di port 9090
- Cek firewall settings
- Test dengan: `curl http://localhost:9090/api/v1/status/targets`

### Metrics tidak muncul

- Cek endpoint `/api/metrics` di aplikasi
- Pastikan format metrics sesuai Prometheus
- Cek network connectivity

### Dashboard kosong

- Pastikan data source terhubung
- Cek time range di dashboard
- Verifikasi query PromQL

## Quick Start Script

Buat file `setup-monitoring.bat` (Windows):

```batch
@echo off
echo Starting Prometheus...
start /B prometheus.exe --config.file=prometheus.yml

echo Starting Grafana...
start /B grafana-server.exe

echo Opening Grafana Cloud...
start https://grafana.com/auth/sign-up/create-user

echo Setup complete! Check the guides above.
pause
```

## Manual Setup Prometheus (Jika tidak pakai Docker)

1. Download Prometheus dari: https://prometheus.io/download/
2. Extract ke folder, misalnya: `C:\prometheus`
3. Copy file `prometheus.yml` dari project ini ke folder Prometheus
4. Jalankan:
   ```bash
   cd C:\prometheus
   prometheus.exe --config.file=prometheus.yml
   ```

## Manual Setup Grafana (Jika tidak pakai Docker)

1. Download Grafana dari: https://grafana.com/grafana/download
2. Install sesuai instruksi
3. Jalankan Grafana
4. Buka http://localhost:3000
5. Login dengan admin/admin
6. Setup data source dan import dashboard

## Metrics yang Tersedia

Setelah setup, Anda akan bisa melihat:

- **Database Metrics**: Query time, row counts, connection stats
- **API Metrics**: Request duration, status codes, endpoint usage
- **Application Metrics**: Memory usage, error rates
- **Custom Metrics**: Business logic metrics

## Workshop Exercises

1. **Basic Monitoring**: Setup dan lihat metrics dasar
2. **Custom Metrics**: Tambah metrics untuk business logic
3. **Alerting**: Setup alert untuk error rates
4. **Dashboard**: Buat dashboard custom
5. **Optimization**: Optimize queries berdasarkan metrics

## Next Steps

Setelah setup selesai:

1. Explore dashboard
2. Coba query PromQL
3. Setup alerting
4. Customize dashboard
5. Add custom metrics
