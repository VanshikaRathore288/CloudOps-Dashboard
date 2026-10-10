"use client";

import { useState } from "react";

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

interface LogEntry {
  id: string;
  time: string;
  level: LogLevel;
  source: string;
  message: string;
}

const allLogs: LogEntry[] = [
  { id: "log-1",  time: "13:42:11", level: "INFO",  source: "deploy",  message: "Deployment v1.4.2 completed. Container started on port 3000." },
  { id: "log-2",  time: "13:42:08", level: "INFO",  source: "docker",  message: "Container nextjs-app-container restarted successfully." },
  { id: "log-3",  time: "13:41:45", level: "INFO",  source: "docker",  message: "Pulling image from Docker Hub: cloudops/nextjs-app:v1.4.2" },
  { id: "log-4",  time: "13:40:30", level: "INFO",  source: "github",  message: "CI workflow completed. Build #87 passed in 3m 12s." },
  { id: "log-5",  time: "11:14:52", level: "INFO",  source: "health",  message: "GET /api/health → 200 OK (38ms)" },
  { id: "log-6",  time: "09:30:01", level: "INFO",  source: "ssl",     message: "Let's Encrypt certificate renewed. Valid until 2027-01-08." },
  { id: "log-7",  time: "08:00:00", level: "DEBUG", source: "next.js", message: "Cache revalidated for 12 routes." },
  { id: "log-8",  time: "Yesterday 22:13", level: "WARN",  source: "ec2",    message: "Memory usage at 78%. Threshold: 80%. Monitor closely." },
  { id: "log-9",  time: "Yesterday 22:14", level: "WARN",  source: "docker", message: "Container memory limit approaching (1.55/2 GB)." },
  { id: "log-10", time: "Yesterday 22:15", level: "INFO",  source: "docker", message: "Container auto-restarted by health check policy." },
  { id: "log-11", time: "2d ago 14:30",    level: "ERROR", source: "nginx",  message: "502 Bad Gateway — upstream connection refused. EC2 was rebooting." },
  { id: "log-12", time: "2d ago 14:26",    level: "WARN",  source: "ec2",    message: "Scheduled OS patching reboot initiated." },
  { id: "log-13", time: "2d ago 14:34",    level: "INFO",  source: "ec2",    message: "Instance back online. Health check passed." },
  { id: "log-14", time: "3d ago 10:00",    level: "DEBUG", source: "next.js", message: "Static export: 47 pages pre-rendered in 12s." },
  { id: "log-15", time: "5d ago 09:45",    level: "INFO",  source: "cdn",    message: "CloudFront invalidation completed (/*, 1800 paths)." },
];

const LEVEL_OPTS: LogLevel[] = ["INFO", "WARN", "ERROR", "DEBUG"];

