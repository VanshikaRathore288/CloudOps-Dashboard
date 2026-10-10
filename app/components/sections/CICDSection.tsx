"use client";

import { useState } from "react";

type StageStatus = "done" | "running" | "pending" | "failed";

interface Stage {
  id: string;
  label: string;
  status: StageStatus;
  duration?: string;
}

const runs = [
  {
    id: "run-87",
    ref: "a3f9d21",
    message: "feat: add health check endpoint and improve error handling",
    branch: "main",
    trigger: "push",
    started: "2h ago",
    total: "3m 12s",
    result: "success" as const,
    stages: [
      { id: "s1-checkout", label: "Checkout", status: "done" as StageStatus, duration: "2s" },
      { id: "s1-install", label: "Install", status: "done" as StageStatus, duration: "45s" },
      { id: "s1-lint", label: "Lint", status: "done" as StageStatus, duration: "18s" },
      { id: "s1-build", label: "Build", status: "done" as StageStatus, duration: "1m 42s" },
      { id: "s1-docker", label: "Docker", status: "done" as StageStatus, duration: "25s" },
    ] as Stage[],
  },
  {
    id: "run-86",
    ref: "9cd42ae",
    message: "fix: correct environment variable injection in Dockerfile",
    branch: "main",
    trigger: "push",
    started: "6h ago",
    total: "2m 58s",
    result: "success" as const,
    stages: [
      { id: "s2-checkout", label: "Checkout", status: "done" as StageStatus, duration: "2s" },
      { id: "s2-install", label: "Install", status: "done" as StageStatus, duration: "42s" },
      { id: "s2-lint", label: "Lint", status: "done" as StageStatus, duration: "20s" },
      { id: "s2-build", label: "Build", status: "done" as StageStatus, duration: "1m 40s" },
      { id: "s2-docker", label: "Docker", status: "done" as StageStatus, duration: "14s" },
    ] as Stage[],
  },
  {
    id: "run-85",
    ref: "7be31fc",
    message: "ci: update workflow to use Node.js 20 LTS",
    branch: "feature/ci-update",
    trigger: "push",
    started: "1d ago",
    total: "1m 04s",
    result: "failed" as const,
    stages: [
      { id: "s3-checkout", label: "Checkout", status: "done" as StageStatus, duration: "2s" },
      { id: "s3-install", label: "Install", status: "done" as StageStatus, duration: "38s" },
      { id: "s3-lint", label: "Lint", status: "failed" as StageStatus, duration: "24s" },
      { id: "s3-build", label: "Build", status: "pending" as StageStatus },
      { id: "s3-docker", label: "Docker", status: "pending" as StageStatus },
    ] as Stage[],
  },
];

const stageIcon = (status: StageStatus) => {
  if (status === "done")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  if (status === "failed")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  if (status === "running")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  return <span style={{ fontSize: 9 }}>···</span>;
};

export default function CICDSection() {
  const [expanded, setExpanded] = useState<string | null>("run-87");

  return (
    <div>
      <div className="alert-banner info" role="note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Pipeline data is <strong>&nbsp;sample data&nbsp;</strong>. The actual CI workflow runs on GitHub Actions on every push to <code style={{ fontSize: 11 }}>main</code>.
      </div>

      {/* Workflow overview card */}
      <div className="card mb-16" role="region" aria-label="Workflow summary">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
            GitHub Actions — CI Workflow
          </span>
          <span className="demo-notice">SAMPLE DATA</span>
        </div>
        <div className="card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Source", value: "GitHub", sub: "main branch" },
              { label: "Runner", value: "ubuntu-latest", sub: "GitHub-hosted" },
              { label: "Trigger", value: "push / PR", sub: "all branches" },
              { label: "Avg Duration", value: "3m 05s", sub: "last 10 runs" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center", padding: "10px 0", borderRight: i < 3 ? "1px solid var(--border-muted)" : "none" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{item.value}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.4px", marginTop: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Pipeline diagram */}
          <div style={{ background: "var(--bg-primary)", borderRadius: 6, padding: "16px 12px" }}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>Latest Run Pipeline (Build #87)</div>
            <div className="pipeline-track" role="list" aria-label="Pipeline stages">
              {runs[0].stages.map((stage) => (
                <div className="pipeline-stage done" key={stage.id} role="listitem">
                  <div className={`pipeline-node ${stage.status}`} aria-label={`${stage.label}: ${stage.status}`}>
                    {stageIcon(stage.status)}
                  </div>
                  <div className="pipeline-label">{stage.label}</div>
                  {stage.duration && (
                    <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>{stage.duration}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Run history */}
      <div className="card" role="region" aria-label="Recent pipeline runs">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Recent Runs
          </span>
        </div>
        <div style={{ overflow: "auto" }}>
          {runs.map((run) => (
            <div key={run.id}>
              <button
                id={run.id}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: expanded === run.id ? "var(--bg-hover)" : "none",
                  border: "none",
                  borderBottom: "1px solid var(--border-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onClick={() => setExpanded(expanded === run.id ? null : run.id)}
                aria-expanded={expanded === run.id}
                aria-controls={`${run.id}-detail`}
              >
                <span className={`status-pill ${run.result === "success" ? "online" : "error"}`}>
                  <span className="status-dot" aria-hidden="true" />
                  {run.result}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--text-primary)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {run.message}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    <span className="text-mono">{run.ref}</span> · {run.branch} · {run.trigger} · {run.started}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{run.total}</div>
                </div>
              </button>
              {expanded === run.id && (
                <div id={`${run.id}-detail`} style={{ padding: "12px 16px", background: "var(--bg-primary)", borderBottom: "1px solid var(--border-muted)" }}>
                  <div className="pipeline-track" role="list" aria-label={`Pipeline for run ${run.ref}`}>
                    {run.stages.map((stage) => (
                      <div className={`pipeline-stage ${stage.status}`} key={stage.id} role="listitem">
                        <div className={`pipeline-node ${stage.status}`} aria-label={`${stage.label}: ${stage.status}`}>
                          {stageIcon(stage.status)}
                        </div>
                        <div className="pipeline-label">{stage.label}</div>
                        {stage.duration && (
                          <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>{stage.duration}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
