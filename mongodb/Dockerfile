# Dockerfile for mongoDb Server
FROM mongo:5.0.4-focal

# Copies the init.js into the docker (holds corpus-de.json)
COPY _init.js /docker-entrypoint-initdb.d/

# Copies Corpus that need to be included\
COPY init-general.js /docker-entrypoint-initdb.d/
COPY init-corpus-basis.js /docker-entrypoint-initdb.d/
COPY init-corpus-interna.js /docker-entrypoint-initdb.d/
COPY init-corpus-swb4.js /docker-entrypoint-initdb.d/
COPY init-settings.js /docker-entrypoint-initdb.d/


# Creates a init db with name corpus
# Will change the databas on initializing to "<arg>"
ENV MONGO_INITDB_DATABASE="corpus"

EXPOSE 27017