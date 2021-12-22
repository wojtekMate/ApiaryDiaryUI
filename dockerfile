  ### STAGE 1: Build ###
FROM node:14.18.2 as build
WORKDIR /appUI
COPY src ./src
COPY *.json ./
RUN npm install -g @angular/cli@12.2.1
RUN npm install
RUN ng build --configuration=production

FROM nginx:alpine as deploy
WORKDIR /appUI
COPY --from=build /appUI/dist/ApiaryDiary-ClientApp/*.* /usr/share/nginx/html/