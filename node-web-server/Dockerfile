#FROM node:16.13.0-bullseye
FROM node:16.13.0-alpine3.14

# copy node program
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

# install packages
RUN npm ci
RUN npm install
#RUN npm install mongodb 

# run node server
CMD node .
EXPOSE 3000
