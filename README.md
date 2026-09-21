# DevOps Observability Platform

> An end-to-end local observability platform for monitoring applications, containers, Windows infrastructure, logs, alerts, and distributed traces — with CI/CD, infrastructure as code, configuration management, security hardening, incident simulation, and operational automation.

![Project Status](https://img.shields.io/badge/status-complete-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker\&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-monitoring-E6522C?logo=prometheus\&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-dashboards-F46800?logo=grafana\&logoColor=white)
![Loki](https://img.shields.io/badge/Loki-logging-2C2C2C?logo=grafana\&logoColor=white)
![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-tracing-425CC7?logo=opentelemetry\&logoColor=white)

---

## Overview

The **DevOps Observability Platform** is a local-first monitoring and troubleshooting environment designed to demonstrate how modern DevOps and system administration teams can observe an application and its infrastructure from a single platform.

The platform collects and visualizes:

* Application metrics
* Container metrics
* Windows host metrics
* Application logs
* Infrastructure logs
* Prometheus alerts
* Distributed traces

It also demonstrates operational practices including:

* Docker security hardening
* CI/CD validation
* Container vulnerability scanning
* Terraform infrastructure provisioning
* Ansible configuration management
* Incident simulation
* Incident response documentation
* PowerShell health-check automation

The project follows an operational workflow:
<img width="960" height="1096" alt="Gemini_Generated_Image_l1sv85l1sv85l1sv" src="https://github.com/user-attachments/assets/f798b173-4daf-472c-85c8-4410ad40cc00" />


```text

        Windows Host ──► Windows Exporter ──► Prometheus

        Containers ────► cAdvisor ──────────► Prometheus

        Prometheus ────► Alertmanager

        GitHub ─────────► GitHub Actions ──► CI + Trivy

        Terraform ─────► Docker Infrastructure

        Ansible ───────► Configuration Management
```

---

## Why This Project?

A production system can fail in many different ways:

* The application can become unavailable.
* CPU usage can increase unexpectedly.
* Containers can restart.
* HTTP 500 errors can increase.
* Disk usage can approach capacity.
* Application logs can reveal failures.
* A request can become slow because of a downstream dependency.

Monitoring only one signal is often insufficient.

This project demonstrates the **three major observability signals**:

| Signal  | Technology            | Purpose                                  |
| ------- | --------------------- | ---------------------------------------- |
| Metrics | Prometheus            | Measure system and application behaviour |
| Logs    | Loki + Alloy          | Investigate events and errors            |
| Traces  | OpenTelemetry + Tempo | Follow requests through the application  |

Grafana provides a central interface for investigating these signals.

---

# Architecture

## Core Components

### Application

**Node.js + Express**

The application exposes:



The application provides:

* Prometheus metrics
* HTTP request metrics
* HTTP request latency metrics
* Structured JSON logs
* OpenTelemetry tracing
* Health endpoint
* Controlled incident-test endpoints

---

### Prometheus

Prometheus collects metrics from:

* Node.js application
* cAdvisor
* Windows Exporter

Prometheus also evaluates alerting rules.

---

### Grafana

Grafana provides dashboards for:

* HTTP request rate
* HTTP latency
* HTTP errors
* Container CPU
* Container memory
* Container network traffic
* Container restarts
* Windows CPU
* Windows memory
* Windows disk usage
* Windows network traffic

---

### cAdvisor

cAdvisor collects container-level resource metrics including:

* CPU
* Memory
* Network traffic
* Container restarts

---

### Windows Exporter

Windows Exporter exposes Windows host metrics for Prometheus.

The project monitors:

* CPU usage
* Memory usage
* Disk usage
* Network traffic

---

### Loki + Grafana Alloy

Grafana Alloy collects Docker container logs and forwards them to Loki.
This allows application and container logs to be searched from Grafana.

---

### Alertmanager

Prometheus sends alerts to Alertmanager.
The project currently demonstrates an application availability alert:

```text
ApplicationDown
```

---

### OpenTelemetry + Tempo

OpenTelemetry instruments the Node.js application.
Trace data is exported to Tempo using OTLP.
Grafana can then be used to investigate application traces.

---

# Observability Workflow

The platform follows this troubleshooting workflow:


The incident response process is documented in:


---

# Monitoring

## Prometheus Targets

The Prometheus server monitors:

* Observability demo application
* cAdvisor
* Windows Exporter

<img width="1917" height="336" alt="03-prometheus-target-up png" src="https://github.com/user-attachments/assets/bd02e8d3-42fa-441d-b105-008d8f2b3bdd" />

---

## Application Request Metrics

Prometheus collects application HTTP request metrics.

<img width="1917" height="422" alt="04-prometheus-http-request-rate png" src="https://github.com/user-attachments/assets/9b5d3f29-8adf-4f13-99cd-d986fd06e58c" />

Grafana provides the corresponding visualization:

<img width="1917" height="891" alt="05-grafana-http-request-rate png" src="https://github.com/user-attachments/assets/d5ca9842-25a3-449f-b4d3-768a95010712" />

---

## Application Latency

HTTP request latency is calculated from Prometheus histogram metrics.

<img width="1913" height="901" alt="06-grafana-http-request-latency png" src="https://github.com/user-attachments/assets/4073c552-057b-481c-90bc-9ebd4a1f99fd" />

---

## Application Error Rate

HTTP 5xx responses can be monitored using PromQL.

<img width="1917" height="862" alt="07-grafana-http-error-rate png" src="https://github.com/user-attachments/assets/896acdc3-3e9e-4e09-97c1-42c43a84c841" />

---

# Container Monitoring

cAdvisor provides container-level metrics.

## cAdvisor Target

<img width="1917" height="555" alt="08-prometheus-cadvisor-target-up png" src="https://github.com/user-attachments/assets/e0d7168c-dd60-4b3c-b263-163b255c78d8" />

## Container CPU

<img width="1917" height="887" alt="09-grafana-container-cpu-usage png" src="https://github.com/user-attachments/assets/c3f4c801-8e2f-42f9-bffb-4d09cb5e6d63" />

## Container Memory

<img width="1915" height="911" alt="10-grafana-container-memory-usage png" src="https://github.com/user-attachments/assets/8be91d4f-0357-4b46-8cfd-71203227e68c" />

## Container Network Receive

<img width="1903" height="906" alt="11-grafana-container-network-receive png" src="https://github.com/user-attachments/assets/ebfc8898-2ff4-44d6-ab02-5c6e02a13938" />

## Container Network Transmit

<img width="1917" height="911" alt="12-grafana-container-network-transmit png" src="https://github.com/user-attachments/assets/e6c4fb2a-d9ec-4191-bc3e-0d831ba61022" />

## Container Restarts

<img width="1917" height="903" alt="14-grafana-container-restarts png" src="https://github.com/user-attachments/assets/870959cf-57df-405d-914a-f0fd70af1ba9" />

## Dashboard Overview

<img width="1917" height="892" alt="13-grafana-dashboards-overview png" src="https://github.com/user-attachments/assets/5863f209-5869-43bc-a384-072ef01ba723" />

---

# Windows Host Monitoring

Windows Exporter provides host-level metrics to Prometheus.

## Windows CPU

<img width="1917" height="910" alt="15-grafana-windows-cpu-usage png" src="https://github.com/user-attachments/assets/cae46e60-2752-4c71-bea6-cbcd9807356e" />

## Windows Prometheus Target

<img width="1917" height="667" alt="15-prometheus-windows-target-up png" src="https://github.com/user-attachments/assets/d225c7fe-8b18-485f-92e7-0fab9bc2140f" />

## Windows Memory

<img width="1916" height="910" alt="16-grafana-windows-memory-usage png" src="https://github.com/user-attachments/assets/6c1698b6-f6e3-4799-a22a-b1b90319c7f1" />

## Windows Disk

<img width="1917" height="922" alt="17-grafana-windows-disk-usage png" src="https://github.com/user-attachments/assets/742275a6-1476-44ac-a065-7615a9436d07" />

## Windows Network Receive

<img width="1917" height="901" alt="18-grafana-windows-network-receive png" src="https://github.com/user-attachments/assets/c04aa5d7-ddcf-49fd-9582-cc628e8b0ac3" />

## Windows Network Transmit

<img width="1915" height="916" alt="19-grafana-windows-network-transmit png" src="https://github.com/user-attachments/assets/fddff8c5-bb11-420c-85df-735721f6d57a" />

---

# Centralized Logging

Grafana Alloy discovers Docker containers and forwards their logs to Loki.

## Alloy

<img width="1917" height="430" alt="20-alloy-components-healthy png" src="https://github.com/user-attachments/assets/e875750b-f27a-465f-8615-d3fb24904d60" />

## Loki Logs in Grafana

Application and container logs can be searched directly from Grafana.

<img width="1917" height="852" alt="21-grafana-loki-container-logs png" src="https://github.com/user-attachments/assets/498da8f2-cdf0-4cd2-811f-182fb2e6f691" />

---

# Alerting

Prometheus evaluates alert rules and sends firing alerts to Alertmanager.
The project includes an application availability alert:


## Alert Rule

<img width="1916" height="508" alt="22-prometheus-alert-rule-loaded png" src="https://github.com/user-attachments/assets/31b0591e-9e9f-4603-8e9e-02bd7f1c3ac6" />

## Application Target Down

<img width="1917" height="800" alt="24-prometheus-app-target-down png" src="https://github.com/user-attachments/assets/85630821-b460-4d7a-a1ca-7c6ca09e53f0" />

## Application Down Alert

<img width="1917" height="635" alt="25-prometheus-application-down-firing png" src="https://github.com/user-attachments/assets/844250b6-927b-42cc-8576-803cbb6dc201" />

The application was subsequently recovered and the monitoring system returned to the healthy state.

---

# Distributed Tracing

The Node.js application is instrumented using OpenTelemetry.
Trace data is exported using OTLP to Tempo.
The tracing workflow is:


<img width="1917" height="877" alt="28-grafana-tempo-trace png" src="https://github.com/user-attachments/assets/4e340122-18de-4003-89a9-923740aaa328" />

---

# Grafana Dashboard Provisioning

Grafana provisioning was implemented to demonstrate infrastructure-based dashboard configuration.



A provisioned dashboard was validated successfully.

<img width="1917" height="891" alt="27-grafana-provisioned-container-cpu-usage png" src="https://github.com/user-attachments/assets/2ba10d8a-8eb3-4b2b-a31c-4e4f8e9e06d0" />

---

# Incident Simulation

The platform includes controlled incident scenarios to demonstrate real troubleshooting workflows.

## Application Outage

The application container was stopped and Prometheus detected the target as unavailable.
The alerting workflow was then verified.

## High CPU Usage

The application includes a controlled CPU-load endpoint:
Concurrent requests were used to generate CPU load.
The resulting container CPU increase was visible in Grafana.

## HTTP 500 Error

The application includes:


This endpoint intentionally returns HTTP 500.
Prometheus records the error:

<img width="1917" height="376" alt="38-prometheus-http-500-error-counter png" src="https://github.com/user-attachments/assets/b1f90c0c-2036-4487-81ab-79486d5a3ee0" />

The corresponding application error was also investigated through Loki.

---

# Incident Response

The project includes an incident-response runbook:



The workflow covers:

1. Check service status
2. Check application health
3. Check Prometheus targets
4. Investigate metrics
5. Investigate logs
6. Investigate traces
7. Recover the service
8. Verify recovery

This demonstrates an operational troubleshooting process rather than only dashboard creation.

---

# Docker Reliability

The Docker environment includes:

* Restart policies
* Health checks
* Persistent volumes
* Pinned image digests
* `.dockerignore`
* Non-root application execution

The complete observability stack can be viewed with:

```powershell
docker compose ps
```

<img width="1578" height="508" alt="30-docker-observability-stack-running png" src="https://github.com/user-attachments/assets/a22ad50b-c7b9-46e3-bbeb-8c4e7fbe38c8" />

---

# Container Security

The application container was hardened using several Docker security controls.

## Non-root User

The application runs as:



The final container configuration was verified directly through Docker.

---

# Vulnerability Scanning

Trivy is integrated into the GitHub Actions pipeline.

The CI process:

1. Installs application dependencies
2. Builds the Docker image
3. Inspects the image
4. Scans the image for HIGH and CRITICAL vulnerabilities

Unfixed vulnerabilities are ignored to prevent unavailable upstream fixes from blocking the pipeline.

The runtime image was also validated locally after hardening.

---

# CI/CD

GitHub Actions validates the application and Docker image.

The pipeline performs:

```text
Git Push / Pull Request
        │
        ▼
GitHub Actions
        │
        ├── Checkout
        │
        ├── Node.js Setup
        │
        ├── npm ci
        │
        ├── Docker Build
        │
        ├── Docker Image Verification
        │
        └── Trivy Security Scan
```

<img width="1913" height="517" alt="40-github-actions-ci-success png" src="https://github.com/user-attachments/assets/be0d2ff2-bab5-42d6-bc68-10b53cecc910" />

---

# Infrastructure as Code

Terraform is used to demonstrate infrastructure provisioning.
Current local infrastructure includes the Docker network:


The final Terraform plan was verified with no pending changes.

---

# Configuration Management

Ansible is used to demonstrate configuration management.

The Ansible playbook:

* Creates a managed configuration directory
* Creates an application configuration file
* Applies the expected configuration

Example execution:


The playbook was executed successfully.

---

# Automation

A PowerShell health-check script is included:

```text
scripts/
└── health-check.ps1
```

Run it with:


The script verifies:

* Docker services
* Application health
* Prometheus
* Grafana

Example:

```text
=== Observability Platform Health Check ===

[1] Checking Docker services...
[PASS] Docker services are running

[2] Checking application health...
[PASS] Application health

[3] Checking Prometheus...
[PASS] Prometheus

[4] Checking Grafana...
[PASS] Grafana

Overall status: HEALTHY
```
```
```

# Technology Stack

| Category                 | Technology             |
| ------------------------ | ---------------------- |
| Application              | Node.js, Express       |
| Containers               | Docker, Docker Compose |
| Metrics                  | Prometheus             |
| Dashboards               | Grafana                |
| Container Monitoring     | cAdvisor               |
| Windows Monitoring       | Windows Exporter       |
| Logging                  | Loki                   |
| Log Collection           | Grafana Alloy          |
| Alerting                 | Alertmanager           |
| Tracing                  | OpenTelemetry          |
| Trace Storage            | Grafana Tempo          |
| CI/CD                    | GitHub Actions         |
| Security Scanning        | Trivy                  |
| Infrastructure as Code   | Terraform              |
| Configuration Management | Ansible                |
| Automation               | PowerShell             |
| Version Control          | Git / GitHub           |

---

---

# Author

**Udeesha Jayendra**

