import type {ThemeOptions} from '@mui/material/styles'
import {createTheme} from '@mui/material/styles'

import {breakpoints} from './breakpoints'
import * as dark from './config/dark'
import * as light from './config/light'
import {shape} from './config/shape'
import typography from './config/typography'

const defaultThemeOptions: ThemeOptions = {
  typography,
  shape,
  breakpoints,
}
export const lightTheme = createTheme({
  ...defaultThemeOptions,
  shadows: light.shadows,
  palette: light.palette,
})

export const darkTheme = createTheme({
  ...defaultThemeOptions,
  palette: dark.palette,
  // shadows: dark.shadows,
})
