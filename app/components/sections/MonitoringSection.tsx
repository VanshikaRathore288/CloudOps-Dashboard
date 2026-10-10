// Generates a 90-day uptime bar pattern (static, deterministic)
function generateUptimeSegments(seed: number, total: number) {
  const segments = [];
  for (let i = 0; i < total; i++) {
    const r = (seed * (i + 1) * 2654435761) & 0xffffffff;
    const v = r % 100;
    if (v < 2) segments.push("down");
    else if (v < 6) segments.push("partial");
    else segments.push("up");
  }
  return segments;
}

const endpointSegments = generateUptimeSegments(42, 90);
const apiSegments = generateUptimeSegments(77, 90);
const staticSegments = generateUptimeSegments(13, 90);

export default function MonitoringSection() {
  const services = [
    {
      id: "mon-web",
      name: "Web Application",
      url: "https://app.example.com",
      status: "online" as const,
      responseTime: "142ms",
      uptime: "99.7%",
      segments: endpointSegments,
    },
    {
      id: "mon-api",
      name: "Health Check Endpoint",
      url: "/api/health",
      status: "online" as const,
      responseTime: "38ms",
      uptime: "99.9%",
      segments: apiSegments,
    },
    {
      id: "mon-static",
      name: "Static Assets (CloudFront)",
      url: "https://cdn.example.com",
      status: "online" as const,
      responseTime: "22ms",
      uptime: "100%",
      segments: staticSegments,
    },
  ];

  const metrics = [
    { id: "m-cpu", label: "CPU Utilisation", value: "34%", fill: 34, color: "" },
    { id: "m-mem", label: "Memory Usage", value: "1.1 GB / 2 GB", fill: 55, color: "" },
    { id: "m-disk", label: "Disk I/O", value: "12%", fill: 12, color: "" },
    { id: "m-net", label: "Network Out", value: "2.4 MB/s", fill: 24, color: "green" },
    { id: "m-req", label: "Requests / min", value: "~320", fill: 32, color: "" },
    { id: "m-err", label: "Error Rate", value: "0.1%", fill: 1, color: "green" },
  ];

  const recentAlerts = [
    { id: "a1", time: "2h ago", level: "INFO" as const, message: "Deployment completed. Container restarted cleanly." },
    { id: "a2", time: "14h ago", level: "WARN" as const, message: "Memory usage reached 78% — container auto-restarted after threshold." },
    { id: "a3", time: "2d ago", level: "ERROR" as const, message: "502 Bad Gateway for 4 min — EC2 instance reboot during patching." },
    { id: "a4", time: "3d ago", level: "INFO" as const, message: "SSL certificate renewed successfully. Expiry extended 90 days." },
    { id: "a5", time: "5d ago", level: "INFO" as const, message: "CloudFront cache purge triggered post-deployment." },
  ];

  return (
    <div>
      <div className="alert-banner info" role="note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Metrics and uptime history shown are <strong>&nbsp;sample data&nbsp;</strong>. Connect a real monitoring service (e.g. CloudWatch, Better Uptime, UptimeRobot) for live values.
      </div>

      {/* Uptime monitors */}
      <div className="card mb-16" role="region" aria-label="Uptime monitors">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            Uptime Monitors — 90-day history
          </span>
          <span className="demo-notice">SAMPLE</span>
        </div>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {services.map((svc) => (
            <div key={svc.id} id={svc.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{svc.name}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8, fontFamily: "monospace" }}>{svc.url}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Response: <strong style={{ color: "var(--text-secondary)" }}>{svc.responseTime}</strong></span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Uptime: <strong style={{ color: "var(--status-online)" }}>{svc.uptime}</strong></span>
                  <span className={`status-pill ${svc.status}`}>
                    <span className="status-dot" aria-hidden="true" />
                    Up
                  </span>
                </div>
              </div>
              <div className="uptime-bar" aria-label={`90-day uptime history for ${svc.name}`} role="img">
                {svc.segments.map((seg, i) => (
                  <div
                    key={i}
                    className={`uptime-segment ${seg}`}
                    title={seg === "up" ? "Up" : seg === "down" ? "Incident" : "Degraded"}
                    aria-label={seg}
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "var(--text-muted)" }}>
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text-muted)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: "var(--status-online)", borderRadius: 2, display: "inline-block" }} /> Up</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: "var(--status-warning)", borderRadius: 2, display: "inline-block" }} /> Degraded</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: "var(--status-error)", borderRadius: 2, display: "inline-block" }} /> Incident</span>
          </div>
        </div>
      </div>

      <div className="grid-cols-3-1">
        {/* Resource metrics */}
        <div className="card" role="region" aria-label="Resource utilisation">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              Resource Utilisation (EC2 t3.small)
            </span>
            <span className="demo-notice">SAMPLE</span>
          </div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {metrics.map((m) => (
              <div key={m.id} id={m.id} className="progress-bar-wrapper">
                <div className="progress-label">
                  <span>{m.label}</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{m.value}</span>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${m.color}`}
                    style={{ width: `${m.fill}%` }}
                    role="progressbar"
                    aria-valuenow={m.fill}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="card" role="region" aria-label="Recent alerts">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              Recent Alerts
            </span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {recentAlerts.map((a) => (
              <div key={a.id} id={a.id} style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-muted)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span className={`log-level ${a.level}`}>{a.level}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{a.message}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
