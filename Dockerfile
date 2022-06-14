FROM node:lts-alpine

RUN apk update && apk add --no-cache python3 make g++ bash

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./ ./

RUN npm install
