FROM node:16.15-alpine
RUN mkdir -p /usr/src/app
ENV PORT 3000
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
