FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -g npm@9.4.0
EXPOSE 3000
CMD [ "node", "server.js" ]
