# ─── Stage 1: Dependencies ────────────────────────────────────────────────────
FROM node:20-alpine AS deps

# Install libc compatibility shim for native modules on Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package.json package-lock.json ./

# Install production + dev dependencies (needed for the build)
RUN npm ci --frozen-lockfile

# ─── Stage 2: Builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN npm run build

# ─── Stage 3: Runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy Next.js standalone output (requires output: 'standalone' in next.config)
# If standalone is not enabled, copy .next + node_modules instead
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static

USER nextjs

EXPOSE 3000

# Health check — verifies the app responds before routing traffic to this container
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]