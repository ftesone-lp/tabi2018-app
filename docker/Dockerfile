FROM node:10.13.0-alpine

RUN npm install -g @vue/cli @vue/cli-service-global --unsafe-perm

EXPOSE 8080

RUN mkdir -p /entrypoint

ADD ./entrypoint.sh /entrypoint.sh

RUN mkdir -p /code

VOLUME ["/code"]

WORKDIR /code

ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
