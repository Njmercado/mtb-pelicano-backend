FROM node:12-alpine

RUN mkdir -p /src
WORKDIR /src

COPY . .
RUN npm install
RUN npm audit fix

EXPOSE 3000
