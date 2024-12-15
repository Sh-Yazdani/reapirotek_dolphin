import '@/assets/fonts/geometria/style.css'

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {QueryClientProvider} from '@tanstack/react-query'
import dayjs from 'dayjs'
/* dayjs plugins -> start */
import duration from 'dayjs/plugin/duration'
import isToday from 'dayjs/plugin/isToday'
import relativeTime from 'dayjs/plugin/relativeTime' // ES 2015
import utc from 'dayjs/plugin/utc'
/* dayjs plugins -> end */
import type {ReactNode} from 'react'
import React from 'react'
import {HelmetProvider} from 'react-helmet-async'
import {I18nextProvider, useTranslation} from 'react-i18next'
import {Toaster} from 'sonner'

import {DefaultPendingComponent} from '@/components'
import {AccessProvider} from '@/lib/casl'
import i18n from '@/lib/i18next/i18next-config'
import {StyleEngineProvider} from '@/lib/material-ui/style-engine-provider'
import {queryClient} from '@/lib/react-query'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(isToday)

interface AppProvidersProps {
  children: ReactNode
}

const MuiLocalizationProvider: React.FC<AppProvidersProps> = ({children}) => {
  const {i18n: _i18n} = useTranslation()

  return (
    <LocalizationProvider
      adapterLocale={_i18n.language}
      dateAdapter={AdapterDayjs}
    >
      {children}
    </LocalizationProvider>
  )
}

export const AppProviders: React.FC<AppProvidersProps> = ({children}) => {
  return (
    <React.Suspense fallback={<DefaultPendingComponent />}>
      <AccessProvider>
        <I18nextProvider i18n={i18n}>
          <StyleEngineProvider>
            <HelmetProvider>
              <MuiLocalizationProvider>
                <QueryClientProvider client={queryClient}>
                  <Toaster
                    position='top-right'
                    toastOptions={{unstyled: true}}
                  />
                  {children}
                </QueryClientProvider>
              </MuiLocalizationProvider>
            </HelmetProvider>
          </StyleEngineProvider>
        </I18nextProvider>
      </AccessProvider>
    </React.Suspense>
  )
}
