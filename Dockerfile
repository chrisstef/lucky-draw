FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY pages ./pages
COPY public ./public
COPY styles ./styles

CMD ["npm", "run", "dev"]