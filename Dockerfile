
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY . .
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/src/server.ts ./src/server.ts
COPY --from=build /app/src/instrumentation ./src/instrumentation
COPY --from=build /app/src/middleware ./src/middleware
COPY --from=build /app/src/services ./src/services

# Install production dependencies only
RUN npm ci --legacy-peer-deps --only=production
RUN npm install typescript -g


EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
# VERSION is set during build with --build-arg VERSION=blue or VERSION=green
ARG VERSION=blue
ENV VERSION=${VERSION}

CMD ["node", "dist/server/server.js"]
