FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS dependencies
WORKDIR /app

RUN mkdir -p packages/twoslash
RUN mkdir -p packages/remark-reading-time

COPY package.json bun.lock LICENSE ./
COPY packages/twoslash/package.json packages/twoslash/
COPY packages/remark-reading-time/package.json packages/remark-reading-time/

# installs dependencies for all workspaces, one node_modules folder per package.json
RUN bun install --frozen-lockfile

FROM base AS build
WORKDIR /app

COPY --from=dependencies /app /app
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run --cwd /app/packages/twoslash build
RUN bun run --cwd /app/packages/remark-reading-time build
RUN bun run --cwd /app build

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

COPY --from=build --chown=nextjs:nodejs /app/bun.lock /app/LICENSE ./
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000/tcp

# TODO: do I want to use this or "bun server.js" with a standalone export?
CMD [ "bun", "run", "server.js" ]
