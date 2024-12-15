import type {Shadows} from '@mui/material'
import {range} from 'lodash-es'

export const shadows: Shadows = [
  'none',
  ...range(0, 24).map(() => '0 4px 20.7px 0 rgba(149, 149, 149, 0.25)'),
] as Shadows
