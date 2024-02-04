FROM node:20.11.0-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20.11.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

ENV RABBITMQ_URL=amqp://127.0.0.1:5672
ENV RABBITMQ_STOCK_QUEUE=stock_queue
ENV RABBITMQ_ORDERS_QUEUE=orders_queue
ENV RABBITMQ_PRODUCTS_QUEUE=products_queue

ENV REDIS_HOST=127.0.0.1
ENV REDIS_PORT=6379
ENV REDIS_PASSWORD=

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]
