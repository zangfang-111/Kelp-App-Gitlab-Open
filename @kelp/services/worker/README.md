search in the `node_modules/@sensio`

`require("@sensio/core/execution");` -> `require("@sensio/core/lib/execution");`
`@sensio/types/interfaces/augment` -> `@sensio/types/lib/interfaces/augment`
`@sensio/types/interfaces/definitions` -> `@sensio/types/lib/interfaces/definitions`
`@sensio/api/connection` -> `@sensio/api/lib/connection`
`@sensio/api/events` -> `@sensio/api/lib/events`
`@sensio/api/utils` -> `@sensio/api/lib/utils`

```sh
cp temp/raw-pixels-index.ts ./node_modules/@sensio/op-sn-image-raw-pixels/lib/index.js
```
