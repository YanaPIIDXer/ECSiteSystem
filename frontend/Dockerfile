FROM node:14.15.0-alpine

RUN npm install -g @angular/cli

WORKDIR /app

ADD ./src/package.json /app
ADD ./src/package-lock.json /app
RUN npm install

ADD ./src /app

EXPOSE 80
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80", "--poll", "1000"]
