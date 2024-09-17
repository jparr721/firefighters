FROM oven/bun:1 AS base
WORKDIR /usr/src/app

COPY . .

RUN bun install
RUN bun run build

FROM nginx:bookworm

# Remove default Nginx static files and configurations
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/*

COPY --from=base /usr/src/app/dist /usr/share/nginx/html
COPY --from=base /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]