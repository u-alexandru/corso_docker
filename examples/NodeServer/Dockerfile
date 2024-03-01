FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

ENV PORT=3100

COPY . .

EXPOSE 3000 3100

CMD ["npm", "start"]