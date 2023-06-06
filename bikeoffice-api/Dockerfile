FROM node:latest

WORKDIR /app
COPY ./bikeoffice-api/package*.json ./
RUN npm ci

COPY ./dist/bikeoffice-api/ ./
EXPOSE 3000
CMD [ "node", "main.js" ]

