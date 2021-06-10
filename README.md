# Kelp apps

This is the place for the app development including microservices and client(web|desktop|mobile) applications.

> **KEEP IT SIMPLE && 🙂**

## Devevelopment setup and how to run this repo

Microservices and common are in the `services/{server|graphql|worker|...}`

Web | Desktop | Mobile are in the `client/{mainApp|router|profile|...}`

### Client only setup with microservices as docker containers

1. Clone the repo `git clone git@gitlab.com:kelp_digital/apps.git && cd apps`
2. make sure you have correct `.env` file with correct variables especially for the DB root -- if you have questions ask @woss_io on discord
3. install `sudo apt install postgresql-client-13 postgresql-common`
4. run `docker-compose -f docker-compose.servers.yml up db -d`
5. Ensure the node version is at least 12 and yarn
6. Install deps by running `yarn`
7. setup the DB by running `yarn setup:db` and select `y`
8. now run all the containers `docker-compose -f docker-compose.servers.yml up -d`
9. run the client from the root with `yarn start:client-and-deps` this will start client and graphql code generationin `watch` mode
10. or from the client folder `cd client/apps; yarn start`
11. or from the client folder `cd client/graphql; yarn watch`

> With this approach the `GraphiQL` will not be available so you need to use the external tool like [Altair](https://altair.sirmuel.design/#download) because you are running the production images.

**NOTE**

If you don't have lightroom and you are not planning on having it, you can ask @woss_io on our discord to send you the test data dump.

### Full development Setup

> Note, this will spin the `anagolay-node` as well so be careful that you don't have the ports taken. If you are running the Anagolay node separately, from its own repo, comment the section where the services is defined in the required docker-compose file first.

1. Clone the repo `git clone git@gitlab.com:kelp_digital/apps.git && cd apps`
2. Ensure the node version is at least 10
3. Ensure you have latest version of yarn
4. Install deps by running `yarn`
5. To start the app run `yarn start`, this will use pm2 which is avalale via `yarn pm2` more info on [PM2](https://pm2.keymetrics.io/docs/usage/application-declaration/)
6. If using defaults go to http://localhost:1234/
7. GraphQL endpoint is available `http://localhost:7666/graphql`
8. GraphiQL is available [http://localhost:7666/graphiql](http://localhost:7666/graphiql)

### Additional things to know

### Paths and Aliases

We are using tsconfig [paths](https://www.staging-typescript.org/tsconfig#paths) and [project references](https://www.staging-typescript.org/docs/handbook/project-references.html). Everytime you create new package which will be used by other pacakges, you need to set up the paths in the `root/tsconfig.json` and local reference in `pacakgeName/tsconfig.json` file

### Database schema restore and data update

Before the destroying the DB run `./@app/db/scripts/dump-db-data.sh`, this will create the record in the `./data/data` directory which you will use to get the data later on.

Do restore the db without the migrations do following:

```bash
node ./scripts/setup-db.js

# then from root
yarn db migrate

# then

psql -h localhost -d kelp -U kelp_owner -f ./data/data/04-10-2021_20-43-54.sql

```

### Building the images

First of all you need Docker, go and install it. After you are done with that add this to your `.zshrc|.bashrc`

```
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1
```

this will make the docker to use the new build engine. Before you build the images change the tags then run `docker-compose build && docker-compose push`

**TBD** need to make sure that version changes based on the env variable--

### Package Installing:

**NOTE** remove this when pnpm is implemented

For most of the packages we want the same versions, so installing the package should be done like `yarn add -W package-name`. that will install the package to the root, not the workspace and all the packages will have the same versions

### Imports

Folks from facebook now recommend using `import * as React from 'react'` over `import React from 'react'`, also vscode seems to be offering better intellisense experience when using `import * as React from 'react'`. See the PR comment [here](https://github.com/facebook/react/pull/18102#issuecomment-659234486).

### Client GraphQL naming conventions

All client-side GraphQL queries are located under `./@app/client/src/graphql` and are named following this naming convention:

- `<Type>.graphql` - e.g. `Media.graphql` containing all queries, fragments, subscriptions and mutations for that type
- `<PageName>.graphql` - e.g. `TimelinePage.graphql` containing all graphql that respective page uses

## Removing containers and node_modules

### Remove containers

Before you start deleting the images pass `-f docker-compose.servers}.yml` to the commands below. If you used the full development stup then only DB and node will be deleted. In the root folder execute this:

```sh
# sopt containers
docker-compose stop

# remove containers & select y to confirm
docker-compose rm

# remove used volumes, images and networks
docker-compose down --rmi all --volumes --remove-orphans
```

### Remove all node_modules and build dirs

Running the `yarn clean:all` in the root folder should do the trick.

## Common erross

If you get this `error: gpg failed to sign the data` then try to restart gpg agent like this `gpgconf --kill gpg-agent` and try to commit again. If that doesn't wok check this [Stackoverflow question](https://stackoverflow.com/questions/41052538/git-error-gpg-failed-to-sign-data)
