# Docker Compose

Please install all docker images on your docker hub.

__Needed docker images__

docker pull mongo:5.0.4-focal
docker pull node:16.13.0-bullseye
docker pull node:16.13.0-alpine3.14

# Docker Compose Build

You can build the docker compose with

docker compose build


# Docker Compose Run

You can run the docker compose with

docker compose up


# Issues

In our example mongodb stores it data in .db-data.
When you drop there a database and re-run docker compose up,
the build script of the corpus will not be executed.
Cause mongodb uses the existing files.
Erase the folder ".db-data" and the build script will be used. 