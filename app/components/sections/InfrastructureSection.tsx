export default function InfrastructureSection() {
  const resources = [
    {
      id: "res-ec2",
      service: "EC2",
      name: "app-server-prod",
      detail: "t3.small · us-east-1a",
      status: "online" as const,
      statusLabel: "Running",
      meta: [
        { label: "Instance ID", value: "i-0a1b2c3d4e5f (sample)" },
        { label: "Public IP", value: "203.0.113.42 (sample)" },
        { label: "OS", value: "Amazon Linux 2023" },
        { label: "vCPU / RAM", value: "2 vCPU / 2 GB" },
      ],
      color: "var(--accent-orange)",
    },
    {
      id: "res-s3",
      service: "S3",
      name: "cloudops-static-assets",
      detail: "Standard · us-east-1",
      status: "online" as const,
      statusLabel: "Active",
      meta: [
        { label: "Bucket ARN", value: "arn:aws:s3:::cloudops-assets (sample)" },
        { label: "Versioning", value: "Enabled" },
        { label: "Objects", value: "~2,400 (sample)" },
        { label: "Storage", value: "~1.2 GB (sample)" },
      ],
      color: "var(--accent-green)",
    },
    {
      id: "res-cloudfront",
      service: "CloudFront",
      name: "E1A2B3C4D5E6 (sample)",
      detail: "CDN Distribution",
      status: "online" as const,
      statusLabel: "Deployed",
      meta: [
        { label: "Domain", value: "dXXXXX.cloudfront.net" },
        { label: "Price Class", value: "PriceClass_100" },
        { label: "Origins", value: "S3 + EC2" },
        { label: "Cache TTL", value: "86400s" },
      ],
      color: "var(--accent-purple)",
    },
    {
      id: "res-iam",
      service: "IAM",
      name: "cloudops-deploy-role",
      detail: "Least-privilege deployment role",
      status: "info" as const,
      statusLabel: "Configured",
      meta: [
        { label: "Type", value: "Role (EC2 instance profile)" },
        { label: "Policies", value: "S3ReadWrite, CloudFrontInvalidate" },
        { label: "MFA", value: "Required for console" },
        { label: "Access Keys", value: "None (role-based)" },
      ],
      color: "var(--accent-blue)",
    },
    {
      id: "res-vpc",
      service: "VPC",
      name: "vpc-cloudops-prod",
      detail: "10.0.0.0/16 · us-east-1",
      status: "online" as const,
      statusLabel: "Active",
      meta: [
        { label: "Public Subnets", value: "2 (10.0.1.0/24, 10.0.2.0/24)" },
        { label: "Private Subnets", value: "2 (10.0.10.0/24, 10.0.11.0/24)" },
        { label: "Internet GW", value: "Attached" },
        { label: "NAT Gateway", value: "1 (public subnet)" },
      ],
      color: "var(--accent-yellow)",
    },
    {
      id: "res-sg",
      service: "Security Group",
      name: "sg-app-server",
      detail: "EC2 inbound rules",
      status: "warning" as const,
      statusLabel: "Review",
      meta: [
        { label: "SSH (22)", value: "Restricted to bastion IP" },
        { label: "HTTP (80)", value: "0.0.0.0/0 → redirect only" },
        { label: "HTTPS (443)", value: "0.0.0.0/0" },
        { label: "App (3000)", value: "Security group only" },
      ],
      color: "var(--status-warning)",
    },
  ];

  const costData = [
    { service: "EC2 t3.small", monthly: "$16.79", percentage: 48 },
    { service: "NAT Gateway", monthly: "$14.40", percentage: 41 },
    { service: "CloudFront", monthly: "$2.10", percentage: 6 },
    { service: "S3 Storage", monthly: "$1.80", percentage: 5 },
  ];

  return (
    <div>
      <div className="alert-banner warning" role="note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        All resource IDs, IPs, and ARNs shown are <strong>&nbsp;sample values&nbsp;</strong> for documentation purposes only. No live AWS connection is active.
      </div>

      <div className="grid-2" role="region" aria-label="AWS resources">
        {resources.map((r) => (
          <div className="resource-card" key={r.id} id={r.id}>
            <div className="resource-header">
              <div className="resource-title">
                <span
                  style={{
                    background: r.color + "22",
                    color: r.color,
                    padding: "2px 7px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                >
                  {r.service}
                </span>
                <span style={{ fontSize: 12 }}>{r.name}</span>
              </div>
              <span className={`status-pill ${r.status}`}>
                <span className="status-dot" aria-hidden="true" />
                {r.statusLabel}
              </span>
            </div>
            <div className="resource-detail">{r.detail}</div>
            {r.meta.map((m, i) => (
              <div className="info-row" key={i} style={{ padding: "5px 0" }}>
                <span className="info-row-label" style={{ fontSize: 11 }}>{m.label}</span>
                <span className="info-row-value" style={{ fontSize: 11 }}>{m.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Cost estimate */}
      <div className="card" style={{ marginTop: 20 }} role="region" aria-label="Estimated monthly costs">
        <div className="card-header">
          <span className="card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
            Estimated Monthly Cost Breakdown
          </span>
          <span className="demo-notice">SAMPLE ESTIMATE</span>
        </div>
        <div className="card-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {costData.map((item, i) => (
              <div key={i} className="progress-bar-wrapper">
                <div className="progress-label">
                  <span>{item.service}</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.monthly}</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={item.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "8px 12px", background: "var(--bg-primary)", borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Total estimated monthly cost</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>~$35.09 / mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
