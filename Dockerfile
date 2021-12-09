FROM node:12-alpine

WORKDIR /opt/planning-chess

ADD services/app/dist app/dist/
ADD services/api/dist/src api/dist/src
ADD services/api/package.json api/
# ADD services/api/.env api/

WORKDIR /opt/planning-chess/api
RUN npm i --production

EXPOSE 8081

CMD ["node", "dist/src"]