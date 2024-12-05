FROM egovio/alpine-node-builder-14:yarn AS build
#FROM ghcr.io/egovernments/alpine-node-builder-14:yarn AS build
RUN apk update && apk upgrade
RUN apk add --no-cache git>2.30.0
RUN yarn add @egovernments/digit-ui-libraries
RUN yarn add @egovernments/digit-ui-module-fsm
RUN yarn add @egovernments/digit-ui-module-pt
RUN yarn add @egovernments/digit-ui-module-tl
RUN yarn add @egovernments/digit-ui-module-obps
RUN yarn add @egovernments/digit-ui-module-ws
RUN yarn add @egovernments/digit-ui-module-dss
RUN yarn add @egovernments/digit-ui-module-mcollect
RUN yarn add @egovernments/digit-ui-module-pgr
RUN yarn add @egovernments/digit-ui-module-noc
RUN yarn add @egovernments/digit-ui-module-engagement
RUN yarn add @egovernments/digit-ui-module-hrms
RUN yarn add @egovernments/digit-ui-module-core
RUN yarn add @egovernments/digit-ui-module-common
RUN yarn add @egovernments/digit-ui-module-commonpt
RUN yarn add @egovernments/digit-ui-module-bills

ARG WORK_DIR
WORKDIR /app

ENV NODE_OPTIONS "--max-old-space-size=8192"

ENV GENERATE_SOURCEMAP "false"

COPY ${WORK_DIR} .
RUN ls -lah

#RUN node web/envs.js
RUN cd web/ \
    && node envs.js \
    && node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(8192*8192))' \
    &&  ./install-deps.sh \
    && yarn install \
    && yarn build:webpack 

FROM nginx:mainline-alpine
#FROM ghcr.io/egovernments/nginx:mainline-alpine
ENV WORK_DIR=/var/web/digit-ui

RUN mkdir -p ${WORK_DIR}

COPY --from=build /app/web/build ${WORK_DIR}/
COPY --from=build /app/web/docker/nginx.conf /etc/nginx/conf.d/default.conf
