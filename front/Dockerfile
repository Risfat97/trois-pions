FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY ./public ./public
COPY ./src ./src

EXPOSE 3000

CMD ["npm", "start"]