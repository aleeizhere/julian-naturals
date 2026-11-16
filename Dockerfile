# syntax=docker/dockerfile:1

# Julian Naturals — production image for Google Cloud Run.
# Multi-stage build using Next.js standalone output (see next.config.ts).

ARG NODE_VERSION=24

# ── 1. Install dependencies ───────────────────────────────────────────────
FROM node:${NODE_VERSION}-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── 2. Build the app ──────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── 3. Minimal runtime image ──────────────────────────────────────────────
FROM node:${NODE_VERSION}-slim AS runner
WORKDIR /app

# PORT: Cloud Run sends traffic to $PORT (8080 by default).
# HOSTNAME: the standalone server binds to $HOSTNAME; Docker would otherwise
# set it to the container's own hostname, making the app unreachable.
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0

# Run as the non-root user that ships with the official Node image.
USER node

# Standalone server + only the node_modules it needs (includes sharp for
# next/image). Static assets and public/ aren't copied by Next by default.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

EXPOSE 8080
CMD ["node", "server.js"]
