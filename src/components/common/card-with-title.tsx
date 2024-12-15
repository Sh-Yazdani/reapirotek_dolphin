import type {CardProps} from '@mui/material'
import {Box, Card, Stack, Typography} from '@mui/material'
import type {ReactNode} from 'react'
import React from 'react'

interface CardWithTitleProps extends CardProps {
  title: string
  children: ReactNode
  extra?: ReactNode
}

export const CardWithTitle: React.FC<CardWithTitleProps> = ({
  children,
  extra = null,
  title,
  ...props
}) => {
  return (
    <Card {...props}>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        mb={{xs: 2, sm: 4}}
      >
        <Typography fontWeight='bold' variant='t2' noWrap>
          {title}
        </Typography>

        <Box>{extra}</Box>
      </Stack>

      {children}
    </Card>
  )
}
