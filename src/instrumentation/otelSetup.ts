
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';
import { metrics } from '@opentelemetry/api';

// Configure the SDK for metrics collection
const prometheusExporter = new PrometheusExporter({
  endpoint: '/metrics',
});

// Create a meter provider for metrics
const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'cloud-watch-tower',
  }),
});

// Use ConsoleMetricExporter which implements PushMetricExporter
const metricReader = new PeriodicExportingMetricReader({
  exporter: new ConsoleMetricExporter(),
  exportIntervalMillis: 1000,
});

// Register the prometheus exporter directly (it manages its own HTTP server)
meterProvider.addMetricReader(metricReader);

// Also register the Prometheus exporter which doesn't use PeriodicExportingMetricReader
// because it's pull-based not push-based
meterProvider.addMetricReader(prometheusExporter);

// Set the global meter provider
metrics.setGlobalMeterProvider(meterProvider);

// Create a global meter to register metrics
export const meter = metrics.getMeter('cloud-watch-tower-metrics');

// Create HTTP request counter
export const httpRequestCounter = meter.createCounter('http.requests', {
  description: 'Count of HTTP requests',
});

// Create HTTP error counter
export const httpErrorCounter = meter.createCounter('http.errors', {
  description: 'Count of HTTP errors',
});

// Create HTTP latency histogram
export const httpLatencyHistogram = meter.createHistogram('http.latency', {
  description: 'Latency of HTTP requests in ms',
});

// Configure the SDK to export traces to OTLP collector
const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
});

// Create and register the OpenTelemetry SDK
export const otelSDK = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'cloud-watch-tower',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

// Start the SDK
export function startInstrumentation() {
  try {
    otelSDK.start();
    console.log('Tracing initialized');
  } catch (error) {
    console.log('Error initializing tracing', error);
  }
  
  console.log('OpenTelemetry instrumentation started');
  console.log('Prometheus metrics available at http://localhost:9464/metrics');
}
