\# Incident Response Runbook



\## Purpose



This runbook documents how to investigate and respond to common incidents in the DevOps Observability Platform.



The investigation process follows:



\*\*Detect â†’ Investigate â†’ Diagnose â†’ Recover â†’ Verify\*\*



\## Observability Sources



| Source | Purpose |

|---|---|

| Prometheus | Metrics, service health, alert rules |

| Grafana | Dashboards and visualization |

| Loki | Centralized application/container logs |

| Tempo | Distributed tracing |

| Alertmanager | Alert management |

| Docker | Container health and runtime status |

| Windows Exporter | Windows host metrics |

| cAdvisor | Container resource metrics |


## Incident Investigation Workflow


### 1. Check Service Status

docker compose ps

Check whether containers are running and whether healthchecks report healthy.


### 2. Check Application Health

curl.exe http://localhost:8081/health

Expected response:

{"status":"UP"}


### 3. Check Prometheus Targets

Open:
http://localhost:9090/targets

Verify that these targets are UP:
- observability-demo-app
- cadvisor
- windows


### 4. Investigate Metrics

Use Grafana dashboards or Prometheus queries to investigate:
- CPU usage
- Memory usage
- Disk usage
- Network traffic
- Request rate
- Request latency
- HTTP error rate
- Container restarts


### 5. Investigate Logs

In Grafana Explore with Loki, use:
{container="observability-demo-app"}

Search for errors, warnings, failed requests, or unexpected application behavior.


### 6. Investigate Traces

In Grafana Explore with Tempo, search recent traces to investigate:
- Slow requests
- Failed requests
- Request duration
- Application execution flow


### 7. Recover the Service

For an unhealthy service, restart the affected service:

docker compose restart <service>

Use the service name shown by docker compose ps.


### 8. Verify Recovery

docker compose ps

curl.exe http://localhost:8081/health

Confirm that the application is healthy and the Prometheus target returns to UP.


## Tested Incident Scenarios


### Application Outage

**Symptom:** Prometheus reports that the application target is down.

**Detection:**
- Prometheus target changes from UP to DOWN.
- The ApplicationDown alert fires after the configured 30-second duration.

**Investigation:**

docker compose ps

docker logs observability-demo-app

**Recovery:**
Restore the application container and verify its health.

**Verification:**

curl.exe http://localhost:8081/health

Confirm that the Prometheus application target returns to UP.


### High CPU Usage

**Symptom:** The application container consumes unusually high CPU.

**Test endpoint:**

/api/test/cpu

**Detection:**
Grafana container CPU monitoring shows increased CPU usage.

**Investigation:**

docker stats observability-demo-app

docker logs observability-demo-app

**Recovery:**
Allow the controlled CPU workload to complete and confirm that CPU usage returns toward normal levels.

**Verification:**
Check the container CPU dashboard and confirm that the application remains healthy.


### Application HTTP 500 Error

**Symptom:** The application returns an HTTP 500 response.

**Test endpoint:**

/api/test/error

**Detection:**
Prometheus records a request with HTTP status 500.

**Investigation:**

Prometheus query:

http_requests_total{route="/api/test/error",status="500"}

Loki query:

{container="observability-demo-app"} |= "Intentional test error"

**Verification:**
Confirm that the error is visible in both metrics and centralized logs.


