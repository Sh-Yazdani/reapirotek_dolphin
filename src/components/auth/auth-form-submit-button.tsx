import type {ButtonProps} from '@mui/material'
import {Button} from '@mui/material'

export const AuthFormSubmitButton = ({sx, ...props}: ButtonProps) => {
  return <Button size='large' sx={{height: 48, ...sx}} {...props} />
}
