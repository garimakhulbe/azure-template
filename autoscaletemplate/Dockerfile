# DOCKER-VERSION 0.10.0

FROM ubuntu:14.04

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y git git-core nodejs npm

RUN rm -rf code; true
RUN git clone https://github.com/garimakhulbe/code.git


RUN cd /code/src && npm install azure-common azure-arm-resource azure-storage adal-node

RUN chmod +x /code/src/start.sh

ENTRYPOINT ['/code/src/start.sh']
