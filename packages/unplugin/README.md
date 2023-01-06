# unplugin-honeybadger

## Install

```sh
npm i unplugin-honeybadger
```

<details>
<summary>esbuild</summary><br>

```js
// esbuild.config.js
import { build } from 'esbuild'
import { HoneybadgerPlugin } from 'unplugin-honeybadger/esbuild'

build({
  plugins: [
    HoneybadgerPlugin(/* options */)
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```js
// rollup.config.js
import { HoneybadgerPlugin } from 'unplugin-honeybadger/rollup'

export default {
  plugins: [
    HoneybadgerPlugin(/* options */)
  ],
}
```

<br></details>

<details>
<summary>Vite</summary><br>

```js
// vite.config.ts
import { HoneybadgerPlugin } from 'unplugin-honeybadger/vite'

export default defineConfig({
  plugins: [
    HoneybadgerPlugin(/* options */)
  ],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
const { HoneybadgerPlugin } = require('unplugin-honeybadger/webpack');

module.exports = {
  plugins: [
    HoneybadgerPlugin(/* options */),
  ],
};
```

<br></details>
