FROM docker.umiit.cn:5043/node:0.12.7

RUN apt-get update
RUN apt-get install -y ghostscript imagemagick graphicsmagick

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --unsafe-perm
COPY . /usr/src/app

CMD [ "npm", "start" ]
EXPOSE {%= port %}