import {Card, Stack} from '@mui/material'
import type {ReactNode} from 'react'
import React from 'react'

interface DataGridContainerProps {
  children: ReactNode
  // title: string
}

export const DataTableContainer: React.FC<DataGridContainerProps> = ({
  children,
  // title,
}) => {
  return (
    <Card>
      <Stack spacing={1}>
        {/* <Typography fontWeight='bold' variant='t2' noWrap>
          {title}
        </Typography> */}

        {children}
      </Stack>
    </Card>
  )
}
