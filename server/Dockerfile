FROM node:16.14.2-bullseye-slim

RUN apt-get update 
RUN apt-get install -y bash

WORKDIR /app

COPY --chown=node:node . .

# Install app dependencies
RUN npm ci

RUN npm run lint
RUN npm run test
RUN npm run test:e2e
RUN npm run build

# Bundle app source

# Start the server using the production build
CMD node dist/main.js
