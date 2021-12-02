# Install alpine linux on docker
FROM alpine:3.15
# Install openjdk 11 on docker
FROM openjdk:11


ENV KEYCLOAK_USER=admin
ENV KEYCLOAK_PASSWORD=admin

# Create main folder
RUN mkdir -p /usr/src/app

# copy node program
COPY . /usr/src/app
WORKDIR /usr/src/app

# run keycloak
#RUN chmod +x ./bin/standalone.sh
CMD ./bin/standalone.sh -b 0.0.0.0
EXPOSE 8080
