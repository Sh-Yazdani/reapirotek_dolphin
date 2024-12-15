import {defineConfig, loadEnv} from '@rsbuild/core'
import {pluginReact} from '@rsbuild/plugin-react'
import {pluginSvgr} from '@rsbuild/plugin-svgr'
import {pluginTypeCheck} from '@rsbuild/plugin-type-check'
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr(), pluginTypeCheck()],
  html: {
    template: './index.html',
  },
  server: {
    port: 9900,
  },
  source: {
    entry: {index: './src/main.tsx'},
    aliasStrategy: 'prefer-tsconfig',
    define: loadEnv({prefixes: ['APP_']}).publicVars,
  },
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-module',
      override: {
        minSize: 100_000,
        maxSize: 200_000,
      },
    },
  },
  dev: {
    lazyCompilation: true,
  },
})
