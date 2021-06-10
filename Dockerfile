# syntax=docker/dockerfile:experimental
# Build box for all packages
# this image does not contain the files or any env vars
FROM node:15-alpine as base

# This hack is widely applied to avoid python printing issues in docker containers.
# See: https://github.com/Docker-Hub-frolvlad/docker-alpine-python3/pull/13
ENV PYTHONUNBUFFERED=1


RUN apk add --no-cache git make g++ && \
  apk add --no-cache python3 && \
  if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi && \
  python3 -m ensurepip && \
  rm -r /usr/lib/python*/ensurepip && \
  pip3 install --no-cache --upgrade pip setuptools wheel && \
  if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi

WORKDIR /app/

COPY @app /app/@app
COPY data /app/data
COPY typings /app/typings
COPY package.json /app/
COPY yarn.lock /app/
COPY lerna.json /app/
COPY tsconfig.json /app/

# RUN --mount=type=cache,target=/app/node_modules \
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn install --pure-lockfile --silent --non-interactive --no-progress

## common build stage
FROM base as base-common-build
WORKDIR /app/

## Build graphql files, this is needed for almost ALL packages
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn lerna run build --scope=@app/graphql
## common build stage

########################################## SERVICES ###############################################

###################################################################################################

######################################## Macula Server ############################################

### Build image ###

FROM base-common-build as macula-base

WORKDIR /app/

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn lerna run build --scope=@app/macula


COPY yarn.lock @app/macula/dist/
COPY @app/macula/package.json /app/@app/macula/dist/
COPY @app/macula/newrelic.js /app/@app/macula/dist/

WORKDIR /app/@app/macula/dist/


# # install production packages
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn install --pure-lockfile --silent --non-interactive --no-progress --production=true

### END Build image ###


### MAIN IMAGE ###

FROM node:15-alpine as macula
LABEL description="On-the-fly  high-performance multimedia encoder, decoder and resizer. https://macula.sigius.dev/"
WORKDIR /app
EXPOSE 9876
# copy the dist
COPY --from=macula-base /app/@app/macula/dist .
CMD [ "node", "server.js" ]
### END MAIN IMAGE ###

###################################################################################################

######################################## Graphql Server ###########################################

### Build image ###

FROM base-common-build as server-base

WORKDIR /app/

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn lerna run build --scope=@app/server


COPY yarn.lock @app/server/dist/
COPY @app/server/package.json /app/@app/server/dist/
COPY @app/server/newrelic.js /app/@app/server/dist/

WORKDIR /app/@app/server/dist/

# # install production packages
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn install --pure-lockfile --silent --non-interactive --no-progress --production=true

### END Build image ###
### MAIN IMAGE ###

FROM node:15-alpine as server
LABEL description="High-performance graphql server for https://api.kelp.digital/"
WORKDIR /app
EXPOSE 7666
# copy the dist
COPY --from=server-base /app/@app/server/dist .




CMD [ "node", "server.js" ]
### END MAIN IMAGE ###
###################################################################################################
##################################### Lightroom Server ############################################
### Build image ###

FROM base-common-build as lightroom-base

WORKDIR /app/

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn lerna run build --scope=@app/lightroom


COPY yarn.lock @app/lightroom/dist/
COPY @app/lightroom/package.json /app/@app/lightroom/dist/
COPY @app/lightroom/newrelic.js /app/@app/lightroom/dist/

WORKDIR /app/@app/lightroom/dist/

# # install production packages
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn install --pure-lockfile --silent --non-interactive --no-progress --production=true

### END Build image ###
### MAIN IMAGE ###

FROM node:15-alpine as lightroom
LABEL description="Lighroom integration API"
WORKDIR /app
EXPOSE 7665
# copy the dist
COPY --from=lightroom-base /app/@app/lightroom/dist .

CMD [ "node", "server.js" ]
### END MAIN IMAGE ###

###################################################################################################
############################ Worker && Scheduler Server ###########################################
### Build image ###

FROM base-common-build as worker-base

WORKDIR /app/

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn lerna run build --scope=@app/worker


COPY yarn.lock @app/worker/dist/
COPY @app/worker/package.json /app/@app/worker/dist/

WORKDIR /app/@app/worker/dist/

# # install production packages
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn install --pure-lockfile --silent --non-interactive --no-progress --production=true

### END Build image ###
### MAIN IMAGE ###

FROM node:15-alpine as worker
LABEL description="Worker service. Making sure things are in order"
WORKDIR /app

# copy the dist
COPY --from=worker-base /app/@app/worker/dist .
COPY --from=worker-base /app/@app/worker/crontab .

CMD [ "node","./node_modules/.bin/graphile-worker", "--crontab", "./crontab", "--jobs", "7" ]

### END MAIN IMAGE ###

###################################################################################################
######################################## WEB APP Client ###########################################
### Build image ###

FROM base-common-build as client-base

WORKDIR /app/

RUN sed -i 's/http\:\/\/localhost\:7666/https\:\/\/api\.kelp\.digital/g' @app/client/src/apollo/client.ts && \
  sed -i 's/http\:\/\/localhost\:9876/https\:\/\/macula\.kelp\.digital/g' @app/client/src/utils/createImgSrc.ts && \
  sed -i 's/ws\:\/\/localhost\:9944/wss\:\/\/network\.kelp\.digital/g' @app/client/src/components/Statements/statement.worker.ts && \
  sed -i 's/ws\:\/\/localhost\:9944/wss\:\/\/beta\.anagolay\.network/g' @app/client/src/workers/anagolay-network-api.ts


RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn lerna run build --scope=@app/client


COPY yarn.lock @app/client/dist/
COPY @app/client/package.json /app/@app/client/dist/

WORKDIR /app/@app/client/dist/

# the API has a wrong PoCLO id, no need to republish it for now. it will be changed anyways
RUN  find . -type f -name "*.js" -print0 | xargs -0 sed -i 's/bafykbzacebyhpk6c7imf2a43cxo3viib74bpuc7ndc22zldlfxbthsjoze6pi/bafy2bzacea4vzgbdljfmmcws7dtdtp2ekabp2q3rx53or33pfrkbr5ezb25g4/g'


# # install production packages
# RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
#   yarn install --pure-lockfile --silent --non-interactive --no-progress --production=true

### END Build image ###
### CLIENT IMAGE ###
FROM nginx as client

COPY --from=client-base  /app/@app/client/nginx.conf /etc/nginx/conf.d/default.conf

#Copy production build files from builder phase to nginx
COPY --from=client-base  /app/@app/client/dist /usr/share/nginx/html
### END MAIN IMAGE ###


###################################################################################################
############################ File Upload for Lightroom Server #####################################
### Build image ###

FROM base-common-build as file-upload-base

WORKDIR /app/

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn lerna run build --scope=@app/fileupload


COPY yarn.lock @app/fileUpload/dist/
COPY @app/fileUpload/package.json /app/@app/fileUpload/dist/

WORKDIR /app/@app/fileUpload/dist/

# # install production packages
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
  yarn install --pure-lockfile --silent --non-interactive --no-progress --production=true

### END Build image ###
### MAIN IMAGE ###

FROM node:15-alpine as file-upload
LABEL description="File upload service, Stream to the s3 for now"
WORKDIR /app
EXPOSE 1223
# copy the dist
COPY --from=file-upload-base /app/@app/fileUpload/dist .

CMD [ "node", "server.js" ]

### END MAIN IMAGE ###
