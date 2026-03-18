# ---------- 1. PRUNE STAGE ----------
FROM node:18-alpine AS pruner
WORKDIR /repo
RUN npm install -g turbo
COPY . .
# Generate a minimal workspace
RUN turbo prune @repo/payment-service --docker

# ---------- 2. BUILD STAGE ----------
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

# Copy pruned lockfile and package.json files
COPY --from=pruner /repo/out/json/ .
COPY --from=pruner /repo/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies inside this stage
RUN pnpm install --frozen-lockfile

# Copy the actual source code
COPY --from=pruner /repo/out/full/ .

# Build the project (includes shared packages)
RUN pnpm turbo run build --filter=@repo/payment-service...

# ---------- 3. RUNNER STAGE ----------
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy everything from the builder stage
# This ensures all pnpm symlinks and built files are present
COPY --from=builder /app .

EXPOSE 4004
CMD ["node", "services/payment-service/dist/index.js"]