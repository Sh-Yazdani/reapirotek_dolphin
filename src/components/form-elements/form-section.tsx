import {Card, Stack, Typography} from '@mui/material'
import type {IconProps} from 'iconsax-react'
import type {ReactNode} from 'react'
import React from 'react'

import {IconContainer} from '@/components'

interface AddEmployeeFormSectionProps {
  children: ReactNode
  title?: string
  icon?: React.FC<IconProps>
}

export const FormSection: React.FC<AddEmployeeFormSectionProps> = ({
  children,
  icon: Icon,
  title,
}) => {
  return (
    <Card>
      <Stack gap={3}>
        {Icon || title ? (
          <Stack direction='row' spacing={2}>
            {Icon ? <IconContainer component={Icon} size={20} /> : null}
            {title ? (
              <Typography fontWeight='medium' variant='t2'>
                {title}
              </Typography>
            ) : null}
          </Stack>
        ) : null}

        {children}
      </Stack>
    </Card>
  )
}
