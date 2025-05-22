# Étape 1 :  frontend
FROM node:22 AS build-frontend
WORKDIR /app
COPY package*.json ./
COPY vite.config.* ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build:front

# Étape 2 :  backend
FROM node:22 AS build-backend
WORKDIR /app
COPY server/package*.json ./server/
COPY server/tsconfig*.json ./server/
COPY server/src ./server/src
COPY --from=build-frontend /app/dist ./server/public
WORKDIR /app/server
RUN npm install
RUN npm run build:back

# Étape 3 : Image finale
FROM node:22-alpine
WORKDIR /app/server
COPY --from=build-backend /app/server/dist ./dist
COPY --from=build-backend /app/server/node_modules ./node_modules
COPY server/.env .env
COPY server/package*.json ./
COPY server/public ./public

EXPOSE 5000
CMD ["node", "dist/main.js"]