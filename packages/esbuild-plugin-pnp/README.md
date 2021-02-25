# `@orta/yarn-esbuild-plugin-pnp`

This plugin lets you use Yarn with esbuild. We use it in order to build Yarn itself!

## Usage

Add the plugin to your dependencies:

```
yarn add @orta/yarn-esbuild-plugin-pnp
```

Reference it via your esbuild configuration ([build API only](https://esbuild.github.io/plugins/)):

```ts
import {pnpPlugin} from '@orta/yarn-esbuild-plugin-pnp';

await build({
  plugins: [pnpPlugin()],
  // ...
});
```
