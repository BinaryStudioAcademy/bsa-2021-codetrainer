FROM node:latest

WORKDIR /app
RUN npm i -g mocha
RUN npm i chai

CMD mocha javascript/test/test.js --reporter json