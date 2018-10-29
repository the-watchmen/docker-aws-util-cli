FROM node:8.12.0-alpine

RUN apk add --update git

ADD src app

WORKDIR /work

ENTRYPOINT [ "node", "--experimental-modules", "--no-warnings", "/app" ]