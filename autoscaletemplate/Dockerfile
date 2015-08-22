# DOCKER-VERSION 0.10.0

FROM ubuntu:14.04

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y git git-core nodejs npm

RUN rm -rf autoscalecode; true
RUN git clone https://github.com/garimakhulbe/autoscalecode.git


RUN cd /autoscalecode && npm install azure-common azure-arm-resource azure-storage log4js adal-node
WORKDIR /autoscalecode
RUN chmod +x start.sh

ENTRYPOINT ["/autoscalecode/start.sh"]
# run docker run -d <imagename> /code/src/start.sh agent <inputfilename>
