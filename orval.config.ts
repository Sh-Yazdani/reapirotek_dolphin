import type {Options} from 'orval'
import {defineConfig} from 'orval'

const defaultOutputOptions: Options['output'] = {
  mode: 'single',
  prettier: true,
  client: 'react-query',
}

export default defineConfig({
  Repairotek: {
    input: {
      target: 'https://repairotek-backend.vercel.app/swagger-json',
    },
    output: {
      ...defaultOutputOptions,
      target: './src/lib/data-provider/api/__generated.ts',
      override: {
        mutator: {
          path: './src/lib/axios/axios.ts',
          name: 'axiosInstance',
        },
        query: {
          useSuspenseQuery: true,
        },
      },
    },
  },
  /* OpenWeather: {
    input: {
      target: './swagger/open-weather.json',
    },

    output: {
      ...defaultOutputOptions,
      target:
        './src/lib/data-provider/third-party/open-weather/api/__generated.ts',
      override: {
        mutator: {
          path: './src/lib/axios/axios.ts',
          name: 'axiosInstance',
        },
      },
    },
  }, */
})
