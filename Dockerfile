FROM node:20 as build

WORKDIR /app
ADD . .

RUN npm install && npm run build

FROM node:20

USER node
WORKDIR /app

ADD ./package.json .
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist

ENV TIMER_DURATION_MINS=30

EXPOSE 3030

CMD [ "npm", "run", "start" ]