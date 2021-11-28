# Dockerfile for mongoDb Server
FROM mongo:5.0.4-focal

# Copies the init.js into the docker (holds corpus-de.json)
COPY init.js /docker-entrypoint-initdb.d/

# Creates a init db with name corpus
# Will change the databas on initializing to "<arg>"
ENV MONGO_INITDB_DATABASE="corpus"

EXPOSE 27017