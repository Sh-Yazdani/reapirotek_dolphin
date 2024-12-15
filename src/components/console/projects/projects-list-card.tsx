import {Box, Stack, Typography} from '@mui/material'
import type {ParseKeys} from 'i18next'
import {Category, Location} from 'iconsax-react'
import {kebabCase} from 'lodash'
import {capitalize, get} from 'lodash-es'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {IconContainer, SeeMore} from '@/components'
import type {Project} from '@/lib/data-provider/api/__generated'
import {lineClamp} from '@/lib/material-ui/theme/mixins'

interface ProjectsListCardProps extends Project {}

const defaultSpacing = 2

export const ProjectsListCard: React.FC<ProjectsListCardProps> = ({
  description,
  id,
  status: _status,
  title,
  zoneId,
}) => {
  const {t} = useTranslation('projects')
  const status = t(`status.${kebabCase(_status)}` as ParseKeys<'projects'>)
  return (
    <Box
      bgcolor='common.white'
      borderRadius={5}
      component={Stack}
      height='100%'
      pb={1}
      pt={2}
      spacing={4}
      width='100%'
    >
      <Stack
        alignItems='center'
        direction='row'
        px={defaultSpacing}
        spacing={1.5}
      >
        <IconContainer component={Category} flexShrink={0} size={24} />
        <Typography
          fontWeight='bold'
          sx={{fontSize: 17, ...lineClamp(1)}}
          title={title}
          variant='inherit'
        >
          {title}
        </Typography>
      </Stack>

      <Typography
        color='neutrals.gray'
        flex={1}
        fontWeight='medium'
        px={defaultSpacing}
        sx={lineClamp(3)}
        variant='caption'
      >
        {description}
      </Typography>

      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        px={defaultSpacing}
        spacing={0.5}
      >
        <Stack
          alignItems='center'
          color='secondary.main'
          direction='row'
          spacing={0.2}
        >
          <Location size={16} />
          {zoneId ? (
            <Typography fontWeight='medium' variant='small' noWrap>
              {/* TODO -> fix this */}
              {get(zoneId, 'name')}
            </Typography>
          ) : null}
        </Stack>

        <Typography color='primary.main' variant='small' noWrap>
          {capitalize(status)}
        </Typography>
      </Stack>

      <Stack
        borderTop={(theme) => `1px solid ${theme.palette.neutrals?.line}`}
        mt='auto'
        pt={1}
      >
        <SeeMore
          sx={{
            mt: 'auto',
            fontWeight: 'medium',
            fontSize: 16,
          }}
        />
      </Stack>
    </Box>
  )
}
