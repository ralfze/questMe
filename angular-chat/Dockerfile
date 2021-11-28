FROM node:16.13.0-alpine3.14

# copy all files
RUN mkdir -p /app
COPY . /app
WORKDIR /app

# install packages
RUN npm ci
RUN npm install -g @angular/cli

# start app
CMD ng serve --host 0.0.0.0

EXPOSE 4200
