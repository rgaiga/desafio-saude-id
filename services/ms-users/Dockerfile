FROM node:20.11.0-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.11.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

ENV RABBITMQ_URL=amqp://127.0.0.1:5672
ENV RABBITMQ_USERS_QUEUE=users_queue
ENV RABBITMQ_ORDERS_QUEUE=orders_queue

ENV POSTGRES_HOST=127.0.0.1
ENV POSTGRES_PORT=5432
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DATABASE=users

COPY package*.json ./

RUN npm ci

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]
