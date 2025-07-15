@echo off
echo ========================================
echo Setup Monitoring - Prometheus & Grafana
echo ========================================
echo.

echo Step 1: Checking if Prometheus is installed...
where prometheus >nul 2>nul
if %errorlevel% neq 0 (
    echo Prometheus not found. Please install it first:
    echo 1. Download from: https://prometheus.io/download/
    echo 2. Extract to C:\prometheus
    echo 3. Add C:\prometheus to PATH
    echo.
    pause
    exit /b 1
)

echo Step 2: Checking if Grafana is installed...
where grafana-server >nul 2>nul
if %errorlevel% neq 0 (
    echo Grafana not found. Please install it first:
    echo 1. Download from: https://grafana.com/grafana/download
    echo 2. Install Grafana
    echo 3. Add to PATH if needed
    echo.
    pause
    exit /b 1
)

echo Step 3: Starting Prometheus...
start /B prometheus.exe --config.file=prometheus.yml --storage.tsdb.path=./prometheus-data

echo Step 4: Starting Grafana...
start /B grafana-server.exe

echo Step 5: Opening Grafana Cloud registration...
start https://grafana.com/auth/sign-up/create-user

echo Step 6: Opening local Grafana...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo Step 7: Opening Prometheus...
timeout /t 3 /nobreak >nul
start http://localhost:9090

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Services running:
echo - Prometheus: http://localhost:9090
echo - Grafana: http://localhost:3000 (admin/admin)
echo - Grafana Cloud: https://grafana.com/auth/sign-up/create-user
echo.
echo Next steps:
echo 1. Register at Grafana Cloud
echo 2. Add Prometheus as data source
echo 3. Import dashboard from grafana/dashboards/workshop-dashboard.json
echo 4. Start your Next.js app: npm run dev
echo.
pause 