FROM node:alpine

RUN mkdir -p /api

WORKDIR /api

COPY . .

RUN npm install

RUN npm install pm2 -g

RUN npm run build

CMD pm2 start dist/index.js -i 1 --name warpig-api && pm2 logs warpig-api

EXPOSE 3000
