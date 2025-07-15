# 📊 Prometheus + Grafana Monitoring Guide

This guide explains how to use Prometheus and Grafana for comprehensive monitoring of API, database, and frontend performance.

## 🎯 Overview

The monitoring system provides:

- **Real-time metrics collection** using Prometheus
- **Beautiful dashboards** with Grafana
- **Industry-standard monitoring** for production use
- **Comprehensive coverage** of API, database, and frontend metrics

## 🚀 Quick Start

### 1. Start the Monitoring Stack

```bash
# Start Prometheus + Grafana
npm run monitoring

# Or manually
docker-compose -f docker-compose.monitoring.yml up -d
```

### 2. Access the Monitoring Tools

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin123)
- **App Metrics**: http://localhost:3000/api/metrics
- **JSON Metrics**: http://localhost:3000/api/metrics/json

### 3. Stop Monitoring

```bash
npm run monitoring-stop
```

## 📊 Metrics Coverage

### Database Metrics

- Query execution time
- Query success/error rates
- Row count per query
- Query type (before/after optimization)

### API Metrics

- Request duration
- Request count by endpoint
- Status code distribution
- Response size
- User agent tracking

### Frontend Metrics

- Component render time
- User interaction duration
- Memory usage
- Operation success rates

## 🔧 Prometheus Configuration

### Metrics Endpoint

The application exposes metrics at `/api/metrics` in Prometheus format:

```
# HELP api_request_duration_seconds API request duration
# TYPE api_request_duration_seconds histogram
api_request_duration_seconds{endpoint="/api/users",method="GET",status_code="200"} 0.123
```

### Scraping Configuration

Prometheus scrapes metrics every 10 seconds from:

- `http://localhost:3000/api/metrics`

## 📈 Grafana Dashboard

### Pre-configured Panels

1. **API Request Duration**

   - Average response time by endpoint
   - Method-specific performance

2. **Database Query Duration**

   - Query performance comparison
   - Before/after optimization metrics

3. **Request Count**

   - API call frequency
   - Status code distribution

4. **Error Rate**

   - API error monitoring
   - Database error tracking

5. **Component Performance**

   - Frontend render times
   - User interaction metrics

6. **Memory Usage**
   - Component memory consumption
   - Application memory trends

## 🎯 Workshop Practice Scenarios

### 1. Database Performance Monitoring

**Before Optimization:**

```bash
# Run bad queries and watch metrics
curl "http://localhost:3000/api/users?type=before"
```

**After Optimization:**

```bash
# Run optimized queries and compare
curl "http://localhost:3000/api/users-optimized?type=after"
```

**Monitor in Grafana:**

- Database Query Duration panel
- Compare before/after performance
- Analyze error rates

### 2. API Performance Analysis

**Load Testing:**

```bash
# Generate load for monitoring
for i in {1..100}; do
  curl "http://localhost:3000/api/users"
  sleep 0.1
done
```

**Monitor in Grafana:**

- API Request Duration panel
- Request Count trends
- Error rate analysis

### 3. Frontend Performance Tracking

**Component Monitoring:**

```typescript
// Use Prometheus metrics in components
import { prometheusMetrics } from "@/lib/prometheus-metrics";

// Record component render time
prometheusMetrics.recordComponentRender("UserList", renderTime, "mount");
```

## 🔍 Prometheus Queries

### Useful PromQL Queries

**API Request Rate:**

```promql
rate(api_requests_total[5m])
```

**Average API Response Time:**

```promql
rate(api_request_duration_seconds_sum[5m]) / rate(api_request_duration_seconds_count[5m])
```

**Database Query Success Rate:**

```promql
rate(database_queries_total{status="success"}[5m]) / rate(database_queries_total[5m])
```

**Error Rate:**

```promql
rate(api_requests_total{status_code=~"5.."}[5m])
```

## 🎨 Custom Dashboards

### Creating Custom Panels

1. **Open Grafana** at http://localhost:3001
2. **Create new dashboard**
3. **Add panel** with PromQL queries
4. **Configure visualization** (graph, table, etc.)

### Example Custom Queries

**Performance Comparison:**

```promql
# Before vs After optimization
rate(database_query_duration_seconds_sum{query_type="before"}[5m]) /
rate(database_query_duration_seconds_count{query_type="before"}[5m])

vs

rate(database_query_duration_seconds_sum{query_type="after"}[5m]) /
rate(database_query_duration_seconds_count{query_type="after"}[5m])
```

**Component Performance:**

```promql
# Component render times
rate(component_render_duration_seconds_sum[5m]) /
rate(component_render_duration_seconds_count[5m])
```

## 🚨 Alerts (Optional)

### Setting up Alerts

1. **In Grafana:**

   - Create alert rules
   - Set thresholds
   - Configure notifications

2. **Example Alert Rules:**
   - API response time > 1s
   - Error rate > 5%
   - Database query time > 500ms

## 🔧 Advanced Configuration

### Custom Metrics

Add custom metrics in your code:

```typescript
import { prometheusMetrics } from "@/lib/prometheus-metrics";

// Custom business metrics
prometheusMetrics.recordCustomMetric("user_registrations_total", 1, {
  source: "web",
  campaign: "workshop",
});
```

### Metric Labels

Use labels for detailed analysis:

```typescript
// Database metrics with detailed labels
prometheusMetrics.recordDatabaseQuery(
  "users_query",
  executionTime,
  rowCount,
  "success",
  "before",
  {
    table: "users",
    operation: "select",
    complexity: "high",
  }
);
```

## 📚 Learning Resources

### Prometheus

- [Prometheus Documentation](https://prometheus.io/docs/)
- [PromQL Query Language](https://prometheus.io/docs/prometheus/latest/querying/)
- [Best Practices](https://prometheus.io/docs/practices/)

### Grafana

- [Grafana Documentation](https://grafana.com/docs/)
- [Dashboard Tutorials](https://grafana.com/tutorials/)
- [Panel Types](https://grafana.com/docs/grafana/latest/panels/)

## 🎓 Workshop Exercises

### Exercise 1: Basic Monitoring

1. Start the monitoring stack
2. Generate some load on your application
3. Observe metrics in Grafana
4. Identify performance bottlenecks

### Exercise 2: Performance Comparison

1. Run bad queries and record metrics
2. Implement optimizations
3. Run optimized queries
4. Compare performance in Grafana

### Exercise 3: Custom Dashboards

1. Create custom Grafana panels
2. Write PromQL queries
3. Set up alerts
4. Share dashboards with team

### Exercise 4: Load Testing

1. Generate realistic load
2. Monitor system performance
3. Analyze bottlenecks
4. Optimize based on metrics

## 🚀 Production Deployment

### Scaling Considerations

- Use external Prometheus for production
- Configure persistent storage
- Set up proper alerting
- Implement metric retention policies

### Security

- Secure Grafana with proper authentication
- Use HTTPS for all endpoints
- Implement metric access controls
- Regular security updates

## 📊 Benefits of This Approach

### Industry Standard

- Prometheus is the de facto monitoring standard
- Grafana is the leading visualization platform
- Production-ready monitoring solution

### Comprehensive Coverage

- API performance monitoring
- Database query analysis
- Frontend component tracking
- User interaction metrics

### Real-time Insights

- Live performance monitoring
- Instant alerting capabilities
- Historical trend analysis
- Capacity planning data

### Workshop Benefits

- Real-world monitoring experience
- Industry-standard tools
- Production-ready skills
- Comprehensive performance analysis
