FROM node:latest

WORKDIR /tests
RUN npm i -g mocha --unsafe-perm
