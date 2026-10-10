"use client";

import { useState } from "react";
import Sidebar, { type SectionId } from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewSection from "./components/sections/OverviewSection";
import InfrastructureSection from "./components/sections/InfrastructureSection";
import CICDSection from "./components/sections/CICDSection";
import MonitoringSection from "./components/sections/MonitoringSection";
import DeploymentsSection from "./components/sections/DeploymentsSection";
import LogsSection from "./components/sections/LogsSection";
import DocsSection from "./components/sections/DocsSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "infrastructure":
        return <InfrastructureSection />;
      case "cicd":
        return <CICDSection />;
      case "monitoring":
        return <MonitoringSection />;
      case "deployments":
        return <DeploymentsSection />;
      case "logs":
        return <LogsSection />;
      case "docs":
        return <DocsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="main-content" id="main-content" tabIndex={-1}>
        <Topbar activeSection={activeSection} />
        <div className="page-content" role="main">
          <div className="page-header">
            <h2>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace("-", " ")}
            </h2>
            <p>CloudOps Dashboard · AI-Assisted Cloud Deployment &amp; Infrastructure Monitoring</p>
          </div>
          {renderSection()}
        </div>
        <footer
          style={{
            padding: "12px 24px",
            borderTop: "1px solid var(--border-muted)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            color: "var(--text-muted)",
          }}
          role="contentinfo"
        >
          <span>CloudOps Dashboard · Portfolio Project · Next.js 15 + Docker + GitHub Actions</span>
          <span>
            All metrics are{" "}
            <span style={{ color: "var(--accent-yellow)" }}>sample data</span>
            {" "}· No live AWS connection
          </span>
        </footer>
      </main>
    </div>
  );
}
