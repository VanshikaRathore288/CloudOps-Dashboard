"use client";

import React from "react";

export type SectionId =
  | "overview"
  | "infrastructure"
  | "cicd"
  | "monitoring"
  | "deployments"
  | "logs"
  | "docs";

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

// Inline SVG icons to avoid extra dependencies
const Icon = ({ path, size = 16 }: { path: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
);

const ICONS: Record<string, string> = {
  overview:
    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  infrastructure:
    "M2 20h20M4 20V8l8-6 8 6v12M9 20v-6h6v6",
  cicd:
    "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  monitoring:
    "M22 12h-4l-3 9L9 3l-3 9H2",
  deployments:
    "M4 16v1a3 3 0 006 0v-1m-6 0h6m-6 0H4M20 16v1a3 3 0 01-6 0v-1m6 0h-6m6 0h-1.5M12 8v4l3 3",
  logs:
    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  docs:
    "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  cloud:
    "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
};

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: <Icon path={ICONS.overview} /> },
  {
    id: "infrastructure",
    label: "Infrastructure",
    icon: <Icon path={ICONS.infrastructure} />,
  },
  { id: "cicd", label: "CI/CD Pipeline", icon: <Icon path={ICONS.cicd} /> },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: <Icon path={ICONS.monitoring} />,
  },
  {
    id: "deployments",
    label: "Deployments",
    icon: <Icon path={ICONS.deployments} />,
  },
  {
    id: "logs",
    label: "Logs",
    icon: <Icon path={ICONS.logs} />,
    badge: 3,
  },
  { id: "docs", label: "Documentation", icon: <Icon path={ICONS.docs} /> },
];

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {


  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={ICONS.cloud} />
          </svg>
        </div>
        <div className="sidebar-logo-text">
          <h1>CloudOps</h1>
          <span>Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <span className="nav-section-label">Workspace</span>
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activeSection === item.id ? "page" : undefined}
          >
            <span className="nav-item-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
            {item.badge !== undefined && (
              <span className="nav-item-badge" aria-label={`${item.badge} alerts`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="env-badge">
          <div className="env-dot" aria-hidden="true" />
          <span>production · demo</span>
        </div>
      </div>
    </aside>
  );
}
