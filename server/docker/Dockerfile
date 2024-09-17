FROM oven/bun

COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install

EXPOSE 8000

CMD bun run bin/index.ts