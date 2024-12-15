import type {PaletteMode} from '@mui/material'
import {CssBaseline} from '@mui/material'
import type {Theme} from '@mui/material/styles'
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import {get} from 'lodash-es'
import type {ReactNode} from 'react'
import {useMemo} from 'react'

import {useThemeModeStore} from '@/store/theme-mode'

import {GlobalStyles} from './globalStyles'
import {darkTheme, lightTheme} from './theme'
import componentsOverride from './theme/overrides'

interface ThemeConfigProps {
  children: ReactNode
}

const themeMap: Record<PaletteMode, Theme> = {
  dark: darkTheme,
  light: lightTheme,
}

export const StyleEngineProvider = ({children}: ThemeConfigProps) => {
  const mode = useThemeModeStore((s) => s.mode)
  const theme: Theme = useMemo(() => get(themeMap, mode), [mode])
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}
