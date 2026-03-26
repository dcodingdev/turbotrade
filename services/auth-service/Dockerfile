# ---------- 1. PRUNE STAGE ----------
FROM node:20-alpine AS pruner
WORKDIR /repo
RUN npm install -g turbo
COPY . .
RUN turbo prune @repo/auth-service --docker

# ---------- 2. BUILD STAGE ----------
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
# Ensure pnpm doesn't ask for user input
ENV CI=true 

COPY --from=pruner /repo/out/json/ .
COPY --from=pruner /repo/out/pnpm-lock.yaml ./pnpm-lock.yaml

# We use --no-frozen-lockfile because we've been modifying package.json
RUN pnpm install --no-frozen-lockfile

COPY --from=pruner /repo/out/full/ .
RUN pnpm turbo run build --filter=@repo/auth-service...

# ---------- 3. RUNNER STAGE ----------
FROM node:20-alpine AS runner
WORKDIR /app
# Set production and CI mode
ENV NODE_ENV=production
ENV CI=true 

RUN npm install -g pnpm

# Copy the built app and workspace from builder
COPY --from=builder /app .

# Prune to only production dependencies
# This is where your previous build failed; --no-frozen-lockfile fixes the TTY/Sync issue
RUN pnpm install --prod --no-frozen-lockfile --ignore-scripts

EXPOSE 4001

# FINAL CMD:
# With rootDir: "../../", the structure in 'dist' mirrors the source tree.
# This points to the compiled server.js inside the auth-service dist folder.
CMD ["node", "services/auth-service/dist/services/auth-service/src/server.js"]