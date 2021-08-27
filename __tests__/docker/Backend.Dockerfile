FROM node:14.17.1-alpine3.13

WORKDIR /app

COPY /server /app/server
COPY /__tests__/scripts/server.entry.sh /app/server

WORKDIR /app/server

RUN npm install

EXPOSE 5000

ENTRYPOINT ["sh", "server.entry.sh"]
