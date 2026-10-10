export default function DeploymentsSection() {
  type Result = "success" | "failed" | "rolled-back";

  const deployments: {
    id: string;
    build: string;
    version: string;
    commit: string;
    message: string;
    author: string;
    environment: string;
    started: string;
    duration: string;
    result: Result;
  }[] = [
    {
      id: "dep-87",
      build: "#87",
      version: "v1.4.2",
      commit: "a3f9d21",
      message: "feat: add health check endpoint and improve error handling",
      author: "Developer",
      environment: "production",
      started: "2026-10-10 11:40 UTC",
      duration: "3m 12s",
      result: "success",
    },
    {
      id: "dep-86",
      build: "#86",
      version: "v1.4.1",
      commit: "9cd42ae",
      message: "fix: correct environment variable injection in Dockerfile",
      author: "Developer",
      environment: "production",
      started: "2026-10-10 07:22 UTC",
      duration: "2m 58s",
      result: "success",
    },
    {
      id: "dep-84",
      build: "#84",
      version: "v1.4.0",
      commit: "5fe88bc",
      message: "feat: redesign dashboard UI and add infrastructure section",
      author: "Developer",
      environment: "production",
      started: "2026-10-09 15:10 UTC",
      duration: "3m 45s",
      result: "success",
    },
    {
      id: "dep-80",
      build: "#80",
      version: "v1.3.9",
      commit: "2da11ef",
      message: "chore: upgrade Next.js to 15.1.4",
      author: "Developer",
      environment: "production",
      started: "2026-10-08 09:05 UTC",
      duration: "4m 02s",
      result: "success",
    },
    {
      id: "dep-78",
      build: "#78",
      version: "v1.3.8",
      commit: "c9b44d1",
      message: "fix: resolve build error on M1 Docker cross-compilation",
      author: "Developer",
      environment: "production",
      started: "2026-10-07 14:30 UTC",
      duration: "1m 12s",
      result: "failed",
    },
    {
      id: "dep-76",
      build: "#76",
      version: "v1.3.7",
      commit: "e7c22a3",
      message: "feat: add Docker multi-stage build optimisation",
      author: "Developer",
      environment: "production",
      started: "2026-10-06 16:50 UTC",
      duration: "2m 30s",
      result: "success",
    },
    {
      id: "dep-72",
      build: "#72",
      version: "v1.3.5",
      commit: "f1d99b7",
      message: "config: switch base image to node:20-alpine",
      author: "Developer",
      environment: "production",
      started: "2026-10-05 10:00 UTC",
      duration: "5m 10s",
      result: "rolled-back",
    },
  ];

  const resultPill: Record<Result, { type: string; label: string }> = {
    success: { type: "online", label: "Success" },
    failed: { type: "error", label: "Failed" },
    "rolled-back": { type: "warning", label: "Rolled Back" },
  };

  const envColors: Record<string, string> = {
    production: "var(--accent-blue)",
    staging: "var(--accent-purple)",
    preview: "var(--accent-yellow)",
  };

  return (
    <div>
      <div className="alert-banner info" role="note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Deployment records below are <strong>&nbsp;sample data&nbsp;</strong> illustrating what a typical deployment audit trail looks like.
      </div>

      {/* Summary stats */}
      <div className="stat-grid mb-16" role="region" aria-label="Deployment statistics">
        {[
          { id: "dep-stat-total", label: "Total Deployments", value: "87", sub: "all time" },
          { id: "dep-stat-success", label: "Success Rate", value: "94.2%", sub: "last 30 days" },
          { id: "dep-stat-freq", label: "Deploy Frequency", value: "~2/day", sub: "7-day average" },
          { id: "dep-stat-rollback", label: "Rollbacks", value: "3", sub: "last 30 days" },
        ].map((s) => (
          <div className="stat-card" key={s.id} id={s.id}>
            <div className="stat-card-label" style={{ marginBottom: 8 }}>{s.label}</div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Deployments table */}
      <div className="card" role="region" aria-label="Deployment history">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Deployment Audit Log
          </span>
          <span className="demo-notice">SAMPLE DATA</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table" aria-label="Deployment history table">
            <thead>
              <tr>
                <th>Build</th>
                <th>Version</th>
                <th>Commit</th>
                <th>Change</th>
                <th>Environment</th>
                <th>Started</th>
                <th>Duration</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {deployments.map((dep) => {
                const pill = resultPill[dep.result];
                return (
                  <tr key={dep.id} id={dep.id}>
                    <td className="mono" style={{ color: "var(--text-secondary)" }}>{dep.build}</td>
                    <td className="mono" style={{ fontWeight: 600, color: "var(--text-primary)" }}>{dep.version}</td>
                    <td className="mono" style={{ color: "var(--accent-blue)" }}>{dep.commit}</td>
                    <td style={{ maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {dep.message}
                    </td>
                    <td>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: envColors[dep.environment] + "22",
                        color: envColors[dep.environment],
                        textTransform: "capitalize",
                      }}>
                        {dep.environment}
                      </span>
                    </td>
                    <td className="mono" style={{ whiteSpace: "nowrap" }}>{dep.started}</td>
                    <td className="mono">{dep.duration}</td>
                    <td>
                      <span className={`status-pill ${pill.type}`}>
                        <span className="status-dot" aria-hidden="true" />
                        {pill.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
