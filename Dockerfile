FROM node:12-alpine as build

WORKDIR /opt/planning-chess
ADD . .
RUN npm i
RUN npm run ci

WORKDIR /opt/planning-chess/api
RUN npm i --production

FROM node:12-alpine

WORKDIR /opt/planning-chess
COPY --from=build /opt/planning-chess/services/app/dist /opt/planning-chess/services/app/dist
COPY --from=build /opt/planning-chess/services/api/dist/src /opt/planning-chess/services/api/dist/src
COPY --from=build /opt/planning-chess/services/api/node_modules /opt/planning-chess/services/api/node_modules
# ADD services/api/.env api/

EXPOSE 8081

CMD ["node", "/opt/planning-chess/services/api/dist/src"]