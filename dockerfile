  ### STAGE 1: Build ###
FROM node:latest as build
WORKDIR /appUI
COPY src ./src
COPY *.json ./
RUN npm install node@14.14.0
RUN npm install -g @angular/cli@12.2.1
RUN ng build --prod

FROM nginx:alpine as deploy
WORKDIR /appUI
COPY --from=build /appUI/dist/ApiaryDiary-ClientApp/*.* /usr/share/nginx/html/