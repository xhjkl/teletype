# 🗼 teletype 🗼

A publishing platform.

To bring up the project, issue:
```shell
  $ echo DATABASE_URL='postgres://...' > .env
  $ pnpm migrate
  $ pnpm run start
```

## Contributing

Back-end part of this app starts at `src/server.ts`. All the client-side logic resides at `src/client/*`. To make everything pre-renderable, client-side modules should also run on the server side. The only exception is `src/client/index.ts`, which is browser-only, because it bootstraps the whole hierarchy upon page load.

Behavioral components are located at `src/client/page/*`. Those could include each other, and take stateful actions.

Presentational components sit at `src/client/view/*`. Those should not depend on pages, and should just reflect input data onto the DOM and be otherwise simple.

Tests are located in-tree.
