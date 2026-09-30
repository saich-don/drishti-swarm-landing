# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors and install dependencies
COPY package*.json ./
RUN npm ci

# Copy full source and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve through production-grade Nginx
FROM nginx:alpine

# Copy custom Nginx configuration for Cloud Run (port 8080 & SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
