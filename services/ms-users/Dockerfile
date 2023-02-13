FROM node:18.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]