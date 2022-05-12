FROM node:14 as build-stage

LABEL version="1.0"
LABEL description="PULSE - Desafio Fullstack / Frontend"
LABEL maintainer = ["robertooliveiragp@gmail.com"]

WORKDIR /desafio-fullstack-client

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

FROM nginx:1.17.0-alpine
COPY --from=build-stage /desafio-fullstack-client/build /usr/share/nginx/html
EXPOSE 3000
CMD nginx -g 'daemon off;'


CMD ["npm", "start"]
