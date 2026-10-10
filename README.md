# ☁️ CloudOps Dashboard

**AI-Assisted Cloud Deployment & Infrastructure Monitoring**

A portfolio-ready project demonstrating skills relevant to a **Junior Cloud & DevOps Engineer (AI-Augmented)** role. Built with Next.js 15, packaged in Docker with a multi-stage build, designed for AWS EC2 deployment, and automated with GitHub Actions CI/CD.

> **Note — Sample Data:** The dashboard UI displays sample/demo data for demonstration purposes. No live connection to AWS is active. Metrics, resource IDs, and deployment records are illustrative only.

---

## 🎯 Problem Statement & Objectives

Modern cloud engineering roles require practical familiarity with containerisation, CI/CD automation, cloud infrastructure provisioning, and observability. This project demonstrates all of these in a single, cohesive application:

- Design and build a professional cloud operations dashboard
- Package a Next.js application into an optimised Docker image
- Automate lint and build validation with GitHub Actions
- Document AWS deployment, security practices, and infrastructure configuration
- Apply AI tools (Copilot, ChatGPT, Claude) as a productivity accelerator throughout development

---

## ✨ Features

| Section | Description |
|---|---|
| **Overview** | Application status, last deployment, environment info, recent events |
| **Infrastructure** | AWS EC2, S3, CloudFront, IAM, VPC, and Security Group configuration |
| **CI/CD Pipeline** | GitHub Actions workflow stages, run history, and duration metrics |
| **Monitoring** | 90-day uptime history bars, resource utilisation, and recent alerts |
| **Deployment History** | Audit log with version, commit, environment, and result |
| **Logs** | Filterable application log stream and troubleshooting runbooks |
| **Documentation** | Setup guide, tech stack, security checklist, AI workflow, implementation status |

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom CSS properties |
| Font | Inter (Google Fonts) |
| Runtime | Node.js 20 LTS |
| Container | Docker (multi-stage Alpine build) |
| CI/CD | GitHub Actions |
| Target Cloud | AWS EC2, S3, CloudFront, IAM, VPC |
| Target Monitoring | AWS CloudWatch, UptimeRobot |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        GitHub                               │
│  Push to main  ──►  GitHub Actions CI  ──►  Docker Hub     │
└───────────────────────────────┬─────────────────────────────┘
                                │ docker pull
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                       AWS VPC (us-east-1)                   │
│                                                             │
│   Internet ──► CloudFront CDN ──► EC2 t3.small             │
│                     │             └── Docker container      │
│                     │                  └── Next.js :3000    │
│                  S3 Bucket                                  │
│              (static assets)                                │
└─────────────────────────────────────────────────────────────┘
```

> The architecture above is **the intended deployment target**. Only the local Docker build and the CI workflow are currently implemented.

---

## 📁 Repository Structure

```
nextjs-aws-docker-demo/
├── app/
│   ├── components/
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── Topbar.tsx           # Top navigation bar with live clock
│   │   └── sections/
│   │       ├── OverviewSection.tsx
│   │       ├── InfrastructureSection.tsx
│   │       ├── CICDSection.tsx
│   │       ├── MonitoringSection.tsx
│   │       ├── DeploymentsSection.tsx
│   │       ├── LogsSection.tsx
│   │       └── DocsSection.tsx
│   ├── globals.css              # Design system & component styles
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Main dashboard page
├── public/                      # Static assets
├── .github/
│   └── workflows/
│       └── cicd.yml             # GitHub Actions CI workflow
├── .dockerignore                # Files excluded from Docker build context
├── .env.example                 # Environment variable template (safe to commit)
├── .gitignore
├── Dockerfile                   # Multi-stage Docker build
├── next.config.ts               # Next.js config (standalone output enabled)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📋 Prerequisites

| Tool | Minimum Version | Notes |
|---|---|---|
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| npm | 10 | Bundled with Node.js 20 |
| Docker | 24+ | Optional — for container build/run |
| Git | 2.x | |
| AWS CLI | 2.x | Optional — only for AWS deployment |

---

## 🚀 Local Setup

### Windows (PowerShell)

