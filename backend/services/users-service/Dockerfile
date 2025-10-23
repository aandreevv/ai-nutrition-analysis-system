FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY services/users-service/package*.json ./
COPY services/users-service/tsconfig.json ./
COPY libs ./libs
RUN npm install
COPY services/users-service ./
RUN npm run build

FROM node:22-alpine AS final
WORKDIR /usr/src/app
COPY package*.json ./
COPY services/users-service/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/libs ./libs
EXPOSE 3001
CMD npm run start:prod
