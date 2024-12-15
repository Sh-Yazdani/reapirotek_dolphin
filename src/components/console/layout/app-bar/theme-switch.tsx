import type {PaletteMode} from '@mui/material'
import {Box} from '@mui/material'
import type {IconProps} from 'iconsax-react'
import {Moon, Sun1} from 'iconsax-react'
import {get} from 'lodash-es'
import type {FC} from 'react'
import {useShallow} from 'zustand/react/shallow'

import {useThemeModeStore} from '@/store/theme-mode'

interface ThemeSwitchProps {
  iconSize: number
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({iconSize}) => {
  const [toggle, mode] = useThemeModeStore(
    useShallow((s) => [s.toggleTheme, s.mode]),
  )

  const iconMap: Record<PaletteMode, FC<IconProps>> = {
    dark: Sun1,
    light: Moon,
  }

  const Icon = get(iconMap, mode)
  return (
    <Box
      className='cursor-pointer'
      color='neutrals.gray'
      component={Icon}
      size={iconSize}
      onClick={toggle}
    />
  )
}