```powershell
# 1. Clone and enter the project directory
git clone https://github.com/VanshikaRathore288/CloudOps-Dashboard.git
cd CloudOps-Dashboard\nextjs-aws-docker-demo

# 2. Install dependencies
npm install

# 3. Copy the environment template
Copy-Item .env.example .env.local

# 4. Start the development server
npm run dev
# Open http://localhost:3000 in your browser
```

### Linux / macOS (Bash/Zsh)

```bash
# 1. Clone and enter the project directory
git clone https://github.com/VanshikaRathore288/CloudOps-Dashboard.git
cd CloudOps-Dashboard/nextjs-aws-docker-demo

# 2. Install dependencies
npm install

# 3. Copy the environment template
cp .env.example .env.local

# 4. Start the development server
npm run dev
# Open http://localhost:3000 in your browser
```

---

## 🔐 Environment Variable Configuration

Copy `.env.example` to `.env.local` and fill in values as needed.

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | For production | Public URL of the deployed app |
| `NODE_ENV` | Auto-set | `development` locally, `production` in Docker |
| `AWS_REGION` | AWS integration only | e.g. `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS integration only | Use IAM roles in production instead |
| `AWS_SECRET_ACCESS_KEY` | AWS integration only | Never commit this value |
| `AWS_S3_BUCKET` | S3 integration only | Bucket name for static assets |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | CDN integration only | For cache invalidation |

> **Security:** Never commit `.env.local` or `.env` to version control. Only `.env.example` (with placeholder values) should be committed.

---

## 💻 Development & Build Commands

```bash
npm run dev       # Start local development server (http://localhost:3000)
npm run lint      # Run ESLint
npm run build     # Build production bundle
npm run start     # Start production server locally (requires npm run build first)
```

---

## 🐳 Docker Build & Run

### Build the image

```bash
docker build -t cloudops-dashboard .
```

### Run the container

```bash
docker run -d \
  -p 3000:3000 \
  --name cloudops-dashboard \
  cloudops-dashboard
