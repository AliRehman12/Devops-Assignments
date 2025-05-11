
# Observability Implementation

This document outlines the implementation of observability in the Cloud Watch Tower application using OpenTelemetry and Prometheus/Grafana.

## Tools Used

1. **OpenTelemetry**: Used for collecting application metrics, traces, and logs
2. **Prometheus**: Used as the metrics backend for storing time-series data
3. **Grafana**: Used for visualization of metrics and creating dashboards

## Implementation Details

### OpenTelemetry Setup

The application uses OpenTelemetry for instrumenting the code. The setup is in `src/instrumentation/otelSetup.ts`:

- Creates a meter for custom metrics
- Sets up HTTP request counters, error counters, and latency histograms
- Configures auto-instrumentation for Express and HTTP modules
- Exports metrics to Prometheus and traces to an OTLP collector

### Express Middleware

A custom middleware (`src/middleware/telemetryMiddleware.ts`) is used to:
- Track request counts with labels (method, route, status code)
- Measure request latency
- Track error rates (4xx and 5xx responses)

### Metrics Collected

1. **HTTP Request Rate**: Total number of requests per second
   - Labels: method, route, status code

2. **Error Rate**: Rate of 4xx and 5xx responses
   - Labels: method, route, status code, error type

3. **Latency**: Request duration in milliseconds
   - P95 and P99 percentiles can be calculated in Prometheus/Grafana
   - Labels: method, route, status code

4. **Custom App-Level Metrics**: Additional metrics can be implemented as needed

## Kubernetes Deployment

The monitoring stack is deployed as follows:

1. **OpenTelemetry Collector**:
   - Receives traces and metrics from the application
   - Exports metrics to Prometheus
   - Configuration in `k8s/monitoring/otel-collector.yaml`

2. **Prometheus**:
   - Scrapes metrics from the OpenTelemetry collector
   - Configuration in `k8s/monitoring/prometheus-operator.yaml`

3. **Grafana**:
   - Connects to Prometheus as a data source
   - Pre-configured dashboards can be imported
   - Configuration in `k8s/monitoring/grafana.yaml`

## Accessing Dashboards

Once deployed, Grafana dashboards can be accessed at:
- `http://<cluster-ip>/grafana`

Default login:
- Username: admin
- Password: admin (should be changed in production)

## Sample Grafana Dashboards

Create the following dashboards in Grafana:

1. **HTTP Overview Dashboard**:
   - Request rate panel
   - Error rate panel
   - Latency percentiles (p50, p95, p99)
   - Requests by endpoint

2. **Error Analysis Dashboard**:
   - Error breakdown by status code
   - Error breakdown by endpoint
   - Error rate timeline

## Configuration Files

All configuration files for the observability stack are stored in the `k8s/monitoring/` directory.
