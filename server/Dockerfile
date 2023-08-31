FROM node:16.14.2-alpine

# Create app directory
WORKDIR /usr/src/app

COPY dist dist
COPY node_modules node_modules

RUN ls -la

CMD [ "npm", "run", "start" ]
