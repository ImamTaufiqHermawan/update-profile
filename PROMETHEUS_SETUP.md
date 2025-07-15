# Setup Prometheus dan Grafana Tanpa Docker

## Opsi 1: Install Manual

### Install Prometheus

1. **Download Prometheus**

   - Kunjungi: https://prometheus.io/download/
   - Download versi Windows atau Linux sesuai OS Anda
   - Extract ke folder, misalnya: `C:\prometheus`

2. **Konfigurasi Prometheus**
   - Edit file `prometheus.yml` yang sudah ada di project ini
   - Jalankan Prometheus:
   ```bash
   cd C:\prometheus
   prometheus.exe --config.file=prometheus.yml
   ```

### Install Grafana

1. **Download Grafana**

   - Kunjungi: https://grafana.com/grafana/download
   - Download versi Windows atau Linux
   - Install sesuai instruksi

2. **Setup Grafana**
   - Buka browser ke: http://localhost:3000
   - Login default: admin/admin
   - Tambahkan Prometheus sebagai data source:
     - URL: http://localhost:9090
     - Access: Server (default)

## Opsi 2: Menggunakan Cloud Services

### Grafana Cloud (Free Tier)

1. Daftar di: https://grafana.com/auth/sign-up/create-user
2. Setup Prometheus remote write
3. Import dashboard dari file `grafana/dashboards/workshop-dashboard.json`

### Prometheus Cloud

- Gunakan layanan seperti: Prometheus Cloud, Weave Cloud, atau AWS Managed Prometheus

## Opsi 3: Menggunakan Package Managers

### Windows (Chocolatey)

```powershell
choco install prometheus
choco install grafana
```

### macOS (Homebrew)

```bash
brew install prometheus
brew install grafana
```

### Linux (apt)

```bash
sudo apt update
sudo apt install prometheus grafana
```

## Opsi 4: Menggunakan Node.js Prometheus Client

Jika tidak ingin setup server monitoring terpisah, bisa menggunakan:

1. **Prometheus Client untuk Node.js**

   ```bash
   npm install prom-client
   ```

2. **Grafana Cloud (Free)**
   - Setup Grafana Cloud account
   - Gunakan remote write untuk mengirim metrics
   - Tidak perlu setup server lokal

## Opsi 5: Monitoring Sederhana dengan Custom Dashboard

Buat dashboard monitoring sederhana dengan:

- Express.js server untuk metrics
- React dashboard untuk visualisasi
- Chart.js atau D3.js untuk grafik

## Rekomendasi untuk Workshop

Untuk workshop, saya rekomendasikan:

1. **Grafana Cloud (Paling Mudah)**

   - Free tier cukup untuk workshop
   - Setup cepat
   - Tidak perlu maintenance server

2. **Install Manual (Untuk Learning)**

   - Lebih memahami cara kerja monitoring
   - Kontrol penuh
   - Cocok untuk production

3. **Package Manager (Untuk Development)**
   - Mudah diinstall
   - Update otomatis
   - Cocok untuk development environment

## Setup Grafana Cloud (Rekomendasi)

1. Daftar di Grafana Cloud
2. Setup Prometheus remote write
3. Update konfigurasi di `src/lib/prometheus-metrics.ts`
4. Import dashboard JSON
5. Selesai!

Mau pilih opsi yang mana? Saya bisa bantu setup sesuai pilihan Anda.
