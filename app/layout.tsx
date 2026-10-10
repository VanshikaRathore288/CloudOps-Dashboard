import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloudOps Dashboard – AI-Assisted Cloud Deployment & Infrastructure Monitoring",
  description:
    "A portfolio-ready CloudOps dashboard demonstrating Next.js, Docker, GitHub Actions CI/CD, and AWS infrastructure deployment skills for a Junior Cloud & DevOps Engineer role.",
  keywords: [
    "Cloud Operations",
    "DevOps Dashboard",
    "AWS EC2",
    "Docker",
    "Next.js",
    "CI/CD",
    "GitHub Actions",
    "Infrastructure Monitoring",
  ],
  authors: [{ name: "CloudOps Dashboard" }],
  openGraph: {
    title: "CloudOps Dashboard – AI-Assisted Cloud Deployment & Infrastructure Monitoring",
    description:
      "Portfolio project demonstrating cloud infrastructure management, containerised deployment, and CI/CD automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
