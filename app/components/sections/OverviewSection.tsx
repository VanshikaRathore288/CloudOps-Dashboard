export default function OverviewSection() {
  const statCards = [
    {
      id: "stat-app-status",
      label: "App Status",
      value: "Healthy",
      sub: "All services responding",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      iconBg: "var(--accent-green-subtle)",
      iconColor: "var(--status-online)",
      pill: { label: "Operational", type: "online" as const },
    },
    {
      id: "stat-deploy-status",
      label: "Last Deploy",
      value: "v1.4.2",
      sub: "2 hours ago · main",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
        </svg>
      ),
      iconBg: "var(--accent-blue-subtle)",
      iconColor: "var(--accent-blue)",
      pill: { label: "Success", type: "online" as const },
    },
    {
      id: "stat-environment",
      label: "Environment",
      value: "Production",
      sub: "AWS EC2 · us-east-1",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      iconBg: "var(--accent-purple-subtle)",
      iconColor: "var(--accent-purple)",
      pill: { label: "Active", type: "purple" as const },
    },
    {
      id: "stat-uptime",
      label: "Uptime (30d)",
      value: "99.7%",
      sub: "~2h downtime this month",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      iconBg: "var(--accent-green-subtle)",
      iconColor: "var(--status-online)",
      pill: { label: "Good", type: "online" as const },
    },
  ];

  const recentEvents = [
    { id: "ev1", time: "13:42 UTC", event: "Deployment v1.4.2 completed successfully", status: "online" },
    { id: "ev2", time: "11:15 UTC", event: "Health check passed — all endpoints returning 200", status: "online" },
    { id: "ev3", time: "09:30 UTC", event: "SSL certificate auto-renewed (Let's Encrypt)", status: "info" },
    { id: "ev4", time: "Yesterday", event: "Scheduled maintenance window completed", status: "info" },
    { id: "ev5", time: "2d ago", event: "High memory alert resolved (restarted container)", status: "warning" },
  ];

  const buildInfo = [
    { label: "Git Branch", value: "main" },
    { label: "Commit SHA", value: "a3f9d21" },
    { label: "Build #", value: "#87" },
    { label: "Node.js", value: "20.x LTS" },
    { label: "Framework", value: "Next.js 15.1.4" },
    { label: "Container", value: "Docker on EC2" },
  ];

  return (
    <div>
      <div className="alert-banner info" role="status">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        All metrics and status indicators below are <strong>&nbsp;sample data&nbsp;</strong>. Connect real infrastructure to display live values.
      </div>

      {/* Stat cards */}
      <div className="stat-grid" role="region" aria-label="Key metrics">
        {statCards.map((card) => (
          <div className="stat-card" key={card.id} id={card.id}>
            <div className="stat-card-header">
              <span className="stat-card-label">{card.label}</span>
              <div
                className="stat-card-icon"
                style={{ background: card.iconBg, color: card.iconColor }}
                aria-hidden="true"
              >
                {card.icon}
              </div>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className="stat-card-sub">{card.sub}</div>
            <div style={{ marginTop: 8 }}>
              <span className={`status-pill ${card.pill.type}`}>
                <span className="status-dot" aria-hidden="true" />
                {card.pill.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-cols-3-1">
        {/* Recent Events */}
        <div className="card" role="region" aria-label="Recent events">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Recent Events
            </span>
            <span className="demo-notice">SAMPLE</span>
          </div>
          <div className="card-body">
            {recentEvents.map((ev) => (
              <div className="metric-row" key={ev.id} id={ev.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className={`status-pill ${ev.status}`} style={{ minWidth: 8, padding: "3px 3px" }}>
                    <span className="status-dot" style={{ margin: 0 }} aria-hidden="true" />
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{ev.event}</span>
                </div>
                <span style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", marginLeft: 12 }}>
                  {ev.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Build Info */}
        <div className="card" role="region" aria-label="Build information">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Build Info
            </span>
          </div>
          <div className="card-body">
            {buildInfo.map((item, i) => (
              <div className="info-row" key={i}>
                <span className="info-row-label">{item.label}</span>
                <span className="info-row-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
