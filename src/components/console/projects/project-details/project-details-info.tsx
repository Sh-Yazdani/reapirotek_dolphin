import {Box, Card, Divider, Stack, Typography} from '@mui/material'
import {Link, useParams} from '@tanstack/react-router'
import dayjs from 'dayjs'
import type {ParseKeys} from 'i18next'
import {kebabCase} from 'lodash'
import {capitalize, get} from 'lodash-es'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {MapContainer, Marker, TileLayer} from 'react-leaflet'

import {BackToLink, CardWithTitle} from '@/components'
import type {Project} from '@/lib/data-provider/api/__generated'
import {useGetProjectByIdSuspense} from '@/lib/data-provider/api/__generated'
import {defaultDateTimeFormat} from '@/utils/date'

interface CommonProjectDetailsInfoSectionProps {
  project: Project
}

const ProjectDetailsInfoCard: React.FC<
  CommonProjectDetailsInfoSectionProps
  // eslint-disable-next-line max-lines-per-function
> = ({project}) => {
  const {t} = useTranslation('projects')
  return (
    <Card sx={{bgcolor: 'background.default'}}>
      <Stack gap={3}>
        <Stack
          direction='column'
          gap={{xs: 2, md: 2}}
          justifyContent='space-between'
        >
          <Stack direction='column' spacing={{xs: 2, md: 3}}>
            <Typography fontWeight='bold' variant='caption'>
              {t('project-details.project-name', {
                defaultValue: 'Project Name:',
              })}
            </Typography>

            <Typography
              fontSize={{xs: 20, md: 16}}
              fontWeight='bold'
              variant='t2'
            >
              {capitalize(project.title)}
            </Typography>
          </Stack>

          <Stack alignItems='center' direction='row' spacing={2}>
            <Typography fontWeight='bold' variant='textbox'>
              {t('project-details.project-code', {
                defaultValue: 'Project Code:',
              })}
            </Typography>
            <Typography color='primary.main' fontWeight='medium'>
              {project.projectCode}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{mx: (theme) => theme.spacing(-3)}} />

        <Stack spacing={2}>
          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.zone', {defaultValue: 'Zone:'})}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                {/* TODO -> Fix this */}
                {get(project, 'zoneId.name')}
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.area-length', {
                  defaultValue: 'Area length:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                {project.areaLength.toFixed(2)} {project.measureUnit}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.area-width', {
                  defaultValue: 'Area Width:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                {project.areaWidth.toFixed(2)} {project.measureUnit}
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.area-height', {
                  defaultValue: 'Area Height:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                {project.areaHeight.toFixed(2)} {project.measureUnit}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.latitude', {defaultValue: 'Latitude:'})}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                {project.latitude}
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.longitude', {
                  defaultValue: 'Longitude:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                {project.longitude}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.issue-date', {
                  defaultValue: 'Issue Date:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                {dayjs(project.createdAt).format(defaultDateTimeFormat)}
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-details.status', {defaultValue: 'Status:'})}
              </Typography>
              <Typography
                color='primary.main'
                fontWeight='medium'
                variant='caption'
              >
                {t(
                  `status.${kebabCase(
                    project.status,
                  )}` as ParseKeys<'projects'>,
                )}
              </Typography>
            </Box>
          </Stack>

          {project.description ? (
            <Stack
              direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
              gap={2}
            >
              <Box display='grid' flex={1} gap={{xs: 2, md: 2}}>
                <Typography fontWeight='bold' variant='caption'>
                  {t('project-details.description', {
                    defaultValue: 'Description:',
                  })}
                </Typography>
                <Typography
                  color='neutrals.gray'
                  fontWeight='medium'
                  variant='caption'
                >
                  {project.description}
                </Typography>
              </Box>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Card>
  )
}

const Map: React.FC<CommonProjectDetailsInfoSectionProps> = ({project}) => {
  const coordinates = [project.latitude, project.longitude] as [number, number]
  return (
    <MapContainer
      attributionControl={false}
      center={coordinates}
      style={{height: '100%', width: '100%'}}
      zoom={13}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={coordinates} />
    </MapContainer>
  )
}

export const ProjectDetailsInfo = () => {
  const [t] = useTranslation(['common', 'projects'])

  const {projectId} = useParams({
    select: (s) => ({projectId: s.projectId!}),
    strict: false,
  })
  const {data: project} = useGetProjectByIdSuspense(projectId)

  return (
    <CardWithTitle
      extra={
        <Link to='/console/projects'>
          <BackToLink
            caption={t('common:back', {defaultValue: 'Back'})}
            fontWeight='normal'
            underline={false}
          />
        </Link>
      }
      title={t('projects:project-details.project-information', {
        defaultValue: 'Project information',
      })}
    >
      <Stack
        display='grid'
        gap={2}
        gridTemplateColumns={{xl: 'repeat(2, 1fr)'}}
      >
        <Box flex={2}>
          <ProjectDetailsInfoCard project={project} />
        </Box>

        <Box
          sx={{
            flex: 1,
            height: '100%',
            p: 0,
            minHeight: 400,
            order: {xs: -1, lg: 1},
            borderRadius: 5,
          }}
        >
          <Map project={project} />
        </Box>
      </Stack>
    </CardWithTitle>
  )
}
