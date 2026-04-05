FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/worker/package.json apps/worker/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
COPY packages/prompt-builder/package.json packages/prompt-builder/package.json

RUN pnpm install --filter @makuhari/worker... --frozen-lockfile

COPY apps/worker apps/worker
COPY packages/shared-types packages/shared-types
COPY packages/prompt-builder packages/prompt-builder

RUN pnpm --filter @makuhari/worker build

EXPOSE 8080

CMD ["node", "apps/worker/dist/index.js"]
