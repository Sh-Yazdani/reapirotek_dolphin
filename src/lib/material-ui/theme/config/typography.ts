import {breakpoints} from '../breakpoints'
import type {ExtendedTypographyOptions} from '../mui-theme'

function pxToRem(value: number) {
  return `${value / 16}rem`
}

const FONT_PRIMARY = 'Geometria, sans-serif'

function responsiveFontSizes({
  lg,
  md,
  sm,
  xs,
}: {
  sm: number
  md: number
  lg: number
  xs: number
}) {
  return {
    [`@media (min-width: ${breakpoints.values?.xs}px)`]: {
      fontSize: pxToRem(xs),
    },
    [`@media (min-width: ${breakpoints.values?.sm}px)`]: {
      fontSize: pxToRem(sm),
    },
    [`@media (min-width: ${breakpoints.values?.md}px)`]: {
      fontSize: pxToRem(md),
    },
    [`@media (min-width: ${breakpoints.values?.lg}px)`]: {
      fontSize: pxToRem(lg),
    },
  }
}

const typography: ExtendedTypographyOptions = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontWeightHeavy: 800,

  button: {
    textTransform: 'Capitalize',
  },

  h1: {
    fontSize: pxToRem(27),
    ...responsiveFontSizes({xs: 23, sm: 23, md: 27, lg: 27}),
  },
  t1: {
    fontSize: pxToRem(19),
    ...responsiveFontSizes({xs: 16, sm: 16, md: 19, lg: 19}),
  },
  t2: {
    fontSize: pxToRem(15),
    lineHeight: pxToRem(22.64),
    ...responsiveFontSizes({xs: 13, sm: 13, md: 15, lg: 15}),
  },
  textbox: {fontSize: pxToRem(15)},
  caption: {fontSize: pxToRem(13), lineHeight: pxToRem(17.61)},
  small: {fontSize: pxToRem(11)},
  body1: {
    fontSize: pxToRem(13),
  },
}

export default typography
