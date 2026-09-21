# Observability Platform Health Check

$ErrorActionPreference = "Stop"

$overallHealthy = $true

Write-Host "=== Observability Platform Health Check ==="

Write-Host ""
Write-Host "[1] Checking Docker services..."

try {
    $services = docker compose ps --format json | ConvertFrom-Json

    if ($services.Count -gt 0) {
        Write-Host "[PASS] Docker services are running"
    } else {
        Write-Host "[FAIL] No Docker services are running"
        $overallHealthy = $false
    }
}
catch {
    Write-Host "[FAIL] Docker services check failed"
    $overallHealthy = $false
}

Write-Host ""
Write-Host "[2] Checking application health..."

try {
    $response = Invoke-RestMethod "http://localhost:8081/health"

    if ($response.status -eq "UP") {
        Write-Host "[PASS] Application health"
    } else {
        Write-Host "[FAIL] Application health"
        $overallHealthy = $false
    }
}
catch {
    Write-Host "[FAIL] Application health"
    $overallHealthy = $false
}

Write-Host ""
Write-Host "[3] Checking Prometheus..."

try {
    $prometheus = Invoke-RestMethod "http://localhost:9090/-/ready"

    if ($prometheus -match "Prometheus Server is Ready") {
        Write-Host "[PASS] Prometheus"
    } else {
        Write-Host "[FAIL] Prometheus"
        $overallHealthy = $false
    }
}
catch {
    Write-Host "[FAIL] Prometheus"
    $overallHealthy = $false
}

Write-Host ""
Write-Host "[4] Checking Grafana..."

try {
    $grafana = Invoke-WebRequest "http://localhost:3100/api/health" -UseBasicParsing

    if ($grafana.StatusCode -eq 200) {
        Write-Host "[PASS] Grafana"
    } else {
        Write-Host "[FAIL] Grafana"
        $overallHealthy = $false
    }
}
catch {
    Write-Host "[FAIL] Grafana"
    $overallHealthy = $false
}

Write-Host ""

if ($overallHealthy) {
    Write-Host "Overall status: HEALTHY"
    exit 0
} else {
    Write-Host "Overall status: UNHEALTHY"
    exit 1
}