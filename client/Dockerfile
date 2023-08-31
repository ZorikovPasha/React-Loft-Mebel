FROM node:16.14.2-alpine

RUN apt-get update
RUN apt-get install -y bash

WORKDIR /app

ENV NODE_ENV production

COPY dist /app/dist
COPY .env.production /app
COPY node_modules /app/node_modules
RUN ls -la

CMD npm run preview
