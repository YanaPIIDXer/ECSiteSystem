FROM node:14.15.0-alpine

RUN npm install -g @vue/cli

WORKDIR /app

ADD ./src/package.json /app
ADD ./src/package-lock.json /app
RUN npm install

ADD ./src /app

EXPOSE 80
CMD ["npm", "run", "serve"]
