# --- ETAPA 1: Construcción ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- ETAPA 2: Producción ---
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

# Proxy Inverso
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Permisos Non-Root
RUN chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /var/run /var/cache/nginx

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]