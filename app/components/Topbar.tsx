"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "./Sidebar";

interface TopbarProps {
  activeSection: SectionId;
}

const SECTION_TITLES: Record<SectionId, { title: string; subtitle: string }> = {
  overview: {
    title: "Overview",
    subtitle: "System health & deployment status",
  },
  infrastructure: {
    title: "Infrastructure",
    subtitle: "AWS resource configuration & status",
  },
  cicd: {
    title: "CI/CD Pipeline",
    subtitle: "Build, test & deployment automation",
  },
  monitoring: {
    title: "Monitoring",
    subtitle: "Application health & uptime tracking",
  },
  deployments: {
    title: "Deployment History",
    subtitle: "Audit trail of all production releases",
  },
  logs: {
    title: "Logs & Troubleshooting",
    subtitle: "Application events and error analysis",
  },
  docs: {
    title: "Documentation",
    subtitle: "Setup, deployment & operations guide",
  },
};

export default function Topbar({ activeSection }: TopbarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC",
        }) + " UTC"
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const info = SECTION_TITLES[activeSection];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <div className="topbar-title">{info.title}</div>
          <div className="topbar-subtitle">{info.subtitle}</div>
        </div>
      </div>
      <div className="topbar-right">
        <span className="topbar-badge badge-demo" aria-label="Demo data mode">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Sample Data
        </span>
        <span className="topbar-badge badge-online" aria-label="Application online">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="6" />
          </svg>
          Online
        </span>
        <time className="time-display" aria-live="polite" suppressHydrationWarning>
          {time}
        </time>
      </div>
    </header>
  );
}
