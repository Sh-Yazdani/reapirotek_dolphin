import type {DialogProps} from '@mui/material'
import React from 'react'

import {Dialog} from '@/components'

interface PermissionDeniedModalProps extends DialogProps {}

export const PermissionDeniedModal: React.FC<PermissionDeniedModalProps> = (
  props,
) => {
  return <Dialog {...props}>Microphone or Camera permission is denied.</Dialog>
}
