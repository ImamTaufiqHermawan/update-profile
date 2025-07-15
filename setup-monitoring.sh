#!/bin/bash

echo "========================================"
echo "Setup Monitoring - Prometheus & Grafana"
echo "========================================"
echo

# Check if Prometheus is installed
if ! command -v prometheus &> /dev/null; then
    echo "Prometheus not found. Please install it first:"
    echo "1. Download from: https://prometheus.io/download/"
    echo "2. Extract to /usr/local/bin or add to PATH"
    echo "3. Or use package manager:"
    echo "   - Ubuntu/Debian: sudo apt install prometheus"
    echo "   - macOS: brew install prometheus"
    echo
    exit 1
fi

# Check if Grafana is installed
if ! command -v grafana-server &> /dev/null; then
    echo "Grafana not found. Please install it first:"
    echo "1. Download from: https://grafana.com/grafana/download"
    echo "2. Or use package manager:"
    echo "   - Ubuntu/Debian: sudo apt install grafana"
    echo "   - macOS: brew install grafana"
    echo
    exit 1
fi

echo "Step 1: Creating data directories..."
mkdir -p prometheus-data
mkdir -p grafana-data

echo "Step 2: Starting Prometheus..."
prometheus --config.file=prometheus.yml --storage.tsdb.path=./prometheus-data &
PROMETHEUS_PID=$!

echo "Step 3: Starting Grafana..."
grafana-server --homepath=/usr/share/grafana --config=/etc/grafana/grafana.ini &
GRAFANA_PID=$!

echo "Step 4: Waiting for services to start..."
sleep 5

echo "Step 5: Opening Grafana Cloud registration..."
if command -v xdg-open &> /dev/null; then
    xdg-open https://grafana.com/auth/sign-up/create-user
elif command -v open &> /dev/null; then
    open https://grafana.com/auth/sign-up/create-user
else
    echo "Please open: https://grafana.com/auth/sign-up/create-user"
fi

echo "Step 6: Opening local Grafana..."
sleep 3
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
elif command -v open &> /dev/null; then
    open http://localhost:3000
else
    echo "Please open: http://localhost:3000"
fi

echo "Step 7: Opening Prometheus..."
sleep 2
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:9090
elif command -v open &> /dev/null; then
    open http://localhost:9090
else
    echo "Please open: http://localhost:9090"
fi

echo
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo
echo "Services running:"
echo "- Prometheus: http://localhost:9090"
echo "- Grafana: http://localhost:3000 (admin/admin)"
echo "- Grafana Cloud: https://grafana.com/auth/sign-up/create-user"
echo
echo "Next steps:"
echo "1. Register at Grafana Cloud"
echo "2. Add Prometheus as data source"
echo "3. Import dashboard from grafana/dashboards/workshop-dashboard.json"
echo "4. Start your Next.js app: npm run dev"
echo
echo "To stop services, run:"
echo "kill $PROMETHEUS_PID $GRAFANA_PID"
echo

# Function to cleanup on exit
cleanup() {
    echo "Stopping services..."
    kill $PROMETHEUS_PID $GRAFANA_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

echo "Press Ctrl+C to stop services"
wait 