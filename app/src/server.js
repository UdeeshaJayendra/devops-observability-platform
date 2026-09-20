const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 3000;

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});

const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequests);
register.registerMetric(httpDuration);

app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const duration = process.hrtime(start);
    const seconds = duration[0] + duration[1] / 1e9;

    console.log(
      JSON.stringify({
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode,
        duration_seconds: seconds
      })
    );

    httpRequests.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });

    httpDuration.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode
      },
      seconds
    );
  });

  next();
});

app.get("/", (req, res) => {
  res.json({
    service: "observability-demo-app",
    status: "healthy"
  });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from the Observability Platform"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

app.get("/api/test/cpu", (req, res) => {
  const start = Date.now();

  while (Date.now() - start < 10000) {
    Math.sqrt(Math.random() * Math.random());
  }

  res.json({
    message: "CPU load test completed"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});