# 🎬 Template-Repo

A pnpm template repo

## vue example

### install

```sh
pnpm install
```

### dev

```sh
# vue3 dev
pnpm serve

# react18 example
pnpm serve-react

# node example
pnpm dev

# fass-node example
pnpm dev-fass
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
