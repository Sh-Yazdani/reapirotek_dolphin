import {z} from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  APP_API_SERVICE_URL: z.string(),
  APP_OPEN_WEATHER_API_KEY: z.string(),
  APP_OPEN_WEATHER_BASE_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse({
  APP_API_SERVICE_URL: import.meta.env.APP_API_SERVICE_URL,
  APP_OPEN_WEATHER_API_KEY: import.meta.env.APP_OPEN_WEATHER_API_KEY,
  APP_OPEN_WEATHER_BASE_URL: import.meta.env.APP_OPEN_WEATHER_BASE_URL,
})
