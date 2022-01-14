# Docker Compose

Please install all docker images on your docker hub.

__Needed docker images__

- docker pull mongo:5.0.4-focal
- docker pull alpine:3.15
- docker pull node:16.13.0-alpine3.14
- docker pull openjdk:11

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

# Testing of the Admin UI
The Admin Interface has been tested in Google Chrome with Iphone XR 414 x 896.
We setup the Admin Interface to look best on the Iphone XR.

We also tested the Admin UI on the Ipad Air 820 x 1180. 
We setup the style to look as close as good like on the Iphone XR.  

On other Devices, so optical Glitches will occur.
Due to the Time Limit we only could setup the preferred style on one device.


# Git Graph before the Clean of 2021-12-17

In the following picture is the Graph of the Branches from 2021-12-17.
Every Merge Request we created made the understanding of added features to our Program more complicated.
So we decided to clean the structure to get a more understandable main Branch. 

![alt text](img/Gitlab_Branch_Graph_2021_12_17.png "Gitlab Branch Graph 2021-12-17")