export default function LogsSection() {
  const [filter, setFilter] = useState<LogLevel | "ALL">("ALL");
  const [source, setSource] = useState("ALL");

  const sources = ["ALL", ...Array.from(new Set(allLogs.map((l) => l.source)))];
  const filtered = allLogs.filter(
    (l) =>
      (filter === "ALL" || l.level === filter) &&
      (source === "ALL" || l.source === source)
  );

  const troubleshooting = [
    {
      id: "ts-1",
      issue: "Container won't start after deployment",
      steps: [
        "SSH into EC2: ssh -i key.pem ec2-user@<ip>",
        "Check running containers: docker ps -a",
        "View container logs: docker logs nextjs-app-container --tail 50",
        "Inspect the image: docker inspect cloudops/nextjs-app:latest",
        "Restart manually: docker rm -f nextjs-app-container && docker run -d -p 3000:3000 --name nextjs-app-container cloudops/nextjs-app:latest",
      ],
    },
    {
      id: "ts-2",
      issue: "Build fails in GitHub Actions",
      steps: [
        "Check the Actions tab in GitHub for the full error log",
        "Common cause: missing env vars → add secrets in repo Settings → Secrets and variables",
        "TypeScript errors: run npm run lint locally first",
        "Docker build fails: test docker build -t test . locally before pushing",
      ],
    },
    {
      id: "ts-3",
      issue: "502 Bad Gateway on the domain",
      steps: [
        "Check if the container is running: docker ps",
        "Verify port binding: docker port nextjs-app-container",
        "Check Nginx/proxy config: sudo nginx -t",
        "Review security group inbound rules (port 80/443 open?)",
        "Check EC2 instance status in AWS Console",
      ],
    },
    {
      id: "ts-4",
      issue: "High memory usage / OOM",
      steps: [
        "Check Docker stats: docker stats nextjs-app-container",
        "Consider upgrading instance type (t3.small → t3.medium)",
        "Add swap space: sudo fallocate -l 1G /swapfile",
        "Set Docker memory limit: --memory=1.5g flag in docker run",
      ],
    },
  ];

  const [expandedTs, setExpandedTs] = useState<string | null>(null);

  return (
    <div>
      <div className="alert-banner info" role="note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Log entries are <strong>&nbsp;sample data&nbsp;</strong> illustrating realistic application events. Integrate CloudWatch Logs or a log aggregator for live data.
      </div>

      <div className="grid-cols-3-1">
        {/* Log viewer */}
        <div className="card" role="region" aria-label="Application logs">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Application Log Stream
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="demo-notice">SAMPLE</span>
            </div>
          </div>
          {/* Filters */}
          <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-muted)", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 4 }}>
              <button
                id="filter-all"
                style={{
                  padding: "3px 10px", borderRadius: 4, border: "1px solid",
                  background: filter === "ALL" ? "var(--bg-elevated)" : "none",
                  borderColor: filter === "ALL" ? "var(--border-default)" : "transparent",
                  color: filter === "ALL" ? "var(--text-primary)" : "var(--text-muted)",
                  fontSize: 11, cursor: "pointer",
                }}
                onClick={() => setFilter("ALL")}
              >
                ALL
              </button>
              {LEVEL_OPTS.map((l) => (
                <button
                  key={l}
                  id={`filter-${l.toLowerCase()}`}
                  style={{
                    padding: "3px 10px", borderRadius: 4, border: "1px solid",
                    background: filter === l ? "var(--bg-elevated)" : "none",
                    borderColor: filter === l ? "var(--border-default)" : "transparent",
                    color: filter === l ? "var(--text-primary)" : "var(--text-muted)",
                    fontSize: 11, cursor: "pointer", fontFamily: "monospace",
                  }}
                  onClick={() => setFilter(l)}
                >
                  {l}
                </button>
              ))}
            </div>
            <select
              id="filter-source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={{
                background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
                color: "var(--text-secondary)", borderRadius: 4, padding: "3px 8px",
                fontSize: 11, cursor: "pointer",
              }}
              aria-label="Filter by source"
            >
              {sources.map((s) => <option key={s} value={s}>{s === "ALL" ? "All sources" : s}</option>)}
            </select>
            <span style={{ fontSize: 11, color: "var(--text-muted)", alignSelf: "center", marginLeft: "auto" }}>
              {filtered.length} entries
            </span>
          </div>
          <div style={{ background: "var(--bg-primary)", maxHeight: 400, overflowY: "auto", padding: "8px 12px" }} role="log" aria-label="Log entries" aria-live="off">
            {filtered.length === 0 ? (
              <div style={{ padding: 20, textAlign: "center", color: "var(--text-muted)", fontSize: 12 }}>No entries match the current filter.</div>
            ) : (
              filtered.map((log) => (
                <div className="log-entry" key={log.id} id={log.id}>
                  <span className={`log-level ${log.level}`}>{log.level}</span>
                  <span className="log-time">{log.time}</span>
                  <span style={{ color: "var(--accent-blue)", fontSize: 11, flexShrink: 0 }}>[{log.source}]</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="card" role="region" aria-label="Troubleshooting guide">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Troubleshooting
            </span>
          </div>
          <div style={{ padding: 0 }}>
            {troubleshooting.map((item) => (
              <div key={item.id} id={item.id} style={{ borderBottom: "1px solid var(--border-muted)" }}>
                <button
                  style={{
                    width: "100%", padding: "10px 14px", background: "none", border: "none",
                    textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between",
                    alignItems: "center", fontSize: 12, color: "var(--text-primary)", fontWeight: 500,
                  }}
                  onClick={() => setExpandedTs(expandedTs === item.id ? null : item.id)}
                  aria-expanded={expandedTs === item.id}
                  aria-controls={`${item.id}-steps`}
                >
                  {item.issue}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    style={{ transform: expandedTs === item.id ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {expandedTs === item.id && (
                  <div id={`${item.id}-steps`} style={{ padding: "0 14px 12px" }}>
                    {item.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 10, color: "var(--accent-blue)", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
                        <div className="code-block" style={{ flex: 1, padding: "4px 8px", fontSize: 10 }}>{step}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
