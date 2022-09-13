# syntax=docker/dockerfile:1

FROM node:16.17.0
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --omit=dev
COPY . .
CMD ["node", "index.js"]

