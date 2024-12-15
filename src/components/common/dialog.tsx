import type {DialogProps} from '@mui/material'
import {Dialog as OriginalDialog, DialogContent} from '@mui/material'
import React from 'react'

export const Dialog: React.FC<DialogProps> = ({children, ...props}) => {
  return (
    <OriginalDialog {...props}>
      <DialogContent sx={{p: 2}}>{children}</DialogContent>
    </OriginalDialog>
  )
}
