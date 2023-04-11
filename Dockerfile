FROM node:18-alpine

WORKDIR /app

COPY . /app

COPY package.json package-lock.json ./

RUN npm install

COPY next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "run", "dev"]
