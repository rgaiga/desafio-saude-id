FROM node:20.11.0-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.11.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

ENV SERVER_PORT=3000
ENV BASE_PATH=/api/v1

ENV RABBITMQ_URL=amqp://127.0.0.1:5672
ENV RABBITMQ_USERS_QUEUE=users_queue
ENV RABBITMQ_PRODUCTS_QUEUE=products_queue
ENV RABBITMQ_ORDERS_QUEUE=orders_queue

COPY package*.json ./

RUN npm ci

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE $SERVER_PORT

CMD ["node", "dist/main.js"]