```

### Open the app

```
http://localhost:3000
```

### View logs

```bash
docker logs cloudops-dashboard -f
```

### Stop and remove

```bash
docker rm -f cloudops-dashboard
```

> **Note:** The Dockerfile uses `output: "standalone"` (configured in `next.config.ts`). The final image starts with `node server.js` — no separate `next start` or `npm` required.

---

## ⚙️ GitHub Actions CI Workflow

**File:** `.github/workflows/cicd.yml`

The CI workflow runs automatically on every push to `main`, `feature/**`, and `fix/**` branches, and on all pull requests targeting `main`.

### Steps

| Step | Description |
|---|---|
| Checkout | Clones the repository at the commit SHA |
| Set up Node.js 20 | Configures Node 20 LTS with npm dependency caching |
| Install dependencies | `npm ci --frozen-lockfile` (reproducible, strict install) |
| Lint | `npm run lint` — fails the build on ESLint errors |
| Build | `npm run build` — verifies no TypeScript or compilation errors |

### What is NOT included (by design)

Automatic Docker push and deployment to EC2 are **not** part of this workflow because they require secrets and infrastructure that are not yet configured:

- `DOCKER_USERNAME` and `DOCKER_PASSWORD` as GitHub repository secrets
- A self-hosted runner on EC2, or an SSH deploy key for remote execution

See the **AWS Deployment** section below when you are ready to add CD.

---

## ☁️ AWS Deployment Instructions

> **Status: Not yet deployed.** The following instructions describe how to deploy manually once an EC2 instance is provisioned.

### Step 1 — Launch an EC2 instance

1. Choose **Amazon Linux 2023** or **Ubuntu 22.04 LTS**, instance type `t3.small` or larger.
2. Attach an IAM instance profile with least-privilege policies (S3 read/write, CloudFront invalidate).
3. Configure the security group:
   - Port 22 (SSH): your IP only
   - Port 80 (HTTP): 0.0.0.0/0 → redirect to HTTPS
   - Port 443 (HTTPS): 0.0.0.0/0
   - Port 3000: only from the security group (internal)

### Step 2 — Prepare the server

```bash
# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo systemctl enable docker && sudo systemctl start docker
sudo usermod -aG docker ec2-user

# Install Nginx (as reverse proxy)
sudo yum install nginx -y
```

### Step 3 — Deploy manually

```bash
# Pull and run the container
docker pull YOUR_DOCKERHUB_USERNAME/cloudops-dashboard:latest
docker run -d \
  -p 3000:3000 \
  --name cloudops-dashboard \
  --restart unless-stopped \
  YOUR_DOCKERHUB_USERNAME/cloudops-dashboard:latest
```

### Step 4 — Configure Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate     /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 5 — SSL with Let's Encrypt

```bash
sudo yum install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
# Auto-renewal is configured by certbot automatically
```

---

## 🌐 DNS Configuration

1. In your DNS provider (Route 53, Cloudflare, etc.), create an **A record** pointing `your-domain.com` to your EC2 Elastic IP.
2. Wait for DNS propagation (up to 48h, typically under 30 min).
3. Run Certbot after DNS is resolving correctly.

---

## 🔒 Security Considerations

- **No hardcoded secrets.** All credentials are injected via environment variables or IAM roles.
- **IAM least-privilege.** The EC2 instance profile only has the permissions it needs — no `AdministratorAccess`.
- **No root user.** The Docker container runs as a non-root `nextjs` user (UID 1001).
- **SSH restricted.** Port 22 is limited to your IP in the security group.
- **Rotate keys.** If temporary access keys are ever used locally, rotate them within 90 days.
- **MFA required.** Enable MFA on the AWS root account and all IAM console users.

---

## 🔧 Troubleshooting Common Errors

| Error | Likely Cause | Fix |
|---|---|---|
| `npm run build` fails — TypeScript errors | Type mismatch in component props | Run `npm run lint` first; fix reported errors |
| Docker build fails on `COPY --from=builder .next/standalone` | `output: "standalone"` not in `next.config.ts` | Ensure `output: "standalone"` is set |
| Container exits immediately | App error on startup | Run `docker logs cloudops-dashboard` |
| `502 Bad Gateway` after deployment | Container not running or port mismatch | `docker ps` → check port binding |
| GitHub Actions fails on `npm ci` | `package-lock.json` out of sync | Run `npm install` locally, commit the updated lockfile |
| Can't SSH into EC2 | Key permissions or security group | `chmod 400 key.pem`; check inbound rule for port 22 |

---

## 🤖 AI-Assisted Development

This project was built with AI assistance throughout:

- **GitHub Copilot** — inline suggestions for TypeScript components, Dockerfile stages, and YAML workflows
- **ChatGPT / Claude** — generating IAM policy JSON, explaining CloudFront caching behaviour, and debugging CI errors from pasted logs
- **Claude (Cursor / AGY IDE)** — refactoring components, generating README sections, and improving security guidance

> **Security reminder:** Never paste real credentials, access keys, or private keys into AI prompts. Use placeholder values in all examples.

---

## 📊 Current Implementation Status

| Feature | Status |
|---|---|
| Next.js App Router + TypeScript | ✅ Implemented |
| CloudOps Dashboard UI (7 sections) | ✅ Implemented |
| Docker multi-stage build | ✅ Implemented |
| `.dockerignore` | ✅ Implemented |
| `.env.example` | ✅ Implemented |
| GitHub Actions CI (lint + build) | ✅ Implemented |
| AWS EC2 live deployment | ⏳ Requires setup |
| Real CloudWatch Logs integration | ⏳ Requires AWS account |
| Domain + HTTPS/SSL | ⏳ Requires domain + EC2 |
| Automatic CD (GitHub Actions → EC2) | ⏳ Requires secrets + runner |
| S3 + CloudFront static serving | ⏳ Requires AWS setup |

---

## 🔮 Future Improvements

- Add a `/api/health` route returning `{ status: "ok", version, timestamp }`
- Integrate AWS CloudWatch Logs SDK to stream real log data into the dashboard
- Add UptimeRobot or Better Uptime API integration for live uptime data
- Implement GitHub Actions CD job (Docker push + SSH deploy) once secrets are configured
- Add Playwright or Cypress end-to-end tests as a CI gate
- Enable CloudFront + S3 for static assets and global CDN distribution
- Add Terraform or AWS CDK infrastructure-as-code files

---

## 📄 License

This project is provided for portfolio and educational purposes.

---

**Built by [Vanshika Rathore](https://github.com/VanshikaRathore288)** · Cloud & DevOps Engineering Portfolio
