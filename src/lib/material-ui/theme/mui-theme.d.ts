import '@mui/material/Typography'
import '@mui/material/styles/createPalette'

import type {
  Palette as OriginalPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette'

interface NeutralsPalette {
  gray: string
  line: string
  description: string
  primary: string
  secondary: string
}

interface GradientsPalette {}

interface PaletteExtentions {
  neutrals?: NeutralsPalette
  gradients?: GradientsPalette
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {}
}

declare module '@mui/material/styles/createPalette' {
  interface Palette extends OriginalPalette, PaletteExtentions {}

  interface PaletteOptions extends MuiPaletteOptions, PaletteExtentions {}

  interface SimplePaletteColorOptions {
    lighter?: string
    lightest?: string
    darker?: string
    darkest?: string
  }

  interface PaletteColor {
    lighter: string
    darker: string
    lightest: string
    darkest?: string
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body2: false
    overline: false
    label1: false

    h2: false
    h3: false
    h4: false
    h5: false
    h6: false
    subtitle1: false
    subtitle2: false
    footnote: false
    body: false
    label: false
    label2: false
    caption2: false
    body1: true
    t1: true
    t2: true
    textbox: true
    caption: true
    small: true
  }
}

export interface ExtendedTypographyOptions
  extends Omit<TypographyPropsVariantOverrides, 'h1'> {}

declare module '@mui/material/styles' {
  interface Theme {
    typography: ExtendedTypographyOptions
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true // removes the `xs` breakpoint
    sm: true
    md: true
    lg: true
    xl: true
    mobile: false // adds the `mobile` breakpoint
    tablet: false
    desktop: false
  }
}
