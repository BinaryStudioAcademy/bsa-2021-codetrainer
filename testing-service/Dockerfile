FROM node:latest

WORKDIR /app
RUN npm i mocha
RUN npm i chai

CMD [ "npx", "mocha", "javascript/test/test.js" ]