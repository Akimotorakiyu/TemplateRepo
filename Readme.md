# 🎬 Template-Repo

A template repo

## vue example

```sh
// install
pnpm install

// dev
pnpm serve
```

## react example

```sh
// install
pnpm install

// dev
pnpm serve-react
```

## node example

```sh
// install
pnpm install

// dev
pnpm dev
```

## deploy

support [netlify.app](https://netlify.app) ([template-repo.netlify.app](https://template-repo.netlify.app))

default to deploy vue example, if you want to deploy react example, just change the `./netlify.toml`

```toml
#...
[build]
  command = "npx pnpm install --store=node_modules/.pnpm-store && npx pnpm build"
  publish = "packages/example/dist"
#...
```
