# @kelp/server

## NOTE

> the pgp passphrase is the email you signed with

## Populating db with images

1. Make sure that db is clean and setup properly (follow GraphQL Setup instructions in main [README.md](../../README.md))
2. Start the app running `yarn start` from project root
3. Register, or logout than login again by clicking on first icon in upper right corner (logout)
4. Open `Application` tab in chrome console and copy the `accessToken` value from `Storage -> Local Storage -> http://localhost:1234`
5. Leaving the app running, in another terminal run `yarn syncPhotos PASTE_YOUR_ACCESS_TOKEN_HERE` from `@kelp/server` (note that _this might take some time_)
