# `@kelp/macula`

> TODO: description

## Usage

```
const macula = require('@kelp/macula');

// TODO: DEMONSTRATE API
```

## Profiling

```
 clear; ab -k -c 20 -n 250 "http://localhost:9876/bafy2bzacedwxrcmp4z675sj2dp4oofqklkzlmfn2l6whw3itoyd5bili4x3zu?fm=webp&fit=cover&w=800"

 "start": "ts-node-dev --prof -r @kelp/config/env -r tsconfig-paths/register src/index.ts",

 node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

https://nodejs.org/en/docs/guides/simple-profiling/
