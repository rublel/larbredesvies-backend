FROM node:16-alpine

WORKDIR /srv/app/frontend
CMD npm install && npm  start
