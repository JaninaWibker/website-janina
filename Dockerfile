FROM node:26-slim AS base
RUN --mount=type=bind,source=./package.json,target=/app/package.json \
  PNPM_VERSION=$(node -p "require('/app/package.json').packageManager.split('@')[1]") && \
  npm install --global pnpm@$PNPM_VERSION

WORKDIR /app

FROM base AS dependencies

COPY pnpm-lock.yaml pnpm-workspace.yaml /app/
RUN pnpm fetch

FROM base AS build

COPY --from=dependencies /app/node_modules /app/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build:deps
RUN pnpm run build

FROM base AS production
WORKDIR /app

ENV \
  NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=3000 \
  HOSTNAME="0.0.0.0"

RUN \
  groupadd --system --gid 1001 nodejs && \
  useradd --system --uid 1001 --no-log-init -g nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app/pnpm-lock.yaml /app/LICENSE ./
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000/tcp

CMD [ "node", "server.js" ]
