FROM node:12.20.1-alpine as build
WORKDIR /app
COPY ./ /app/
RUN npm install
EXPOSE 4200
CMD npm run start
