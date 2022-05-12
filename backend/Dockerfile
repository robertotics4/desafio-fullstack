FROM node:14

LABEL version="1.0"
LABEL description="PULSE - Desafio Fullstack - Backend"
LABEL maintainer = ["robertooliveiragp@gmail.com"]

WORKDIR /desafio-fullstack-api

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
