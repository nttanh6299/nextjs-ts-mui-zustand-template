FROM node:18.17-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /react-app

COPY ./package.json ./yarn.lock .
RUN yarn install

COPY . .
COPY .env.production .env.production

RUN yarn build

CMD ["yarn", "start"]
EXPOSE 3000
