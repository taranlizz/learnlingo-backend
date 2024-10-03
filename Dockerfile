FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

ENV NODE_ENV=short

CMD ["node", "./server.js"]