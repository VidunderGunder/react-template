# React + Vite + Bun + Tailwind + Oxc

My personal frontend starter

Install [bun](https://bun.sh/)

Then run:

```
bun i
```

```
bun dev
```

## Type checking

Neither oxlint nor `vite build` checks types on its own, so run TypeScript across both projects (`src` and `vite.config.ts`) with:

```
bun run tsc
```

## Linting and formatting

Handled by [Oxc](https://oxc.rs/) — [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting and [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for formatting, configured in `.oxlintrc.json` and `.oxfmtrc.json`.

oxfmt also sorts imports and Tailwind classes (including inside `cn(...)`), so no extra plugins are needed.

```
bun lint
bun lint:fix
bun format
bun format:check
```

In VS Code, install the recommended [Oxc extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) — format on save and `source.fixAll.oxc` are already wired up in `.vscode/settings.json`.

## Optional sync with OpenAPI (Swagger)

Included is a way to generate a [TanStack query](https://tanstack.com/query/latest) client using [OpenAPI TypeScript](https://openapi-ts.dev/)

Adjust synchronization script and `fetchClient` to point to your OpenAPI spec before running the sync:

```js
// package.json

{
  "scripts": {
    // Update this
    "sync": "bun run openapi-typescript http://localhost:8888/openapi.json -o ./src/api/schema.d.ts"
  }
}
```

```tsx
// src/api/index.tsx

const fetchClient = createFetchClient<paths>({
	// Update this
	baseUrl: "http://localhost:8888/",
});
```

```
bun sync
```

## Backend recommendations

- [Go](https://go.dev/) + [Standard library's `net/http`](https://pkg.go.dev/net/http) + [Huma](https://huma.rocks/) + [Goth](https://github.com/markbates/goth)
- [ElysiaJS](https://elysiajs.com/) (Bun/TypeScript) + [Swagger plugin](https://elysiajs.com/plugins/swagger.html)
