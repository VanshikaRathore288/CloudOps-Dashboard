export default function DocsSection() {
  const techStack = [
    { cat: "Frontend", items: ["Next.js 15 (App Router)", "React 19", "TypeScript 5", "Tailwind CSS 3"] },
    { cat: "Runtime", items: ["Node.js 20 LTS", "npm 10"] },
    { cat: "Container", items: ["Docker (multi-stage)", "Docker Hub"] },
    { cat: "CI/CD", items: ["GitHub Actions", "ubuntu-latest runner"] },
    { cat: "Cloud (target)", items: ["AWS EC2 (t3.small)", "Amazon S3", "CloudFront CDN", "IAM roles", "VPC + Security Groups"] },
    { cat: "Monitoring (target)", items: ["AWS CloudWatch Logs", "UptimeRobot / Better Uptime", "Docker health checks"] },
  ];

  const aiUseCases = [
    {
      id: "ai-1",
      tool: "GitHub Copilot",
      useCase: "Inline code suggestions while writing Dockerfile, GitHub Actions YAML, and Next.js components",
      example: "# Describe what you want in a comment; Copilot completes the Docker stage",
    },
    {
      id: "ai-2",
      tool: "ChatGPT / Claude",
      useCase: "Generating IAM policy JSON, explaining CloudFront behaviour, and debugging CI errors from pasted logs",
      example: 'Prompt: "Here is my GitHub Actions error log. What is causing the Docker build to fail?"',
    },
    {
      id: "ai-3",
      tool: "Claude (Cursor / AGY)",
      useCase: "Refactoring and explaining existing code, writing unit tests, and generating README sections",
      example: 'Prompt: "Explain this Next.js middleware and suggest security improvements"',
    },
    {
      id: "ai-4",
      tool: "AI (general)",
      useCase: "Generating .env.example templates, Nginx config, and SSL renewal scripts from project requirements",
      example: 'Prompt: "Generate a minimal Nginx reverse proxy config for a Node.js app on port 3000 with HTTPS redirect"',
    },
  ];

  const setupSteps = [
    { n: 1, label: "Clone the repository", cmd: "git clone https://github.com/YOUR_USERNAME/cloudops-dashboard.git\ncd cloudops-dashboard/nextjs-aws-docker-demo" },
    { n: 2, label: "Install dependencies", cmd: "npm install" },
    { n: 3, label: "Copy environment template", cmd: "cp .env.example .env.local" },
    { n: 4, label: "Start development server", cmd: "npm run dev\n# Open http://localhost:3000" },
    { n: 5, label: "Run lint", cmd: "npm run lint" },
    { n: 6, label: "Build for production", cmd: "npm run build" },
    { n: 7, label: "Build and run Docker image", cmd: "docker build -t cloudops-dashboard .\ndocker run -d -p 3000:3000 --name cloudops-dashboard cloudops-dashboard" },
  ];

  const secItems = [
    "Never commit .env files — only commit .env.example with placeholder values",
    "Use IAM roles (EC2 instance profiles) instead of long-lived access keys",
    "Restrict SSH (port 22) inbound rules to known bastion IPs only",
    "Store Docker Hub credentials and deployment tokens as GitHub Actions secrets, not in YAML",
    "Enable MFA on the AWS root account and all IAM users with console access",
    "Rotate access keys every 90 days and audit IAM permissions quarterly",
    "Use HTTPS everywhere — configure Nginx with Let's Encrypt for automatic renewal",
    "Set resource-level S3 bucket policies; block all public access unless intentional",
  ];

  return (
    <div>
      {/* Project overview */}
      <div className="card mb-16" role="region" aria-label="Project overview">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Project Overview
          </span>
        </div>
        <div className="card-body">
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>CloudOps Dashboard</strong> is a portfolio project demonstrating
            cloud infrastructure management, containerised deployment, and CI/CD automation skills relevant to a
            Junior Cloud &amp; DevOps Engineer role. It is built with Next.js and React, packaged in Docker,
            and designed to be deployed on an AWS EC2 instance with optional CloudFront CDN distribution.
          </p>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            AI assistants (GitHub Copilot, ChatGPT, Claude) were used during development for configuration generation,
            code explanation, and debugging — a realistic workflow for modern cloud engineering.
            <strong style={{ color: "var(--accent-yellow)" }}>&nbsp;No live AWS connection is active</strong>; all dashboard metrics are sample data.
          </p>
        </div>
      </div>

      {/* Local setup */}
      <div className="card mb-16" role="region" aria-label="Local setup steps">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            Local Setup (Windows PowerShell &amp; Linux/macOS)
          </span>
        </div>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {setupSteps.map((step) => (
            <div key={step.n} id={`setup-${step.n}`}>
              <div style={{ fontSize: 12, color: "var(--text-primary)", marginBottom: 4, fontWeight: 500 }}>
                <span style={{ color: "var(--accent-blue)", marginRight: 6 }}>{step.n}.</span>{step.label}
              </div>
              <div className="code-block">{step.cmd}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        {/* Tech stack */}
        <div className="card" role="region" aria-label="Technology stack">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
              </svg>
              Technology Stack
            </span>
          </div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {techStack.map((cat, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6, fontWeight: 600 }}>{cat.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map((item, j) => (
                    <span key={j} style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 4,
                      background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
                      color: "var(--text-secondary)",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="card" role="region" aria-label="Security considerations">
          <div className="card-header">
            <span className="card-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Security Considerations
            </span>
          </div>
          <div className="card-body">
            {secItems.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--status-online)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI-assisted development */}
      <div className="card" style={{ marginTop: 16 }} role="region" aria-label="AI-assisted development">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
            </svg>
            AI-Assisted Development
          </span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>How AI tools were used in this project</span>
        </div>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {aiUseCases.map((ai) => (
            <div key={ai.id} id={ai.id} className="resource-card">
              <div className="resource-header">
                <span className="resource-title">
                  <span style={{ background: "var(--accent-blue-subtle)", color: "var(--accent-blue)", padding: "2px 7px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                    {ai.tool}
                  </span>
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{ai.useCase}</div>
              <div className="code-block" style={{ marginTop: 6 }}>{ai.example}</div>
            </div>
          ))}
          <div className="alert-banner warning" style={{ marginBottom: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Never paste real credentials, access keys, or private data into AI prompts. Use placeholder values in examples.
          </div>
        </div>
      </div>

      {/* Implementation status */}
      <div className="card" style={{ marginTop: 16 }} role="region" aria-label="Implementation status">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            Implementation Status
          </span>
        </div>
        <div className="card-body">
          {[
            { done: true,  item: "Next.js App Router application with TypeScript" },
            { done: true,  item: "CloudOps Dashboard UI with 7 sections" },
            { done: true,  item: "Docker multi-stage build (optimised image)" },
            { done: true,  item: "GitHub Actions CI workflow (lint + build check)" },
            { done: true,  item: ".dockerignore and .env.example" },
            { done: false, item: "Live AWS EC2 deployment (requires AWS account + secrets)" },
            { done: false, item: "Real CloudWatch Logs / monitoring integration" },
            { done: false, item: "Domain name + HTTPS/SSL via Let's Encrypt" },
            { done: false, item: "Automatic CD to EC2 (requires self-hosted runner or deploy secret)" },
            { done: false, item: "S3 + CloudFront static asset serving" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0", borderBottom: i < 9 ? "1px solid var(--border-muted)" : "none" }}>
              {row.done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--status-online)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
              <span style={{ fontSize: 12, color: row.done ? "var(--text-secondary)" : "var(--text-muted)" }}>{row.item}</span>
              {!row.done && <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--accent-yellow)", background: "var(--accent-yellow-subtle)", padding: "1px 6px", borderRadius: 4 }}>Requires setup</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
