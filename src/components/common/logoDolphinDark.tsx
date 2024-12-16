import {Box} from '@mui/material'
import LogoText from '@/assets/illustrations/logo-dolphin-text-dark.svg?react'
import Logo from '@/assets/illustrations/logo-dolphin-dark.svg?react'

interface LogoDolphinDark {
  width?: number
  height?: number
  widthText?: number
  widthShape?: number
  heightText?: number
  heightShape?: number
}
export const LogoDolphinDark: React.FC<LogoDolphinDark> = ({
  width = 92,
  height = 80,
  widthText = 92,
  widthShape = 92,
  heightText = 30,
  heightShape = 50,
}) => {
  return (
    <Box
      alignSelf='center'
      height={height}
      width={width}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        component={Logo}
        mx='auto'
        width="100%"
        height={heightShape}
        marginBottom={0.5}
      />

      <Box
        alignSelf='center'
        component={LogoText}
        mx='auto'
        width={widthText}
        height={heightText}
      />
    </Box>
  )
}
