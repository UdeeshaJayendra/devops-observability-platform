const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");

const traceExporter = new OTLPTraceExporter({
  url: "http://tempo:4318/v1/traces"
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();

console.log("OpenTelemetry tracing initialized");